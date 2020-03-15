const decode = require('unescape');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { parseString } = require('xml2js');

class ObieeBase {

	constructor() {
		this.wsdl = 'v12';
		this.obieeURL = 'http://192.168.234.130:9502/analytics-ws/saw.dll';
		this.obieeSessionId = 'pk21d2jpj08eb44o7jj1id8l33ttg6728kqnnn58dcc0cb31';
	}

	/** SOAP header required for all OBIEE web service requests */
	obieeSOAPHeader() {
		return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:${this.wsdl}="urn://oracle.bi.webservices/${this.wsdl}" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/>`;
	}

	// Parse the response text from the server
	parseResponse(response) {
		response = this.cleanupXML(response);
		parseString(response, (err, result) => {
			const sessionId = result.length;
			// console.log('sessionId',sessionId);
			// console.log(result);
			return (result);
		});
	}

	/** Clean up bad characters found in XML repsonses. */
	cleanupXML(xml) {
		xml = xml.replace(/\x00/g, ''); // Remove any hexadecimal null characters
		xml = xml.replace(/&shy;/g, '');
		return xml;
	}

	wsCall(service, payload, successFunc, errorFunc) {
		let url = this.obieeURL + '?SOAPImpl=' + service;
		this.soapRequest(url, payload, successFunc);
	}

	soapRequest(url, payload, successFunc) {
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.open('POST', url, true);

		// build SOAP request
		xmlhttp.onreadystatechange = () => {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					successFunc(decode(xmlhttp.responseText));
				}
			}
		}

		// Send the POST request
		xmlhttp.setRequestHeader('Content-Type', 'text/xml');
		xmlhttp.send(payload);
	}
}

module.exports.ObieeBase = ObieeBase;
