from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils import token_blacklisted
from database.database import get_session
from auth_bearer import jwt_bearer
from schemas.product_schema import CreateProduct
from services.product_service import add_product, get_product

router = APIRouter()

@router.post("/add-product")
@token_blacklisted
def create_product(product: CreateProduct, token = Depends(jwt_bearer), session: Session = Depends(get_session)):
    return add_product(product, token, session)

@router.get("/get-product-list")
@token_blacklisted
def get_product_list(token = Depends(jwt_bearer), session: Session = Depends(get_session)):
    return get_product(token, session)
