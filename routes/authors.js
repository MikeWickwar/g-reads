var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Books() {
  return knex('books')
}
function Authors() {
  return knex('authors')
}
function Authbooks() {
  return knex('authbook_junction')
}
/* GET home page. */
router.get('/', function(req, res, next) {
  Authors().select().then(function (authors) {
    Books().fullOuterJoin('authbook_junction', 'books.id', 'authbook_junction.book_id').then(function (books) {
      res.render('authors/index', { title: 'AUTHORS', authors: authors, books: books });
    })
  })
});

module.exports = router;
