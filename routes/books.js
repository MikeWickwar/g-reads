var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var validate = require('../lib/validations')

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
  Books().select().then(function (books) {
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
  var errors = validate(booksEntry)
  if (errors.length) {
    Authors().select().then(function (authors) {
      res.render('books/new', {errors: errors, authors: authors})
    })
  }else{
    Books().select().insert(booksEntry).returning('id').then(function(results){
      var authEntry = {
        author_id: req.body.author_id,
        book_id: results[0]
       }
      Authbooks().select().insert(authEntry).then(
       res.redirect('/books')
       )
     })
    }
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

router.get('/:id/edit', function (req, res, next) {
  Books().where('books.id', req.params.id).first().then(function (book) {
    Authors().select().then(function (authors) {
        Books().fullOuterJoin('authbook_junction', 'books.id', 'authbook_junction.author_id').then(function (junction) {
          res.render('books/edit', {book: book, authors: authors, junction: junction})
      })
    })
  })
})

router.post('/:id/edit', function (req, res, next) {
  var booksEntry = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }
  var errors = validate(booksEntry)
  var authEntry = {
    author_id: req.body.author_id,
    book_id: req.params.id
    }
  if (errors.length) {
    Books().where('books.id', req.params.id).first().then(function (book) {
      Authors().select().then(function (authors) {
        res.render("books/edit", {book:book, authors: authors, errors: errors })
      })
    })
  }
  Books().where('books.id', req.params.id).first().update(booksEntry).then(function () {
    Authbooks().where('book_id', req.params.id).update(authEntry).then(function () {
      res.redirect('/books/'+req.params.id)
    })
  })
})

router.post('/:id/delete', function (req, res, next) {
    Books().where('books.id', req.params.id).del().then(
      res.redirect('/books')
    )
  })


module.exports = router;
