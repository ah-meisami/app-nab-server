const {ObieeBase} = require('./obiee-base');

class ObieeSession extends ObieeBase {
	constructor() {
		super();
	}

	logon(user, pass, successFunc, errFunc) {
		let soapMessage = this.obieeSOAPHeader();
		soapMessage += `<soapenv:Body><${this.wsdl}:logon><${this.wsdl}:name>${user}</${this.wsdl}:name><${this.wsdl}:password>${pass}</${this.wsdl}:password></${this.wsdl}:logon></soapenv:Body></soapenv:Envelope>`;

		this.wsCall('nQSessionService', soapMessage, (response) => {
			successFunc(response);
		});
	}
}

module.exports.ObieeSession = ObieeSession;

const obiee = new ObieeSession();
const x = obiee.logon('weblogic', 'ora2200\$\$', response => {
	console.log(response);
});