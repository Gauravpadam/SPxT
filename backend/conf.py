from dotenv import load_dotenv
import os
load_dotenv(dotenv_path="../.env")

DATABASE_URL = str(os.getenv("DATABASE_URL"))
JWT_SECRET_KEY = str(os.getenv("JWT_SECRET_KEY"))
JWT_REFRESH_SECRET_KEY = str(os.getenv("JWT_REFRESH_SECRET_KEY"))
ALGORITHM = str(os.getenv("ALGORITHM"))
ACCESS_TOKEN_EXPIRE = os.getenv("ACCESS_TOKEN_EXPIRE")
REFRESH_TOKEN_EXPIRE = os.getenv("REFRESH_TOKEN_EXPIRE")
S3_URL = os.getenv("S3_URL") or "http://localhost:3001"
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_REGION = "us-west-2"
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
KNOWLEDGE_BASE_ID = os.getenv("KNOWLEDGE_BASE_ID")
