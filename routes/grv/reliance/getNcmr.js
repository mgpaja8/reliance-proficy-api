'use strict';
var getNCMR = require('../../../utils/handleRelianceCall').getNCMR;

function ncmr(req, res){
  var callback = function (status, json) {
    if (status === 200) {
			json = parseResults(json);
		}
		res.type('application/json');
		res.status(status)
		res.send(json);
		return res;
	};

  var parseResults = function (json) {
    var ncmr = JSON.parse(json).Records[0].Columns[0];
    return ncmr;
	};

  var profncmr = req.query.profncmr;
  if(!profncmr) return callback(500, {message: 'Please provide proficy NCMR number'});

  getNCMR(profncmr, callback);
}

module.exports = ncmr;
