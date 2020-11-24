import os
from flask import Flask, request, abort, jsonify, send_from_directory, url_for
from flask_cors import CORS
import json

from auth import requires_auth  # ,AuthError
import re
# def create_app(test_config=None):
# create and configure the app
from models import setup_db, Country, User

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
# app = Flask(__name__, static_folder='./build', static_url_path='/')
setup_db(app)
CORS(app)

# AD = Country(id=1, name="Andorra", alias="AD")
# AD.insert()

# ----------------------------------------------------------------------------------
# todo: think about scenario when user changes their location. they're already in the table and we do a POST, which will fail.
#


@app.route('/')
def index():
    return app.send_static_file('index.html')

#
# @app.route('/favicon.ico')
# def favicon():
#     return app.send_static_file('favicon.ico')

#
# @app.route('/favicon.ico')
# def favicon():
#     # app.send_static_file('favicon.ico')
#     # return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')
#     return app.send_static_file('favicon.ico')


@app.route('/users/<string:user_id>/role')
@requires_auth('get:user_role') #todo ?
def get_user_role(payload, user_id):
    if payload["http://demozero.net/roles"]:
       role = payload["http://demozero.net/roles"][0]

    if role == 'admin':
        return jsonify({
            'role': role
        })
    else:
        return jsonify({
            'role': 'visitor'
        })


@app.route('/users/add', methods=['POST'])
@requires_auth('post:user_preference')
def add_user(payload):
    try:
        body = request.get_json()
        user_id = body.get('userId')
        name = body.get('name')  # TODO remove email and name they are stored on Auth0? (If user changes their email)
        email = body.get('email')
        country_id = body.get('countryId')
        if country_id == '':
            raise Exception("the user country is empty! :OO")
        user = User.query.filter(User.user_id == user_id).first()
        if user is None:
            user = User(user_id, name, email, country_id)
            user.insert()
        else:
            user.country_id = country_id
            user.update()

        return jsonify({
            'new_user': user.short(),
        })
    except Exception as e:
        print(e)
        abort(422)


@app.route('/countries')
@requires_auth('get:countries')
def get_countries(payload):
    countries = Country.query.all()
    return jsonify({
        'countries': [country.short() for country in countries]
    })


@app.route('/users/<string:user_id>')
@requires_auth('get:user')
def get_country_for_user(payload, user_id):
    user = User.query.filter(User.user_id == user_id).first()
    if user is not None:
        return jsonify({
            'country_id': user.country_id
        })
    else:
        return jsonify({
            'country_id': ''  # todo empty ?
        })


@app.route('/countries/<int:country_id>')
@requires_auth('get:countries')
def get_country(payload, country_id):
    country = Country.query.filter(Country.id == country_id).first()
    return jsonify({
        'country': country.long()
    })


@app.route('/countries/<int:country_id>/destinations')
@requires_auth('get:destinations')
def get_destinations(payload, country_id):
    country = Country.query.filter(Country.id == country_id).first()
    print("getting destinations for country: " + country.name)
    data = []
    print(country.destinations)
    for dest in country.destinations:
        if country in Country.query.filter(Country.id == dest.id).first().destinations:
            data.append(dest)

    print("these are the destinations for " + country.name + ": ")
    for item in data:
        print(item.short())
    return jsonify({
        'destinations': [item.short() for item in data]
    })


@app.route('/countries/<int:country_id>/add_destination', methods=['PATCH'])
@requires_auth('post:destination')
def add_destination(payload, country_id):
    try:
        country = Country.query.filter(Country.id == country_id).first()
        body = request.get_json()
        destination_id = body.get('destinationId')
        destination = Country.query.filter(Country.id == destination_id).first()
        if destination not in country.destinations and destination.id != country_id:
            country.destinations.append(destination)
        country.update()

        return jsonify({
            'destinations': [destination.short() for destination in country.destinations],
        })
    except Exception as e:
        print(e)


@app.route('/countries/<int:country_id>/delete_destination', methods=['DELETE'])
@requires_auth('delete:destination')
def delete_destination(payload, country_id):
    try:
        country = Country.query.filter(Country.id == country_id).first()
        body = request.get_json()
        destination_id = body.get('destinationId')
        print(destination_id)
        destination = Country.query.filter(Country.id == destination_id).first()
        country.destinations.remove(destination)
        country.update()

        return jsonify({
            'destinations': [destination.short() for destination in country.destinations],
        })
    except Exception as e:
        print(e)


# todo ?
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')