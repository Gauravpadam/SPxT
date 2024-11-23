from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_session
from services.get_alerts import get_alerts_service
from services.get_alerts import populate_alerts_service

router = APIRouter()

@router.get("/get-alerts")
def get_alerts(userId, session: Session = Depends(get_session)):
    response = get_alerts_service(session,user_id=userId)
    return response

@router.get("/populate-alerts")
def populate_alerts(session:Session = Depends(get_session)):
    foo = populate_alerts_service(session)

    return foo
