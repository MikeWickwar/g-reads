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
function validateAuthor(input) {
  var errors = [];
  errors.push(emptyFirstName(input.first_name))
  errors.push(emptyLastName(input.last_name))
  errors.push(emptyBio(input.bio))
  errors.push(emptyphoto(input.portrait_url))

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
function emptyFirstName(input){
  return !input.trim() ? 'First Name cannot be blank' : true ;
}
function emptyLastName(input){
  return !input.trim() ? 'Last Name cannot be blank' : true ;
}
function emptyBio(input){
  return !input.trim() ? 'Bio cannot be blank' : true ;
}
function emptyphoto(input){
  return !input.trim() ? 'Portrait Url cannot be blank' : true ;
}


module.exports = validate;
module.exports = validateAuthor;
