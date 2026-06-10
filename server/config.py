import os

from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from models.dbconfig import db
from flask_cors import CORS
# from flask_session import Session


app = Flask(__name__)
# Set SECRET_KEY in the environment for any real deployment; the fallback
# is for local development only.
app.secret_key = os.environ.get("SECRET_KEY", "dev-only-insecure-key")
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///destinations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
app.config['SESSION_COOKIE_HTTPONLY'] = True
# Lax blocks the session cookie on cross-site POSTs, mitigating CSRF for
# this cookie-authenticated API.
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
migrate=Migrate(app,db)
db.init_app(app)
# The React dev server proxies same-origin requests, so CORS is only needed
# if a frontend is served from another origin; keep it restricted.
cors = CORS(
    app,
    origins=os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(","),
    supports_credentials=True,
)
api=Api(app)
bcrypt=Bcrypt(app)
limiter = Limiter(get_remote_address, app=app, storage_uri="memory://")
