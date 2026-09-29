import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base, SessionLocal
from .rag.corpus import seed_legal_corpus
from .rag.hybrid_retriever import hybrid_retriever
from .routers import auth, assistant, classifier, innovation, graph, alerts, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed corpus
    print("Initializing AyurGuru database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        count = seed_legal_corpus(db)
        print(f"Seeded {count} legal documents into AyurGuru database.")
        print("Indexing Hybrid RAG (BM25 + Qdrant In-Memory Vector Store)...")
        hybrid_retriever.index_corpus(db)
        print("AyurGuru Knowledge Engine initialized successfully!")
    finally:
        db.close()
        
    yield
    # Shutdown
    print("Shutting down AyurGuru services...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-powered multilingual Ayurveda IPR & Regulatory Assistant for Smart India Hackathon (SIH)",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 routers
prefix = settings.API_V1_PREFIX
app.include_router(auth.router, prefix=prefix)
app.include_router(assistant.router, prefix=prefix)
app.include_router(classifier.router, prefix=prefix)
app.include_router(innovation.router, prefix=prefix)
app.include_router(graph.router, prefix=prefix)
app.include_router(alerts.router, prefix=prefix)
app.include_router(admin.router, prefix=prefix)

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs",
        "supported_jurisdictions": ["India", "International"],
        "supported_languages": ["English", "Hindi", "Tamil"]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "GURU Backend"}
