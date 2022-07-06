Uses local MySQL as the database. Radar.com for Geocoding


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


GET API endpoint : http://127.0.0.1:3000/api/v1/emailreq

Request body requires : 

{
    "from":"CityName",
    "to":"CityName",
    "Vehicle_type":"Luxury"
}

Vehicle_type can be any of the ones defined in the schema.
