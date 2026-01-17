from textblob import TextBlob
from typing import List, Dict, Optional
import numpy as np
from datetime import datetime

class NLPProcessor:
    def analyze_sentiment(self, text: str) -> Dict[str, float]:
        """
        Returns basic sentiment metrics.
        Polarity: -1.0 (Negative) to 1.0 (Positive)
        Subjectivity: 0.0 (Objective) to 1.0 (Subjective)
        """
        blob = TextBlob(text)
        return {
            "polarity": blob.sentiment.polarity,
            "subjectivity": blob.sentiment.subjectivity
        }

    def detect_emotional_drift(self, history: List[Dict]) -> Dict:
        """
        Analyzes a list of mood entries (sorted by date) to find long-term trends.
        History item format: {'date': 'YYYY-MM-DD', 'score': float (-1 to 1)}
        """
        if not history or len(history) < 2:
            return {"status": "insufficient_data", "trend": "stable", "slope": 0.0}

        # Convert simple integer mood levels (1-5) to float (-1.0 to 1.0) if needed
        # Or assumes history already has normalized scores.
        
        scores = [item['score'] for item in history]
        
        # Simple Linear Regression to find Slope
        x = np.arange(len(scores))
        y = np.array(scores)
        slope, _ = np.polyfit(x, y, 1)

        trend = "stable"
        if slope > 0.05:
            trend = "improving"
        elif slope < -0.05:
            trend = "declining"

        return {
            "status": "success",
            "trend": trend,
            "slope": float(slope),
            "volatility": float(np.std(y)) # How much mood swings
        }

    def check_intervention_trigger(self, recent_slope: float, current_mood: float) -> bool:
        """
        Triggers micro-intervention if:
        1. Slope is consistently negative (declining).
        2. Current mood is very low.
        """
        if recent_slope < -0.1 or current_mood < -0.5:
            return True
        return False

nlp_engine = NLPProcessor()
