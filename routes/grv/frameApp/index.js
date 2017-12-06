'use strict';

var frameApp = require('express').Router();

//Endpoints
var getOperations = require('./getOperations');


//Allows a ping check to be made for connection to reports (GET)
frameApp.get('/', function (req, res) {
 res.status(200).json({message: 'Connection suscessful to frameApp index.js'});
});

//Attatch the functionality to this module's router
frameApp.get('/operations', getOperations);


//Export the finalized router for usage!
module.exports = frameApp;
