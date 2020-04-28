const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./route.js');
const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
	key: fs.readFileSync('myCA.key'),
  	cert: fs.readFileSync('myCA.pem')
};

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, navPlugin');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Access-Control-Allow-Headers, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/', route);

app.use(express.static(__dirname + '/public',{ redirect : false }));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpsServer.listen(3001, () => {
	console.log('HTTPS Server running on port 3001');
});