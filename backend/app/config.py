import os

class Settings:
    PROJECT_NAME: str = "AyurGuru - AI Ayurveda IPR & Regulatory Assistant"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"
    
    # Security / Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "ayurguru-super-secret-key-2024-sih-demo")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ayurguru.db")
    
    # Gemini API Key (User provided or from environment)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Qdrant Vector DB
    QDRANT_LOCATION: str = os.getenv("QDRANT_LOCATION", ":memory:")
    
    # CORS
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "*"
    ]

settings = Settings()
