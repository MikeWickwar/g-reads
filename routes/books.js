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
   Books().fullOuterJoin('authbook_junction', 'books.id', 'authbook_junction.id').then(function (books) {
     Authors().fullOuterJoin('authbook_junction', 'authors.id', 'authbook_junction.author_id').then(function (authors) {
     console.log(books+'***********BOOKS');
     res.render('books/index', {title: 'I got youre book title right here!', books: books, authors: authors})
     })
   })
 });

 router.get('/:id', function (req, res, next) {
   Books().where('books.id', req.params.id).then(function (books) {
      Authors().fullOuterJoin('authbook_junction', 'authors.id', 'authbook_junction.author_id').then(function (authors) {
     res.render('books/index', {title: 'individual book still on index view', books: books, authors: authors})
    })
  })
})


module.exports = router;
