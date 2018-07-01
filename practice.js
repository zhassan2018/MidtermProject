

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

var keyword = {'to_watch': ['watch', 'view', 'attend', 'see'],
'to_read': ['read', 'interpret','study'],
'to_buy':['buy', 'purchase', 'get', 'acquire'],
'to_eat': ['eat', 'gorge','devour','dine','lunch','breakfast','dinner'] }

var text = "eat big ass hamburgers";

var _ = require('lodash');
var res = text.split(" ");

var toRemove = '';
var category ='';
var AddToCat = '';


for (cat in keyword){

  var current = keyword[cat];
  for (var i =0; i < current.length; i++){
    if (_.some(res, _.method('includes',current[i])) === true){
      toRemove = current[i];
      category = cat;

    }

  }
}


var index = _.remove(res, function(input){
  return input !== toRemove;
})

AddToCat = index.join(' ')

console.log(category);
console.log(AddToCat)


//Next we'll have a bunch of if statement to determine where to
//add the



//The plan now is to still go through all the api but if there are multiple results, use









