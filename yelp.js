var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key:'ju7T0GatX3G3terGQa8qAg',
  consumer_secret:'xxqTDZc8wGUxCcvzxgaVaRKeGY8',
  token:'gTsZIinUjEwsPzCcaA_CXLzjN4WSiZOO',
  token_secret:'D4W6WFkDcsxrADvwLMcv3ZrDJdA'
});

var filterAPIResults = function(data, search_term) {
  var bestRating = 0; var reviews = 0;
  var winners = [];
  data.businesses.forEach( function(business) {
    if (business.rating > 3 && business.is_closed === false) {
      var result = {};

      result.name = business.name;
      result.location = business.location.display_address;
      result.snippet_text = business.snippet_text;
      result.image_url = business.image_url;
      result.url = business.url;
      result.phone = business.phone;
      result.rating_img_url = business.rating_img_url;
      result.search_term = search_term;

      winners.push(result);
    }
  });
  return winners;
};

module.exports.askYelp = function(term, res) {
  yelp.search({ term: term, location: 'san francisco'})
  .then(function(data) {
    var results = filterAPIResults(data, term);
    res.send(results);
  })
  .catch(function(err) {
    console.error(err)
  });
 };
