from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth_bearer import jwt_bearer
from utils import token_blacklisted
from services.healthcheck_service import check_db_health
from database.database import get_session

router = APIRouter()

@router.get("/query_chatbot")
@token_blacklisted
def query_chatbot(token = Depends(jwt_bearer), session: Session = Depends(get_session)):
    return "Teapot"
