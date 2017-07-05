'use strict';

var reliance = require('express').Router();

 //Endpoints
var test = require('./test');
var ncmr = require('./ncmr');

 //Allows a ping check to be made for connection to reports (GET)
reliance.get('/', function (req, res) {
  res.status(200).json({message: 'Connection suscessful to reliance index.js'});
});

//Attatch the functionality to this module's router
reliance.get('/test', test);
reliance.get('/ncmr', ncmr);

//Export the finalized router for usage!
module.exports = reliance;
