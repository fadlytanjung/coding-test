from fastapi import FastAPI
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import json

from app.features.ai.routes import router as ai_router
from app.features.user.routes import router as user_router
from app.features.auth.routes import router as auth_router
from app.database import Base, engine


ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DUMMY_DATA_PATH = os.path.join(ROOT_DIR, "dummyData.json")
ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=ENV_PATH)

with open(DUMMY_DATA_PATH, "r") as f:
    DUMMY_DATA = json.load(f)

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/dummy-data", tags=["Dummy"])
def get_data():
    return DUMMY_DATA

@app.get("/api/v1/health", tags=["Health"])
def health():
     return JSONResponse(
        status_code=200,
        content={
            "status": "ok",
            "message": "Service is running",
        }
    )

app.include_router(ai_router, prefix="/api/v1/ai", tags=["AI"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(user_router, prefix="/api/v1/users", tags=["Users"])
