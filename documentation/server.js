var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAOTZRfzVH_ZBJcQXoXxtNI6YA6KE35kug'
});
var mysql      = require('mysql');



var app = express();

var logger = function(req, res, next) {
	console.log('Logging...');
	next();
};

app.use(logger);

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//set static path to HTML and CSS
app.use(express.static(path.join(__dirname,'web')));

//Global vars
app.use(function(req, res, next){
	res.locals.errors = null;
	next();
})

//Express validator Middleware
app.use(expressValidator({
	errorFormatter : function(param, msg, value) {
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

//mySQL middleware
//CHANGE THIS TO HOSTING ADDRESS
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'America1',
  database : 'toxxxme'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  const arr = [1, 2, 3];
  arr.foo = 4;
  console.log(arr.foo);
     console.log('connected as id ' + connection.threadId);
});

var addresses = []

app.get('/', function(req,res){
	res.render('index',{
		form : '/partials/form'
	});

});

app.post('/address/add', function(req, res){
	console.log('Form submitted');
  //read form data
	req.checkBody('address','Address is Required').notEmpty();

	var errors = req.validationErrors();

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
				var lat = response.json.results[0]['geometry']['location']['lat'];
				var lng = response.json.results[0]['geometry']['location']['lng'];
				addresses.push([lat, lng]);
				if (addresses.length > 0) {

					//loop through all addresses and get their matching facilities
          //currently only requesting 1 address
					addresses.forEach(function (entry) {
						var query = connection.query('CALL geodist(?,?,?)', [entry[0], entry[1], 5]);
            query
              .on('error', function (err){
                throw err;
              })
              .on('fields', function(fields) {
              // the field packets for the rows to follow
              })
              .on('result', function(row) {
                // Pausing the connnection is useful if your processing involves I/O
                connection.pause();
                console.log(row);
                res.send(row);

                connection.resume();
              })
              .on('end', function() {
                // all rows have been received
              });



					});
				};
		  }
			else {
				console.log(err);
			}
		});
	}
});


// app.post('/address/add', function(req, res){
// 	console.log('Form submitted');
//   //read form data
// 	req.checkBody('address','Address is Required').notEmpty();
//
// 	var errors = req.validationErrors();
//
// 	if(errors) {
// 		console.log(errors);
// 	} else {
// 		console.log('SUCCESS');
// 		console.log('Submitted: ' +req.body.address);
// 		// Geocode an address.
// 		googleMapsClient.geocode({
// 		  address: req.body.address
// 		}, function(err, response) {
// 		  if (!err) {
// 		    console.log(response.json.results[0]['geometry']['location']);
// 				var lat = response.json.results[0]['geometry']['location']['lat'];
// 				var lng = response.json.results[0]['geometry']['location']['lng'];
//
// 				var query = connection.query('CALL geodist(?,?,?)', [lat, lon, 5],
// 				function (error, results, fields) {
//           if (error) throw error;
// 					var matched = results[0];
// 					//all locations with facilities in a 5 mile radius
// 					//[[facn, fname, lat, lon, distance, [chemical, year, totalreleaselbs]]]
// 					for (i in matched) {
//             var q = connection.query('SELECT * FROM releases WHERE facn = ?',matched[i].facn, function(error, result, field) {
//               if (error) throw error;
//               var chemical_list = [];
//               for (i in result) {
//                 var chem = {'chemical' : result[i].chemical, 'year' : result[i].Year, 'totalReleaselbs' : result[i].totalreleaselbs};
//                 chemical_list.push(chem);
//               };
//               // spew(matched, i, chemical_list, res);
//               var loc = {'facn': matched[i].facn, 'fname' : matched[i].fname, 'frsid' : matched[i].frsid, 'lat' : matched[i].lat, 'lon' : matched[i].lon, 'distance' : matched[i].distance, 'chemicals' : chemical_list};
//               console.log(loc);
//             });
//
// 					};
// 				});
// 		  }
// 			else {
// 				console.log(err);
// 			}
// 		});
// 	}
// });

function spew (matched, i, chemical_list, res) {
  var loc = {'facn': matched[i].facn, 'fname' : matched[i].fname, 'frsid' : matched[i].frsid, 'lat' : matched[i].lat, 'lon' : matched[i].lon, 'distance' : matched[i].distance, 'chemicals' : []};
  loc.chemicals = chemical_list;
  console.log(loc);
  // res.send(loc);
};

var server = app.listen(3000, function(){

	var host = server.address().address;
	var port = server.address().port
	console.log('Express App serving at %s: %s', host, port);
});


// var locations_chemicals = [];
// locations.forEach(function (place){
//   var q = connection.query('SELECT * FROM releases WHERE facn = ?',place.facn, function(error, result, field) {
//     if (error) throw error;
//     var chemical_list = [];
//     for (i in result) {
//       var chem = {'chemical' : result[i].chemical, 'year' : result[i].year, 'totalRelease' : result[i].totalreleaselbs};
//       chemical_list.push(chem);
//     }
//     place.chemicals = chemical_list;
//     //console.log(place);
//   });
//   locations_chemicals.push(place);
//
// });

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//MySQL efficient coordinate proximity procedure
//https://www.scribd.com/presentation/2569355/Geo-Distance-Search-with-MySQL
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// DELIMITER $$
// DROP PROCEDURE IF EXISTS geodist$$
// CREATE PROCEDURE geodist (IN mylat double, IN mylon double, IN dist int)
// BEGIN
// 	declare lon1 float;
// 	declare lon2 float;
// 	declare lat1 float;
// 	declare lat2 float;
//
//
// -- calculate lon and lat for the rectangle:
// set lon1 = mylon-dist/abs(cos(radians(mylat))*69);
// set lon2 = mylon+dist/abs(cos(radians(mylat))*69);
// set lat1 = mylat-(dist/69);
// set lat2 = mylat+(dist/69);
//
// -- run the query:
// SELECT facn, fname, lat, lon, 3956 * 2 * ASIN(SQRT( POWER(SIN((mylat -lat) * pi()/180 / 2), 2) +COS(mylat * pi()/180) * COS(lat * pi()/180) *POWER(SIN((mylon -lon) * pi()/180 / 2), 2) )) as distance FROM facilities WHERE lon between lon1 and lon2 and lat between lat1 and lat2 having distance < dist ORDER BY distance limit 10;
// END$$
// DELIMITER;
