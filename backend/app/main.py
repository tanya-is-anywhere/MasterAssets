from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1.router import api_router
from app.core.config import settings

BACKEND_ROOT = Path(__file__).resolve().parent.parent

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Backend для поиска стилистически похожих ассетов",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=BACKEND_ROOT), name="static")
app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
def root_health_check() -> dict[str, str]:
    return {"status": "ok"}
