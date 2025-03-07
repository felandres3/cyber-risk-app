import psycopg2
from config import DB_CONFIG
import random

# Datos base para generar riesgos realistas
TITLES = ["Acceso no autorizado", "Fuga de datos", "Ataque DDoS", "Phishing", "Malware", "Ransomware"]
DESCRIPTIONS = ["en el sistema", "por vulnerabilidades", "a credenciales", "de infraestructura", "interno", "crítico"]
CATEGORIES = ["Seguridad de acceso", "Fraude", "Infraestructura", "Seguridad interna", "Ciberataque"]
STATUSES = ["Activo", "Mitigado", "En revisión"]

def get_db_connection():
    """Establece y retorna una conexión a la base de datos."""
    return psycopg2.connect(**DB_CONFIG)

def generate_risk():
    """Genera un registro aleatorio de riesgo con datos realistas."""
    title = f"{random.choice(TITLES)} {random.choice(DESCRIPTIONS)} #{random.randint(1, 1000)}"
    description = f"Incidente relacionado con {random.choice(DESCRIPTIONS)} detectado {random.choice(DESCRIPTIONS)}"
    impact = random.randint(1, 5)
    probability = random.randint(1, 5)
    category = random.choice(CATEGORIES)
    status = random.choice(STATUSES)
    return (title, description, impact, probability, category, status)

def populate_db(num_records=1000):
    """Genera y almacena registros de riesgos en la base de datos."""
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Genera múltiples registros de riesgo
        risks = [generate_risk() for _ in range(num_records)]
        
        # Inserta los datos generados en la tabla 'risks'
        insert_query = """
            INSERT INTO risks (title, description, impact, probability, category, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cur.executemany(insert_query, risks)
        conn.commit()
        print(f"Insertados {num_records} registros en la tabla risks.")
    except Exception as e:
        print(f"Error: {str(e)}")
        if conn:
            conn.rollback()
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    populate_db(1000)  # Ejecuta la función con el número deseado de registros
