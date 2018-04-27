var express = require('express');
var router = express.Router();
var connection = require('../db/schema.js').connection;
const mysql = require('mysql2');

var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_KEY
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.post('/search', (req, res) => {
  console.log('Form submitted');
  //read form data
	req.checkBody('address','Address is Required').notEmpty();
	const errors = req.validationErrors();

	if(errors) {
		console.log(errors);
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
              res.status(200).json({data:matched, geo:response.json.results[0]['geometry']['location']});
              connection.close();
            });
          }
          else {
            console.log(err);
            res.status(400).json({error:'I only read legible, US-based addresses XD'});
          }
        });
    }
})


router.post('/report', (req, res) => {
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
          res.status(200).send('');
        }
        else {
          console.log(err);
          res.status(400).json({error:'You did not send a proper address :S'});
        }
      });
});



module.exports = router;
