from typing import TypeVar, Type, List
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)

def convert_orm_list(items: list, schema: Type[T]) -> List[T]:
    return [schema.model_validate(i) for i in items]
