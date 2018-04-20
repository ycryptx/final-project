var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/report', function(req, res, next) {
  res.render('report', { title: 'report' , source: 'reportclient.js'});
});

module.exports = router;
