from typing import Dict

def calculate_companion_state(mood_trend: str, current_mood_level: int) -> Dict:
    """
    Updates the virtual companion based on emotional trends.
    Constraints:
    - Pet behavior improves when trends improve.
    - No punishment for low mood (Pet remains supportive).
    """
    
    # Base state
    happiness_bonus = 0
    interaction_suggestion = "check_in"
    pet_action = "sleeping"

    # Analyze Trend
    if mood_trend == "improving":
        happiness_bonus = 10
        pet_action = "excited_zoomies"
        interaction_suggestion = "play"
    elif mood_trend == "declining":
        # Supportive behavior, not punishment
        pet_action = "cuddling"
        interaction_suggestion = "comfort"
    else:
        pet_action = "observing"

    # Analyze Current Mood (1-5)
    # 1=Struggling, 5=Great
    if current_mood_level <= 2:
        pet_action = "concerned_nuzzle"
        # Ensure pet doesn't look 'sad', but 'supportive'
    elif current_mood_level >= 4:
        pet_action = "happy_dance"

    return {
        "action": pet_action,
        "happiness_modifier": happiness_bonus,
        "suggested_interaction": interaction_suggestion
    }
