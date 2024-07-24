# Use the official Python image from Docker Hub.
FROM python:3.12.2-slim

# Set environment variables.
# Send output straight to terminal (easier debugging).
# https://stackoverflow.com/a/59812588
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install pipenv and ensure it's in the PATH
RUN pip install --no-cache-dir pipenv

# Copy only the Pipfile and Pipfile.lock
COPY Pipfile Pipfile.lock /app/

# Install dependencies
RUN pipenv install --deploy --ignore-pipfile

# Copy the rest of the application code
COPY . /app
COPY .env /app/.env

# Expose the port FastAPI will run on
EXPOSE 10000

# Define the command to run the application
CMD ["pipenv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000", "--workers", "8"]
