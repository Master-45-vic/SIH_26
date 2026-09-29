import os
import sys

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.database import Base, engine, SessionLocal
from app.rag.corpus import seed_legal_corpus
from app.rag.hybrid_retriever import hybrid_retriever
from app.agent.graph import regulatory_workflow
from app.services.classifier import product_classifier
from app.schemas import ClassificationSubmission
from app.services.gap_analyzer import innovation_analyzer
from app.schemas import InnovationAnalysisRequest
from app.services.knowledge_graph import knowledge_graph_service

def test_all():
    print("Testing AyurGuru Backend...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # 1. Test Seed Corpus
    count = seed_legal_corpus(db)
    print(f"1. Seeding check: {count} documents verified.")
    
    # 2. Test Hybrid Retrieval
    hybrid_retriever.index_corpus(db)
    citations = hybrid_retriever.retrieve("Section 3(p) patent traditional knowledge", jurisdiction="India")
    print(f"2. Hybrid Retrieval check: retrieved {len(citations)} citations.")
    assert len(citations) > 0, "Expected at least 1 citation"
    print(f"   Top Citation: {citations[0].title} (Score: {citations[0].relevance_score})")

    # 3. Test LangGraph Workflow
    result = regulatory_workflow.execute(
        query="Can I patent a novel liposomal curcumin delivery system?",
        jurisdiction="India",
        language="English",
        input_mode="Voice"
    )
    print(f"3. Workflow check: Answer length={len(result.answer)}, Citations={len(result.citations)}, Verified={result.verification.is_verified}")
    print(f"   Why this answer bullets: {len(result.why_this_answer)}")
    print(f"   Pipeline Trace Domain: {result.pipeline_trace.domain_route}, Evidence: {result.pipeline_trace.evidence_status}, Input: {result.pipeline_trace.input_mode}")
    assert result.pipeline_trace is not None
    assert result.pipeline_trace.domain_route == "IP Retriever"
    assert result.pipeline_trace.input_mode == "Voice"
    assert len(result.pipeline_trace.retrieval_sources) == 3

    # 4. Test Product Classification
    submission = ClassificationSubmission(
        product_name="AyurImmuno Forte Syrup",
        ingredients=["Turmeric", "Tulsi", "Giloy", "Ginger"],
        is_textual_reference=False,
        claims_type="Curative/Therapeutic",
        form="Tablet",
        is_purified_fraction=False,
        route_of_administration="Oral"
    )
    c_res = product_classifier.classify(submission)
    print(f"4. Product Classification check: {c_res.classification} ({c_res.statutory_reference})")
    assert c_res.classification == "Proprietary Medicine"

    # 5. Test Innovation Gap Analyzer
    gap_req = InnovationAnalysisRequest(
        formulation_name="CurcuNeem Bio-Gel",
        ingredients=["Turmeric", "Neem"],
        intended_use="Accelerated wound healing and antimicrobial dermal repair",
        current_form="Topical Gel",
        target_jurisdiction="India"
    )
    gap_res = gap_analyzer = innovation_analyzer.analyze(gap_req)
    print(f"5. Gap Analyzer check: Patentability Score={gap_res.patentability_score}, Opportunities={len(gap_res.innovation_opportunities)}")
    assert len(gap_res.innovation_opportunities) >= 3

    # 6. Test Knowledge Graph
    kg_res = knowledge_graph_service.get_graph_data()
    print(f"6. Knowledge Graph check: {len(kg_res.nodes)} nodes, {len(kg_res.edges)} edges.")
    assert len(kg_res.nodes) >= 10
    
    print("\n ALL BACKEND MODULES AND PIPELINES PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_all()
