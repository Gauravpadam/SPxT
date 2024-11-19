from fastapi import FastAPI
from database.database import Base, engine
from routes import healthcheck, user

Base.metadata.create_all(engine)

app = FastAPI()

app.include_router(healthcheck.router)
app.include_router(user.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
