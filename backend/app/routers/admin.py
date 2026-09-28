import os
import shutil
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import DocumentCorpus, User
from ..auth import get_current_user
from ..rag.hybrid_retriever import hybrid_retriever
from pypdf import PdfReader

router = APIRouter(prefix="/admin", tags=["Admin Legal Sources"])

UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "uploads"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/documents")
def list_documents(
    jurisdiction: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(DocumentCorpus)
    if jurisdiction and jurisdiction.lower() != "all":
        query = query.filter(DocumentCorpus.jurisdiction == jurisdiction)
    docs = query.all()
    return [
        {
            "id": d.id,
            "doc_id": d.doc_id,
            "title": d.title,
            "jurisdiction": d.jurisdiction,
            "category": d.category,
            "authority": d.authority,
            "official_citation": d.official_citation,
            "version": d.version,
            "summary": d.summary,
            "keywords": d.keywords,
            "uploaded_at": d.uploaded_at.isoformat() if d.uploaded_at else None
        }
        for d in docs
    ]

@router.post("/upload")
async def upload_legal_document(
    title: str = Form(...),
    jurisdiction: str = Form("India"),
    category: str = Form("AYUSH Regulations"),
    authority: str = Form("Ministry of AYUSH"),
    official_citation: str = Form(""),
    version: str = Form("Current"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = ""
    if file.filename.endswith(".pdf"):
        try:
            reader = PdfReader(file_path)
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
        except Exception as e:
            extracted_text = f"Could not parse PDF text directly: {e}"
    else:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            extracted_text = f.read()

    doc_id = f"UP-{os.path.splitext(file.filename)[0][:10].upper()}-{len(db.query(DocumentCorpus).all()) + 1}"
    
    summary = extracted_text[:300] + "..." if len(extracted_text) > 300 else extracted_text

    doc = DocumentCorpus(
        doc_id=doc_id,
        title=title,
        jurisdiction=jurisdiction,
        category=category,
        authority=authority,
        official_citation=official_citation or title,
        version=version,
        summary=summary,
        content=extracted_text,
        keywords=f"{title}, {category}, {authority}",
        file_path=file_path
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    # Re-index hybrid retriever with new document
    hybrid_retriever.index_corpus(db)

    return {
        "status": "success",
        "message": f"Document '{title}' uploaded and indexed into {jurisdiction} legal corpus successfully.",
        "doc_id": doc_id
    }
