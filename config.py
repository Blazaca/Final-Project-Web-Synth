import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config():
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEPLOY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False