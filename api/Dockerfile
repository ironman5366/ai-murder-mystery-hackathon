FROM python:3.14.2-slim AS builder
ENV PIP_RETRIES=10 PIP_TIMEOUT=120 PYTHONUNBUFFERED=1
WORKDIR /app
RUN pip install --no-cache-dir pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv install --deploy --ignore-pipfile && \
    pipenv requirements > /requirements.txt

FROM python:3.14.2-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=builder /requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 10000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000", "--workers", "8"]
