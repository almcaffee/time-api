require('dotenv').config();
var express = require('express');
var http = require('http');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

app.use(bodyParser.urlencoded({extended: true})); //support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.json()); //support parsing of application/json type post data

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "DELETE,GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var port = process.env.PORT;
var apiRouter = require('./apiRoutes')();

app.use('/api', apiRouter);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  } else {
    next(err);
  }
});

app.get('*', function (req, res) {
    res.status(404).json({success: false, message: 'Incorrect API path'});
});

process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});

http.createServer(app).listen(port, function () {
    console.log('The api is running on port '+port);
});
