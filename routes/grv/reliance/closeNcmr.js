'use strict';
var closeNCMR = require('../../../utils/handleRelianceCall').closeNCMR;
var createXML = require('../../../utils/xml-writer.js');
var fs = require('fs');
var appRoot = require('app-root-path');
var logger = require('../../../utils/logger');
var appLogs = logger.appLogs(__filename);
var abstractdao = require('../../../utils/dao/abstractdao');
var config = require('../../../config/profiles.json').grv.mes_dev;
var query = require('../../../sql/queries/closeNCMR.json').query;

var prepareQuery = function (request) {
	return request;
};

function ncmr(req, res){
  var callback = function (status, json) {
    parseResults(json);
    deleteXML();
		res.type('application/json');
		res.status(status);
		res.send(json);
		return res;
	};

  var callReliance = function(status, json){
    if(status === 200){
      return abstractdao.executeQuery(credentials, finalQuery(), prepareQuery, callback);
    }

    callback(status, json);
  }

  var credentials = {
		user: config.username,
		password: config.password,
		server: config.server,
		database: config.database,
		port: config.port
	};

  appLogs.info(JSON.stringify(req.body, null, 4));
  var data = req.body.data;
  var ncmrdata = {
    ncmrNum:                  data.NCMRNumber ? data.NCMRNumber : 'test',
    actionTaken:              data.RecordActionTaken ? data.RecordActionTaken : 'test',
    closingComments:          data.closingComments ? data.closingComments : 'Closed from Proficy UI'
  }

  var filename = 'ncmr' + new Date().getTime() + '.xml';

  var replaceAll = function replaceAll(str, find, replace) {
		return str.replace(new RegExp(find, 'g'), replace);
	};

  var finalQuery = function(){
    return replaceAll(query, 'REPLACE_NCMR_NUMBER', ncmrdata.ncmrNum);
  }

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
    closeNCMR(filename, callReliance);
  }

  var deleteXML = function(){
    fs.unlinkSync(appRoot + '/' + filename);
  }

  createXML(filename, ncmrdata, makeRellianceCall);
}

module.exports = ncmr;
