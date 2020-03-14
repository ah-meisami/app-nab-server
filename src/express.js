var express = require('express')
var app = express()
var cors = require('cors')
const port = 3002;

app.use(cors());
app.disable('etag'); //this causes refreshing response and not caching in client web browser. stattus code changed from 304 to 200.

app.get('/', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})