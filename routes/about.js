var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
  console.log('retrieving about page');
  const description = 'This is a site by Yonatan Medina\n My effort is to reveal the amount of contamination we\'re living in \n\n Stay clean xx';
  res.render('about', {title: 'about', about: description });
});

module.exports = router;
