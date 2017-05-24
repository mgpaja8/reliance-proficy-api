'use strict';

var winston = require('winston');
var appRootDir = require('app-root-path');
require('winston-daily-rotate-file');
var fs = require('fs');
var logDir = `${appRootDir}/log`;

process.setMaxListeners(0);

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

var tsFormat = () => (new Date()).toLocaleTimeString();

var getLabel = function (callingClassDir) {
	var callingClassRelativePath = '';
	if (callingClassDir !== null) {
		var appRootArray = appRootDir.toString().split('/');
		var appRootArrayLength = appRootArray.length;
		var callingClassArray = callingClassDir.toString().split('/');
		var finalArray = callingClassArray.slice((appRootArrayLength-1));
		finalArray.forEach(function (value) {
			callingClassRelativePath += `/${value}`;
		});
	}
	return callingClassRelativePath;
};

var handleAppLogs = function (callingClassDir) {
	var consoleLogsTransport = new winston.transports.Console({
		timestamp: tsFormat,
		colorize: true,
		handleExceptions: true,
		humanReadableUnhandledException: true,
		level: 'debug'
	});
	var appServerLogsTransport = new winston.transports.DailyRotateFile({
		name: 'appServerLogs',
		level: 'info',
		filename: `${logDir}/-appServerLogs.log`,
		handleExceptions: true,
		json: false,
	  //maxsize: 5242880, //5MB
		maxFiles: 5,
		timestamp: tsFormat,
		datePattern: 'yyyy-MM-dd',
		prepend: true,
		label: getLabel(callingClassDir)
	});
  return new (winston.Logger) ({
		transports: [
			consoleLogsTransport,
			appServerLogsTransport
		]
	});
};

module.exports = {
	appLogs: handleAppLogs
};
module.exports.stream = {
	write: function (message) {
		handleAppLogs(null).info(message);
	}
};
