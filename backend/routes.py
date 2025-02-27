from flask import jsonify
from repository import get_all_risks

def init_routes(app):
    @app.route('/')
    def hello():
        return "Backend is running!"

    @app.route('/risks', methods=['GET'])
    def get_risks():
        result = get_all_risks()
        if result.success:
            return jsonify(result.value)
        return jsonify({"error": result.error}), 500