/**
@author: Piyusha Patel
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




//-----------test case for body temperature-----------------------------//   
describe('Body Temperature', function() {
    it("should add Body Temperature Status into blockchain", function(done) {
        request(app)
        api.post('/addData?WIDGET=BODYTEMPERATURE')
            .send({
                "EHRID": "test",
                "SSO_ID": "abc12345",
                "BODY_TEMP_VALUE": "66",
                "MEASURED_DATE": "02/01/2018",
                "NOTES": "high fever + cold",
                "CONFIDENTIALITY_STATUS": "L"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('BODY_TEMP_VALUE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.status.should.equal(200);
                //res.body.error.should.equal(false);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("should update Body Temperature Status into blockchain", function(done) {
        request(app)
        api.post('/updateData?WIDGET=BODYTEMPERATURE')
            .send({
                "EHRID": "test",
                "ID": "7ifkfkfkf",
                "SSO_ID": "12345",
                "BODY_TEMP_VALUE": "100",
                "MEASURED_DATE": "02/01/2018",
                "NOTES": "high fever",
                "CONFIDENTIALITY_STATUS": "U"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('BODY_TEMP_VALUE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.status.should.equal(200);
                //res.body.error.should.equal(false);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("should get Body Temperature Status from blockchain", function(done) {
        request(app)
        api.post('/readData?WIDGET=BODYTEMPERATURE')
            .send({
                "EHRID": "test",
                "PERIOD": "500"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('PERIOD');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);

            });
        done();
    });
    it("feild should not be empty during reading body temperature data", function(done) {
        request(app)
        api.post('/readData?WIDGET=BODYTEMPERATURE')
            .send({
                "EHRID": "",
                "PERIOD": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('PERIOD');
                res.status.should.equal(400);
                res.body.data.should.equal(result.message);

            });
        done();
    });
    it("should get Body Temperature_Summary Status from blockchain", function(done) {
        request(app)
        api.post('/summaryData?WIDGET=BODYTEMPERATURE')
            .send({
                "EHRID": "test"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.status.should.equal(200);

                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });


    it("should delete Body Temperature record from blockchain", function(done) {
        request(app)
        api.post('/deleteData?WIDGET=BODYTEMPERATURE')
            .send({
                "EHRID": "test",
                "ID": "7ifkfkfkfkf"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');

                res.status.should.equal(200);
                //res.body.error.should.equal(false);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });


    it("feild shoild not be empty during deleting data of body-temprature", function(done) {
        request(app)
        api.post('/deleteData?WIDGET=BODYTEMPERATURE')
            .send({
                "EHRID": "",
                "ID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');

                res.status.should.equal(400);
                //res.body.error.should.equal(false);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });
});
