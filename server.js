'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes     = require('./routes');
var fs = require('fs');

var port = 8282;

//Configuration of app to use bodyParser.
//We're telling it to use both URL parameters AND json bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Connect the routes
app.use('/', routes);

//=================== Start the server ==============================
app.listen(port);
console.log('Application Starting');
console.log(`Resting on port ${port}...\n`);
