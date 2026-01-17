from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import MoodEntryCreate, EmotionAnalysisResponse
from app.services.nlp_engine import nlp_engine
from app.core.security import encrypt_text
from app.core.config import settings
from supabase import create_client, Client

router = APIRouter()

# Dependency to get Supabase Client
def get_db() -> Client:
    # In production, use dependency injection or checking init
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        # Mock for dev if not configured
        print("Supabase credentials missing, using Mock mode")
        return None 
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.post("/analyze", response_model=EmotionAnalysisResponse)
async def analyze_reflection(entry: MoodEntryCreate, db: Client = Depends(get_db)):
    """
    1. Receives mood data.
    2. Runs NLP on note/reflection.
    3. Encrypts sensitive text.
    4. Saves to Database (if DB connected).
    5. Returns immediate analysis.
    """
    # 1. NLP Analysis
    text_to_analyze = entry.mood_note or entry.reflection_text or ""
    sentiment = {"polarity": 0.0}
    if text_to_analyze:
        sentiment = nlp_engine.analyze_sentiment(text_to_analyze)
    
    # 2. Encryption
    encrypted_note = None
    if entry.mood_note:
        encrypted_note = encrypt_text(entry.mood_note)
    
    # 3. Save to DB (Pseudo-code as we need User Context)
    # In a real app, we extract User ID from JWT token (Dependencies)
    # user_id = current_user.id
    # db.table("mood_entries").insert({...})
    
    return EmotionAnalysisResponse(
        sentiment_polarity=sentiment["polarity"],
        analysis_id="processed_in_memory", # Placeholder
        message="Reflection processed and encrypted."
    )
