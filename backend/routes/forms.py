from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_session
from schemas.form_schema import FormRequestData
from services.forms_service import get_forms, form_test

router = APIRouter()

@router.post("/get-forms")
def get_forms_list(data: FormRequestData , session: Session = Depends(get_session)):
    response = get_forms(session,data=data)
    return data.dict()

@router.get("/get-form")
def test_form_route():
    return form_test()