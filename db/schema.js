//schema 1
const mysql = require('mysql2');

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


var configs = {
  host     : process.env.SQL_HOST,
  user     : process.env.SQL_USER,
  password : process.env.SQL_PASSWORD,
  database : process.env.SQL_DATABASE
 };

// var connection =  mysql.createConnection({
//    host     : process.env.SQL_HOST,
//    user     : process.env.SQL_USER,
//    password : process.env.SQL_PASSWORD,
//    database : process.env.SQL_DATABASE
//   });
//
// function handleDisconnect() {
//    connection = mysql.createConnection({
//    host     : process.env.SQL_HOST,
//    user     : process.env.SQL_USER,
//    password : process.env.SQL_PASSWORD,
//    database : process.env.SQL_DATABASE
//   }); // Recreate the connection, since
//                                                   // the old one cannot be reused.
//
//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 1); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   connection.on('error', function(err) {
//     console.log('db error', err);
//      // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//   });
// }
//
// handleDisconnect();


// module.exports.connection = connection;
module.exports.releases = releases;
module.exports.facilities = facilities;
// module.exports.handleDisconnect = handleDisconnect;
module.exports.configs = configs;
module.exports.mysql = mysql;
