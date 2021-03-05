const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "root",
    database : "movies",
    charset: "utf8"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL BDD!");
});

module.exports = db;