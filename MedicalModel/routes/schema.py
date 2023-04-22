from typing import Optional
from pydantic import BaseModel, Field


class ModelGenerateParams(BaseModel):
    age: int = Field(...)
    gender: bool = Field(...)  # true for male false for female
    weight: float = Field(...)  # kg
    height: float = Field(...)  # meters
    children: int = Field(...)  # no of children
    smoker: bool = Field(...)  # 1-> yes 0-> no
    region: list  # ['southwest' 'southeast' 'northwest' 'northeast']
