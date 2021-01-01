import os
from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import json

from auth import requires_auth
from models import setup_db, Country, User

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
setup_db(app)
CORS(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/countries')
@requires_auth('get:countries')
def get_countries(payload):
    """get a list of all countries from the database"""
    try:
        countries = Country.query.all()

        if not countries:
            abort(404)

        return jsonify({
            'countries': [country.short() for country in countries]
        })
    except:
        abort(422)


@app.route('/countries/<int:country_id>')
@requires_auth('get:countries')
def get_country(payload, country_id):
    """get a country by id"""
    try:
        country = Country.query.filter(Country.id == country_id).first()

        if not country:
            abort(404)

        return jsonify({
            'country': country.long()
        })
    except:
        abort(422)


@app.route('/countries/<int:country_id>/destinations')
@requires_auth('get:destinations')
def get_destinations(payload, country_id):
    """get the list of all the "green" destinations to which you can go on vacation. If a destination is considered "green" by your country
    and also your country is considered green by the destination country, then you can safely travel to this destination"""
    try:
        country = Country.query.filter(Country.id == country_id).first()
        if not country:
            abort(404)
        data = []
        for dest in country.destinations:
            if country in Country.query.filter(Country.id == dest.id).first().destinations:
                data.append(dest)

        return jsonify({
            'destinations': [item.short() for item in data]
        })
    except:
        abort(422)


@app.route('/countries/<int:country_id>/add_destination', methods=['PATCH'])
@requires_auth('post:destination')
def add_destination(payload, country_id):
    """add a "green" country (destination) to a given country "green countries" list"""
    try:
        country = Country.query.filter(Country.id == country_id).first()
        body = request.get_json()
        destination_id = body.get('destinationId')
        destination = Country.query.filter(Country.id == destination_id).first()

        if not country or destination.id == country_id:
            abort(405)

        if destination not in country.destinations:
            country.destinations.append(destination)
        country.update()

        return jsonify({
            'destinations': [destination.short() for destination in country.destinations],
        })
    except:
        abort(422)


@app.route('/countries/<int:country_id>/delete_destination', methods=['DELETE'])
@requires_auth('delete:destination')
def delete_destination(payload, country_id):
    """delete a "green country (destination) from the country's destinations list"""
    try:
        country = Country.query.filter(Country.id == country_id).first()
        body = request.get_json()
        destination_id = body.get('destinationId')
        destination = Country.query.filter(Country.id == destination_id).first()
        if not country or not destination:
            abort(404)
        country.destinations.remove(destination)
        country.update()

        return jsonify({
            'destinations': [destination.short() for destination in country.destinations],
        })
    except:
        abort(422)


@app.route('/users/<string:user_id>/role')
@requires_auth('get:user_role')  # todo ?
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
    """adds a user to the database with a user country"""
    try:
        body = request.get_json()
        user_id = body.get('userId')
        name = body.get('name')
        email = body.get('email')
        country_id = body.get('countryId')
        if country_id == '':
            abort(422)
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
    except:
        abort(422)


@app.route('/users/<string:user_id>')
@requires_auth('get:user')
def get_country_for_user(payload, user_id):
    """gets a user from the database by a user id"""
    try:
        user = User.query.filter(User.user_id == user_id).first()
        if user is not None:
            return jsonify({
                'country_id': user.country_id
            })
        else:
            return jsonify({
                'country_id': ''
            })
    except:
        abort(422)


@app.errorhandler(404)
def not_found(error):
    return jsonify({
      "success": False,
      "error": 404,
      "message": "resource not found"
    }), 404


@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
      "success": False,
      "error": 422,
      "message": "unprocessable"
    }), 422


@app.errorhandler(405)
def not_allowed(error):
    return jsonify({
      "success": False,
      "error": 405,
      "message": "method not allowed"
    }), 405