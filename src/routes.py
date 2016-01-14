from flask import Flask
from navigation import Route
 
app = Flask(__name__)      
 
@app.route('/')
def home():
    return Route.call("HomeController@index")
    #return render_template('home.html')
 
if __name__ == '__main__':
    app.secret_key = '>\xd3X*\x95\xcc\xc1\xdfb\x847\xeb\x7f^\x83\xe9\xdf\x940ga\x94\x0cb'
    app.run(host="0.0.0.0", debug=True)
