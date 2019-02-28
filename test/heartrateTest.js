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
var config = require('config');
var TestIp = config.get('TestIp');
var api = request("http://" + TestIp.host + ":3000")


/***     test case for HEARTRATE widget    ***/
describe('HEARTRATE widget', function() {
    it("Should add HEARTRATE Details into blockchain", function() {

        /*** calling addDataHEARTRATE api ***/
        request(app)
        api.post('/addData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "SSO_ID": "100",
                "HEART_RATE": "70",
                "MEASURED_DATE": "01/23/2018",
                "NOTES": "NOTES",
                "CONFIDENTIALITY_STATUS": "LOCK"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('HEART_RATE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        //  done();
    });

    it("This data of HEARTRATE widget already exist", function() {

        /*** calling addDataHEARTRATE api ***/
        request(app)
        api.post('/addData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "SSO_ID": "100",
                "HEART_RATE": "70",
                "MEASURED_DATE": "01/23/2018",
                "NOTES": "NOTES",
                "CONFIDENTIALITY_STATUS": "LOCK"
            })
            .set("Accept", 'application/json')
            .expect(401)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('HEART_RATE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        //  done();
    });
    it("Field should not be empty during adding heartrate data", function(done) {

        /*** calling addDataHEARTRATE api ***/
        request(app)
        api.post('/addData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "SSO_ID": "",
                "HEART_RATE": "",
                "MEASURED_DATE": "01/23/2018",
                "NOTES": "NOTES",
                "CONFIDENTIALITY_STATUS": "LOCK"
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('HEART_RATE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
         done();
    });



    it("Should update HEARTRATE Details Status into blockchain", function(done) {

        /*** calling updateDataHEARTRATE api ***/
        request(app)
        api.post('/updateData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "ID": "7ifkghkfk",
                "SSO_ID": "100",
                "HEART_RATE": "70",
                "MEASURED_DATE": "01/23/2018",
                "NOTES": "NOTES",
                "CONFIDENTIALITY_STATUS": "L"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('HEART_RATE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Should delete HEARTRATE Details Status into blockchain", function(done) {

        /*** calling deleteDataHEARTRATE api ***/
        request(app)
        api.post('/deleteData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "ID": "100"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });


    it("Field shoud not be empty during deleting HEARTRATE data", function(done) {

        /*** calling deleteDataHEARTRATE api ***/
        request(app)
        api.post('/deleteData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "ID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });
    it("Should get HEARTRATE Details Status into blockchain", function(done) {

        /*** calling readDataHEARTRATE api ***/
        request(app)
        api.post('/readData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "PERIOD": "20"
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


    it("Field should not be empty during reading data of HEARTRATE", function(done) {

        /*** calling readDataHEARTRATE api ***/
        request(app)
        api.post('/readData?WIDGET=HEARTRATE')
            .send({
                "EHRID": "test",
                "PERIOD": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('PERIOD');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });
    it("Should get HEARTRATE summary Details Status into blockchain", function(done) {

        /*** calling summaryDataHEARTRATE api ***/
        request(app)
        api.post('/summaryData?WIDGET=HEARTRATE')
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

    it("Field should not empty during reading HEARTRATE summary data", function(done) {

        /*** calling summaryDataHEARTRATE api ***/
        request(app)
        api.post('/summaryData?WIDGET=HEARTRATE')
            .send({
                "EHRID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

})