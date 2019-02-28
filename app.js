/* jshint node: true */
/**
@author: dhananjay patil
@version: 1.0.2
@date: 15/01/2018
@Description: DOIT BlockChain project
**/
//this is the start of the application 
//from here the blockchain enviornment setup would start and our node js port for webservice would also start running

'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loggerpac = require('morgan');
const router = express.Router();
var request = require('request');


var Promise = require('bluebird');
var log4js = require('log4js');
var logger=log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' });
app.use(logger);
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

module.exports = router;

app.use(bodyParser.json());



const port = process.env.PORT || 3000;
const server =app.listen(port);

app.use(bodyParser.json());
app.use(loggerpac('dev'));

require('./routes')(router);
app.use(function(req, res, next){
    res.header("Content-Security-Policy", "default-src 'self';script-src 'self';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
    next();
});
app.use('/', router);


app.use(bodyParser.urlencoded({ extended: true }));
console.log(`EHR Node Application v0.21 is now running on port ${port}`);