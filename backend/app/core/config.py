import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parent.parent.parent

ENV_PATH = ROOT_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

BASIC_AUTH_TOKEN = os.getenv("BASIC_AUTH_TOKEN")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

DATABASE_URL = os.getenv("DATABASE_URL")
AI_API_KEY = os.getenv("AI_API_KEY")
AI_PROVIDER = os.getenv("AI_PROVIDER", "genai")

DUMMY_DATA_PATH = ROOT_DIR / "dummyData.json"
