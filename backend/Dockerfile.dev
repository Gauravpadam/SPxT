FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    bash \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN chmod +x ./entrypoint.sh

CMD ["bash", "./entrypoint.sh"]
