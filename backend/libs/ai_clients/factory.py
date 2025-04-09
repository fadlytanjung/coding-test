from app.core.config import AI_PROVIDER
from .openai_client import OpenAIClient
from .genai_client import GeminiClient
from .base import BaseAIClient

def get_ai_client() -> BaseAIClient:
    provider = AI_PROVIDER.lower()
    if provider == "genai":
        return GeminiClient()
    else:
        return OpenAIClient()
