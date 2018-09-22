var http = require('http');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var routes = require('./routes');

// CONSTANTS
const PORT = process.env.PORT || 3000;
const MONGODB_URL= process.env.MONGODB_URI;

var app = express();

mongoose.connect(MONGODB_URL,
    {useNewUrlParser: true}
).then(function(out){
    console.log("Connected to database.");
});

// MIDDLEWARE
app.use(morgan('dev'));
app.use(expressSession({ secret : 'thisissamadkhan' }));
app.use(bodyParser({ extended : false }));

// ROUTES
app.use(routes);

http.createServer(app).listen(PORT, function() {
    console.log("Server started on port", PORT);
});
