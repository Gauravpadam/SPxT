from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from conf import S3_URL
from routes import healthcheck, user, alerts, products, chatbot, forms
from database.database import Base, engine

Base.metadata.create_all(engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[S3_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(healthcheck.router)
app.include_router(user.router)
app.include_router(alerts.router)
app.include_router(products.router)
app.include_router(chatbot.router)
app.include_router(forms.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
