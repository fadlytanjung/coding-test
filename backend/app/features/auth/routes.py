from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from jose import jwt
from datetime import datetime, timedelta, timezone

from app.database import get_db
from app.features.auth.repository import get_user_by_username
from app.utils.security import verify_password
from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, BASIC_AUTH_TOKEN
from app.features.auth.schemas import Token, LoginBody

router = APIRouter()

@router.post("/login", response_model=Token)
def login(
    login_data: LoginBody,
    authorization: str = Header(...),
    db: Session = Depends(get_db),
):
    if not authorization.startswith("Basic "):
        raise HTTPException(status_code=401, detail="Invalid auth scheme")

    encoded_token = authorization.replace("Basic ", "")
    if encoded_token != BASIC_AUTH_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = get_user_by_username(db, login_data.username)
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = jwt.encode(
        {
            "sub": user.username,
            "fullname": user.fullname,
            "role": user.role,
            "id": user.id,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return {"access_token": access_token, "token_type": "bearer"}

