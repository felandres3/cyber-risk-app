import pytest
from app import app
from repository import get_risks

@pytest.fixture
def client():
    """ Configura un cliente de prueba para la aplicación Flask """
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_hello(client):
    """ Verifica que la ruta raíz responde correctamente """
    response = client.get('/')
    assert response.status_code == 200
    assert response.data == b"Backend is running!"

def test_search_filter(client):
    """ Verifica que la búsqueda por palabra clave devuelve riesgos relevantes """
    response = client.get('/risks?search=ataque')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) > 0
    for risk in data["risks"]:
        assert "ataque" in risk["title"].lower() or "ataque" in risk["description"].lower()

def test_id_filter(client):
    """ Verifica que la búsqueda por ID devuelve el riesgo correcto """
    response = client.get('/risks?id=1')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) == 1
    assert data["risks"][0]["id"] == 1

def test_attribute_filter(client):
    """ Verifica que los filtros por impacto y probabilidad devuelven los riesgos correctos """
    response = client.get('/risks?impact=4&probability=3')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) > 0
    for risk in data["risks"]:
        assert risk["impact"] == 4
        assert risk["probability"] == 3

def test_pagination(client):
    """ Verifica que la paginación funciona correctamente """
    response = client.get('/risks?page=2&per_page=10')
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) <= 10  # No debe haber más de 10 elementos por página
    assert data["page"] == 2
    assert data["per_page"] == 10
    assert data["total"] > 0  # Asegura que hay datos en la base

def test_sql_injection(client):
    """ Verifica que la API es resistente a inyecciones SQL """
    response = client.get("/risks?search=identidad'; DROP TABLE risks; --")
    assert response.status_code == 200
    data = response.get_json()
    assert "risks" in data
    assert len(data["risks"]) == 0  # No debe devolver resultados ni afectar la BD

def test_search_performance(client, benchmark):
    """ Mide el rendimiento de la búsqueda con benchmarking """
    def run_search():
        client.get('/risks?search=ataque')
    benchmark(run_search)
