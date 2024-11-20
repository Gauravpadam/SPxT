from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from models.user_model import User_Model
from schemas.user_schema import Register_User
from decorators.retry_decorators import sqlalchemy_retry_decorator

@sqlalchemy_retry_decorator
def get_products_for_user(user_id: int, session: Session):

    find_products_query = """
        SELECT product_name, product_description, itc_hs from products
        WHERE user_id = :user_id
        """

    products = session.execute(text(find_products_query), {
        "user_id": user_id
    }).all()

    return [product._mapping for product in products]
