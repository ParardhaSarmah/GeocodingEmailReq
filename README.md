Uses MySQL as the database.
A .env file is needed with the following variables.
RADAR_API_KEY
DB_HOST,
DB_USER,
DB_PORT,
DB_PASSWORD,
DB_NAME,

The RADAR_API_KEY to be obtained from radar.com
MySQL DB has 2 tables : rates(has transport cost details) and city_flags(has the city flags)
Returns true or false based on the required conditions (distance,price,destination city flag)
