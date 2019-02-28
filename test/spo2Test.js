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


/***     test case for SPO2 widget    ***/
describe('SPO2', function() {
    it("Should add spo2 data into blockchain", function(done) {

        /*** calling addDataSPO2 api ***/
        request(app)
        api
            .post('/addData?WIDGET=SPO2')
            .send({
                "EHRID": "x123",
                'SSO_ID': "goverdhansingh123",
                'SPO2_VALUE': "70",
                'MEASURED_DATE': "17/01/2018",
                'NOTES': "good description",
                'CONFIDENTIALITY_STATUS': "L"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('SPO2_VALUE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("This data of SPO2 widget already exist", function(done) {

        /*** calling addDataSPO2 api ***/
        request(app)
        api
            .post('/addData?WIDGET=SPO2')
            .send({
                "EHRID": "x123",
                'SSO_ID': "goverdhansingh123",
                'SPO2_VALUE': "70",
                'MEASURED_DATE': "17/01/2018",
                'NOTES': "good description",
                'CONFIDENTIALITY_STATUS': "L"
            })
            .set("Accept", 'application/json')
            .expect(401)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('SPO2_VALUE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Field shoud not be empty during adding spo2 data", function(done) {

        /*** calling addDataSPO2 api ***/
        request(app)
        api
            .post('/addData?WIDGET=SPO2')
            .send({
                "EHRID": "x123",
                'SSO_ID': "goverdhansingh123",
                'SPO2_VALUE': "",
                'MEASURED_DATE': "30/01/2018",
                'NOTES': "good description",
                'CONFIDENTIALITY_STATUS': ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('SPO2_VALUE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });


    it("Should get spo2 data from blockchain", function(done) {

        /*** calling readDataSPO2 api ***/
        request(app)
        api
            .post('/readData?WIDGET=SPO2')
            .send({
                "EHRID": "test",
                "FROMDATE": "01/10/2018",
                "TODATE": "01/20/2018"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('FROMDATE');
                res.body.should.have.property('TODATE');
                res.body.should.have.property('PERIOD');
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field should not be empty during adding SPO2 data", function(done) {

        /*** calling readDataSPO2 api ***/
        request(app)
        api
            .post('/readData?WIDGET=SPO2')
            .send({
                "EHRID": "test",
                "FROMDATE": "01/10/2018",
                "TODATE": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('FROMDATE');
                res.body.should.have.property('TODATE');
                res.body.should.have.property('PERIOD');
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Should update spo2 status into blockchain", function(done) {

        /*** calling updateDataSPO2 api ***/
        request(app)
        api
            .post('/updateData?WIDGET=SPO2')
            .send({
                'EHRID': "x123",
                "ID": "7ifkfjfkfjfjf",
                'SSO_ID': "goverdhansingh123",
                'SPO2_VALUE': "40",
                'MEASURED_DATE': "30",
                'NOTES': "good description",
                'CONFIDENTIALITY_STATUS': "unlock"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('SPO2_VALUE');
                res.body.should.have.property('MEASURED_DATE');
                res.body.should.have.property('NOTES');
                res.body.should.have.property('CONFIDENTIALITY_STATUS');
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Should get spo2 summary from blockchain", function(done) {

        /*** calling summaryDataSPO2 api ***/
        request(app)
        api
            .post('/summaryData?WIDGET=SPO2')
            .send({
                "EHRID": "test"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field shoud not be empty during reading summary of SPO2 data", function(done) {

        /*** calling summaryDataSPO2 api ***/
        request(app)
        api
            .post('/summaryData?WIDGET=SPO2')
            .send({
                "EHRID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.should.have.property('EHRID');
                res.body.data.should.equal(result.message);
            });
        done();
    });
    it("Should delete SPO2 record from blockchain", function(done) {

        /*** calling deleteDataSPO2 api ***/
        request(app)
        api
            .post('/deleteData?WIDGET=SPO2')
            .send({
                'EHRID': "x123",
                'ID': "7ikfkfkfkfk"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field should not be empty during deleting spo2 data", function(done) {

        /*** calling deleteDataSPO2 api ***/
        request(app)
        api
            .post('/deleteData?WIDGET=SPO2')
            .send({
                'EHRID': "x123",
                'ID': "",
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID');
                res.status.should.equal(400);
                res.body.data.should.equal(result.message);
            });
        done();
    });



})