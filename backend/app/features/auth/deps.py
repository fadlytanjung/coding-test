from fastapi import Depends, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.features.auth.repository import get_user_by_username
from app.utils.response import create_response

def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
):
    token_payload = request.state.token_payload
    if not token_payload:
        return create_response(message="Unauthorized", status="failed", code=401)

    username = token_payload.get("sub")
    if not username:
        return create_response(message="Token missing username", status="failed", code=401)

    user = get_user_by_username(db, username)
    if not user:
        return create_response(message="User not found", status="failed", code=401)

    return user
