import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
from models import db_drop_and_create_all, setup_db, Project, Employee
from auth import requires_auth #,AuthError
import re
# def create_app(test_config=None):
  # create and configure the app

app = Flask(__name__)
setup_db(app)
CORS(app)


def get_user_id(payload):
    # if not payload: error
    # if | not in payload error
    # if sub not in payload
    # user_id = re.match(".*|(.*)", payload["sub"]).group(1)
    user_id = payload["sub"]
    return user_id


@app.after_request #TODO ?
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    return response
#
#
# @app.route('/')
# def index():
#     return {'username': 'Hello World!'}

#
# @app.route('/get_users')
# @requires_auth('get:users')
# def get_users(payload):
#     return {'username': 'Hello Guy!'}

#
# @app.route('/user_movies', methods=['POST'])
# def create_user(payload):
#     body = request.get_json()
#     username = body.get('username')
#
#     user = User(name=username)
#     user.insert()
#
#     return {'username': username}


@app.route('/projects')
@requires_auth('get:projects')
def get_projects(payload):
    projects = Project.query.all()
    print("projects:" + str([project.short() for project in projects]))
    return {
        'projects': [project.short() for project in projects]
    }


@app.route('/tasks')
@requires_auth('get:projects')
def get_employee_projects(payload):
    employee_id = get_user_id(payload)
    projects = Employee.projects.filter(Project.employee_id == employee_id)
    return {
        'projects': [project.short() for project in projects]
    }


@app.route('/create_project', methods=['POST'])
@requires_auth('post:project')
def create_project():
    body = request.get_json()
    project_name = body.get('projectName')
    employee = body.get('employee')

    print("name: " + project_name + "employee: " + employee)

    try:
        project = Project(name=project_name, employee=employee)
        project.insert()

        return jsonify({
            # 'success': True,
            # # 'drinks': [drink.long()],
        })
    except:
        abort(422)

#   return app
#
# APP = create_app()
#
# if __name__ == '__main__':
#     APP.run(debug=True)
#     # host='0.0.0.0', port=8080,