import pytest
from app import app
from repository import get_risks

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_hello(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.data == b"Backend is running!"

def test_search_filter(client):
    response = client.get('/risks?search=ataque')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) > 0
    for risk in data["risks"]:
        assert "ataque" in risk["title"].lower() or "ataque" in risk["description"].lower()

def test_id_filter(client):
    response = client.get('/risks?id=1')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) == 1
    assert data["risks"][0]["id"] == 1

def test_attribute_filter(client):
    response = client.get('/risks?impact=4&probability=3')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) > 0
    for risk in data["risks"]:
        assert risk["impact"] == 4
        assert risk["probability"] == 3

def test_pagination(client):
    response = client.get('/risks?page=2&per_page=10')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) <= 10
    assert data["page"] == 2
    assert data["per_page"] == 10
    assert data["total"] > 0

def test_sql_injection(client):
    response = client.get("/risks?search=identidad'; DROP TABLE risks; --")
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) == 0

def test_search_performance(client, benchmark):
    def run_search():
        client.get('/risks?search=ataque')
    benchmark(run_search)