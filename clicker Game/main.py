import flask
from flask import request, render_template,make_response, session,Flask

app = Flask(__name__)
app.secret_key = "jiwakmdoihawudjauysdg7uaydhasugdhvahsu9digjashduijhbauhwijsdh8dug"
@app.route("/",methods = ["GET"])
def index():
    return render_template("index.html")
    
@app.route("/game",methods = ["GET","POST"])
def game():
    if "score" not in session:
        session["score"] = 0
    if "highscore" not in session:
        session["highscore"] = 0
    if request.method == "POST":
        form = request.form
        response = make_response(render_template("game.html", score = session["score"], highscore = session["highscore"]))
        
        response.set_cookie("bg",form["bg"])
        response.set_cookie("inner",form["inner"])
        response.set_cookie("image",form["image"])
        
        return response
        
    return render_template("game.html")
    
@app.route("/score", methods = ["POST"])
def scoreChange():
    session["score"] += 1
    return str(session["score"])
@app.route("/settings")
def settings():
    return render_template("settings.html")
@app.route("/end",methods = ["POST"])
def scoreEnd():
    session["score"] = 0
    return str(session["score"])
@app.route("/high",methods = ["POST"])
def highScore():
    
    if session["score"] > session["highscore"]:
        session["highscore"] = session["score"]
    return str(session["highscore"])
app.run(host = "localhost", port = 5555)

