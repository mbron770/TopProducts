# phase_four_project

## Setup

To download the dependencies for the frontend and backend, run:

```console
pipenv install
pipenv shell
npm install
```
note: You may have to download the dependencies individually yourself, in such a case consult the package.json file in Frontend and pipfile in backend to view the list of libraries used in the project

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python backend/app.py
```

You can run your React app on [`localhost:4000`](http://localhost:3000) by
running:

```sh
npm run dev
```

use these commands to stand up and populate the database

```console
export FLASK_APP=backend/app.py
flask db init
flask db upgrade head
flask db revision --autogenerate -m 'message'
flask db upgrade head
python backend/seed.py
```
