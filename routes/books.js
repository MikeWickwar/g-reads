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
   Books().fullOuterJoin('authbook_junction', 'books.id', 'authbook_junction.id').then(function (books) {
     Authors().fullOuterJoin('authbook_junction', 'authors.id', 'authbook_junction.author_id').then(function (authors) {
     console.log(books+'***********BOOKS');
     res.render('books/index', {title: 'I got youre book title right here!', books: books, authors: authors})
     })
   })
 });

 router.post('/', function (req, res, next) {
   var booksEntry = {
     title: req.body.title,
     genre: req.body.genre,
     description: req.body.description,
     cover_url: req.body.cover_url
   }
   Books().select().insert(booksEntry).returning('id').then(function(results){
     var authEntry = {
       author_id: req.body.author_id,
       book_id: results[0]
     }
    console.log("********");
     console.log(results[0]);
     Authbooks().select().insert(authEntry).then(
       res.send('check yo db. you postit')
      )
    })
  })

 router.get('/new', function (req, res, next) {
   Authors().select().then(function (authors) {
     res.render('books/new', {authors: authors})
   })
 })

 router.get('/:id', function (req, res, next) {
   Books().where('books.id', req.params.id).then(function (books) {
      Authors().fullOuterJoin('authbook_junction', 'authors.id', 'authbook_junction.author_id').then(function (authors) {
     res.render('books/index', {title: 'individual book still on index view', books: books, authors: authors})
    })
  })
})



module.exports = router;
