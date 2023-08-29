#Execute docker file
docker-compose up

#Get hostname to create root database on Postgres
docker-compose exec postgres sh
hostname -i

#Postgres admin portal
http://localhost:54321/browser/