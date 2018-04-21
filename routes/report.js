var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/report', function(req, res, next) {
  console.log('retrieving report!');
  res.render('report', { title: 'report' , source: 'reportclient.js'});
});

router.post('/report/new', function(req, res, next) {
  connection.query('INSERT INTO facilities (facn, fname, address) VALUES (?, ?, ?)', ['user', req.body.chemical, req.body.address]);
  connection.close();
  console.log('Submitted new contamination report!');
});

module.exports = router;
