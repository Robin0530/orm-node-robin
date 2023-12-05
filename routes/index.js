var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/src/html/index.html'));
});

router.get('/sign', function(req, res, next) {
  res.render('sign');
});

module.exports = router;
