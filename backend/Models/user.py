from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    firstName: str
    lastName: str
    age: int
    gender: str
    email: str
    phone: str
    image: Optional[str] = None
    visible: bool
