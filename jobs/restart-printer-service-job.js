'use strict';
var CronJob = require('cron').CronJob;
var logger = require('../utils/logger');
var appLogs = logger.appLogs(__filename);
var abstractdao = require('../utils/dao/abstractdao');
var config = require('../config/profiles.json').grv.mes_dev;
var query = require('../sql/queries/failedPrintJobsCount.json').query;
var exec = require('child_process').exec;

var prepareQuery = function (request) {
	return request;
};

var credentials = {
  user: config.username,
  password: config.password,
  server: config.server,
  database: config.database,
  port: config.port
};

var restartPrinterServiceJob = new CronJob({
  cronTime: '0 * * * * *',
  onTick: function(){
    appLogs.info("restart-printer-service-job started");
    handleOnTick();
  },
  start: false,
  timeZone: 'America/New_York'
});

var startRestartPrinterServiceJob = function(){
  restartPrinterServiceJob.start();
  appLogs.info("restart-printer-service-job is started");
}

var handleOnTick = function(){
  return makeDBCall();
}

var makeDBCall = function(){
  return abstractdao.executeQuery(credentials, query, prepareQuery, dbCallback);
}

var dbCallback = function(status, json){
  if(status === 200){
    var count = json[0].Count;
    if( count >= 1 ){
      return restartService();
    }
    return appLogs.info("restart-printer-service-job completed");
  }
  return appLogs.error("restart-printer-service-job");
}

var restartService = function(){
  exec('net stop "Proficy Traveler Task Service" && net start "Proficy Traveler Task Service"', function (error, stdout, stderr) {
    appLogs.info(stdout);
    if (error !== null) {
      appLogs.error('Error executing batch script: ' + error);
    }
  });
}

module.exports = {
  start: startRestartPrinterServiceJob
}
