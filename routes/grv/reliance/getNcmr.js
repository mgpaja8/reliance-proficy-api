'use strict';
var getNCMR = require('../../../utils/handleRelianceCall').getNCMR;

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

  var profncmr = req.query.profncmr;
  if(!profncmr) return callback(500, {message: 'Please provide proficy NCMR number'});

  getNCMR(profncmr, callback);
}

module.exports = ncmr;
