from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# Auth Schemas
class UserRegister(BaseModel):
    email: str
    password: str = Field(..., min_length=6)
    full_name: str
    role: Optional[str] = "startup"

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    email: str
    full_name: str
    role: str

# Query & RAG Schemas
class RegulatoryQueryRequest(BaseModel):
    query: str
    jurisdiction: str = Field(default="India", description="India or International")
    language: str = Field(default="English", description="English, Hindi, Tamil, etc.")
    category_filter: Optional[str] = None
    input_mode: Optional[str] = Field(default="Text", description="Text or Voice")
    user_context: Optional[Dict[str, Any]] = None

class CitationSource(BaseModel):
    doc_id: str
    title: str
    official_citation: str
    jurisdiction: str
    category: str
    version: str
    relevant_excerpt: str
    relevance_score: float

class VerificationReport(BaseModel):
    is_verified: bool
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    source_available: bool
    jurisdiction_matched: bool
    version_valid: bool
    warning_message: Optional[str] = None
    requires_human_expert: bool = False
    recommended_expert: Optional[str] = None # Patent Attorney, AYUSH Consultant, ABS Officer
    escalation_reason: Optional[str] = None

class PipelineTrace(BaseModel):
    input_mode: str = "Text" # Text or Voice
    detected_language: str = "English"
    translated_query: Optional[str] = None
    query_understanding: Dict[str, Any] = Field(default_factory=dict)
    jurisdiction: str = "India"
    domain_route: str = "IP Retriever" # IP Retriever, Regulatory Retriever, ABS/TKDL Retriever, Product Classification
    retrieval_sources: List[Dict[str, Any]] = Field(default_factory=list)
    ai_agent_status: str = "Completed Agentic Reasoning"
    evidence_status: str = "Evidence Ok" # Evidence Ok or Evidence Weak
    safe_abstain: bool = False
    safe_abstain_reason: Optional[str] = None
    recommended_expert: Optional[str] = None
    execution_time_ms: Optional[float] = None

class RegulatoryQueryResponse(BaseModel):
    query: str
    jurisdiction: str
    language: str
    answer: str
    why_this_answer: List[str] = Field(default_factory=list, description="Step-by-step reasoning bullets")
    citations: List[CitationSource] = Field(default_factory=list)
    verification: VerificationReport
    pipeline_trace: Optional[PipelineTrace] = None
    patentability_score: Optional[float] = None
    tkdl_risk_score: Optional[float] = None
    abs_risk_score: Optional[float] = None
    commercial_readiness_score: Optional[float] = None

# Product Classification Schemas
class ClassificationQuestion(BaseModel):
    id: str
    question: str
    description: Optional[str] = None
    options: List[str]

class ClassificationSubmission(BaseModel):
    product_name: str
    ingredients: List[str]
    is_textual_reference: bool = Field(..., description="Mentioned in First Schedule 54 authoritative books")
    claims_type: str = Field(..., description="Nutritional/Well-being, Curative/Therapeutic, Cosmetic/Topical, New Molecule")
    form: str = Field(..., description="Churna, Vati, Asava/Arishta, Tablet, Capsule, Extract, Cream/Oil, Injection")
    is_purified_fraction: bool = Field(default=False, description="Purified fraction with >=4 chemical markers")
    route_of_administration: str = Field(default="Oral")

class ClassificationResult(BaseModel):
    product_name: str
    classification: str # Classical Medicine, Proprietary Medicine, New Drug, Phytopharmaceutical, Ayurveda-Aahar, Cosmetic
    statutory_reference: str
    licensing_authority: str
    mandatory_forms: List[str]
    safety_data_required: str
    reasoning: List[str]
    confidence_score: float = 0.95
    ai_advisory: Optional[str] = None
    ai_patent_strategy: Optional[str] = None

# Innovation Analyzer Schemas
class InnovationAnalysisRequest(BaseModel):
    formulation_name: str
    ingredients: List[str]
    intended_use: str
    current_form: Optional[str] = "Powder / Decoction"
    target_jurisdiction: str = "India"

class InnovationWhiteSpacedArea(BaseModel):
    category: str # "New Delivery Mechanism", "New Extraction Method", "New Formulation Process"
    opportunity: str
    technical_description: str
    patentability_potential: str # High, Medium, Low
    prior_art_hurdle: str
    recommended_experimentation: str

class InnovationAnalysisResponse(BaseModel):
    formulation_name: str
    ingredients: List[str]
    patentability_score: float
    tkdl_risk_score: float
    abs_risk_score: float
    commercial_readiness_score: float
    existing_patents: List[Dict[str, Any]]
    traditional_knowledge_prior_art: List[Dict[str, Any]]
    innovation_opportunities: List[InnovationWhiteSpacedArea]
    abs_compliance_roadmap: List[str]
    human_expert_guidance: Optional[str] = None
    ai_innovation_summary: Optional[str] = None

# Knowledge Graph Schemas
class GraphNode(BaseModel):
    id: str
    label: str
    type: str # Plant, TraditionalKnowledge, Patent, ABS, Regulation
    properties: Dict[str, Any] = Field(default_factory=dict)

class GraphEdge(BaseModel):
    source: str
    target: str
    relation: str # DESCRIBED_IN, SUBJECT_OF_PATENT, SUBJECT_TO_ABS, GOVERNED_BY
    label: str

class KnowledgeGraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

# Regulatory Alerts Schemas
class AlertItem(BaseModel):
    id: int
    title: str
    jurisdiction: str
    category: str
    authority: str
    date_notified: str
    impact_level: str
    target_stakeholders: str
    summary: str
    action_checklist: List[str]
    source_url: Optional[str] = None

# Escalation Schemas
class EscalationRequest(BaseModel):
    expert_type: str
    reason: str
    query_context: Optional[str] = None
    contact_email: str
    user_name: Optional[str] = "Ayurveda Practitioner"

class EscalationResponse(BaseModel):
    ticket_id: str
    expert_type: str
    status: str
    estimated_response_time: str
    message: str
