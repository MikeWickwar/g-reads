var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Books() {
  return knex('books')
}
function Authors() {
  return knex('authors')
}
/* GET home page. */
router.get('/', function(req, res, next) {
  // Books().fullOuterJoin('authbook_junction', 'books.id', 'authbook_junction.id').then(function (books) {
  //   Authors().fullOuterJoin('authbook_junction', 'authors.id', 'authbook_junction.author_id').then(function (authors) {
    // console.log(books+'***********BOOKS');
    res.render('books/index', {title: 'I got youre book title right here!'})
    // })
  // })
});

module.exports = router;
