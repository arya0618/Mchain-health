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


var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");


var config = require('config');
var TestIp = config.get('TestIp');
var api = request("http://" + TestIp.host + ":3000")


/***     test case for Bloodpressure widget    ***/
describe('Bloodpressure widget', function() {
    it("Should add Bloodpressure data into blockchain", function(done) {

        /*** calling addDataBloodpressure api ***/
        request(app)
        api.post('/addData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "ehr",
                "SSO_ID": "SSO_ID",
                "MEASURED_DATE": "01/23/2018",
                "SYSTOLIC": "esdeedededsd",
                "DIASTOLIC": "DIASTOLIC",
                "NOTES": "NOTES234",
                "CONFIDENTIALITY_STATUS": "L"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('DIASTOLIC');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.should.have.property('SYSTOLIC');
                res.body.should.have.property('NOTES');
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("This data of BLOODPRESSURE widget already exist", function(done) {

        /*** calling addDataBloodpressure api ***/
        request(app)
        api.post('/addData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "ehr",
                "SSO_ID": "SSO_ID",
                "MEASURED_DATE": "01/23/2018",
                "SYSTOLIC": "esdeedededsd",
                "DIASTOLIC": "DIASTOLIC",
                "NOTES": "NOTES234",
                "CONFIDENTIALITY_STATUS": "L"
            })
            .set("Accept", 'application/json')
            .expect(401)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('DIASTOLIC');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.should.have.property('SYSTOLIC');
                res.body.should.have.property('NOTES');
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field should not be empty during adding Bloodpressure data", function(done) {

        /*** calling addDataBloodpressure api ***/
        request(app)
        api.post('/addData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "ehr",
                "SSO_ID": "SSO_ID",
                "MEASURED_DATE": "01/23/2018",
                "SYSTOLIC": "",
                "DIASTOLIC": "",
                "NOTES": "NOTES234",
                "CONFIDENTIALITY_STATUS": "L"
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('DIASTOLIC');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.should.have.property('SYSTOLIC');
                res.body.should.have.property('NOTES');
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Should get Bloodpressure data from blockchain", function(done) {

        /*** calling readDataBloodpressure api ***/
        request(app)
        api.post('/readData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "test",
                "PERIOD": "7"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('PERIOD');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);

                //done();

            });
        done();
    });
    it("Field should not be empty during reading bloodpressure data", function(done) {

        /*** calling readDataBloodpressure api ***/
        request(app)
        api.post('/readData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "ehr",
                "PERIOD": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('PERIOD');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);

                //done();

            });
        done();
    });

    it("Should update Bloodpressure status into blockchain", function(done) {

        /*** calling updateDataBloodpressure api ***/
        request(app)
        api.post('/updateData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "12344bh",
                "ID": "7ifkfkfkfkf",
                "SSO_ID": "SSO_ID",
                "MEASURED_DATE": "01/23/2018",
                "SYSTOLIC": "esdesd",
                "DIASTOLIC": "DIASTOLIC",
                "NOTES": "NOTES",
                "CONFIDENTIALITY_STATUS": "L"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('DIASTOLIC');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.should.have.property('SYSTOLIC');
                res.body.should.have.property('NOTES');
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Should get Bloodpressure summary from blockchain", function(done) {

        /*** calling summaryDataBloodpressure api ***/
        request(app)
        api.post('/summaryData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "test"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field should not empty during reading Bloodpressure summary data", function(done) {

        /*** calling summaryDataBloodpressure api ***/
        request(app)
        api.post('/summaryData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Should delete Bloodpressure record from blockchain", function(done) {

        /*** calling deleteDataBloodpressure api ***/
        request(app)
        api.post('/deleteData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "test",
                "ID": '7jeiou7'
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field should not be empty during deleting data of bloodpressure", function(done) {

        /*** calling deleteDataBloodpressure api ***/
        request(app)
        api.post('/deleteData?WIDGET=BLOODPRESSURE')
            .send({
                "EHRID": "ehr",
                "ID": ''
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });

})