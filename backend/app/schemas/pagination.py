from pydantic import BaseModel
from typing import Generic, TypeVar, List

T = TypeVar("T")

class PaginationMeta(BaseModel):
    total_data: int
    total_page: int
    total_data_on_page: int
    page: int
    size: int

class PaginatedResponse(BaseModel, Generic[T]):
    data: List[T]
    meta: PaginationMeta
