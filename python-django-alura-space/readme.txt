#create a virtual environment for this project and activate it
virtualenv venv
venv/Scripts/activate

# install all dependencies of the project
pip install -r requirements.txt

# create an .env file with a SECRET_KEY entry
python manage.py shell
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
copy/paste the generated secret key into the SECRET_KEY entry of the .env file

# create an AWS S3 bucket and create an user with permission to read/update/delete files in the bucket. Also create an access key for the user.
# add the following entries into the .env file to configure AWS S3 storage, wich will keep all static files and uploaded photos
AWS_STORAGE_BUCKET_NAME = <the name of the S3 bucket you created>
AWS_ACCESS_KEY_ID = <the access key of the S3 user>
AWS_SECRET_ACCESS_KEY = <the secret access key of the S3 user>

# run this command to collect all static files and upload them to S3
python manage.py collectstatic

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

# after any models change, run the following commands
python manage.py makemigrations
python manage.py migrate

# after installing any new dependency run this command to update requirements.txt
pip freeze > requirements.txt