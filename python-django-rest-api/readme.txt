# create and activate a virtual environment for this project
virtualenv venv
venv/Scripts/activate

# install the required packages for this project
pip install -r requirements.txt

# run to create sqlite database
python manage.py migrate

# create an admin user
python manage.py createsuperuser

# run the following commnad to start Django server
python manage.py runserver

# after installing any new dependency run this command to update requirements.txt
pip freeze > requirements.txt

# run after changing any models
python manage.py makemigrations
python manage.py migrate

# use this command to see all commands avaliable from django
python manage.py help

