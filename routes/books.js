var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books/index', {title: 'I got youre book title right here!'})
});

module.exports = router;
