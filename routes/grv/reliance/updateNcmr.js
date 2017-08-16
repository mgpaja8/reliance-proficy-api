'use strict';
var logger = require('../../../utils/logger');
var appLogs = logger.appLogs(__filename);

function ncmr(req, res){
  var callback = function (status, json) {
    parseResults(json);
		res.type('application/json');
		res.status(status)
		res.send(json);
		return res;
	};

  var parseResults = function (json) {
    try {
        JSON.parse(json);
    }
    catch (e) {
        return JSON.stringify(json);
    }
    return json;
	};

  appLogs.info(JSON.stringify(req.body, null, 4));

  callback(200, {message: 'Data suscessfuly received'});
}

module.exports = ncmr;
