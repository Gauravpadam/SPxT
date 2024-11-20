from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from backend.database.alerts_queries import get_alerts_by_user_id
from database.product_queries import get_products_for_user
from models.user_model import User_Model
from schemas.user_schema import Register_User
from decorators.retry_decorators import sqlalchemy_retry_decorator

# chapter_details = Column(String(500))
# itc_hs = Column(String(100))
# description = Column(String(500))
# policy_condition = Column(String(200))
# updated_at = Column(DateTime, default=datetime.datetime.now)
@sqlalchemy_retry_decorator
def get_policy_changes_for_user(*args):
    return get_alerts_by_user_id(*args)



def get_product_list_for_users(*args):
    return get_products_for_user(*args)
