//API modules
var ebay = require('ebay-api');

const yelp = require('yelp-fusion');

const fetch = require('node-fetch');

require('dotenv').config();

const ENV = process.env.ENV || "development";


uRequest="harry potter"

var MovieAPi = (uRequest) => {
  fetch(`http://www.omdbapi.com/?apikey=${process.env.MOVIES_API}&t=${uRequest}`)
      .then(res => res.json())
      .then((json) => {
        if (json.Response === 'False'){
          return console.log(json.Error)
        }
        console.log(json.Title, "-MOVIE")})
}

MovieAPi(uRequest)

