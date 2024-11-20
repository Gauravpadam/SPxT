import uuid
from sqlalchemy.orm import Session
from models.product_model import Product_Model
from schemas.product_schema import CreateProduct

def add_product(product: CreateProduct, session: Session):
    new_product = Product_Model(
        product_name=product.name,
        product_description=product.description,
        itc_hs=product.hs6,
        user_id=product.user_id,
    )
    session.add(new_product)
    session.commit()
    return {"message": "Product added successfully!"}
