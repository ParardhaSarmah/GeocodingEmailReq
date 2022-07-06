const pool = require("./../mysql");
const mysql = require("mysql2/promise");
async function getPrice(from, to, distance, vehicle_type) {
  let query1 = "SELECT * FROM rates WHERE City=? AND Vehicle_Type=?";
  query1 = mysql.format(query1, [from.city, vehicle_type]);
  //   console.log(query1);
  let rows = await pool.query(query1);
  let price =
    Number(rows[0][0].Airport_Fees) +
    Number(rows[0][0].Per_KM * (distance / 1000)) +
    Number(rows[0][0].Base_amount);
  //   console.log(price);
  return price;
}
module.exports = getPrice;
