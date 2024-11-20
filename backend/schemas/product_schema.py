from pydantic import BaseModel

class CreateProduct(BaseModel):
    name: str
    description: str
    hs6: str
