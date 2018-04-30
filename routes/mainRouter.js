var express = require('express');
var router = express.Router();
var mysql = require('../db/schema.js').mysql;
var configs = require('../db/schema.js').configs;
var handleServer = require('../db/schema.js').handleDisconnect;
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_KEY
});
var connection;
function handleDisconnect() {
   connection = mysql.createConnection(configs); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 1); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
     // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
  });
}

router.get('*', (req, res) => {
  console.log('home page is about to load!');
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


router.post('/search', (req, res) => {
  handleDisconnect();
  console.log('Form submitted');
  //read form data
	req.checkBody('address','Address is Required').notEmpty();
	const errors = req.validationErrors();

	if(errors) {
		console.log(errors);
    connection.close();
    res.status(400).json({error:'Address cannot be empty, try again :S'});
	} else {
		console.log('SUCCESS');
		console.log('Submitted: ' +req.body.address);
    // Geocode an address.
    googleMapsClient.geocode({
          address: req.body.address
        }, function(err, response) {
          if (!err) {
            // res.status(200).json({geo:response.json.results[0]['geometry']['location']});
            console.log(response.json.results[0]['geometry']['location']);
            const lat = response.json.results[0]['geometry']['location']['lat'];
            const lon = response.json.results[0]['geometry']['location']['lng'];


            const query = connection.query('CALL geodistnew(?,?,?)', [lat, lon, 5],
            function (error, results, fields) {
              if (error) {console.log('error on geodist!\n\n',error); return};
              console.log('querying distance!');
              const matched = results[0];
              connection.close();
              res.status(200).json({data:matched, geo:response.json.results[0]['geometry']['location']});
            });
          }
          else {
            console.log(err);
            connection.close();
            res.status(403).json({error:'I only read legible, US-based addresses XD'});
          }
        });
    }
})


router.post('/report', (req, res) => {
  handleDisconnect();
  console.log('report submitted... lets see if it works');
  googleMapsClient.geocode({
        address: req.body.location
      }, function(err, response) {
        if (!err) {
          const lat = response.json.results[0]['geometry']['location']['lat'];
          const lon = response.json.results[0]['geometry']['location']['lng'];
          let sql = 'INSERT INTO facilities (facn, fname, address, lat, lon) VALUES (?, ?, ?, ? ,?)';
          const inserts = [req.body.name, req.body.chemical, req.body.address, lat, lon];
          //PREFORM ESCAPING OF INPUT
          sql = mysql.format(sql, inserts);
          connection.query(sql);
          console.log('Submitted new contamination report!');
          connection.close();
          res.status(200).send('');
        }
        else {
          console.log(err);
          connection.close();
          res.status(400).json({error:'You did not provide a proper address :S'});
        }
      });
});



module.exports = router;
