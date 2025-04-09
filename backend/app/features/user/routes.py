from fastapi import APIRouter, Depends, Query
from typing import List
from sqlalchemy.orm import Session
from app.database import get_db
from app.features.auth.deps import get_current_user
from app.features.user.models import User
from app.features.user.schemas import UserCreate, UserOut, UserUpdate
from app.features.auth.repository import get_user_by_username
from app.schemas.pagination import PaginatedResponse
from app.utils.response import create_response
from app.utils.convert import convert_orm_list
from . import repository

router = APIRouter()

@router.get("/me")
def read_me(current_user: User = Depends(get_current_user)):
    return create_response(data={
        "id": current_user.id,
        "username": current_user.username,
        "fullname": current_user.fullname,
        "role": current_user.role,
        "avatar": current_user.avatar
    })

@router.post("/")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    existing = get_user_by_username(db, user.username)
    if existing:
        return create_response(message="Username already taken", status="failed", code=400)

    created = repository.create_user(db, user)
    user_out = UserOut.model_validate(created)
    return create_response(data=user_out, message="User created", code=201)

@router.get("/", response_model=PaginatedResponse[UserOut])
def get_users(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    q: str | None = None,
    db: Session = Depends(get_db),
    _: List[User] = Depends(get_current_user),
):
    users, total_data, total_page = repository.get_all_users(db, page, size, q)
    users_out = convert_orm_list(users, UserOut)

    meta = {
        "total_data": total_data,
        "total_page": total_page,
        "total_data_on_page": len(users),
        "page": page,
        "size": size
    }
    return create_response(data=users_out, meta=meta)

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    user = repository.get_user_by_id(db, user_id)
    user_out = UserOut.model_validate(user)
    if not user:
        return create_response(message="User not found", status="failed", code=404)
    return create_response(data=user_out)

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, updated: UserUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    try:
        user = repository.update_user_by_id(db, user_id, updated)
    except ValueError as e:
       return create_response(message=str(e), status="failed", code=400)
    if not user:
        return create_response(message="User not found", status="failed", code=404)
    user_out = UserOut.model_validate(user)
    return create_response(data=user_out, message="User updated")

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    success = repository.delete_user_by_id(db, user_id)
    if not success:
        return create_response(message="User not found", status="failed", code=404)
    return create_response(message="User deleted")
