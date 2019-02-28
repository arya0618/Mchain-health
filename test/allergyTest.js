/**
@author: Shraddha Kharat
@Version: 1.0.2
@Date: 17/01/2018
@description: DOIT BlockChain project
**/
'use strict';

const express = require('express');
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app');


var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");


const router = express.Router();
require('../routes')(router);
app.use('/', router);
var mlog = require('mocha-logger')
var empty = require('is-empty');
var assert = require('assert');
var should = require("should");

var sinon = require('sinon');
var http = require('http');
var request = require("supertest");
var config = require('config');
var TestIp = config.get('TestIp');
var api = request("http://" + TestIp.host + ":3000")


/***     test case for ALLERGY widget    ***/
describe('ALLERGY widget', function() {
    it("should add ALLERGY details into blockchain", function(done) {

        /*** calling addDataALLERGY api ***/
        request(app)
        api.post('/addData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "SSO_ID": "SSO_ID",
                "ALLERGY_CODE": "ALLERGY_CODE",
                "ALLERGY_DESCRIPTION": "ALLERGY_DESCRIPTION",
                "IS_CURRENT": "IS_CURRENT",
                "SINCE": "SINCE",
                "SINCE_DURATION": "SINCE_DURATION",
                "SEVERITY": "SEVERITY",
                "NOTES": "NOTES",
                "MEASURED_DATE": "11/13/2017",
                "CONFIDENTIALITY_STATUS": "CONFIDENTIALITY_STATUS"

            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.body.should.have.property('SSO_ID');
                // res.body.should.have.property('ALLERGY_CODE');
                // res.body.should.have.property('ALLERGY_DESCRIPTION');
                // res.body.should.have.property('IS_CURRENT');
                // res.body.should.have.property('SINCE');
                // res.body.should.have.property('SINCE_DURATION');
                // res.body.should.have.property('SEVERITY');
                // res.body.should.have.property('NOTES');
                // res.body.should.have.property('MEASURED_DATE');
                // res.body.should.have.property('CONFIDENTIALITY_STATUS');
            //    res.status.should.equal(200);
             //   res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("This data of ALLERGY widget already exist", function(done) {

        /*** calling addDataALLERGY api ***/
        request(app)
        api.post('/addData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "SSO_ID": "SSO_ID",
                "ALLERGY_CODE": "ALLERGY_CODE",
                "ALLERGY_DESCRIPTION": "ALLERGY_DESCRIPTION",
                "IS_CURRENT": "IS_CURRENT",
                "SINCE": "SINCE",
                "SINCE_DURATION": "SINCE_DURATION",
                "SEVERITY": "SEVERITY",
                "NOTES": "NOTES",
                "MEASURED_DATE": "11/13/2017",
                "CONFIDENTIALITY_STATUS": "CONFIDENTIALITY_STATUS"

            })
            .set("Accept", 'application/json')
            .expect(401)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.body.should.have.property('SSO_ID');
                // res.body.should.have.property('ALLERGY_CODE');
                // res.body.should.have.property('ALLERGY_DESCRIPTION');
                // res.body.should.have.property('IS_CURRENT');
                // res.body.should.have.property('SINCE');
                // res.body.should.have.property('SINCE_DURATION');
                // res.body.should.have.property('SEVERITY');
                // res.body.should.have.property('NOTES');
                // res.body.should.have.property('MEASURED_DATE');
                // res.body.should.have.property('CONFIDENTIALITY_STATUS');
                // res.status.should.equal(200);
               // res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Field should not be empty during adding allergy data", function(done) {

        /*** calling addDataALLERGY api ***/
        request(app)
        api.post('/addData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "SSO_ID": "",
                "ALLERGY_CODE": "",
                "ALLERGY_DESCRIPTION": "ALLERGY_DESCRIPTION",
                "IS_CURRENT": "IS_CURRENT",
                "SINCE": "",
                "SINCE_DURATION": "SINCE_DURATION",
                "SEVERITY": "SEVERITY",
                "NOTES": "NOTES",
                "MEASURED_DATE": "11/13/2017",
                "CONFIDENTIALITY_STATUS": "CONFIDENTIALITY_STATUS"
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.body.should.have.property('SSO_ID');
                // res.body.should.have.property('ALLERGY_CODE');
                // res.body.should.have.property('ALLERGY_DESCRIPTION');
                // res.body.should.have.property('IS_CURRENT');
                // res.body.should.have.property('SINCE');
                // res.body.should.have.property('SINCE_DURATION');
                // res.body.should.have.property('SEVERITY');
                // res.body.should.have.property('NOTES');
                // res.body.should.have.property('MEASURED_DATE');
                // res.body.should.have.property('CONFIDENTIALITY_STATUS');
                // res.status.should.equal(200);
                // //res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Should update ALLERGY Status into blockchain", function(done) {

        /*** calling updateDataALLERGY api ***/
        request(app)
        api.post('/updateData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "ID": "7iffhhfhfhh",
                "SSO_ID": "SSO_ID",
                "ALLERGY_CODE": "ALLERGY_CODE",
                "ALLERGY_DESCRIPTION": "ALLERGY_DESCRIPTION",
                "IS_CURRENT": "IS_CURRENT",
                "SINCE": "SINCE",
                "SINCE_DURATION": "SINCE_DURATION",
                "SEVERITY": "SEVERITY",
                "NOTES": "NOTES",
                "MEASURED_DATE": "11/11/2017",
                "CONFIDENTIALITY_STATUS": "U",
                "submittedOn":"2018-02-06T13:19:31.942Z"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.body.should.have.property('ID');
                // res.body.should.have.property('SSO_ID');
                // res.body.should.have.property('ALLERGY_CODE');
                // res.body.should.have.property('ALLERGY_DESCRIPTION');
                // res.body.should.have.property('IS_CURRENT');
                // res.body.should.have.property('SINCE');
                // res.body.should.have.property('SINCE_DURATION');
                // res.body.should.have.property('SEVERITY');
                // res.body.should.have.property('NOTES');
                // res.body.should.have.property('MEASURED_DATE');
                // res.body.should.have.property('CONFIDENTIALITY_STATUS');
                 res.status.should.equal(200);
                // //res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Should delete ALLERGY record from blockchain", function(done) {

        /*** calling deleteDataALLERGY api ***/
        request(app)
        api.post('/deleteData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "ID": "ID"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.body.should.have.property('ID');
                // res.status.should.equal(200);
                //res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Field shoud not be empty during deleting allergy data", function(done) {
        /*** calling deleteDataALLERGY api ***/
        request(app)
        api.post('/deleteData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "ID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
               // res.body.should.have.property('EHRID');
                //res.body.should.have.property('ID');
                res.status.should.equal(400);
                //res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });


    it("Should get ALLERGY summary details from blockchain", function() {

        /*** calling summaryDataALLERGY api ***/
        request(app)
        api.post("/summaryData?WIDGET=ALLERGY")
            .send({
                "EHRID": "Testingcase"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
               // res.body.should.have.property('EHRID');
                res.status.should.equal(200);
                //res.body.data.should.equal(result.message);
                //  done();
            });

    });
    it("Field should not empty during reading allergy summary data", function() {

        /*** calling summaryDataALLERGY api ***/
        request(app)
        api.post("/summaryData?WIDGET=ALLERGY")
            .send({
                "EHRID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
               // res.body.should.have.property('EHRID');
                res.status.should.equal(400);
                //res.body.data.should.equal(result.message);

            });

    });

    it("Should get ALLERGY details from blockchain", function(done) {

        /*** calling readDataALLERGY api ***/
        request(app)
        api.post('/readData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "PERIOD": "365"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                //res.body.should.have.property('EHRID');
                //res.body.should.have.property('PERIOD');
                res.status.should.equal(200);
                //res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Field should not be empty during reading data of ALLERGY", function(done) {

        /*** calling readDataALLERGY api ***/
        request(app)
        api.post('/readData?WIDGET=ALLERGY')
            .send({
                "EHRID": "Testingcase",
                "PERIOD": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.body.should.have.property('PERIOD');
                // res.status.should.equal(200);
              //  res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });
})