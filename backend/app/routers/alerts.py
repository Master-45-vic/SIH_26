from fastapi import APIRouter, Query
from typing import List, Optional
from ..schemas import AlertItem
from ..services.alerts import regulatory_alert_service

router = APIRouter(prefix="/alerts", tags=["Regulatory Alerts"])

@router.get("/", response_model=List[AlertItem])
def list_regulatory_alerts(
    jurisdiction: Optional[str] = Query(None, description="India or International"),
    category: Optional[str] = Query(None, description="AYUSH, Biodiversity, Patents, FSSAI, etc.")
):
    """
    List regulatory alerts with impact summaries and actionable checklists.
    """
    return regulatory_alert_service.get_alerts(jurisdiction=jurisdiction, category=category)
