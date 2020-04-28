const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.route('/').get(function(req, res) {
	res.end("hi");
});

router.route('/auth/facebook/callback').get(function(req, res) {
	console.log("hello");
	res.json("hello");
});

module.exports = router;