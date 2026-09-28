import re
import math
from typing import List, Dict, Any, Tuple
from rank_bm25 import BM25Okapi
from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels
from sqlalchemy.orm import Session
from ..models import DocumentCorpus
from ..schemas import CitationSource

class HybridRetriever:
    """
    Hybrid RAG Engine combining:
    1. BM25 keyword matching for exact statutory terminology (e.g. 'Section 3(p)', 'Rule 158-B', 'ABS Form III')
    2. Dense Vector semantic similarity via Qdrant
    3. Strict Jurisdiction isolation (India vs International)
    4. Metadata & Category filtering
    """
    def __init__(self):
        # In-memory Qdrant client
        self.qdrant = QdrantClient(":memory:")
        self.collection_name = "ayurguru_legal_corpus"
        self._init_qdrant()
        self.bm25 = None
        self.corpus_docs = []
        self.doc_tokens = []
        self.doc_vectors = []

    def _init_qdrant(self):
        try:
            self.qdrant.recreate_collection(
                collection_name=self.collection_name,
                vectors_config=qmodels.VectorParams(size=64, distance=qmodels.Distance.COSINE)
            )
        except Exception as e:
            print(f"Qdrant collection init notice: {e}")

    def _pseudo_dense_vector(self, text: str, dim: int = 64) -> List[float]:
        """
        Fast deterministic hash-based embedding projection (simulating dense semantic embedding like BGE-M3
        in local environment without requiring massive GPU downloads).
        """
        vec = [0.0] * dim
        words = re.findall(r"\w+", text.lower())
        for i, word in enumerate(words):
            h = hash(word)
            idx = abs(h) % dim
            sign = 1.0 if (h % 2 == 0) else -1.0
            vec[idx] += sign * (1.0 / (math.log(i + 2) + 1.0))
            
        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            vec = [x / norm for x in vec]
        return vec

    def _cosine_similarity(self, v1: List[float], v2: List[float]) -> float:
        dot = sum(a * b for a, b in zip(v1, v2))
        return max(0.0, min(1.0, dot))

    def index_corpus(self, db: Session):
        """Build BM25 index and Qdrant vector index from database."""
        docs = db.query(DocumentCorpus).all()
        self.corpus_docs = docs
        
        # Build BM25 & vectors
        self.doc_tokens = []
        self.doc_vectors = []
        qdrant_points = []
        
        for idx, doc in enumerate(docs):
            full_text = f"{doc.title} {doc.official_citation} {doc.summary} {doc.content} {doc.keywords}"
            tokens = [w.lower() for w in re.findall(r"\w+", full_text)]
            self.doc_tokens.append(tokens)
            
            # Vector embedding
            vec = self._pseudo_dense_vector(full_text)
            self.doc_vectors.append(vec)
            
            qdrant_points.append(qmodels.PointStruct(
                id=idx,
                vector=vec,
                payload={
                    "doc_id": doc.doc_id,
                    "title": doc.title,
                    "jurisdiction": doc.jurisdiction,
                    "category": doc.category,
                    "authority": doc.authority,
                    "official_citation": doc.official_citation,
                    "version": doc.version,
                    "summary": doc.summary,
                    "content": doc.content
                }
            ))

        if self.doc_tokens:
            self.bm25 = BM25Okapi(self.doc_tokens)
            
        if qdrant_points:
            try:
                self.qdrant.upsert(
                    collection_name=self.collection_name,
                    points=qdrant_points
                )
            except Exception as e:
                print(f"Notice: Qdrant points upsert: {e}")

    def retrieve(
        self,
        query: str,
        jurisdiction: str = "India",
        category_filter: str = None,
        top_k: int = 4
    ) -> List[CitationSource]:
        """
        Perform hybrid retrieval with STRICT jurisdiction isolation.
        """
        if not self.corpus_docs or not self.bm25:
            return []

        query_tokens = [w.lower() for w in re.findall(r"\w+", query)]
        bm25_scores = self.bm25.get_scores(query_tokens)
        
        # Normalize BM25 scores
        max_bm25 = max(bm25_scores) if len(bm25_scores) > 0 and max(bm25_scores) > 0 else 1.0

        # Dense vector search via Qdrant or Cosine Similarity
        query_vec = self._pseudo_dense_vector(query)
        vector_score_map = {}
        
        try:
            # Query Qdrant with filter
            res = self.qdrant.query_points(
                collection_name=self.collection_name,
                query=query_vec,
                limit=len(self.corpus_docs)
            )
            for pt in res.points:
                vector_score_map[pt.payload["doc_id"]] = pt.score
        except Exception:
            # Fallback to direct cosine calculation
            for idx, doc in enumerate(self.corpus_docs):
                if idx < len(self.doc_vectors):
                    vector_score_map[doc.doc_id] = self._cosine_similarity(query_vec, self.doc_vectors[idx])

        # Hybrid Fusion: 0.5 * BM25 + 0.5 * Vector + Keyword Bonus
        candidates: List[Tuple[float, DocumentCorpus]] = []
        for idx, doc in enumerate(self.corpus_docs):
            # Strict jurisdiction check
            if doc.jurisdiction.lower() != jurisdiction.lower():
                continue
            if category_filter and category_filter.lower() not in doc.category.lower():
                continue
                
            norm_bm25 = bm25_scores[idx] / max_bm25 if max_bm25 > 0 else 0.0
            vec_score = vector_score_map.get(doc.doc_id, 0.0)
            
            # Additional boost for exact keyword hits like '3(p)' or '158-B' or 'ABS'
            exact_boost = 0.0
            q_clean = query.lower()
            if "3(p)" in q_clean and "3(p)" in doc.title.lower():
                exact_boost += 0.35
            if "158" in q_clean and "158" in doc.title.lower():
                exact_boost += 0.35
            if "abs" in q_clean and "abs" in doc.title.lower():
                exact_boost += 0.35
            if "aahar" in q_clean and "aahar" in doc.title.lower():
                exact_boost += 0.35
            if "patent" in q_clean and "patent" in doc.title.lower():
                exact_boost += 0.20

            hybrid_score = (0.40 * norm_bm25) + (0.40 * max(0.0, vec_score)) + exact_boost
            candidates.append((hybrid_score, doc))

        candidates.sort(key=lambda x: x[0], reverse=True)
        top_candidates = candidates[:top_k]

        citations = []
        for score, doc in top_candidates:
            excerpt = doc.summary if doc.summary else doc.content[:300]
            citations.append(CitationSource(
                doc_id=doc.doc_id,
                title=doc.title,
                official_citation=doc.official_citation or doc.title,
                jurisdiction=doc.jurisdiction,
                category=doc.category,
                version=doc.version or "Current",
                relevant_excerpt=excerpt,
                relevance_score=round(min(score, 0.99), 3)
            ))

        return citations

hybrid_retriever = HybridRetriever()
