'use strict'
var FormData = require('form-data');
var fs = require('fs');
var https = require('https');

var handleRelianceTestCall = function(filename, callback){
  var form = new FormData();
  form.append(filename, fs.createReadStream('./routes/grv/reliance/' + filename),{contentType: 'text/xml'});
  var CRLF = '\r\n';

  form.submit(
  {
      host: 'dev-etq.trans.ge.com',
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

module.exports = handleRelianceTestCall;
