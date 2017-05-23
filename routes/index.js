'use strict';

var routes = require('express').Router();

// ==================================================================
// ======================= CORS MIDDLEWARE ==========================
// Intercepts all routes and injects this middleware, which sets the
// CORS headers for cross-origin error resolution.
routes.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'content-type, accept, authorization');

	// intercept OPTIONS method
	if ('OPTIONS' === req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});

// ==================================================================
// ======================= PING TEST ================================
// Simple ping test at the head to ensure connectivity
routes.get('/', function (req, res) {
	/* eslint max-len: 0 */
	res.status(200).json({message: 'Connection suscessful to initial index.js'});
});

//Export the routes after it has been modified so server.js imports it
module.exports = routes;
