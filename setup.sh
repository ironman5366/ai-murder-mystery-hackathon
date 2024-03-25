#!/bin/bash
# Commands to setup a new virtual environment and install all the necessary packages

set -e

pip install --upgrade pip

python3.12 -m venv venv
source venv/bin/activate

pip install anthropic mistralai jupyterlab numpy fastapi python-dotenv pydantic gradio pipenv uvicorn
