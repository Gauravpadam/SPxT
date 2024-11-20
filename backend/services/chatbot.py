from typing import List
from sqlalchemy import RowMapping
from sqlalchemy.orm import Session
from backend.schemas.chatbot_schema import ChatBotQuery
from database.chatbot_queries import get_policy_changes_for_user, get_product_list_for_users
from models.policy_change_model import Policy_Change_Model
from models.product_model import Product_Model
from models.user_model import User_Model
from llm_calls.llm_calls import alert_llm_call, chatbot_llm_call
import datetime
from utils import alert_extract_xml_content, extract_userid_from_token
from database.alerts_queries import get_alerts_by_user_id

def process_chat_query(chatbot_query: ChatBotQuery, token, session: Session):
    user_id: int = extract_userid_from_token(token)
    product_list: List[RowMapping] = get_product_list_for_users(user_id, session)
    alerts_applied: List[dict] = get_policy_changes_for_user(session, user_id)
    query: str = chatbot_query.query
    query_timestamp: datetime.datetime = chatbot_query.timestamp

    response = chatbot_llm_call(query, query_timestamp, product_list, alerts_applied)

    return response
