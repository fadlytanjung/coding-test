from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.features.user.models import User
from app.features.user.schemas import UserCreate, UserUpdate
from app.utils.security import verify_password
from app.utils.security import hash_password
from math import ceil

def create_user(db: Session, user_data: UserCreate) -> User:
    user = User(
        username=user_data.username,
        fullname=user_data.fullname,
        password=hash_password(user_data.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_all_users(db: Session, page: int, size: int, query: str | None = None):
    qset = db.query(User)

    if query:
        like_pattern = f"%{query}%"
        qset = qset.filter(or_(User.fullname.ilike(like_pattern), User.username.ilike(like_pattern)))

    total_data = qset.count()
    total_page = ceil(total_data / size) if size else 1

    users = qset.offset((page - 1) * size).limit(size).all()
    return users, total_data, total_page


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def update_user_by_id(db: Session, user_id: int, updated_data: UserUpdate) -> User | None:
    user = get_user_by_id(db, user_id)
    if not user:
        return None

    if updated_data.fullname is not None:
        user.fullname = updated_data.fullname

    if updated_data.new_password:
        if not updated_data.current_password or not verify_password(updated_data.current_password, user.password):
            raise ValueError("Current password is incorrect")
        user.password = hash_password(updated_data.new_password)

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
