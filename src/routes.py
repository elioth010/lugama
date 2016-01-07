from flask import Flask
from navigation import Route
 
app = Flask(__name__)      
 
@app.route('/')
def home():
    return Route.call(Route, "HomeController@index")
    #return render_template('home.html')
 
if __name__ == '__main__':
    app.run(debug=True)  
