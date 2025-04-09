from datetime import datetime
from typing import Any
from pydantic import BaseModel

def serialize(obj: Any) -> Any:
    if isinstance(obj, BaseModel):
        obj = obj.model_dump()

    if isinstance(obj, dict):
        return {k: serialize(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [serialize(item) for item in obj]
    elif isinstance(obj, datetime):
        return obj.isoformat()
    return obj
