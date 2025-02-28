import psycopg2
from config import DB_CONFIG
from models import Result

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

# Diccionario de predicados para los filtros
FILTER_PREDICATES = {
    "search": lambda value: (
        "(title ILIKE %s OR description ILIKE %s)",
        [f"%{value}%", f"%{value}%"],
    ),
    "id": lambda value: (
        "id = %s",
        [value]
    ),
    "impact": lambda value: (
        "impact = %s",
        [value]
    ),
    "probability": lambda value: (
        "probability = %s",
        [value]
    )
}

def get_risks(search=None, risk_id=None, impact=None, probability=None, page=1, per_page=10):
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Construir la consulta base
        query = "SELECT id, title, description, impact, probability, category, status FROM risks WHERE 1=1"
        params = []

        # Mapear parámetros a sus nombres en el diccionario
        filters = {
            "search": search,
            "id": risk_id,
            "impact": impact,
            "probability": probability
        }

        # Aplicar filtros del diccionario de predicados
        for filter_name, filter_value in filters.items():
            if filter_value is not None:
                print(filter_name, filter_value, "filter")
                condition, param_values = FILTER_PREDICATES[filter_name](filter_value)
                query += f" AND {condition}"
                params.extend(param_values)

        # Contar total de resultados para paginación
        count_query = f"SELECT COUNT(*) FROM ({query}) AS total"
        cur.execute(count_query, params)
        total_risks = cur.fetchone()[0]

        # Aplicar paginación
        offset = (page - 1) * per_page
        query += " ORDER BY id LIMIT %s OFFSET %s"
        params.extend([per_page, offset])

        # Ejecutar la consulta principal
        cur.execute(query, params)
        risks = cur.fetchall()

        risks_list = [
            {
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "impact": row[3],
                "probability": row[4],
                "category": row[5],
                "status": row[6]
            }
            for row in risks
        ]

        # Devolver resultado con paginación
        result = {
            "risks": risks_list,
            "total": total_risks,
            "page": page,
            "per_page": per_page,
            "total_pages": (total_risks + per_page - 1) // per_page
        }
        return Result.success(result)
    except Exception as e:
        return Result.failure(f"Database error: {str(e)}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()