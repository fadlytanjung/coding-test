from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from libs.ai_clients.factory import get_ai_client

router = APIRouter()
ai_client = get_ai_client()

@router.post("/")
async def ai_endpoint(request: Request):
    body = await request.json()
    user_question = body.get("question", "")

    return StreamingResponse(
        ai_client.stream_response(user_question),
        media_type="text/plain"
    )