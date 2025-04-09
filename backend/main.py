from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from .libs.ai_clients.factory import get_ai_client
from dotenv import load_dotenv
import os
import json


ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DUMMY_DATA_PATH = os.path.join(ROOT_DIR, "dummyData.json")
ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=ENV_PATH)

with open(DUMMY_DATA_PATH, "r") as f:
    DUMMY_DATA = json.load(f)

app = FastAPI()
ai_client = get_ai_client()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
def get_data():
    return DUMMY_DATA

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    body = await request.json()
    user_question = body.get("question", "")

    return StreamingResponse(
        ai_client.stream_response(user_question),
        media_type="text/plain"
    )



