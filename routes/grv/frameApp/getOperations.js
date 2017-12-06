'use strict';
var sql = require('mssql');
var logger = require('../../../utils/logger');
var appLogs = logger.appLogs(__filename);
var config = require('../../../config/profiles.json').grv.mes;

function getOperations(req, res){
  var callback = function (status, json) {
		res.type('application/json');
		res.status(status);
		res.send(json);
		return res;
	};

  var credentials = {
		user: config.username,
		password: config.password,
		server: config.server,
		database: config.database,
		port: config.port
	};

  var areaId = req.query.areaId;
  var dbConn = new sql.Connection(credentials);
  dbConn.connect()
    .then( function() {
      var request = new sql.Request(dbConn);
        request.input('AreaId', sql.Int, areaId)
        .execute("spLocal_GETrans_FrameVisualization_GetOperationCompletions")
          .then(function (recordSet) {
            dbConn.close();
            callback(200, recordSet[0]);
          })
          .catch(function (err) {
            console.log(err);
            dbConn.close();
            callback(400, {
              "message": 'something went wrong while executing sp'
            });
          });
    })
    .catch( function() {
      callback(400, {
        "message": 'something went wrong while trying to connect to db'
      });
    });
}

module.exports = getOperations;
