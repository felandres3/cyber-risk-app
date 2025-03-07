import psycopg2
from config import DB_CONFIG
from models import Result

def get_db_connection():
    """Establece y retorna una conexión a la base de datos."""
    return psycopg2.connect(**DB_CONFIG)

# Diccionario de funciones para construir filtros dinámicos en la consulta SQL
FILTER_PREDICATES = {
    "search": lambda value: ("(title ILIKE %s OR description ILIKE %s)", [f"%{value}%", f"%{value}%"]),
    "id": lambda value: ("id = %s", [value]),
    "impact": lambda value: ("impact = %s", [value]),
    "probability": lambda value: ("probability = %s", [value])
}

def get_risks(search=None, risk_id=None, impact=None, probability=None, page=1, per_page=10, sort_by=None, sort_dir='asc'):
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Construcción de la consulta base
        query = "SELECT id, title, description, impact, probability, category, status FROM risks WHERE 1=1"
        params = []

        # Filtros aplicables
        filters = {
            "search": search,
            "id": risk_id,
            "impact": impact,
            "probability": probability
        }

        print(f"Received params: search={search}, id={risk_id}, impact={impact}, probability={probability}, sort_by={sort_by}, sort_dir={sort_dir}")

        # Agregar condiciones de filtro dinámicamente
        for filter_name, filter_value in filters.items():
            if filter_value:
                condition, param_values = FILTER_PREDICATES[filter_name](filter_value)
                query += f" AND {condition}"
                params.extend(param_values)

        # Ordenamiento
        if sort_by and sort_by in ['id', 'title', 'description', 'impact', 'probability', 'category', 'status']:
            sort_dir = 'DESC' if sort_dir.lower() == 'desc' else 'ASC'
            query += f" ORDER BY {sort_by} {sort_dir}"
        else:
            print("No valid sort_by provided or sort_by not in allowed columns")

        print(f"Query before pagination: {query}")
        print(f"Params before pagination: {params}")

        # Obtener total de registros antes de paginación
        count_query = f"SELECT COUNT(*) FROM ({query}) AS total"
        cur.execute(count_query, params)
        total_risks = cur.fetchone()[0]

        # Paginación
        offset = (page - 1) * per_page
        query += " LIMIT %s OFFSET %s"
        params.extend([per_page, offset])

        print(f"Final query: {query}")
        print(f"Final params: {params}")

        # Ejecutar consulta final con paginación
        cur.execute(query, params)
        risks = cur.fetchall()
        print(f"Fetched risks: {risks}")

        # Convertir los resultados en una lista de diccionarios
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

        # Retornar resultado con metadatos de paginación
        result = {
            "risks": risks_list,
            "total": total_risks,
            "page": page,
            "per_page": per_page,
            "total_pages": (total_risks + per_page - 1) // per_page
        }
        return Result.success(result)
    
    except Exception as e:
        print(f"Exception: {str(e)}")
        return Result.failure(f"Database error: {str(e)}")
    
    finally:
        # Cerrar cursor y conexión para evitar fugas de memoria
        if cur:
            cur.close()
        if conn:
            conn.close()
