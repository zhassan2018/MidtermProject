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


const session     = require("express-session");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
  //store: connect to storesession in database?
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// const yelp = require('yelp-fusion');

// const client = yelp.client(process.env.YELP_API_KEY);

// client.search({
//   term:'mandys',
//   location: 'montreal, qc',
//   sort_by: 'rating',
//   limit: 20,
//   price: [2,1]
// }).then(response => {
//   console.log(response.jsonBody.businesses.length);
//   for(var i = 0; i<response.jsonBody.businesses.length;i++){
//     console.log(response.jsonBody.businesses[i].name);
//   }
// }).catch(e => {
//   console.log(e);
// });

/**
 * example eBay API request to FindingService:findItemsByKeywords
 */

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



//in-memory database storing user data -- just for testing purposes
const usersDatabase =  {
  'user1': {
    id: 'user1',
    email: 'tiffanyjdow@gmail.com',
    password: 'tomato'
  },
  'user2': {
    id: 'user2',
    email: 'jeesanlee@gmail.com',
    password: 'elmo'
  },
  'user3': {
    id: 'user3',
    email: 'elmo_party@gmail.com',
    password: 'brick'
  }
};

//// FUNCTIONS /////

//function to verify if a user has an account
const verifyUser = (email, password) => {
  for (let users in usersDatabase) {
    if (usersDatabase[users].email === email) {
      if (usersDatabase[users].password === password) {
        return usersDatabase[users];
      }
    }
  }
  return false;
};

//API modules
var ebay = require('ebay-api');

const yelp = require('yelp-fusion');

const fetch = require('node-fetch')





// Home page
var toShow = {'first':''};
app.get("/", (req, res) => {


  let verifiedUser = req.session.user_id;


  if (verifiedUser) {
  res.status(200).render("index");
} else {
  res.status(301).redirect("login");
}
});

app.get("/login", (req, res) => {

  res.status(200).render("login");
  //login page has 2 options - register as a new user OR login to an existing account
});

app.post("/login", (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  let verifiedUser = verifyUser(req.body.email, req.body.password);

  // if (verifiedUser) {
  //   req.session.user_id = verifiedUser.id;
  //   res.status(301).redirect("/");
  //  } else {
  //   res.status(401).send('There was an error with your login credentials, please try again');
  // }

  knex("users")
    .where("email", req.body.email)
    .then(user => {
      if (user) {
        bcrypt.compareSync(req.body.password, user.password);
        req.session.user_id = users.id;
        res.status(301).redirect("/");
      } else {
    res.status(401).send('There was an error with your login credentials, please try again');
  }
    });

//   app.post("/login", (req, res) => {
//   knex
//     .from("users")
//     .then(result => {
//       for (let user of result) {
//         if (user.password !== req.body.Logpassword) {
//           console.log("not you", user);
//         } else if (user.email !== req.body.Logemail) {
//           console.log("wrong email");
//         } else if (
//           user.password === req.body.Logpassword &&
//           user.email === req.body.Logemail
//         ) {
//           req.session.user = req.body.Logemail;
//           res.redirect("/smart");
//         }
//       }
//     })
//     .catch(err => console.log("login db error.", err));
// });
});

app.post("/register", (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  if (email === "" || password === "") {
    res.status(401).send('Please fill in your email and password to continue');
  } else {

    for (let user in usersDatabase) {
      if (email === usersDatabase[user].email) {
        res.staus(400).send('User already exists, please try again');
      } else {
        req.session.user_id = usersDatabase[user].id;
        res.status(301).redirect("/");
      }
    }
  }

  knex("users")
    .insert({
      email: email,
      password: password
    })
    .returning("id")
    .then(id => {
      req.session.user_id = id;
    });
    res.status(301).redirect("/");

  //REGISTER: users can sign up as a user on the site
  //send error if they don't enter an email and/or password
});

app.get("/profile", (req, res) => {

  res.status(200).render("profile");
});

app.post("/profile/:id", (req, res) => {

  let updatedEmail = req.body.email;
  let updatedPassword = req.body.password;

  if (updatedEmail !== "" || updatedPassword !== "") {
    //insert upDated email into users email in database
  }

  //allows users to edit their account information (username, email, password)
  //or the option to delete their account
});

app.post("/profile/:id/delete", (req, res) => {
  //gives users the ability to delete their account
});

app.post("/logout", (req, res) => {
  //users are able to logout from the site
  req.session.user_id = null;
  res.status(301).redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

  res.render("index", toShow);
});



app.post("/userInput", (req, res) =>{
  var uRequest = req.body['userData'];
  toShow['first'] = uRequest




////////////////////////////////////////////////////////////////////////////////////////
// EBAY API
////////////////////////////////////////////////////////////////////////////////////////

// var ebay = require('ebay-api');

// var params = {
//   keywords: ["Stephen King"],
//   outputSelector: ['AspectHistogram'],
//   paginationInput: {
//     entriesPerPage: 10
//   },

  // itemFilter: [
  //   {name: 'FreeShippingOnly', value: true},
  //   {name: 'MaxPrice', value: '150'}
  // ],


//   domainFilter: [
//     {name: 'domainName', value: 'Digital_Cameras'}
//   ]
// };
// console.log(process.env.THIERRY_EBAY_KEY)
// ebay.xmlRequest({
//     serviceName: 'Finding',
//     opType: 'findItemsByKeywords',
//     appId: process.env.THIERRY_EBAY_KEY,
//     params: params,
//     parser: ebay.parseResponseJson    // (default)
//   },
//   // gets all the items together in a merged array
//   function itemsCallback(error, itemsResponse) {
//     if (error) throw error;

//     var items = itemsResponse.searchResult.item;

//     console.log('Found', items.length, 'items');

//     for (var i = 0; i < items.length; i++) {
//       console.log('- ' + items[i].title);
//     }
//   }
// );

  // EBAY API

  var params = {
    keywords: [uRequest],
    outputSelector: ['AspectHistogram'],
    paginationInput: {
      entriesPerPage: 2
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

  ebay.xmlRequest({
      serviceName: 'Finding',
      opType: 'findItemsByKeywords',
      appId: process.env.THIERRY_EBAY_KEY,
      params: params,
      parser: ebay.parseResponseJson    // (default)
    },
    // gets all the items together in a merged array
    function itemsCallback(error, itemsResponse) {
      if (error) throw console.log(error);


      var items = itemsResponse.searchResult.item;

      if (items === undefined){
        return console.log("Could not find item:",params.keywords,"on EBAY");

      }




      for (var i = 0; i < items.length; i++) {
        console.log('- ' + items[i].title, "PRODUCT");
      }
    }
  );


  //YELP API

  const client = yelp.client(process.env.YELP_API_KEY);
  var food = uRequest

  client.search({
    term:food,
    location: 'montreal, qc',
    sort_by: 'rating',
    limit: 2,
    price: [2,1]
  }).then(response => {
    if(response.statusCode !== 200){
      return console.log("Didnt find a restaurant for", food )
    }

  if(response.jsonBody.businesses.length === 0){
    return console.log("Didnt find a restaurant for", food )
  }
    for(var i = 0; i<response.jsonBody.businesses.length;i++){
      console.log(response.jsonBody.businesses[i].name,"-Restaurant" );
    }
  })


  //Movies/TV API


  fetch(`http://www.omdbapi.com/?apikey=${process.env.MOVIES_API}&t=${uRequest}`)
      .then(res => res.json())
      .then((json) => {
        if (json.Response === 'False'){
          return console.log(json.Error)
        }
        console.log(json.Title, "-MOVIE")})


  fetch( `https://www.googleapis.com/books/v1/volumes?q=${uRequest}&maxResults=1&projection=lite&key=${process.env.BOOKS_API}`).then(res => res.json()).then((json) => {
        if (json.totalItems === 0){
          return console.log('book not found!')
        }

        console.log(json.items[0].volumeInfo.title, "-BOOK")
      })



  res.redirect('/')

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});









