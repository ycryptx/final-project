var express = require('express');
var router = express.Router();
var connection = require('../db/schema.js').connection;
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_KEY
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'toxxxme' , source: 'indexclient.js'});
});

router.post('/search', (req, res) => {
  // TODO: copy previous Google form code
  console.log('Form submitted');
  //read form data
	req.checkBody('address','Address is Required').notEmpty();

	const errors = req.validationErrors();

	if(errors) {
		console.log(errors);
    displayError(errors);
	} else {
		console.log('SUCCESS');
		console.log('Submitted: ' +req.body.address);
    submitDatabase(req.body.address);
    }
})

router.get('/about', function(req, res, next) {
  console.log('retrieving about page');
  const description = 'This is a site by Yonatan Medina<br> My effort is to reveal the amount of contamination we\'re living in <br><br> Stay clean xx';
  res.render('about', {title: 'about', about: description });
});

router.get('/report', function(req, res, next) {
  console.log('retrieving report!');
  res.render('report', { title: 'report' , source: 'reportclient.js'});
});

router.post('/create/report', function(req, res, next) {
  connection.query('INSERT INTO facilities (facn, fname, address) VALUES (?, ?, ?)', ['user', req.body.chemical, req.body.address]);
  console.log('Submitted new contamination report!');
});



function submitDatabase(input) {
  // Geocode an address.
  googleMapsClient.geocode({
        address: input
      }, function(err, response) {
        if (!err) {
          console.log(response.json.results[0]['geometry']['location']);
          const lat = response.json.results[0]['geometry']['location']['lat'];
          const lon = response.json.results[0]['geometry']['location']['lng'];


          const query = connection.query('CALL geodistnew(?,?,?)', [lat, lon, 5],
          function (error, results, fields) {
            if (error) {console.log('error on geodist!\n\n',error); return};
            console.log('querying distance!');
            const matched = results[0];
            console.log(matched);
            connection.close();
          });
        }
        else {
          console.log(err);
        }
      });
}


function displayError(error) {
  
}

module.exports = router;
