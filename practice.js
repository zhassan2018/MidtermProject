

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
const fetch = require('node-fetch')

fetch('http://www.omdbapi.com/?apikey=4cf6233d&t=collateral')
    .then(res => {res.json()})
    .then((json) => {
      console.log(typeof json)

      console.log(json)})




