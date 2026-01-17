from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

# Reflection / Mood Input
class MoodEntryCreate(BaseModel):
    mood_level: int = Field(..., ge=1, le=5, description="1 to 5 scale")
    mood_note: Optional[str] = None
    reflection_text: Optional[str] = None # Detailed reflection for NLP

class EmotionAnalysisResponse(BaseModel):
    sentiment_polarity: float
    analysis_id: str
    message: str

# Insight / Trend
class TrendRequest(BaseModel):
    days: int = 7

class TrendResponse(BaseModel):
    trend_direction: str # improving, declining, stable
    slope: float
    volatility: float
    recommendation: str

# Companion State
class CompanionStateUpdate(BaseModel):
    pet_action: str
    suggested_interface_theme: str
