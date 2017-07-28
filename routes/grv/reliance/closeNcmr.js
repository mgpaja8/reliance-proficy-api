'use strict';
var closeNCMR = require('../../../utils/handleRelianceCall').closeNCMR;
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
    closeNCMR(filename, callback);
  }

  var deleteXML = function(){
    fs.unlinkSync(appRoot + '/' + filename);
  }

  appLogs.info(JSON.stringify(req.body, null, 4));
  var data = req.body.data;
  var ncmrdata = {
    ncmrNum:                  data.NCMRNumber ? data.NCMRNumber : 'test',
    actionTaken:              data.RecordActionTaken ? data.RecordActionTaken : 'test',
    closingComments:          data.closingComments ? data.closingComments : 'Closed from Proficy UI'
  }

  var filename = 'ncmr' + new Date().getTime() + '.xml';

  createXML(filename, ncmrdata, makeRellianceCall);
}

module.exports = ncmr;
