from sqlalchemy.orm import Session
from app.features.user.models import User
from app.features.user.schemas import UserCreate
from app.utils.security import hash_password


def create_user(db: Session, user_data: UserCreate) -> User:
    user = User(username=user_data.username, password=hash_password(user_data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_all_users(db: Session) -> list[User]:
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def update_user_by_id(db: Session, user_id: int, updated_data: UserCreate) -> User | None:
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    user.username = updated_data.username
    user.hashed_password = hash_password(updated_data.password)
    db.commit()
    db.refresh(user)
    return user


def delete_user_by_id(db: Session, user_id: int) -> bool:
    user = get_user_by_id(db, user_id)
    if not user:
        return False
    db.delete(user)
    db.commit()
    return True
