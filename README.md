# Full Stack Website for Covid Travel Information 

## Project Motivation

During COVID times it is very hard to travel when you don't know where you can travel to. Even if you wish to travel to a "green" country, that country may not consider your country "green" and therefore not allow you to enter its borders. 

Beacuse of the fact that things are changing so fast and because this is the first time the world is facing such heavy travel restrictions, it is hard to easily find reliable information.

That's why I built this website, to allow users to easily check where they can travel, and countries to update their "green" countries list based on the changing situation, telling users who can enter thei borders.

A new user on the website can choose the country from where he would like to travel. This preference will be saved on the website and the user can change it later. After Choosing a country the user will be presented with a list of all of the countries to which he can travel - 

the countries that are considred "green" by his country, and therefore safe to travel to, and which consider his country "green" and by that allowing him to enter.

Traveling in COVID times has never been easier! :)


## About the Stack

* **SQLAlchemy ORM** to be our ORM library of choice
* **PostgreSQL** as our database of choice
* **Python3 and Flask** as our server language and server framework
* **React.js** for our website's frontend


## Project Structure

### Backend

The root directory contains a Flask and SQLAlchemy server. Endpoints have been defined in app.py, models for database and SQLAlchemy setup can be found in models.py. 

### Frontend
The `./frontend` directory contains a complete React frontend to consume the data from the Flask server.

Base URL: The app is hosted at [https://travel-covid.herokuapp.com](https://travel-covid.herokuapp.com).
* Authentication: This version of the application does not require authentication or API keys.

## Development Setup
To start and run the app please do the following:


#### Backend

- Please make sure that you installed all above-mentioned dependencies
- Cd into the root folder and run:
  ```
  $ pip install -r requirements.txt
  ```
- Run the development server:
  ```
  $ export FLASK_APP=app.py
  $ export FLASK_ENV=development # enables debug mode
  $ flask run
  ```
- Test your endpoints and/or curl via [http://127.0.0.1:5000/](http://127.0.0.1:5000/), which is set as a proxy in the fronted configuration.


#### Frontend

- Again, make sure that you have all the dependencies installed ([Node.js](https://nodejs.org/en/download/))
- Cd into frontend folder with your command line tool of choice
- Run npm install and npm run subsequently
- Run the development server:
  ```
  $ export FLASK_APP=app
  $ export FLASK_ENV=development # enables debug mode
  $ python3 app.py
  ```
- Navigate to Home page [http://localhost:3000](http://localhost:3000)


## API Endpoints

### GET '/countries'
#### General:
- Returns a list of countries
- Sample: curl http://127.0.0.1:5000/countries

```json
{
    "countries": [
        {"id":1, "name":"Andorra","alias":"AD", "destinations":[{"id":15, "name":"Aruba","alias":"AW"}, {"id":14, "name":"Australia","alias":"AU"}]},
        {"id":2, "name":"United Arab Emirates","alias":"AE", "destinations":[]},
        ...
    ],
}
```

### GET '/countries/{id}'
#### General:
- Returns a json containing a descruiption of the specified country
- Sample: curl http://127.0.0.1:5000/countries/1

```json
{
    "countries": [
        {"id":1, "name":"Andorra","alias":"AD", "destinations":[{"id":15, "name":"Aruba","alias":"AW"}, {"id":14, "name":"Australia","alias":"AU"}]},
    ],
}
```

### GET '/countries/{id}/destinations'
#### General:
- Returns a list of all destinations of a country (countries which are considered "green" by the specified country).
- Results are paginated
- Sample: curl http://127.0.0.1:5000/countries/1/destinations
```json
{
    "destinations": [
        {"id":15, "name":"Aruba","alias":"AW"},
        {"id":14, "name":"Australia","alias":"AU"}
    ],
}
```
### DELETE '/countries/{id}/delete_destination'
#### General:
- Returns a new list of all destinations of the specified country minus the deleted one.
- Sample: curl -X DELETE http://127.0.0.1:5000/countries/1/delete_destination -H "Content-Type: application/json" -d '{"destinationId": 2}'

### PATCH '/countries/{id}/add_destination''
### General:
- Returns a filtered list of all destinations of the specified country plus the added one.
- Sample: curl -X PATCH http://localhost:5000/countries/1/add_destination -H "Content-Type: application/json" -d '{"destinationId": 2}'

### POST '/users/add'
### General:
- Returns a description of the new user with the country preference (a country which the user chose to travel from).
- Sample: curl -X POST http://127.0.0.1:5000/users/add -H "Content-Type: application/json" -d '{"userId": "JohnDoe123", "name": "John Doe","email":     "JohnDoe@gmail.com","country_id": 4}
```json
{
  "new_user": [
    {
      "id": "JohnDoe123",
      "name": "John Doe",
      "email": "JohnDoe@gmail.com",
      "country_id": 4,
    },
  ],
}
```


### Error Handling
Errors are returned as JSON objects in the following format:

```json
{
  "success": False,
  "error": 404,
  "message": "bad request"
}
```

The API will return four error types when requests fail:

* 400: Bad Request
* 404: Resource Not Found
* 405: Method Not Allowed
* 422: Not Processable


