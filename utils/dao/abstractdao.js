'use strict';

var sql = require('mssql');
var logger = require('../logger');
var appLogs = logger.appLogs(__filename);

function handleExecuteQuery(credentials, queryString, prepareQuery, callback) {
	//Creates the connection. The callback is an absolute necessity for error handling or else
	//the server will crash.
	appLogs.info('Connecting to DB..');
	var connection = new sql.Connection(credentials, function (err) {
		if (err) {
			return callback(500, err);
		}
		var request = new sql.Request(connection);
		request = prepareQuery(request);
		request.query(queryString, function (err, results) {
			if (err) {
				return callback(500, err);
			}
			return callback(200, results);
		});
	});
}
module.exports = {
	executeQuery: handleExecuteQuery
};
