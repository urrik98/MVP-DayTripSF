var express = require('express');
var Yelp = require('yelp');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();


app.use(express.static(__dirname))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var yelp = new Yelp({
  consumer_key:'ju7T0GatX3G3terGQa8qAg',
  consumer_secret:'xxqTDZc8wGUxCcvzxgaVaRKeGY8',
  token:'gxrjr6yGaAU1JdL6_vkrZKmZotKPR5MB',
  token_secret:'llPjIOyzunVJmtsmfyh-IhsqzgQ'
});

// yelp.search({ term: 'jazz', location: 'san francisco' })
//   .then(function(data) {
//     data.businesses.forEach( function(business) {
//       console.log(business.name, " located at: ", business.location.address[0]);
//     });
//   })
//   .catch(function(err) {
//     console.error(err)
//   });

function askYelp(term) {
  yelp.search({ term: term, location: 'san francisco'})
  .then(function(data) {
    var bestRating = 0; var bestMatch;
    data.businesses.forEach( function(business) {
      if (business.rating > bestRating) {
        bestRating = business.rating;
        bestMatch = business.name;
      }
    });
    console.log(bestRating, bestMatch)
    return bestMatch;
  })
  .catch(function(err) {
    console.error(err)
  });
};


app.post('/findStuff', function(req, res) {
  console.log(req.body);
  var queries = req.body.filter(function(term) {
    if (term) {
      return new Promise(function(resolve,reject) {
        askYelp(term);
      });
    }
  });

  var r = Promise.all(queries)
  .then(function(r){
    console.log("All promises answered ", r);
    return array
  })
  // .then(function(array) {
  //   console.log("array: ",array);
  // })

  res.send(['cable car', 'hyatt', 'westin st. francis']);

});

//ADAM, PROBLEM RESOLVED. LOOK AT LINE 8. SHOULD BE USING express.static to serve up your files
app.listen(4000);
console.log('server is running');



