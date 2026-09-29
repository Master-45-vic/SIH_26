import os
from pathlib import Path

# Load .env file automatically
_backend_env = Path(__file__).resolve().parent.parent / ".env"
_root_env = Path(__file__).resolve().parent.parent.parent / ".env"
for _env_path in [_backend_env, _root_env]:
    if _env_path.exists():
        try:
            with open(_env_path, "r", encoding="utf-8") as _f:
                for _line in _f:
                    _line = _line.strip()
                    if _line and not _line.startswith("#") and "=" in _line:
                        _k, _v = _line.split("=", 1)
                        _k = _k.strip()
                        _v = _v.strip().strip('"').strip("'")
                        if _k and _k not in os.environ:
                            os.environ[_k] = _v
        except Exception:
            pass

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "GURU - AI Ayurveda IPR & Regulatory Assistant")
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
