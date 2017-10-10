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

  var makeRellianceCall = function(filename){
    createNCMR(filename, callback);
  }

  var deleteXML = function(){
    fs.unlinkSync(appRoot + '/' + filename);
  }

  appLogs.info(JSON.stringify(req.body, null, 4));

  var data = req.body.data;
  var profncmr = {
    proficyNcmr:              data.ProficyNCMR ? data.ProficyNCMR : 'NOT ENTERED',
    serialNumber:             data.SerialNumber ? data.SerialNumber : 'NOT ENTERED',
    detectedAtWorkstation:    data.DefectAtWorkstation ? data.DefectAtWorkstation : 'NOT ENTERED',
    defectSourceWorkstation:  data.DefectSourceWorkstation ? data.DefectSourceWorkstation : 'NOT ENTERED',
    defectDrilldown:          data.DefectDrilldown ? data.DefectDrilldown : 'NOT ENTERED',
    defectDescription:        data.DefectDescription ? data.DefectDescription : 'NOT ENTERED',
    requirementDescription:   data.RequirementDescription ? data.RequirementDescription : 'NOT ENTERED',
    partNumber:               data.PartNumber ? data.PartNumber : 'NOT SPECIFIED',
    defectQuantity:           data.DefectQuantity ? data.DefectQuantity : 0,
    ncmrUser:                 data.UserName ? data.UserName : 'NOT ENTERED',
    ncmrLocation:             data.Location ? data.Location : 'NOT ENTERED',
    WorkOrder:                data.WorkOrder ? data.WorkOrder : 'NOT ENTERED',
    ExpressReworkFlag:        data.ExpressRework ? data.ExpressRework : 0,
    DispositionInstructions:  data.DispositionInstructions ? data.DispositionInstructions : '',
    NcmrLocation:             data.Location ? data.Location : ''
  }

  var filename = 'ncmr' + new Date().getTime() + '.xml';

  createXML(filename, profncmr, makeRellianceCall);
}

module.exports = ncmr;
