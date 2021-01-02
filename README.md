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
### DELETE '/questions/{id}'
#### General:
- Returns a new list of paginated questions minus the deleted one, a success message, the id of the deleted item, and a total number of questions
- Sample: curl -X DELETE http://127.0.0.1:5000/questions/1

### POST '/questions'
### General:
- Returns a filtered list of questions based on search term, a success message, and the total number of questions.
- Results are paginated
- Sample: curl http://localhost:5000/questions -H "Content-Type: application/json" -d "{'search_term': 'title'}" -X POST
```json
{
  "current_category": null,
  "questions": [
    {
      "answer": "Maya Angelou",
      "category": 4,
      "difficulty": 2,
      "id": 5,
      "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?"
    },
    {
      "answer": "Edward Scissorhands",
      "category": 5,
      "difficulty": 3,
      "id": 6,
      "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"
    }
  ],
  "success": true,
  "total_questions": 2
}
```
### POST '/questions/add'
### General:
- Returns a filtered list of questions plus new question, a success message, the total number of questions, and the new question id.
- Results are paginated
- Sample: curl -X POST http://127.0.0.1:5000/questions/add -H "Content-Type: application/json" -d '{"question": "La Giaconda is better known as what?", "answer": "Mona Lisa", "difficulty": 3, "category": 2}'
```json
{
  "created": 195,
  "questions": [
    {
      "answer": "Tom Cruise",
      "category": 5,
      "difficulty": 4,
      "id": 4,
      "question": "What actor did author Anne Rice first denounce, then praise in the role of her beloved Lestat?"
    },
    {
      "answer": "Maya Angelou",
      "category": 4,
      "difficulty": 2,
      "id": 5,
      "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?"
    },
    {
      "answer": "Edward Scissorhands",
      "category": 5,
      "difficulty": 3,
      "id": 6,
      "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"
    },
    {
      "answer": "Muhammad Ali",
      "category": 4,
      "difficulty": 1,
      "id": 9,
      "question": "What boxer's original name is Cassius Clay?"
    },
    {
      "answer": "Uruguay",
      "category": 6,
      "difficulty": 4,
      "id": 11,
      "question": "Which country won the first ever soccer World Cup in 1930?"
    },
    {
      "answer": "George Washington Carver",
      "category": 4,
      "difficulty": 2,
      "id": 12,
      "question": "Who invented Peanut Butter?"
    },
    {
      "answer": "The Palace of Versailles",
      "category": 3,
      "difficulty": 3,
      "id": 14,
      "question": "In which royal palace would you find the Hall of Mirrors?"
    },
    {
      "answer": "Agra",
      "category": 3,
      "difficulty": 2,
      "id": 15,
      "question": "The Taj Mahal is located in which Indian city?"
    },
    {
      "answer": "Escher",
      "category": 2,
      "difficulty": 1,
      "id": 16,
      "question": "Which Dutch graphic artist\u2013initials M C was a creator of optical illusions?"
    },
    {
      "answer": "Mona Lisa",
      "category": 2,
      "difficulty": 3,
      "id": 17,
      "question": "La Giaconda is better known as what?"
    }
  ],
  "success": true,
  "total_questions": 17
}
```

    
### GET '/categories/{id}/questions'
### General:
- Returns a list of questions based on selected category, a success message, and the id of the category
- Results are paginated
- Sample: curl http://127.0.0.1:5000/categories/2/questions
```json
{
  "current_category": 3,
  "questions": [
    {
      "answer": "The Palace of Versailles",
      "category": 3,
      "difficulty": 3,
      "id": 14,
      "question": "In which royal palace would you find the Hall of Mirrors?"
    },
    {
      "answer": "Agra",
      "category": 3,
      "difficulty": 2,
      "id": 15,
      "question": "The Taj Mahal is located in which Indian city?"
    }
  ],
  "success": true
}
```
    
### POST '/play'
### General:
- Returns a random question from the selected category, a success message, and the id of the category
- Sample: curl -X POST http://localhost:5000/quizzes -H "Content-Type: application/json" -d '{ "previous_questions": [], "quiz_category": {"type": "Art", "id": 17 }}'
```json
{
  "category": 2,
  "question": {
    "answer": "Mona Lisa",
    "category": 2,
    "difficulty": 3,
    "id": 17,
    "question": "La Giaconda is better known as what?"
  },
  "success": true
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


