var environment = process.env.DATABASE_URL 
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
