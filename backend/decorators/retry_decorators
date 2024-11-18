from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
import aiohttp
import sqlalchemy.exc

# Retry configuration for aiohttp ClientErrors
aiohttp_retry_decorator = retry(
    stop=stop_after_attempt(3),  # Retry up to 3 times
    wait=wait_exponential(multiplier=1, min=2, max=10),  # Exponential backoff
    retry=retry_if_exception_type(aiohttp.ClientError)  # Retry on aiohttp ClientErrors
)

# Retry configuration for SQLAlchemy errors
sqlalchemy_retry_decorator = retry(
    stop=stop_after_attempt(3),  # Retry up to 3 times
    wait=wait_exponential(multiplier=1, min=2, max=10),  # Exponential backoff
    retry=retry_if_exception_type(sqlalchemy.exc.SQLAlchemyError)  # Retry on SQLAlchemy errors
)