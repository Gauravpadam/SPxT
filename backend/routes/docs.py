from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_session
from services.get_alerts import get_alerts_service

router = APIRouter()

@router.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html_github():
    return get_swagger_ui_html(
    openapi_url=router.openapi_url,
    title=f"{router.title} - Swagger UI",
    # swagger_ui_dark.css raw url
    swagger_css_url="https://raw.githubusercontent.com/Itz-fork/Fastapi-Swagger-UI-Dark/main/assets/swagger_ui_dark.min.css"
)