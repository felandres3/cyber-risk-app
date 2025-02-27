from flask import Flask
import psycopg2
from dotenv import load_dotenv
import os

app = Flask(__name__)

DB_CONFIG = {
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT")
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

@app.route("/")
def hello():
    return "backend is running"


@app.route("/risks", methods=["GET"])
def get_risks():
    return "risks"