var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/report', function(req, res, next) {
  console.log('retrieving report!');
  res.render('report', { title: 'report' , source: 'reportclient.js'});
});

module.exports = router;
