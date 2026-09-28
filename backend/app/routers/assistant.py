import uuid
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, ConsultationRequest
from ..auth import get_current_user
from ..schemas import (
    RegulatoryQueryRequest,
    RegulatoryQueryResponse,
    EscalationRequest,
    EscalationResponse
)
from ..agent.graph import regulatory_workflow
from ..agent.gemini_client import gemini_client

router = APIRouter(prefix="/assistant", tags=["AI Assistant"])

@router.post("/query", response_model=RegulatoryQueryResponse)
def query_regulatory_assistant(
    request: RegulatoryQueryRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Query the LangGraph-powered Regulatory & IPR Assistant.
    Enforces strict jurisdiction boundaries (India vs International) and evidence verification.
    """
    response = regulatory_workflow.execute(
        query=request.query,
        jurisdiction=request.jurisdiction,
        language=request.language,
        category_filter=request.category_filter
    )
    return response

@router.post("/escalate", response_model=EscalationResponse)
def escalate_to_human_expert(
    escalation: EscalationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Escalate legally ambiguous, low-confidence, or complex questions to a certified human expert.
    """
    ticket_id = f"AG-EXP-{uuid.uuid4().hex[:8].upper()}"
    
    req = ConsultationRequest(
        user_id=current_user.id if current_user else None,
        expert_type=escalation.expert_type,
        reason=escalation.reason,
        query_context=escalation.query_context,
        contact_email=escalation.contact_email,
        status="Assigned"
    )
    db.add(req)
    db.commit()
    
    return EscalationResponse(
        ticket_id=ticket_id,
        expert_type=escalation.expert_type,
        status="Assigned to Panel Specialist",
        estimated_response_time="Within 24 Business Hours",
        message=(
            f"Your inquiry has been successfully escalated to our accredited {escalation.expert_type}. "
            f"Official dossier docket #{ticket_id} opened. An advisor will contact you at {escalation.contact_email}."
        )
    )

@router.post("/set-gemini-key")
def update_gemini_key(api_key: str = Body(..., embed=True)):
    """Allow user to dynamically configure their Gemini API Key in the UI."""
    gemini_client.update_key(api_key)
    return {"status": "success", "message": "Gemini API key configured successfully"}
