Uses MySQL as the database.
A .env file is needed with the following variables.
RADAR_API_KEY
DB_HOST=localhost
DB_USER
DB_PORT=3306
DB_PASSWORD
DB_NAME

MySQL DB has 2 tables : rates(has transport cost details) and city_flags(has the city flags)
Returns true or false based on the required conditions (distance,price,destination city flag)
