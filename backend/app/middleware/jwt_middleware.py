from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from jose import jwt, ExpiredSignatureError, JWTError
from app.utils.response import create_response
from app.core.config import SECRET_KEY, ALGORITHM

EXCLUDED_PATHS = [
    "/api/v1/auth/login",
    "/api/v1/health",
    "/api/v1/dummy-data"
]

class JWTMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        if path in EXCLUDED_PATHS:
            return await call_next(request)

        authorization = request.headers.get("Authorization")

        if authorization and authorization.startswith("Bearer "):
            token = authorization.replace("Bearer ", "")
            try:
                payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
                request.state.token_payload = payload
            except ExpiredSignatureError:
                request.state.token_payload = None
                return create_response(message="Token expired", status="failed", code=401)
            except JWTError:
                request.state.token_payload = None
                return create_response(message="Invalid token", status="failed", code=401)
        else:
            request.state.token_payload = None

        return await call_next(request)
