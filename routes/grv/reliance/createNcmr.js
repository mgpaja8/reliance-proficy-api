'use strict';
var createNCMR = require('../../../utils/handleRelianceCall').createNCMR;
var createXML = require('../../../utils/xml-writer.js');
var fs = require('fs');
var appRoot = require('app-root-path');
var logger = require('../../../utils/logger');
var appLogs = logger.appLogs(__filename);

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
    fs.unlinkSync(appRoot + '/' + filename);
  }

  //console.log(JSON.stringify(req.body, null, 4));
  appLogs.info(JSON.stringify(req.body, null, 4));
  var data = req.body.data;
  var profncmr = {
    proficyNcmr:              data.ProficyNCMR ? data.ProficyNCMR : 'test',
    serialNumber:             data.SerialNumber ? data.SerialNumber : 'test',
    detectedAtWorkstation:    data.DefectAtWorkstation ? data.DefectAtWorkstation : 'test',
    defectSourceWorkstation:  data.DefectSourceWorkstation ? data.DefectSourceWorkstation : 'test',
    defectDrilldown:          data.DefectDrilldown ? data.DefectDrilldown : 'test',
    defectDescription:        data.DefectDescription ? data.DefectDescription : 'test',
    requirementDescription:   data.RequirementDescription ? data.RequirementDescription : 'test',
    partNumber:               data.PartNumber ? data.PartNumber : 'test',
    defectQuantity:           data.DefectQuantity ? data.DefectQuantity : 0,
    ncmrUser:                 data.UserName ? data.UserName : 'test',
    ncmrLocation:             data.Location ? data.Location : 'test'
  }
  var parseWSname = function(str){
    var res = str.split(': ');
    console.log('ws:' + res[1]);
    return res[1];
  }


  var filename = 'ncmr' + new Date().getTime() + '.xml';

  createXML(filename, profncmr, callback, makeRellianceCall);
}

module.exports = ncmr;
