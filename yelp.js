var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key:'ju7T0GatX3G3terGQa8qAg',
  consumer_secret:'xxqTDZc8wGUxCcvzxgaVaRKeGY8',
  token:'gxrjr6yGaAU1JdL6_vkrZKmZotKPR5MB',
  token_secret:'llPjIOyzunVJmtsmfyh-IhsqzgQ'
});

var choose = function(data) {
  console.log(data.businesses[0]);
  var bestRating = 0; var reviews = 0;
  var winner = {};
  data.businesses.forEach( function(business) {
    if (business.rating > bestRating && business.review_count > reviews && business.is_closed === false) {
      bestRating = business.rating; reviews = business.review_count;
      winner.name = business.name; 
      winner.location = business.location.display_address; 
      winner.snippet_text = business.snippet_text;
      winner.image_url = business.image_url;
      winner.url = business.url; 
      winner.phone = business.phone;
    }   
  });
  return winner;
};

module.exports.askYelp = function(term, res) {
  yelp.search({ term: term, location: 'san francisco'})
  .then(function(data) {
    var result = choose(data);
    result.search_term = term; 
    res.send(result);
  })
  .catch(function(err) {
    console.error(err)
  });
 };