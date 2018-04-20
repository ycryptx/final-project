//schema 1
var mysql = require('mysql');

const facilities = {facn: String,
                    frsid : Number,
                    fname : String,
                    address: String,
                     city: String,
                      state: String,
                       zip: Number,
                       fips: Number,
                       county: String,
                      lat: Number,
                       lon: Number
                     }

// schma 2

const releases = {facn: String,
                    frsid : Number,
                    chemical : String,
                    chemicalid: String,
                     year: String,
                      amount: String
                     }
//mySQL middleware
//CHANGE THIS TO HOSTING ADDRESS
var connection = mysql.createConnection({
 host     : process.env.SQL_HOST,
 user     : process.env.SQL_USER,
 password : process.env.SQL_PASSWORD,
 database : process.env.SQL_DATABASE
});

connection.connect(function(err) {
 if (err) {
   console.error('error connecting: ' + err.stack);
   return;
 }
 const arr = [1, 2, 3];
 arr.foo = 4;
 console.log(arr.foo);
 console.log('connected to MYSQL server as id ' + connection.threadId);
});

module.exports.connection = connection;
module.exports.releases = releases;
module.exports.facilities = facilities;
