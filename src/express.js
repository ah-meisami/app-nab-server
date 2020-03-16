const { ObieeBase } = require('./obiee-base');
var express = require('express')
var app = express()
var cors = require('cors')
const port = 3002;

app.use(cors()); //this add CORS support to app.
app.disable('etag'); //this causes refreshing response and not caching in client web browser. stattus code changed from 304 to 200.

app.use(function (req, res, next) { //this allows to get the raw body from request using rawBody.
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function (chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function () {
    next();
  });
});

const obieeBase = new ObieeBase();

app.post('/getObieeRes/', function (req, res, next) {
  const service = req.query.service;
  const payload = req.rawBody;

  obieeBase.wsCall(service, payload, response => {
    res.type('application/xml'); //set the server response as xml.
    res.send(response);
  });
})

app.post('/getSubjectAreas', function (req, res, next) {
  var soap = require('soap');
  var url = 'http://192.168.234.130:9502/analytics-ws/saw.dll/wsdl/v12';

  var args = {
    sessionID: 'su51td2ro73je5ot15nq45744jldo3kjs3ppb228f0nrtr8u'
  };

  soap.createClient(url, (err, client) => {
    client.getSubjectAreas(args, (err, result) => {
      res.type('application/json'); //set the server response as xml.
      res.send(result);
      console.log(Object.keys(result.subjectArea).length);
    });
  });



})

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})


/*
for execution:
1.in command prompt call: nodemon.cmd .\src\express.js
2.in Postman create a POST request: http://localhost:3002/getObieeRes/
3.in Postman create new query parameter: service = nQSessionService
4.in Postman put sample raw body: <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v12="urn://oracle.bi.webservices/v12" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body><v12:logon><v12:name>weblogic</v12:name><v12:password>ora2200$$</v12:password></v12:logon></soapenv:Body></soapenv:Envelope>


for execution:
http://localhost:3002/getObieeRes/?service=metadataService

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v12="urn://oracle.bi.webservices/v12">
   <soapenv:Header/>
   <soapenv:Body>
      <v12:getSubjectAreas>
         <v12:sessionID>fdu3vnhoi0sil5rjmht036p0d32dqbt6alciv73kpnp4l6ip</v12:sessionID>
      </v12:getSubjectAreas>
   </soapenv:Body>
</soapenv:Envelope>
*/