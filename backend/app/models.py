from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="startup") # practitioner, researcher, startup, cultivator, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class RegulatoryAlert(Base):
    __tablename__ = "regulatory_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    jurisdiction = Column(String(50), nullable=False, default="India") # India, International
    category = Column(String(100), nullable=False) # AYUSH, Biodiversity, Patents, FSSAI, US FDA, EMA
    authority = Column(String(100), nullable=False)
    date_notified = Column(String(50), nullable=False)
    impact_level = Column(String(20), default="High") # High, Medium, Low
    target_stakeholders = Column(String(255)) # Startups, MSMEs, Cultivators, Exporters
    summary = Column(Text, nullable=False)
    action_checklist = Column(Text) # JSON string or markdown
    source_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)

class ProductClassification(Base):
    __tablename__ = "product_classifications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    product_name = Column(String(255), nullable=False)
    ingredients = Column(Text, nullable=False)
    dosage_form = Column(String(100))
    therapeutic_claims = Column(Text)
    answers_json = Column(Text) # Store user questionnaire responses
    classification = Column(String(100), nullable=False) # Classical Medicine, Proprietary, New Drug, Phytopharmaceutical, Ayurveda-Aahar, Cosmetic
    statutory_reference = Column(String(255))
    reasoning = Column(Text)
    confidence_score = Column(Float, default=0.95)
    created_at = Column(DateTime, default=datetime.utcnow)

class InnovationIdea(Base):
    __tablename__ = "innovation_ideas"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    formulation_name = Column(String(255), nullable=False)
    ingredients = Column(Text, nullable=False)
    intended_use = Column(Text)
    delivery_mechanism = Column(String(255))
    
    patentability_score = Column(Float, default=75.0)
    tkdl_risk_score = Column(Float, default=45.0)
    abs_risk_score = Column(Float, default=30.0)
    commercial_readiness_score = Column(Float, default=80.0)
    
    analysis_json = Column(Text) # JSON storing patents, tkdl prior art, white space
    created_at = Column(DateTime, default=datetime.utcnow)

class ConsultationRequest(Base):
    __tablename__ = "consultation_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    expert_type = Column(String(100), nullable=False) # Patent Expert, AYUSH Consultant, ABS Officer
    reason = Column(Text, nullable=False)
    query_context = Column(Text)
    contact_email = Column(String(255), nullable=False)
    status = Column(String(50), default="Pending") # Pending, Assigned, Resolved
    created_at = Column(DateTime, default=datetime.utcnow)

class DocumentCorpus(Base):
    __tablename__ = "document_corpus"
    
    id = Column(Integer, primary_key=True, index=True)
    doc_id = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    jurisdiction = Column(String(50), nullable=False, default="India") # India, International
    category = Column(String(100), nullable=False)
    authority = Column(String(100), nullable=False)
    official_citation = Column(String(255))
    version = Column(String(100))
    summary = Column(Text)
    content = Column(Text, nullable=False)
    keywords = Column(Text) # comma-separated
    file_path = Column(String(500), nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
