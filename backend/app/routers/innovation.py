import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, InnovationIdea
from ..auth import get_current_user
from ..schemas import InnovationAnalysisRequest, InnovationAnalysisResponse
from ..services.gap_analyzer import innovation_analyzer

router = APIRouter(prefix="/innovation", tags=["Innovation Gap Analyzer"])

@router.post("/analyze", response_model=InnovationAnalysisResponse)
def analyze_innovation(
    request: InnovationAnalysisRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Analyze herbal formulation ideas:
    - Identifies prior art in TKDL and granted patents
    - Explores white-space in delivery mechanisms, extraction methods, formulation synergy
    - Calculates Patentability, TKDL Risk, ABS Risk, and Commercialization Readiness scores.
    """
    result = innovation_analyzer.analyze(request)
    
    # Save idea record
    try:
        idea = InnovationIdea(
            user_id=current_user.id if current_user else None,
            formulation_name=result.formulation_name,
            ingredients=", ".join(result.ingredients),
            intended_use=request.intended_use,
            delivery_mechanism=request.current_form,
            patentability_score=result.patentability_score,
            tkdl_risk_score=result.tkdl_risk_score,
            abs_risk_score=result.abs_risk_score,
            commercial_readiness_score=result.commercial_readiness_score,
            analysis_json=json.dumps(result.dict())
        )
        db.add(idea)
        db.commit()
    except Exception as e:
        print(f"Notice: innovation record save error: {e}")
        db.rollback()

    return result

@router.get("/recent")
def get_recent_innovations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = db.query(InnovationIdea).order_by(InnovationIdea.created_at.desc()).limit(10).all()
    return [
        {
            "id": r.id,
            "formulation_name": r.formulation_name,
            "ingredients": r.ingredients,
            "patentability_score": r.patentability_score,
            "tkdl_risk_score": r.tkdl_risk_score,
            "abs_risk_score": r.abs_risk_score,
            "commercial_readiness_score": r.commercial_readiness_score,
            "created_at": r.created_at.isoformat() if r.created_at else None
        }
        for r in records
    ]
