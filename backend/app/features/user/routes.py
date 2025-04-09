from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.features.auth.deps import get_current_user
from app.features.user.models import User
from app.features.user.schemas import UserCreate, UserOut
from . import repository

router = APIRouter()

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return repository.create_user(db, user)


@router.get("/", response_model=list[UserOut])
def get_users(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return repository.get_all_users(db)


@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    user = repository.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, updated: UserCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    user = repository.update_user_by_id(db, user_id, updated)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    success = repository.delete_user_by_id(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}
