import os
from .openai_client import OpenAIClient
from .genai_client import GeminiClient
from .base import BaseAIClient

def get_ai_client() -> BaseAIClient:
    provider = os.getenv("AI_PROVIDER", "genai").lower()
    if provider == "genai":
        return GeminiClient()
    else:
        return OpenAIClient()
