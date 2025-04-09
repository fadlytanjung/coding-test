from fastapi.responses import JSONResponse
from app.utils.serialize import serialize
from typing import Any

def create_response(
    data: Any = None,
    message: str = "Success",
    status: str = "success",
    meta: dict | None = None,
    code: int = 200
):
    response = {
        "status": status,
        "message": message,
    }

    if data is not None:
        response["data"] = serialize(data)
    if meta is not None:
        response["meta"] = serialize(meta)

    return JSONResponse(content=response, status_code=code)
