from fastapi import FastAPI
from pydantic import BaseModel
from model import anomaly_model

app = FastAPI(title="AI Threat Scoring Service")


class LogEvent(BaseModel):
    level: str
    message: str
    source: str | None = None


@app.get("/health")
def health():
    return {"status": "ml-service-running"}


@app.post("/score")
def score_log(log: LogEvent):
    score = anomaly_model.score(log.dict())
    return {
        "anomaly_score": score
    }
