# EMERGE Companion Migration & Local Setup Guide

This document provides an overview of the EMERGE companion codebase and instructions for migrating away from Lovable.dev to a local development environment.

## Codebase Overview

The EMERGE companion is a Vite-based React application designed as a Gen-Z friendly emotional companion. It uses modern web technologies to provide a personalized experience.

### Key Technologies
- **Frontend**: React (with TypeScript), Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Hooks, TanStack Query (for future API integrations)
- **Data Persistence**: Local Storage (currently handles user data, moods, and journals)
- **Routing**: React Router DOM

### Project Structure
- `src/components`: UI components, including the onboarding flow and layout elements.
- `src/hooks`: Custom hooks for managing user data and application state.
- `src/lib`: Utility functions, including local storage management (`storage.ts`).
- `src/pages`: Main application pages (Home, Pet, Journal, Wrapped, Login).
- `src/types`: TypeScript definitions for the application's data models.

## Migration Steps (Lovable to Local)

To disconnect Lovable dependencies and set up your local environment, follow these steps:

### 1. Remove Lovable Dependencies
In your terminal, run the following command to remove the Lovable tagger:
```bash
npm uninstall lovable-tagger
```
Alternatively, manually remove `"lovable-tagger"` from `package.json` and delete `node_modules`.

### 2. Update Vite Configuration
Modify `vite.config.ts` to remove the `componentTagger` plugin. Your `plugins` array should only contain `react()`.

### 3. Update Meta Information
Edit `index.html` to update the application title and remove Lovable-specific metadata (author, Open Graph images, etc.).

### 4. Install Dependencies
Install the project dependencies locally:
```bash
npm install
```

### 5. Running Locally
Start the development server:
```bash
npm run dev
```
The application should now be accessible at `http://localhost:8080`.

## Backend Integration

The project now includes a FastAPI-based backend migrated to the `/backend` directory. This backend provides secure, encrypted storage and NLP-based emotion analysis.

### 1. Backend Setup

In a new terminal window:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Running the Backend
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The API documentation will be available at `http://localhost:8000/docs`.

### 3. Frontend Connectivity
The frontend is integrated with the backend via `src/lib/api.ts`. When you log a mood, the frontend automatically sends it to the backend for analysis.

## Local Development Notes
- **Frontend**: Runs on `http://localhost:8080`.
- **Backend**: Runs on `http://localhost:8000`.
- **Data Persistence**: Currently uses **Local Storage** with backend-assisted analysis. To enable real database persistence, configure your Supabase credentials in `backend/.env`.
