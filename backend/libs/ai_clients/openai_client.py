from openai import AsyncOpenAI
from app.core.config import AI_API_KEY
import os
from .base import BaseAIClient


class OpenAIClient(BaseAIClient):
    def __init__(self):
        self.client = AsyncOpenAI(api_key=AI_API_KEY)

    async def stream_response(self, user_question: str):
        response = await self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_question}],
            stream=True,
        )
        async for chunk in response:
            content = chunk.choices[0].delta.content
            if content:
                yield content
