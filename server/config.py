from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Resource,Api
from flask import Flask
from models.dbconfig import db


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///destinations.db'
app.config['SQLALCHEMT_TRACK_MODIFICATIONS']= False
migrate=Migrate(app,db)
api=Api(app)
bcrypt=Bcrypt(app)
