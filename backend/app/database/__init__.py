from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import DATABASE_URL, ROOT_DIR

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in the environment variables.")

if DATABASE_URL.startswith("sqlite:///./"):
    relative_path = DATABASE_URL.replace("sqlite:///./", "")
    absolute_path = ROOT_DIR / relative_path
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{absolute_path}"
else:
    SQLALCHEMY_DATABASE_URL = DATABASE_URL

connect_args = {"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
