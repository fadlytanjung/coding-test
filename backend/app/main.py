from fastapi import FastAPI
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import DUMMY_DATA_PATH
from app.features.ai.routes import router as ai_router
from app.features.user.routes import router as user_router
from app.features.auth.routes import router as auth_router
from app.database import Base, engine
from app.database.seed import seed_initial_sysadmin
from app.middleware.jwt_middleware import JWTMiddleware

import json

with open(DUMMY_DATA_PATH, "r") as f:
    DUMMY_DATA = json.load(f)

Base.metadata.create_all(bind=engine)
seed_initial_sysadmin()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Accept"],
)

app.add_middleware(JWTMiddleware)


@app.get("/api/sales-reps", tags=["Dummy"])
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

app.include_router(ai_router, prefix="/api/ai", tags=["AI"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(user_router, prefix="/api/v1/users", tags=["Users"])
