'use strict';
var errorconfig = require('/config/errorconfig.json');

function ErrorJson(errorCode, errorMessage, error) {
	this.errorCode = errorCode;
	this.errorMessage = errorMessage;
	this.error = error
}

function validateInput(inputs) {
	var errJson;
	for (var i in inputs) {
		if (inputs[i] === undefined || inputs[i] === null || inputs[i] === '') {
			var err = `Invalid ${i} or ${i} not provided`;
			var badRequest = errorconfig.BAD_REQUEST;
			var errJson = new ErrorJson(badRequest.errorCode, badRequest.errorMsg, err);
			break;
		}
	}
	return errJson;
}

module.exports = {
	validate: validateInput
};
