'use strict';
var createNCMR = require('./handleRelianceCall').createNCMR;
var createXML = require('../../../utils/xml-writer.js');
var fs = require('fs');

function ncmr(req, res){
  var callback = function (status, json) {
    parseResults(json);
    deleteXML();
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

  var makeRellianceCall = function(filename, callback){
    createNCMR(filename, callback);
  }

  var deleteXML = function(){
    fs.unlinkSync('./routes/grv/reliance/' + filename);
  }

  var profncmr = {
    proficyNcmr: '070320171400-TestNCMR',
    serialNumber: '1111',
    detectedAtWorkstation: 'TEST',
    defectSourceWorkstation: 'TEST',
    defectDrilldown: 'Electrical : Incorrect Lead Bend',
    defectDescription: 'test',
    requirementDescription: 'test',
    partNumber: '84E905137ABP5',
    defectQuantity: '1',
    ncmrUser: '501996057'
  }

  var filename = 'ncmr' + new Date().getTime() + '.xml';

  createXML(filename, profncmr, callback, makeRellianceCall);
}

module.exports = ncmr;
