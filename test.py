import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from app import create_app
from models import setup_db, Country, User


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "test_db"
        self.database_path = "postgres://{}/{}".format('localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

        # self.new_question = {
        #     'id': 11,
        #     'question': "What boxer's original name is Cassius Clay?",
        #     'answer': 'Muhammad Ali',
        #     'difficulty:': 1,
        #     'category': 5
        # }

    def tearDown(self):
        """Executed after reach test"""
        pass

    """
    TODO
    Write at least one test for each test for successful operation and for expected errors.
    """
    def test_get_countries(self):
        res = self.client().get('/countries')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['countries'])
        self.assertTrue(len(data['countries']))

    # check when data base is empty, before running psql test_db < capstone.psql
    def test_404_if_no_countries_exist(self):
        res = self.client().get('/countries')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found')

    def test_get_country_by_id(self):
        res = self.client().get('/countries/1')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['country'])
        self.assertTrue(len(data['countries']))

    def test_404_if_country_doesnt_exist(self):
        res = self.client().get('/countries/1000')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found')

    def test_get_destinations_for_country(self):
        res = self.client().get('/countries/1/destinations')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['destinations'])

    def test_404_if_country_does_not_exist(self):
        res = self.client().get('/countries/1000/destinations')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found')

    def test_add_destination(self):
        res = self.client().post('/countries/1/add_destination', json={'destinationId': 2})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['destinations'])
        self.assertTrue(len(data['destinations']))

    def test_405_if_adding_destination_not_allowed(self):
        res = self.client().post('/countries/1000', json={'destinationId': 2})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 405)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'method not allowed')

    def test_delete_destination(self):
        res = self.client().delete('/countries/1', json={'destinationId': 2})
        data = json.loads(res.data)

        destination = Country.query.filter(Country.id == 2).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['destinations'])
        self.assertTrue(destination not in data['destinations'])

    def test_404_if_country_does_not_exist(self):
        res = self.client().delete('/countries/1000', json={'destinationId': 2})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found')


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()