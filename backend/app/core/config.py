from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "EMERGE Backend"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "YOUR_SECRET_KEY_HERE_CHANGE_IN_PROD"
    ENCRYPTION_KEY: str = "YOUR_FERNET_KEY_HERE_CHANGE_IN_PROD" # Must be valid Fernet key
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 days
    
    # Database (Supabase)
    SUPABASE_URL: Optional[str] = None
    SUPABASE_KEY: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()
