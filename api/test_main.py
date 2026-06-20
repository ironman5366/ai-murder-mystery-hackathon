import pytest


@pytest.mark.skip(reason="Requires PostgreSQL libpq native library")
def test_health_check():
    from main import app
    from fastapi.testclient import TestClient
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
