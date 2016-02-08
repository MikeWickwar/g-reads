var environment = process.env.DATABASE_URL || 'development'
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
