

/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();

xmlhttp.open('GET', 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json', true);
xmlhttp.onload = function () {
  var x = xmlhttp.response;
  var stringify = JSON.stringify(x)
  var content = JSON.parse(stringify);

console.log("got here")
console.log(content)
  // Begin accessing JSON data here


}

xmlhttp.send();*/

//this is a string we cant use this

"use strict";

require('dotenv').config();

const ENV         = process.env.ENV || "development";

const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");



// Seperated Routes for each Resource


const fetch = require('node-fetch')
console.log(process.env.BOOKS_API)
fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${process.env.BOOKS_API}`
).then(res => res.json()).then((json) => {
      console.log(typeof json)

      console.log(json.items)})










