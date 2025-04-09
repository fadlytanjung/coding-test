from sqlalchemy.orm import Session
from app.features.user.models import User

def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()
