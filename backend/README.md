# EMERGE Backend

This is the secure, scalable backend for the EMERGE platform, built with FastAPI (Python).

## Features implemented:
- **NLP Pipeline**: Longitudinal emotion analysis (Drift Detection) using Linear Regression on sentiment scores.
- **Privacy-First**: Fernet symmetric encryption for sensitive user reflections (`app/core/security.py`).
- **Companion Logic**: Rule-based engine to update virtual pet state based on emotional trends.

## Setup

1. **Create Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

## Configuration
- Update `.env` with your Supabase credentials to enable real database storage.
- Update `ENCRYPTION_KEY` in `app/core/config.py` in production.

## API Documentation
Once running, visit `http://localhost:8000/docs` for interactive Swagger UI.
