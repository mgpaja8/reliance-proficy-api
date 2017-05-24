'use strict';

var sql = require('mssql');
var fs = require('fs');
var logger = require('/utils/logger');
var appLogs = logger.appLogs(__filename);
var shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

function handleCallProcedure(credentials, spPath, finalizeTempSPFile, callback) {
	//Creates the connection. The callback is an absolute necessity for error handling or else
	//the server will crash.
	var connection = new sql.Connection(credentials, function (err) {
		if (err) {
			return callback(500, err);
		}
		var request = new sql.Request(connection);
		fs.readFile(spPath, function (err, data) {
			if (err) {
				return callback(500, err);
			}
			var tempStoredProc = data.toString();
			//IMPORTANT: Put # in front of every uniqueId. This ensures that the Stored Procedure is only temporary.
			var uniqueId = `#${shortid.generate()}`;
			appLogs.info(`uniqueId ${uniqueId}`);
			//IMPORTANT: Replace the string STORED_PROC_UNIQUE_ID with uniqueId. This ensures that the Stored Procedure is only temporary.
			tempStoredProc = tempStoredProc.replace('STORED_PROC_UNIQUE_ID', uniqueId);
			tempStoredProc = finalizeTempSPFile(tempStoredProc);
			request.batch(tempStoredProc, function (err) {
				if (err) {
					return callback(500, err);
				}
				request.query(`EXEC DBO.${uniqueId}`, function (err, results) {
					if (err) {
						return callback(500, err);
					}
					callback(200, results);
					return;
				});
			});
		});
	});
}
module.exports = {
	callProcedure: handleCallProcedure
};
