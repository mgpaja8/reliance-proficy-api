'use strict';

var reliance = require('express').Router();

 //Endpoints
var test = require('./test');
var createNcmr = require('./createNcmr');
var getNcmr = require('./getNcmr');
var closeNcmr = require('./closeNcmr');

 //Allows a ping check to be made for connection to reports (GET)
reliance.get('/', function (req, res) {
  res.status(200).json({message: 'Connection suscessful to reliance index.js'});
});

//Attatch the functionality to this module's router
reliance.get('/test', test);
reliance.post('/createncmr', createNcmr);
reliance.get('/getncmr', getNcmr);
reliance.post('/closencmr', closeNcmr);

//Export the finalized router for usage!
module.exports = reliance;
