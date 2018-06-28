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


 res.render("index", toShow)
  res.redirect('/')

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});




////////////////////////////////////////////////////////////////////////////////////////
// EBAY API
////////////////////////////////////////////////////////////////////////////////////////

var ebay = require('ebay-api');

var params = {
  keywords: ["Stephen King"],
  outputSelector: ['AspectHistogram'],
  paginationInput: {
    entriesPerPage: 10
  },

  itemFilter: [
    {name: 'FreeShippingOnly', value: true},
    {name: 'MaxPrice', value: '150'}
  ],

  itemFilter: [
    {name: 'FreeShippingOnly', value: true},
    {name: 'MaxPrice', value: '150'}
  ],

  domainFilter: [
    {name: 'domainName', value: 'Digital_Cameras'}
  ]
};
console.log(process.env.THIERRY_EBAY_KEY)
ebay.xmlRequest({
    serviceName: 'Finding',
    opType: 'findItemsByKeywords',
    appId: process.env.THIERRY_EBAY_KEY,
    params: params,
    parser: ebay.parseResponseJson    // (default)
  },
  // gets all the items together in a merged array
  function itemsCallback(error, itemsResponse) {
    if (error) throw error;

    var items = itemsResponse.searchResult.item;

    console.log('Found', items.length, 'items');

    for (var i = 0; i < items.length; i++) {
      console.log('- ' + items[i].title);
    }
  }
);


/////////////////////////////////////////////////////////////////////////////////////
// YELP API
/////////////////////////////////////////////////////////////////////////////////////

const yelp = require('yelp-fusion');

const client = yelp.client(process.env.YELP_API_KEY);

client.search({
  term:'beef',
  location: 'montreal, qc',
  sort_by: 'rating',
  limit: 20,
  price: [2,1]
}).then(response => {
  console.log(response.jsonBody.businesses.length);
  for(var i = 0; i<response.jsonBody.businesses.length;i++){
    console.log(response.jsonBody.businesses[i].name);
  }
}).catch(e => {
  console.log(e);
});


