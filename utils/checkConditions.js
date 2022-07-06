const pool = require("./../mysql");
const mysql = require("mysql2/promise");
async function checkConditions(distance, price, to) {
  distance /= 1000;
  //   console.log(distance, price, to);
  let query1 = "SELECT Flag FROM city_flags WHERE City=?";
  query1 = mysql.format(query1, [to.city]);
  //   console.log(query1);
  let rows = await pool.query(query1);
  //   console.log(rows[0][0].Flag);
  //When these conditions are statisfied, no email is required
  console.log(!(price < 50 && distance > 30 && rows[0][0].Flag));
  return !(price < 50 && distance > 30 && rows[0][0].Flag);
}
module.exports = checkConditions;
