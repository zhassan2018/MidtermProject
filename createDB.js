const settings = require("./knexfile")

const pg = require('pg')
var knex = require('knex')({
  client: settings.development.client,
  connection: settings.development.connection,
})


knex('users').select('*').then(function(int){
  console.log(int);
  knex.destroy();

})

