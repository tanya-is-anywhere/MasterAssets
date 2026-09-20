from fastapi import FastAPI

app = FastAPI(
    title="Asset Similarity API",
    version="0.1.0",
    description="Backend for stylistic asset similarity search",
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
