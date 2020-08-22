import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
from models import db_drop_and_create_all, setup_db, User
from auth import requires_auth #,AuthError

# def create_app(test_config=None):
  # create and configure the app

app = Flask(__name__)
setup_db(app)
CORS(app)


@app.route('/')
def index():
    return {'username': 'Hello World!'}


@app.route('/get_users')
def get_users():
    return {'username': 'Hello Guy!'}


@app.route('/create_user', methods=['POST'])
@requires_auth('post:users')
def create_user(payload):
    body = request.get_json()
    username = body.get('username')

    user = User(name=username)
    user.insert()

    return {'username': username}

#   return app
#
# APP = create_app()
#
# if __name__ == '__main__':
#     APP.run(debug=True)
#     # host='0.0.0.0', port=8080,