var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var validate = require('../lib/validationsAuthor')

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
})

router.post('/', function (req, res, next) {
  var authorEntry = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio,
    portrait_url: req.body.portrait_url
  }
  var errors = validate(authorEntry)
  if (errors.length) {
    Books().select().then(function (books) {
      res.render('authors/new', {errors: errors, books: books})
    })
  }else{
    Authors().select().insert(authorEntry).returning('id').then(function(results){
      var authEntry = {
        author_id: results[0],
        book_id: req.body.book_id
       }
      Authbooks().select().insert(authEntry).then(
       res.redirect('/authors')
        )
      })
    }
  })

router.get('/new', function (req, res, next) {
 Books().select().then(function (books) {
   res.render('authors/new', {books: books})
  })
})


router.get('/:id', function (req, res, next) {
  Authors().where('authors.id', req.params.id).then(function (authors) {
    Books().fullOuterJoin('authbook_junction', 'books.id', 'authbook_junction.book_id').then(function (books) {
    res.render('authors/index', {title: 'individual book still on index view', books: books, authors: authors})
    })
  })
})

router.get('/:id/edit', function (req, res, next) {
  Authors().where('authors.id', req.params.id).first().then(function (author) {
    Books().join('authbook_junction', 'books.id', 'authbook_junction.author_id').then(function (books) {
      res.render('authors/edit', {books: books, author: author})
    })
  })
})

router.post('/:id', function (req, res, next) {
  var authorEntry = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio,
    portrait_url: req.body.portrait_url
  }
  var errors = validate(authorEntry)
  if (errors.length) {
    Authors().where('authors.id', req.params.id).first().then(function (author) {
      Books().join('authbook_junction', 'books.id', 'authbook_junction.author_id').then(function (books) {
        res.render('authors/edit', {errors: errors, books: books, author: author})
      })
    })
  }else{
    Authors().where('authors.id', req.params.id).update(authorEntry).then(function(results){
      var authEntry = {
        author_id: req.params.id,
        book_id: req.body.book_id
       }
      Authbooks().where('author_id', req.params.id).update(authEntry).then(
       res.redirect('/authors')
       )
     })
  }
 })

router.post('/:id/delete', function (req, res, next) {
  Authors().where('authors.id', req.params.id).del().then(
    res.redirect('/authors')
  )
})

module.exports = router;
