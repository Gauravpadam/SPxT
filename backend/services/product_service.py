import uuid
from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy.sql import text
from database.product_queries import get_products_for_user
import jwt
from conf import JWT_SECRET_KEY, ALGORITHM
from auth_bearer import jwt_bearer
from models.product_model import Product_Model
from schemas.product_schema import CreateProduct

def add_product(product: CreateProduct, token, session: Session):
    payload = jwt.decode(token, JWT_SECRET_KEY, ALGORITHM)
    user_id = payload['sub']

    new_product = Product_Model(
        product_name=product.name,
        product_description=product.description,
        itc_hs=product.hs6,
        user_id=user_id,
    )
    session.add(new_product)
    session.commit()
    return {"message": "Product added successfully!"}

def get_product(token, session: Session):
    payload = jwt.decode(token, JWT_SECRET_KEY, ALGORITHM)
    user_id = payload['sub']

    return get_products_for_user(user_id, session)
