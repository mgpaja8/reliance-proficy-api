'use strict'
var FormData = require('form-data');
var fs = require('fs');
var https = require('https');
var appRoot = require('app-root-path');
var reliance = require('../config/profiles.json').reliance.dev.host;

var getNCMR = function(profncmr, callback){
  var form = new FormData();
  var CRLF = '\r\n';

  form.submit(
  {
      host: reliance,
      port: null,
      path: '/reliance/rest/v1/datasources/NCMR_FOR_PROFICY_P/execute?VAR_PROF_NCMR=' + profncmr,
      method: 'GET',
      headers: {
          'authorization': 'Basic UmVsaWFuY2U6UGE1NXdvcmQ='
      }
  },
  function(err, res) {
    if(err){
      callback(500, err);
    }
    var str = '';

    res.on('data', function (chunk) {
      str += chunk;
    });
    res.on('end', function () {
      callback(200, str);
    });
  });
}

var createNCMR = function(filename, callback){
  var form = new FormData();
  form.append(filename, fs.createReadStream(appRoot + '/' + filename),{contentType: 'text/xml'});
  var CRLF = '\r\n';

  form.submit(
  {
      host: reliance,
      port: null,
      path: '/reliance/rest/v1/connectionProfiles/PROF_NCMR_WEB_API_P/' + filename,
      method: 'POST',
      headers: {
          'authorization': 'Basic UmVsaWFuY2U6UGE1NXdvcmQ=',
          'Content-Type': 'multipart/mixed; boundary=' + form.getBoundary()
      }
  },
  function(err, res) {
    if(err){
      callback(500, err);
    }
    var str = '';

    res.on('data', function (chunk) {
      str += chunk;
    });
    res.on('end', function () {
      callback(200, str);
    });
  });
}

var closeNCMR = function(filename, callback){
  var form = new FormData();
  form.append(filename, fs.createReadStream(appRoot + '/' + filename),{contentType: 'text/xml'});
  var CRLF = '\r\n';

  form.submit(
  {
      host: reliance,
      port: null,
      path: '/reliance/rest/v1/connectionProfiles/PROFICY_NCMR_CLOSING_WEB_API_P/' + filename,
      method: 'POST',
      headers: {
          'authorization': 'Basic UmVsaWFuY2U6UGE1NXdvcmQ=',
          'Content-Type': 'multipart/mixed; boundary=' + form.getBoundary()
      }
  },
  function(err, res) {
    if(err){
      callback(500, err);
    }
    var str = '';

    res.on('data', function (chunk) {
      str += chunk;
    });
    res.on('end', function () {
      callback(200, str);
    });
  });
}

module.exports = {
  createNCMR: createNCMR,
  getNCMR: getNCMR,
  closeNCMR: closeNCMR
}
