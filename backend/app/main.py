import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import settings
from app.api.routes import reflections, insights

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8080"],  # Frontend dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(reflections.router, prefix=f"{settings.API_V1_STR}/reflections", tags=["reflections"])
app.include_router(insights.router, prefix=f"{settings.API_V1_STR}/insights", tags=["insights"])

@app.get(f"{settings.API_V1_STR}/health")
def health_check():
    return {"status": "ok", "backend": "FastAPI"}

# Static Files & SPA Routing
# Assuming the root directory has the 'dist' folder after 'npm run build'
DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "dist")

if os.path.exists(DIST_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

    @app.get("/{path:path}")
    async def serve_spa(path: str):
        # Serve the file if it exists in dist (e.g. favicon.ico, etc.)
        file_path = os.path.join(DIST_DIR, path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        # Otherwise serve index.html for SPA routing
        return FileResponse(os.path.join(DIST_DIR, "index.html"))
else:
    @app.get("/")
    def root():
        return {"message": "EMERGE Backend API is running. Frontend 'dist' not found."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
