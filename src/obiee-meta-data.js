const {ObieeBase} = require('./obiee-base');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { parseString } = require('xml2js');

class ObieeMetaData extends ObieeBase {
	constructor() {
		super();
	}

	getSubjectAreas(successFunc, errFunc) {
		let soapMessage = this.obieeSOAPHeader();
		soapMessage += `<soapenv:Body><${this.wsdl}:getSubjectAreas><${this.wsdl}:sessionID>${this.obieeSessionId}</${this.wsdl}:sessionID></${this.wsdl}:getSubjectAreas></soapenv:Body></soapenv:Envelope>`;
		this.wsCall('metadataService', soapMessage, (response) => {
			successFunc(response);
		});
	}
}

const obiee = new ObieeMetaData();
obiee.getSubjectAreas(response => {
	console.log(response);
});
