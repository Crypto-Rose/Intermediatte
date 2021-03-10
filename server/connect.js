const mysql = require('mysql')

const config = {
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'alaska'
}
const db = mysql.createPool(config)

module.exports = db;

