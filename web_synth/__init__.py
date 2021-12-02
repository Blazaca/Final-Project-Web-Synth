from flask import Flask
from .site.routes import site
from .api.routes import api
from config import Config
from .models import db, ma
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(site)
app.register_blueprint(api)

db.init_app(app)

migrate = Migrate(app, db)

CORS(app)

ma.init_app(app)
