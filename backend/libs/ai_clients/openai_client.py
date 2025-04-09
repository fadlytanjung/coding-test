from openai import AsyncOpenAI
from dotenv import load_dotenv
import os
from .base import BaseAIClient

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../../.env"))

class OpenAIClient(BaseAIClient):
    def __init__(self):
        self.client = AsyncOpenAI(api_key=os.getenv("AI_API_KEY"))

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
