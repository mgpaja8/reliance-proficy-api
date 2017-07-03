'use strict';

var FormData = require('form-data');
var fs = require('fs');
var https = require('https');

function test(req, res){
  var callback = function (status, json) {
		res.type('application/json');
		res.status(status)
		res.json(json);
		return res;
	};

  function handleRelianceTestCall(callback){
    var form = new FormData();
    form.append('test1.xml', fs.createReadStream('./routes/grv/reliance/test1.xml'),{contentType: 'text/xml'});
    var CRLF = '\r\n';

    form.submit(
    {
        host: 'dev-etq.trans.ge.com',
        port: null,
        path: '/reliance/rest/v1/connectionProfiles/WEB_SERVICE_TEST_CONNECTION_PROFILE_P/test1.xml',
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

  handleRelianceTestCall(callback);
}

module.exports = test;
