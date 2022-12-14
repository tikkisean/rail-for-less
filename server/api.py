from flask import Flask
from flask import request
# uncomment the line below when developing on Windows
# from flask_cors import CORS
import sqlite3
import pickle

app = Flask(__name__)
# uncomment the line below when developing on Windows
# CORS(app)


@app.route("/api/stations")
def stations():
    conn = sqlite3.connect(
        "./stations.db")
    c = conn.cursor()
    c.execute("SELECT * from stations")
    rows = c.fetchall()
    conn.close()
    stations = dict()
    for row in rows:
        name, code, routes = row[0], row[1], row[2].split(",")[:-1]
        stations[name] = dict()
        stations[name]["code"] = code
        stations[name]["routes"] = routes
    return {"stations": stations}


@app.route("/api/status")
def status():
    with open("./status.pk", "rb") as pk:
        return {"status": pickle.load(pk)}


app.run()
