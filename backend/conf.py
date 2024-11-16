from dotenv import load_dotenv
import os
load_dotenv(dotenv_path="../.env.dev")

DATABASE_URL = str(os.getenv("DATABASE_URL"))
