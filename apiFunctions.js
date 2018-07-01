//API modules
var ebay = require('ebay-api');

const yelp = require('yelp-fusion');

const fetch = require('node-fetch');

require('dotenv').config();

const ENV = process.env.ENV || "development";

uRequest = "Harry Potter"
check =''

/*
MovieAPI = (uRequest) => {
   fetch(`http://www.omdbapi.com/?apikey=${process.env.MOVIES_API}&t=${uRequest}`)
      .then((res) =>  {return(res.json())})
      .then((json) => {

        if (json.Response === 'False'){
          return console.log(json.Error)
        }

        check = json.Title
        console.log(test)


          })

}*/

var obj;

fetch(`http://www.omdbapi.com/?apikey=${process.env.MOVIES_API}&t=${uRequest}`)
  .then(res => res.json())
  .then(data => {obj = data; return obj})



console.log(obj)
