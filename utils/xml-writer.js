'use strict'
var XMLWriter = require('xml-writer');
var fs = require('fs');
var appRoot = require('app-root-path');

var writeXML = function(filename, obj, callback, makeRellianceCall){
  if(obj === null) return 'Passed object in null';

  var ws = fs.createWriteStream(appRoot + '/' + filename);

  ws.on('close', function() {
    makeRellianceCall(filename, callback);
  });

  var xw = new XMLWriter(true, function(string, encoding) {
    ws.write(string, encoding);
  });

  xw.startDocument('1.0', 'UTF-8');
  xw.startDocType('profncmr').endDocType();
  xw.startElement('profncmr').writeAttribute('lang','en');

  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      xw.writeElement(key, obj[key]);
    }
  }

  xw.endElement();

  ws.end();
}

module.exports = writeXML;
