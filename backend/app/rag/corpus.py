import os
import json
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from ..models import DocumentCorpus

DATASET_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "sample_legal_dataset"))

def seed_legal_corpus(db: Session) -> int:
    """Load JSON files from sample_legal_dataset into DocumentCorpus if not already present."""
    count = 0
    if not os.path.exists(DATASET_DIR):
        return count

    for filename in os.listdir(DATASET_DIR):
        if not filename.endswith(".json"):
            continue
        filepath = os.path.join(DATASET_DIR, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, list):
                    for item in data:
                        doc_id = item.get("id")
                        if not doc_id:
                            continue
                        existing = db.query(DocumentCorpus).filter(DocumentCorpus.doc_id == doc_id).first()
                        if not existing:
                            title = item.get("title", item.get("plant_name", "Statutory Document"))
                            jurisdiction = item.get("jurisdiction", "India")
                            category = item.get("category", "Traditional Knowledge")
                            authority = item.get("authority", "National Authority")
                            citation = item.get("official_citation", item.get("sanskrit_name", ""))
                            version = item.get("version", "Current")
                            summary = item.get("summary", "")
                            
                            # Content synthesis from clauses / landscape
                            content_parts = [summary]
                            if "key_clauses" in item:
                                content_parts.extend(item["key_clauses"])
                            if "practical_guidance" in item:
                                content_parts.append(f"Practical Guidance: {item['practical_guidance']}")
                            if "patent_landscape" in item:
                                pl = item["patent_landscape"]
                                if "landmark_case" in pl:
                                    content_parts.append(f"Landmark Case: {pl['landmark_case']}")
                                if "patentable_opportunities" in pl:
                                    content_parts.append("Patentable Opportunities: " + "; ".join(pl["patentable_opportunities"]))
                                if "tkdl_prior_art_bars" in pl:
                                    content_parts.append("TKDL Prior Art Bars: " + "; ".join(pl["tkdl_prior_art_bars"]))
                                if "abs_requirement" in pl:
                                    content_parts.append(f"ABS Requirement: {pl['abs_requirement']}")

                            full_content = "\n\n".join(content_parts)
                            keywords = ", ".join(item.get("keywords", []))

                            doc = DocumentCorpus(
                                doc_id=doc_id,
                                title=title,
                                jurisdiction=jurisdiction,
                                category=category,
                                authority=authority,
                                official_citation=citation,
                                version=version,
                                summary=summary,
                                content=full_content,
                                keywords=keywords,
                                file_path=filepath
                            )
                            db.add(doc)
                            count += 1
            db.commit()
        except Exception as e:
            print(f"Error seeding {filename}: {e}")
            db.rollback()
            
    return count

def get_all_documents(db: Session, jurisdiction: str = None) -> List[DocumentCorpus]:
    query = db.query(DocumentCorpus)
    if jurisdiction:
        query = query.filter(DocumentCorpus.jurisdiction == jurisdiction)
    return query.all()
