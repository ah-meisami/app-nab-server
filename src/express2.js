const URL = 'http://192.168.234.130:9502/analytics-ws/saw.dll/wsdl/v12';

var express = require('express');
var cors = require('cors');
var soap = require('soap');
var app = express();

app.use(cors()); //this add CORS support to app.
app.disable('etag'); //this causes refreshing response and not caching in client web browser. stattus code changed from 304 to 200.
app.use(express.json()) //this allows to get application/json body from request using req.body .

app.post('/getSubjectAreas', function (req, res, next) {
  soap.createClient(URL, (err, client) => {
    client.getSubjectAreas(req.body, (err, result) => {
      res.json(result);//set the server response as json and send it.
      // console.log(Object.keys(result.subjectArea).length);
    });
  });
});

app.post('/getCurUser', function (req, res, next) {
  soap.createClient(URL, (err, client) => {
    client.getCurUser(req.body, (err, result) => {
      res.json(result);//set the server response as json and send it.
      // console.log(result.return.$value);
    });
  });
});

app.post('/logon', function (req, res, next) {
  soap.createClient(URL, (err, client) => {
    client.logon(req.body, (err, result) => {
      res.json(result);//set the server response as json and send it.
      // console.log(result.sessionID.$value);
    });
  });
});

app.post('/logoff', function (req, res, next) {
  soap.createClient(URL, (err, client) => {
    client.logoff(req.body, (err, result) => {
      res.json(result);//set the server response as json and send it.
      // console.log(result.sessionID.$value);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
});


/*
for execution:
http://192.168.234.77:3000/logon

{
  "name": "weblogic",
  "password": "ora2200$$"
}

{
    "sessionID": {
        "attributes": {
            "xsi:type": "xsd:string"
        },
        "$value": "vuuvu7ahv70mufbfgii3uhvh9a4dt65un9td47q83dgcehaa"
    }
}
-----------------------------------------------------------------------
http://192.168.234.77:3000/getSubjectAreas

{
	"sessionID": "vuuvu7ahv70mufbfgii3uhvh9a4dt65un9td47q83dgcehaa"
}

{
    "subjectArea": [
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"ATM\"",
            "displayName": "ATM",
            "description": "",
            "businessModel": "\"ATM\""
        },
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"ATM2\"",
            "displayName": "ATM2",
            "description": "",
            "businessModel": "\"ATM2\""
        },
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"SBA Reciver\"",
            "displayName": "SBA Reciver",
            "description": "",
            "businessModel": "\"z\""
        },
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"SBA Sender\"",
            "displayName": "SBA Sender",
            "description": "",
            "businessModel": "\"z\""
        },
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"Sample Sales Lite\"",
            "displayName": "Sample Sales Lite",
            "description": "Sample Subject Area for 11g Lite Sample Application (XML files sourced only). Bd.11028",
            "businessModel": "\"SampleApp Lite\""
        },
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"Sample Targets Lite\"",
            "displayName": "Sample Targets Lite",
            "description": "Sample Subject Area for 11g Lite Sample Application (XML files sourced only).",
            "businessModel": "\"SampleApp Lite\""
        },
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"دمو\"",
            "displayName": "دمو",
            "description": "",
            "businessModel": "\"دمو\""
        },
        {
            "attributes": {
                "xsi:type": "sawsoap:SASubjectArea"
            },
            "name": "\"شاخص شعب\"",
            "displayName": "شاخص شعب",
            "description": "",
            "businessModel": "\"شاخص شعب\""
        }
    ]
}
*/