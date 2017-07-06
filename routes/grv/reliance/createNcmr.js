'use strict';
var createNCMR = require('../../../utils/handleRelianceCall').createNCMR;
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

  var data = req.body.data;
  var profncmr = {
    proficyNcmr:              data.ProficyNCMR ? data.ProficyNCMR : 'test',
    serialNumber:             data.SerialNumber ? data.SerialNumber : 'test',
    //detectedAtWorkstation:    data.DefectAtWorkstation ? data.DefectAtWorkstation : 'test',
    //defectSourceWorkstation:  data.DefectSourceWorkstation ? data.DefectSourceWorkstation : 'test',
    detectedAtWorkstation:    'TEST',
    defectSourceWorkstation:  'TEST',
    defectDrilldown:          data.DefectDrilldown ? data.DefectDrilldown : 'test',
    defectDescription:        data.DefectDescription ? data.DefectDescription : 'test',
    requirementDescription:   data.RequirementDescription ? data.RequirementDescription : 'test',
    partNumber:               data.PartNumber ? data.PartNumber : 'test',
    defectQuantity:           data.DefectQuantity ? data.DefectQuantity : 0,
    ncmrUser:                 data.UserName ? data.UserName : 'test'
  }

  var filename = 'ncmr' + new Date().getTime() + '.xml';

  createXML(filename, profncmr, callback, makeRellianceCall);
}

module.exports = ncmr;
