from cryptography.fernet import Fernet
from app.core.config import settings

# In a real scenario, ensure settings.ENCRYPTION_KEY is a valid base64 url-safe string
# For dev, we can generate one if missing or handle it gracefully
try:
    _fernet = Fernet(settings.ENCRYPTION_KEY)
except Exception:
    # Fallback for dev environment only if key is invalid
    key = Fernet.generate_key()
    print(f"WARNING: specific ENCRYPTION_KEY not valid. Using temporal key: {key.decode()}")
    _fernet = Fernet(key)

def encrypt_text(text: str) -> str:
    """Encrypts raw user text before storage."""
    return _fernet.encrypt(text.encode()).decode()

def decrypt_text(token: str) -> str:
    """Decrypts text for temporary processing."""
    return _fernet.decrypt(token.encode()).decode()
