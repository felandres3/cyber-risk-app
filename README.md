# 🛡️ Cyber Risks App

## 📝 Introducción
Cyber Risks App es una herramienta para gestionar riesgos de ciberseguridad en una empresa. Permite buscar y filtrar riesgos desde un frontend en React (¡en desarrollo!) conectado a un backend Flask, con PostgreSQL como base de datos.

## 📋 Requisitos
- **Python** 3.8 o superior 🐍
- **Node.js** 18 o superior (para el frontend, próximamente) 🌐
- **PostgreSQL** 🗄️

## 🚀 Configuración del backend
1. **Ve a la carpeta backend**: `cd backend` 📂
2. **Crea y activa un entorno virtual**: `python -m venv venv` y `venv\Scripts\activate` (Windows) 🖥️
3. **Instala las dependencias**: `pip install -r requirements.txt` 📦  
   *(Nota: El archivo `requirements.txt` se generó con `pip freeze > requirements.txt` desde el entorno virtual con todas las dependencias instaladas.)*
4. **Crea un archivo `.env` en `backend/` con**:


```
    DB_NAME=cyber_risks
    DB_USER=postgres
    DB_PASSWORD=tu_contraseña
    DB_HOST=localhost
    DB_PORT=5432
```


⚙️
5. **Configura la base de datos**:
- `psql -U postgres -c "CREATE DATABASE cyber_risks;"` 🗄️
- `psql -U postgres -d cyber_risks -f backend/database/init.sql` 📜
6. **Pobla la base de datos**: `python populate_db.py` 📈
7. **Corre el servidor**: `python app.py` 🌐
8. **Ejecuta los tests**: `pytest --benchmark-enable` 🧪

## 🌟 Ejemplos de uso
- **Todos los riesgos**: `http://localhost:5000/risks` 📋
- **Buscar por palabra**: `http://localhost:5000/risks?search=ataque` 🔍
- **Buscar por ID**: `http://localhost:5000/risks?id=1` 🆔
- **Filtrar por atributos**: `http://localhost:5000/risks?impact=4&probability=3` 🎯
- **Paginación**: `http://localhost:5000/risks?page=2&per_page=5` 📄

## 📌 Notas
- El frontend en React está en desarrollo y se conectará a estos endpoints. 🚀
- Revisa `ARCHITECTURE.md` para más detalles del diseño. 📖