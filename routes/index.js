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

router.post('/address/add', (req, res) => {
  // TODO: copy previous Google form code
  console.log('Form submitted');
  //read form data
	req.checkBody('address','Address is Required').notEmpty();

	const errors = req.validationErrors();

	if(errors) {
		console.log(errors);
	} else {
		console.log('SUCCESS');
		console.log('Submitted: ' +req.body.address);
		// Geocode an address.
    googleMapsClient.geocode({
    		  address: req.body.address
    		}, function(err, response) {
    		  if (!err) {
    		    console.log(response.json.results[0]['geometry']['location']);
    				const lat = response.json.results[0]['geometry']['location']['lat'];
    				const lng = response.json.results[0]['geometry']['location']['lng'];

    				const query = connection.query('CALL geodist(?,?,?)', [lat, lon, 5],
    				function (error, results, fields) {
              if (error) {console.log(error); return};
              console.log('querying distance!');
    					const matched = results[0];
    					//all locations with facilities in a 5 mile radius
    					//[[facn, fname, lat, lon, distance, [chemical, year, totalreleaselbs]]]
    					for (i in matched) {
                const q = connection.query('SELECT * FROM releases WHERE facn = ?',matched[i].facn, function(error, result, field) {
                  if (error) throw error;
                  const chemical_list = [];
                  for (i in result) {
                    const chem = {'chemical' : result[i].chemical, 'year' : result[i].Year, 'totalReleaselbs' : result[i].totalreleaselbs};
                    chemical_list.push(chem);
                  };
                  // spew(matched, i, chemical_list, res);
                  const loc = {'facn': matched[i].facn, 'fname' : matched[i].fname, 'frsid' : matched[i].frsid, 'lat' : matched[i].lat, 'lon' : matched[i].lon, 'distance' : matched[i].distance, 'chemicals' : chemical_list};
                  console.log(loc);
                });

    					};
              connection.close();
    				});
    		  }
    			else {
    				console.log(err);
    			}
    		});
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



module.exports = router;
