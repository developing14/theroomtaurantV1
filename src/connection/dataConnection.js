const mysql = require('mysql');

const dataConfiguration = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456@MySQL',
  database: 'theroomtaurant',
  connectionLimit: 100,
});

module.exports = dataConfiguration;
