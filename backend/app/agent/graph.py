from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from ..rag.hybrid_retriever import hybrid_retriever
from ..rag.verifier import evidence_verifier
from .gemini_client import gemini_client
from ..schemas import CitationSource, VerificationReport, RegulatoryQueryResponse

class WorkflowState(BaseModel):
    query: str
    jurisdiction: str = "India"
    language: str = "English"
    category_filter: Optional[str] = None
    query_intent: str = "general_regulatory"
    
    # RAG Stage
    citations: List[CitationSource] = []
    
    # Verification Stage
    verification: Optional[VerificationReport] = None
    
    # Answer Stage
    answer: str = ""
    why_this_answer: List[str] = []
    
    # Scores
    patentability_score: float = 75.0
    tkdl_risk_score: float = 40.0
    abs_risk_score: float = 30.0
    commercial_readiness_score: float = 80.0

class RegulatoryWorkflowGraph:
    """
    LangGraph-inspired agentic state machine for regulatory guidance.
    Graph Nodes:
      1. node_classify_intent
      2. node_hybrid_retrieval
      3. node_verify_evidence
      4. node_generate_response
      5. node_evaluate_escalation
    """
    def __init__(self):
        pass

    def node_classify_intent(self, state: WorkflowState) -> WorkflowState:
        q = state.query.lower()
        if any(k in q for k in ["classify", "proprietary", "classical", "phytopharmaceutical", "aahar"]):
            state.query_intent = "product_classification"
        elif any(k in q for k in ["patent", "invent", "prior art", "section 3(p)", "section 3(d)", "section 3(e)"]):
            state.query_intent = "patentability_and_ip"
        elif any(k in q for k in ["abs", "biodiversity", "nba", "sbb", "form iii", "benefit sharing"]):
            state.query_intent = "abs_biodiversity"
        elif any(k in q for k in ["fda", "ema", "thmpd", "export", "wipo", "international"]):
            state.query_intent = "international_compliance"
        else:
            state.query_intent = "ayush_regulatory"
            
        return state

    def node_hybrid_retrieval(self, state: WorkflowState) -> WorkflowState:
        citations = hybrid_retriever.retrieve(
            query=state.query,
            jurisdiction=state.jurisdiction,
            category_filter=state.category_filter,
            top_k=4
        )
        state.citations = citations
        return state

    def node_verify_evidence(self, state: WorkflowState) -> WorkflowState:
        verification = evidence_verifier.verify_evidence(
            query=state.query,
            citations=state.citations,
            target_jurisdiction=state.jurisdiction
        )
        state.verification = verification
        return state

    def node_generate_response(self, state: WorkflowState) -> WorkflowState:
        # Generate grounded answer via Gemini / Statutory Engine
        gen_result = gemini_client.generate_regulatory_response(
            query=state.query,
            jurisdiction=state.jurisdiction,
            language=state.language,
            citations=state.citations
        )
        state.answer = gen_result.get("answer", "")
        state.why_this_answer = gen_result.get("why_this_answer", [])
        
        # Calculate dynamic regulatory metrics
        q = state.query.lower()
        if "patent" in q or "novel" in q:
            state.patentability_score = 65.0 if "3(p)" in q else 82.0
            state.tkdl_risk_score = 75.0 if "turmeric" in q or "neem" in q or "ashwagandha" in q else 45.0
        if "abs" in q or "foreign" in q or "export" in q:
            state.abs_risk_score = 68.0
            
        return state

    def node_evaluate_escalation(self, state: WorkflowState) -> WorkflowState:
        if state.verification and state.verification.requires_human_expert:
            # Prepend caution notice if confidence is below threshold
            caution_notice = (
                f"\n\n> ⚠️ **Verification Notice ({int(state.verification.confidence_score * 100)}% Confidence):** "
                f"{state.verification.warning_message}\n"
                f"> **Recommended Human Expert:** {state.verification.recommended_expert}\n"
                f"> **Reason for Escalation:** {state.verification.escalation_reason}"
            )
            state.answer += caution_notice
            
        return state

    def execute(self, query: str, jurisdiction: str = "India", language: str = "English", category_filter: str = None) -> RegulatoryQueryResponse:
        state = WorkflowState(
            query=query,
            jurisdiction=jurisdiction,
            language=language,
            category_filter=category_filter
        )
        
        # Sequentially execute workflow nodes
        state = self.node_classify_intent(state)
        state = self.node_hybrid_retrieval(state)
        state = self.node_verify_evidence(state)
        state = self.node_generate_response(state)
        state = self.node_evaluate_escalation(state)
        
        return RegulatoryQueryResponse(
            query=state.query,
            jurisdiction=state.jurisdiction,
            language=state.language,
            answer=state.answer,
            why_this_answer=state.why_this_answer,
            citations=state.citations,
            verification=state.verification,
            patentability_score=state.patentability_score,
            tkdl_risk_score=state.tkdl_risk_score,
            abs_risk_score=state.abs_risk_score,
            commercial_readiness_score=state.commercial_readiness_score
        )

regulatory_workflow = RegulatoryWorkflowGraph()
