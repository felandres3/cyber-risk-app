from flask import jsonify, request
from repository import get_risks

def init_routes(app):
    @app.route('/')
    def hello():
        return "Backend is running!"

    @app.route('/risks', methods=['GET'])
    def get_risks_route():
        search = request.args.get('search', default=None, type=str)
        risk_id = request.args.get('id', default=None, type=int)
        impact = request.args.get('impact', default=None, type=int)
        probability = request.args.get('probability', default=None, type=int)
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)
        sort_by = request.args.get('sort_by', default=None, type=str)  # Captura sort_by
        sort_dir = request.args.get('sort_dir', default='asc', type=str)  # Captura sort_dir

        print(f"Route params: search={search}, id={risk_id}, impact={impact}, probability={probability}, page={page}, per_page={per_page}, sort_by={sort_by}, sort_dir={sort_dir}")

        result = get_risks(search, risk_id, impact, probability, page, per_page, sort_by, sort_dir)
        if result.success:
            return jsonify(result.value)
        return jsonify({"error": result.error}), 500