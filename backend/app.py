import os
from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import json

from auth import requires_auth #,AuthError
import re
# def create_app(test_config=None):
# create and configure the app
from models import setup_db, Country


app = Flask(__name__)
setup_db(app)
CORS(app)

AD = Country(id=1, name="Andorra", alias="AD")
AE = Country(id=2, name="United Arab Emirates", alias="AE")
AF = Country(id=3, name="Afghanistan", alias="AF")
AG = Country(id=4, name="Antigua and Barbuda", alias="AG")
AI = Country(id=5, name="Anguilla", alias="AI")
AL = Country(id=6, name="Albania", alias="AL")
AM = Country(id=7, name="Armenia", alias="AM")
AN = Country(id=8, name="Netherlands Antilles", alias="AN")
AO = Country(id=9, name="Angola", alias="AO")
AQ = Country(id=10, name="Antarctica", alias="AQ")
AR = Country(id=11, name="Argentina", alias="AR")
AS = Country(id=12, name="American Samoa", alias="AS")
AT = Country(id=13, name="Austria", alias="AT")
AU = Country(id=14, name="Australia", alias="AU")
AW = Country(id=15, name="Aruba", alias="AW")
AX = Country(id=16, name="Åland Islands", alias="AX")

# France = Country(id=2, name="France", avatarURL='/public/013-italy.png')
# Austria = Country(id=3, name="Austria", avatarURL='/public/013-italy.png')
# US = Country(id=4, name="US", avatarURL='/public/013-italy.png')
# Japan = Country(id=5, name="Japan", avatarURL='/public/013-italy.png')

# Italy.insert()
# France.insert()
# Austria.insert()
# US.insert()
# Japan.insert()

AD.insert()
AE.insert()
AF.insert()
AG.insert()
AI.insert()
AL.insert()
AM.insert()
AN.insert()
AO.insert()
AQ.insert()
AR.insert()
AS.insert()
AT.insert()
AU.insert()
AW.insert()
AX.insert()

#
# Italy.add_destination(France)
# Italy.add_destination(Austria)
# Austria.add_destination(Italy)
# Austria.add_destination(France)
# France.add_destination(Italy)
# France.add_destination(Austria)
# US.add_destination(France)

AD.add_destination(AF)
AD.add_destination(AM)

AM.add_destination(AQ)


AN.add_destination(AU)

AU.add_destination(AM)
AU.add_destination(AS)
AU.add_destination(AQ)
AU.add_destination(AR)
AU.add_destination(AO)
AU.add_destination(AI)
AU.add_destination(AT)

AT.add_destination(AU)
AT.add_destination(AW)

AI.add_destination(AU)

AR.add_destination(AU)

AF.add_destination(AD)

#-------------------------------------------- Fake Data --------------------------------


#----------------------------------------------------------------------------------


@app.route('/countries')
@requires_auth('get:countries')
def get_countries(payload):
    countries = Country.query.all()
    print([country.short() for country in countries])
    return jsonify({
        'countries': [country.short() for country in countries]
    })


# @app.route('/create_destination/<int:country_id>', methods=['PATCH'])
# def create_destination(country_id):
#
#     country = Country.query.filter(Country.id == country_id).first()
#     body = request.get_json()
#
#     destination = body.get('destination')
#     # recipe = json.dumps(body.get('recipe'))
#     country.destinations.append(destination)
#     country.update()

    # return jsonify({
    #     # 'success': True,
    #     # 'drinks': [country.long()],
    # })


@app.route('/countries/<int:country_id>')
def get_country(country_id):
    country = Country.query.filter(Country.id == country_id).first()
    for destination in country.destinations:
        print("destination print:" + str(destination))
    return jsonify({
        'country': country.long()
    })

#
# @app.route('/countries/<int:country_id>')
# def get_country(country_id):
#     country = Country.filter(Country.id == country_id).first()
#     return country.short()


@app.route('/destinations/<int:country_id>')
def get_destinations(country_id):
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


# @app.route('/countries', methods=['POST'])
# def create_country(payload):
#     body = request.get_json()
#     name = body.get('name')
#
#     country = Country(name=name)
#     country.insert()
#
#     return jsonify({
#           'success': True,
#           'country': [country.long()],
#     })


# def get_user_id(payload):
#     # if not payload: error
#     # if | not in payload error
#     # if sub not in payload
#     # user_id = re.match(".*|(.*)", payload["sub"]).group(1)
#     user_id = payload["sub"]
#     return user_id


#

#   return app
#
# APP = create_app()
#
# if __name__ == '__main__':
#     APP.run(debug=True)
#     # host='0.0.0.0', port=8080,
