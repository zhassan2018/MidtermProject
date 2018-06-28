"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
var toShow = {'first':''};
app.get("/", (req, res) => {
  res.render("index", toShow);
});



app.post("/userInput", (req, res) =>{
  var uRequest = req.body['userData'];
  toShow['first'] = uRequest
var url = `http://www.omdbapi.com/?apikey=4cf6233d&t=${uRequest}`


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();

xmlhttp.open('GET', 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json', true);
xmlhttp.onload = function () {
  var x = xmlhttp.response;

console.log("got here")
console.log(JSON.parse(x))
  // Begin accessing JSON data here


}

xmlhttp.send();


 res.render("index", toShow)
  res.redirect('/')

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
