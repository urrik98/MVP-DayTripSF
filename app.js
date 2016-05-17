var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Yelp = require('./yelp.js');

var app = express();

app.use(express.static(__dirname))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/findStuff', function(req, res) {
  Yelp.askYelp(req.body[0], res);
});

//ADAM, PROBLEM RESOLVED. LOOK AT LINE 8. SHOULD BE USING express.static to serve up your files
app.listen(4000);
console.log('server is running');



