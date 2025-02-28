import psycopg2
from config import DB_CONFIG
import random

# Lista de palabras y categorías para generar datos realistas
TITLES = ["Acceso no autorizado", "Fuga de datos", "Ataque DDoS", "Phishing", "Malware", "Ransomware"]
DESCRIPTIONS = ["en el sistema", "por vulnerabilidades", "a credenciales", "de infraestructura", "interno", "crítico"]
CATEGORIES = ["Seguridad de acceso", "Fraude", "Infraestructura", "Seguridad interna", "Ciberataque"]
STATUSES = ["Activo", "Mitigado", "En revisión"]

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def generate_risk():
    title = f"{random.choice(TITLES)} {random.choice(DESCRIPTIONS)} #{random.randint(1, 1000)}"
    description = f"Incidente relacionado con {random.choice(DESCRIPTIONS)} detectado {random.choice(DESCRIPTIONS)}"
    impact = random.randint(1, 5)
    probability = random.randint(1, 5)
    category = random.choice(CATEGORIES)
    status = random.choice(STATUSES)
    return (title, description, impact, probability, category, status)

def populate_db(num_records=1000):
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Generar e insertar registros
        risks = [generate_risk() for _ in range(num_records)]
        insert_query = """
            INSERT INTO risks (title, description, impact, probability, category, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cur.executemany(insert_query, risks)
        conn.commit()
        print(f"Insertados {num_records} registros en la tabla risks.")
    except Exception as e:
        print(f"Error: {str(e)}")
        conn.rollback()
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    # Cambia el número aquí para más o menos registros
    populate_db(1000)  # Por ejemplo, 1000 registros