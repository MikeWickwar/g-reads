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

module.exports = validateAuthor;
