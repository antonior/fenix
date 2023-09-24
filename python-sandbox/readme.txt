# create an .env file with a SECRET_KEY entry
python manage.py shell
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
copy/paste the generated secret key into the SECRET_KEY entry of the .env file

# run to recreate a database
python manage.py migrate

# run to create a new superuser to login into admin page
python .\manage.py createsuperuser

# run to start the server
python .\manage.py runserver

# (optional) run to list all commands
python .\manage.py help

# server url
http://127.0.0.1:8000/

# server admin page
http://127.0.0.1:8000/admin/

# after any models change run the following commands
python manage.py makemigrations
python manage.py migrate