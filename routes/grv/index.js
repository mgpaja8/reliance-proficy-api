'use strict';

//Grabs a new instance of the router from express
var grv = require('express').Router();

//Import all sub-routes here, so you can append them later.
var reliance = require('./reliance');
var frameApp = require('./frameApp');

// ==================================================================
// ======================= PING TEST ================================
// Simple ping test at the head to ensure connectivity
grv.get('/', function (req, res) {
	res.status(200).json({message: 'Connection suscessful to GRV index.js'});
});


// ==================================================================
// ======================= ROUTE APPENDING ==========================
// For each subdirectory you make inside the routes, you have to append
// the attach point here at the master route. Be sure to import the
// module at the top of this file, or else it won't work (that's where
// the variable part comes from!)
grv.use('/reliance', reliance);
grv.use('/frame', frameApp);

//Critical: We export the grv after it has been modified so server.js imports it.
module.exports = grv;
