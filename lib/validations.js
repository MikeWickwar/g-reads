function validate(input) {
  var errors = [];
  errors.push(emptyTitle(input.title))
  errors.push(emptyGenre(input.genre))
  errors.push(emptyDescription(input.description))
  errors.push(emptyCover(input.cover_url))

  return errors.filter(function (error){
    return error !== true;
  })
}

function emptyTitle(input){
  return !input.trim() ? 'Title cannot be blank' : true ;
}
function emptyGenre(input){
  return !input.trim() ? 'Genre cannot be blank' : true ;
}
function emptyDescription(input){
  return !input.trim() ? 'Description cannot be blank' : true ;
}
function emptyCover(input){
  return !input.trim() ? 'Cover Url cannot be blank' : true ;
}


module.exports = validate;
