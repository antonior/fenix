# create and activate a virtual environment for this project
virtualenv venv
venv/Scripts/activate

# install the required packages for this project
pip install -r requirements.txt

# after installing any new dependency run this command to update requirements.txt
pip freeze > requirements.txt