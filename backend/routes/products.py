from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_session
from schemas.product_schema import CreateProduct
from services.product_service import add_product

router = APIRouter()

@router.post("/add-product")
def create_product(product: CreateProduct, session: Session = Depends(get_session)):
    return add_product(product, session)
