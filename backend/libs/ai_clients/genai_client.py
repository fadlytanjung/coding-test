from google import genai
from google.genai import types
from typing import AsyncGenerator
from anyio.to_thread import run_sync
from anyio import create_task_group, create_memory_object_stream
from app.core.config import AI_API_KEY
from .base import BaseAIClient

class GeminiClient(BaseAIClient):
    def __init__(self):
        self.client = genai.Client(api_key=AI_API_KEY)

    async def stream_response(self, user_question: str) -> AsyncGenerator[str, None]:
        send_channel, receive_channel = create_memory_object_stream[str](max_buffer_size=10)

        def run_blocking():
            try:
                contents = [
                    types.Content(
                        role="user",
                        parts=[types.Part.from_text(text=user_question)],
                    )
                ]
                config = types.GenerateContentConfig(response_mime_type="text/plain")
                response = self.client.models.generate_content_stream(
                    model="gemini-2.0-flash-lite",
                    contents=contents,
                    config=config,
                )
                for chunk in response:
                    if chunk.text:
                        send_channel.send_nowait(chunk.text)
            finally:
                send_channel.close()

        async with receive_channel:
            async with create_task_group() as tg:
                tg.start_soon(run_sync, run_blocking)
                async for chunk in receive_channel:
                    yield chunk
