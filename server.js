'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes     = require('./routes');
var fs = require('fs');
var morgan      = require('morgan');
var logger = require('./utils/logger');
var appLogs = logger.appLogs(__filename);
var printerJob = require('./jobs/restart-printer-service-job').start;

var port = 8888;

//Configuration of app to use bodyParser.
//We're telling it to use both URL parameters AND json bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//log request
app.use(morgan({stream: logger.stream}));

//Connect the routes
app.use('/', routes);

//=================== Start the server ==============================
app.listen(port);
appLogs.info('Application Starting');
appLogs.info(`Resting on port ${port}...\n`);
printerJob();
