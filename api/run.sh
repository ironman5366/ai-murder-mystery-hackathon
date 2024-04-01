#!/usr/bin/env bash
pipenv run uvicorn main:app --reload --host 0.0.0.0 --port 10000

