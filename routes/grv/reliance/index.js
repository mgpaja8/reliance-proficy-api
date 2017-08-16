'use strict';

var reliance = require('express').Router();

 //Endpoints
var createNcmr = require('./createNcmr');
var getNcmr = require('./getNcmr');
var closeNcmr = require('./closeNcmr');
var updateNcmr = require('./updateNcmr');

 //Allows a ping check to be made for connection to reports (GET)
reliance.get('/', function (req, res) {
  res.status(200).json({message: 'Connection suscessful to reliance index.js'});
});

//Attatch the functionality to this module's router
reliance.post('/createncmr', createNcmr);
reliance.get('/getncmr', getNcmr);
reliance.post('/closencmr', closeNcmr);
reliance.put('/updatencmr', updateNcmr);

//Export the finalized router for usage!
module.exports = reliance;
