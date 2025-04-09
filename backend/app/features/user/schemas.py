import re
from pydantic import BaseModel, field_validator, FieldValidationInfo
from typing import Optional
from datetime import datetime
from .models import UserRole

class UserBase(BaseModel):
    username: str
    fullname: str

class UserCreate(UserBase):
    password: str
    @field_validator("fullname")
    def fullname_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Fullname cannot be empty")
        return v

    @field_validator("username")
    def username_format(cls, v):
        if not re.match(r"^[a-zA-Z0-9_]+$", v):
            raise ValueError("Username can only contain letters, numbers, and underscores")
        return v

class UserUpdate(BaseModel):
    fullname: Optional[str] = None
    current_password: Optional[str] = None
    new_password: Optional[str] = None

    @field_validator("new_password")
    def new_password_requires_current(cls, v, info: FieldValidationInfo):
        if v is not None:
            if not v.strip():
                raise ValueError("New password cannot be empty")
            if not info.data.get("current_password"):
                raise ValueError("Current password is required to set a new password")
        return v

class UserOut(UserBase):
    id: int
    role: UserRole
    avatar: str | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
