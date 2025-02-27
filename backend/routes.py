from flask import jsonify
import psycopg2
from config import DB_CONFIG
from models import Result

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def get_risks_from_db():
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, title, description, impact, probability, category, status FROM risks;")
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
        return Result.success(risks_list)
    except Exception as e:
        return Result.failure(f"Database error: {str(e)}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

def init_routes(app):
    @app.route('/')
    def hello():
        return "Backend is running!"

    @app.route('/risks', methods=['GET'])
    def get_risks():
        result = get_risks_from_db()
        if result.success:
            return jsonify(result.value)
        return jsonify({"error": result.error}), 500