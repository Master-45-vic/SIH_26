from fastapi import APIRouter, Query
from typing import Optional
from ..schemas import KnowledgeGraphResponse
from ..services.knowledge_graph import knowledge_graph_service

router = APIRouter(prefix="/graph", tags=["Knowledge Graph"])

@router.get("/", response_model=KnowledgeGraphResponse)
def get_knowledge_graph(plant: Optional[str] = Query(None, description="Optional plant filter: Turmeric, Neem, Ashwagandha, Brahmi")):
    """
    Retrieve interactive Knowledge Graph connecting:
    Plant -> Traditional Knowledge -> Patent -> ABS -> Regulation
    """
    return knowledge_graph_service.get_graph_data(plant_filter=plant)
