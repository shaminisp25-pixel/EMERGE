from fastapi import APIRouter
from app.models.schemas import TrendResponse, TrendRequest
from app.services.nlp_engine import nlp_engine
from typing import List

router = APIRouter()

@router.post("/trend", response_model=TrendResponse)
async def get_emotional_trend(request: TrendRequest):
    """
    Calculates emotional drift over the requested days.
    """
    # 1. Fetch data from DB based on User ID (Mocked here)
    # mock_history = db.table("mood_entries").select("recorded_date, mood_level")...
    
    # Mock Data for demonstration of the pipeline
    mock_history = [
        {"date": "2023-10-01", "score": 0.2}, # Normalized scores
        {"date": "2023-10-02", "score": 0.1},
        {"date": "2023-10-03", "score": -0.1},
        {"date": "2023-10-04", "score": -0.3},
        {"date": "2023-10-05", "score": -0.4}  # Declining trend
    ]

    analysis = nlp_engine.detect_emotional_drift(mock_history)
    
    recommendation = "Maintain your routine."
    if analysis["trend"] == "declining":
        recommendation = "Consider a grounding exercise or connecting with your comfort person."
    elif analysis["trend"] == "improving":
        recommendation = "Great momentum! Capture this feeling."
        
    return TrendResponse(
        trend_direction=analysis["trend"],
        slope=analysis["slope"],
        volatility=analysis.get("volatility", 0.0),
        recommendation=recommendation
    )
