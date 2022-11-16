# Parking App

> Create an App to keep track of a parking.

## Built With

- Django
- Django Rest Framework
- Json Web Token
- React.js

## Getting Started

To get a local copy up and running follow these simple example steps.

### Dependencies
Python 3
Django
React.js
Node

### Usage Backend
```shell
python3 -m venv .env
.env\Scripts\activate
pip install -r requirements.txt
pip freeze
```

```python
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## SuperUser
```shell
python manage.py createsuperuser
```

### Usage Frontend
```shell
npm i
npm start
```