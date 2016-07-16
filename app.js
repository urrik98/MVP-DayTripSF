var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Yelp = require('./yelp.js');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/callYelp', function(req, res) {
  Yelp.askYelp(req.body[0], res);
});

app.listen(port, function() {
  console.log("listening on localhost: ",port);
});
