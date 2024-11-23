from fastapi import APIRouter, Depends
from llm_calls.retrieval import docs_retrieve
from services.chatbot import process_chat_query
from schemas.chatbot_schema import ChatBotQuery
from sqlalchemy.orm import Session
from auth_bearer import jwt_bearer
from utils import token_blacklisted
from services.healthcheck_service import check_db_health
from database.database import get_session

router = APIRouter()

@router.post("/query_chatbot")
@token_blacklisted
def query_chatbot(chatbot_query: ChatBotQuery, token = Depends(jwt_bearer), session: Session = Depends(get_session)):
    return process_chat_query(token, session)

@router.post("/testChat")
def test_chat(query: str):
    return docs_retrieve(query)
