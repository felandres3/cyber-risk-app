# Arquitectura de Cyber Risks App

## Introducción
Cyber Risks App es una herramienta diseñada para gestionar riesgos de ciberseguridad en una empresa. Permite buscar y filtrar riesgos (como ataques o fugas) desde un frontend en React conectado a un backend Flask, con PostgreSQL como base de datos.

## Visión general
- **Frontend**: React 🚀.
- **Backend**: Flask con rutas RESTful 🌐.
- **Base de datos**: PostgreSQL con una tabla `risks` 🗄️.
- **Arquitectura**: Capas simples con enfoque RESTful, usando patrones como Repository y Result 🛠️.

## Componentes
- **`app.py`**: Punto de entrada que arranca Flask y registra las rutas. 🎬
- **`routes.py`**: Define los endpoints REST (`/` y `/risks`) y pasa parámetros al repositorio. 🛤️
- **`repository.py`**: Maneja la lógica de la base de datos con filtros dinámicos. 🗃️
- **`config.py`**: Carga la configuración de la DB desde un archivo `.env`. ⚙️
- **`models.py`**: Clase `Result` para manejar éxito o fallo de operaciones. ✅❌
- **`populate_db.py`**: Script para generar datos de prueba masivos. 📈
- **`test_risks.py`**: Tests automatizados con `pytest` para asegurar que todo funcione. 🧪

## Flujo de datos
1. El usuario envía un `GET /risks?search=ataque` desde el frontend. 📥
2. `routes.py` captura el request, extrae `search=ataque` y llama a `repository.py`. 🔍
3. `repository.py` arma una consulta SQL, se conecta a PostgreSQL y devuelve un `Result`. 🗄️
4. `routes.py` transforma el `Result` en JSON y lo envía de vuelta al usuario. 📤

## Decisiones de diseño

### Result Pattern
- **Por qué**: Usamos este patrón para tener control total sobre éxito o fallo, evitando excepciones caóticas. Mejora la testeabilidad y claridad del código. ✅
- **Código**:
  ```python
  class Result:
      def __init__(self, success, value=None, error=None):
          self.success = success
          self.value = value
          self.error = error

      @staticmethod
      def success(value):
          return Result(True, value=value)

      @staticmethod
      def failure(error):
          return Result(False, error=error)


### Diccionario de predicados
- **Por qué**: Elegimos esto para los filtros porque es flexible y legible. Permite añadir nuevos filtros sin ensuciar el código con `ifs` 🌟
- **Código**:
  ```python
  FILTER_PREDICATES = {
    "search": lambda value: (
        "(title ILIKE %s OR description ILIKE %s)",
        [f"%{value}%", f"%{value}%"]
        ),
        "id": lambda value: ("id = %s", [value])
    }


### Sin ORM (usando SQL crudo)
- **Por qué**: Optamos por no usar un ORM como SQLAlchemy para mantener simplicidad y control directo en este proyecto pequeño. Además, con psycopg2 y parámetros preparados `(%s)`, estamos protegidos contra SQL Injection. 🛡️
- **Código**:
  ```python
    query = "SELECT * FROM risks WHERE title ILIKE %s"
    params = ["%ataque%"]
    cur.execute(query, params)


