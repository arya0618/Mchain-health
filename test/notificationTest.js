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


/***     test case for ALLERGY widget    ***/
describe('Notification', function() {
    it("Should add Notification data into blockchain", function(done) {

        /*** calling addDataNOTIFICATION api ***/
        request(app)
        api
            .post('/addData?WIDGET=NOTIFICATION')
            .send({
                "EHRID": "ehr12",
                "RESPONSED_ON": "01/01/18",
                "SHARED_ON": "01/02/18",
                "QUERY": "hi doc how i am?",
                "RESPONSE": "U have cancer.",
                "RESPONSED_BY": "mR. AANAD"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('RESPONSED_ON');
                res.body.should.have.property('SHARED_ON');
                res.body.should.have.property('QUERY');
                res.body.should.have.property('RESPONSE');
                res.body.should.have.property('RESPONSED_BY');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field should not be empty during adding notification data", function(done) {

        /*** calling addDataNOTIFICATION api ***/
        request(app)
        api
            .post('/addData?WIDGET=NOTIFICATION')
            .send({
                "EHRID": "ehr12",
                "RESPONSED_ON": "01/01/18",
                "SHARED_ON": "01/02/18",
                "QUERY": "",
                "RESPONSE": "",
                "RESPONSED_BY": "mR. AANAD"
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('RESPONSED_ON');
                res.body.should.have.property('SHARED_ON');
                res.body.should.have.property('QUERY');
                res.body.should.have.property('RESPONSE');
                res.body.should.have.property('RESPONSED_BY');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });
    it("This data of NOTIFICATION already exist", function(done) {

        /*** calling addDataNOTIFICATION api ***/
        request(app)
        api
            .post('/addData?WIDGET=NOTIFICATION')
            .send({
                "EHRID": "ehr12",
                "RESPONSED_ON": "01/01/18",
                "SHARED_ON": "01/02/18",
                "QUERY": "hi doc how i am?",
                "RESPONSE": "U have cancer.",
                "RESPONSED_BY": "mR. AANAD"
            })
            .set("Accept", 'application/json')
            .expect(401)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('RESPONSED_ON');
                res.body.should.have.property('SHARED_ON');
                res.body.should.have.property('QUERY');
                res.body.should.have.property('RESPONSE');
                res.body.should.have.property('RESPONSED_BY');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Should get Notification data from blockchain", function(done) {

        /*** calling readDataNOTIFICATION api ***/
        request(app)
        api
            .post('/readNotifications')
            .send({
                "EHRID": "ehr12"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.status.should.equal(200);
                // res.body.data.should.equal(result.data);
            });
        done();
    });

    it("Field should not be empty during reading notifications", function(done) {

        /*** calling readDataNOTIFICATION api ***/
        request(app)
        api
            .post('/readNotifications')
            .send({
                "EHRID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
               // res.body.should.have.property('EHRID');
                //res.status.should.equal(200);
                //res.body.data.should.equal(result.data);
            });
        done();
    });
});