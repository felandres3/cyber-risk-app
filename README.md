# 🛡️ Cyber Risks App

## 📝 Introducción
**Cyber Risks App** es una herramienta para gestionar riesgos de ciberseguridad en una empresa. Permite **buscar, filtrar y ordenar** riesgos a través de un **frontend interactivo en React**, conectado a un **backend en Flask** con **PostgreSQL** como base de datos.

Incluye **tests automatizados** tanto para el **backend** (`pytest`) como para el **frontend** (`Jest` y `React Testing Library`).

---

## 📋 Requisitos

Asegúrate de tener instalados los siguientes requisitos:

- 🐍 **Python** 3.8 o superior  
- 🌐 **Node.js** 18 o superior  
- 📦 **npm** 10 o superior  
- 🗄️ **PostgreSQL** 12 o superior  
- ⚛️ **React** 18

---

## 🚀 Configuración

### 🔹 Backend

1. Ve a la carpeta del backend:
   ```sh
   cd backend
   ```

2. Crea y activa un entorno virtual:

   - **Windows**:
     ```sh
     python -m venv venv
     venv\Scripts\activate
     ```
   - **Linux/Mac**:
     ```sh
     python -m venv venv
     source venv/bin/activate
     ```

3. Copia `.env.example` a `.env` y ajusta las variables:
   ```sh
   cp .env.example .env
   ```

4. Instala las dependencias:
   ```sh
   pip install -r requirements.txt
   ```

5. Crea el archivo `.env` en `backend/` con:
   ```sh
   DB_NAME=cyber_risks
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   DB_PORT=5432
   ```

6. Configura la base de datos:
   ```sh
   psql -U usuario -d base_de_datos -f backend/database/init.sql
   ```

7. Pobla la base de datos con datos de prueba:
   ```sh
   python populate_db.py
   ```

8. Corre el servidor:
   ```sh
   flask run
   ```

9. Ejecuta los tests del backend:
   ```sh
   pytest --benchmark-enable
   ```

---

### 🔹 Frontend

1. Ve a la carpeta del frontend:
   ```sh
   cd frontend
   ```

2. Copia `.env.example` a `.env` y ajusta las variables:
   ```sh
   cp .env.example .env
   ```

3. Instala las dependencias:
   ```sh
   npm install
   ```

4. Inicia la aplicación:
   ```sh
   npm start
   ```

5. Ejecuta los tests del frontend:
   ```sh
   npm test
   ```

---

## 🌟 Ejemplos de Uso

| Acción | URL |
|--------|----|
| **Lista todos los riesgos** | `http://localhost:5000/risks` 📋 |
| **Buscar por palabra** | `http://localhost:5000/risks?search=ataque` 🔍 |
| **Buscar por ID** | `http://localhost:5000/risks?id=1` 🆔 |
| **Filtrar por atributos** | `http://localhost:5000/risks?impact=4&probability=3` 🎯 |
| **Paginación** | `http://localhost:5000/risks?page=2&per_page=5` 📄 |

---

## 📌 Notas

- El **frontend en React** se conecta a los endpoints mencionados.
- Revisa `ARCHITECTURE.md` para más detalles del diseño y estructura del proyecto.
