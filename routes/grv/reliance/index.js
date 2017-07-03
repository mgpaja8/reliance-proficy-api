'use strict';

var reliance = require('express').Router();

 //Endpoints
var test = require('./test');

 //Allows a ping check to be made for connection to reports (GET)
reliance.get('/', function (req, res) {
  res.status(200).json({message: 'Connection suscessful to reliance index.js'});
});

//Attatch the functionality to this module's router
reliance.get("/test", test);

//Export the finalized router for usage!
module.exports = reliance;
