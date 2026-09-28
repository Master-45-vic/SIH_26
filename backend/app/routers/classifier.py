import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, ProductClassification
from ..auth import get_current_user
from ..schemas import ClassificationSubmission, ClassificationResult
from ..services.classifier import product_classifier

router = APIRouter(prefix="/classify", tags=["Product Classification Engine"])

@router.post("/", response_model=ClassificationResult)
def classify_product(
    submission: ClassificationSubmission,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Classify an Ayurvedic/herbal product into:
      - Classical Medicine
      - Proprietary Medicine
      - New Drug
      - Phytopharmaceutical
      - Ayurveda-Aahar
      - Cosmetic
    With legal reasoning and statutory citations.
    """
    result = product_classifier.classify(submission)
    
    # Save record
    try:
        record = ProductClassification(
            user_id=current_user.id if current_user else None,
            product_name=result.product_name,
            ingredients=", ".join(submission.ingredients),
            dosage_form=submission.form,
            therapeutic_claims=submission.claims_type,
            answers_json=json.dumps(submission.dict()),
            classification=result.classification,
            statutory_reference=result.statutory_reference,
            reasoning="\n".join(result.reasoning),
            confidence_score=result.confidence_score
        )
        db.add(record)
        db.commit()
    except Exception as e:
        print(f"Notice: classification history save error: {e}")
        db.rollback()

    return result

@router.get("/history")
def get_classification_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = db.query(ProductClassification).order_by(ProductClassification.created_at.desc()).limit(20).all()
    return [
        {
            "id": r.id,
            "product_name": r.product_name,
            "classification": r.classification,
            "statutory_reference": r.statutory_reference,
            "confidence_score": r.confidence_score,
            "created_at": r.created_at.isoformat() if r.created_at else None
        }
        for r in records
    ]
