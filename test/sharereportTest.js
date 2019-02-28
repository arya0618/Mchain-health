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


/***     test case for shareReport details    ***/
describe('shareReport', function() {
    it("Should Share user report  into blockchain", function(done) {

        /*** calling reportShare api ***/
        request(app)
        api.post('/Share/reportShare')
            .send({
                "EHRID": "ehr",
                "CONTACT_NAME": "Rakesh",
                "MEMBER_ID": "12344",
                "EMPID": "asfsdaf",
                "CONTACT_TYPE": "friend",
                "MOBILE": "3241234545",
                "EMAIL": "asfs@gmail.com",
                "FROMDATE": "01/01/2017",
                "TODATE": "02/08/18",
                "MEDICATION": "yes",
                "LABTEST": "yes",
                "PACKEGE": "yes",
                "QUERY": "hello doc",
                "VALIDITY": "one"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
               
            });
        done();
    });


    it("Field should not be empty during adding shareReport details", function(done) {

        /*** calling reportShare api ***/
        request(app)
        api.post('/Share/reportShare')
            .send({
                "EHRID": "ehr",
                "CONTACT_NAME": "",
                "MEMBER_ID": "12344",
                "EMPID": "asfsdaf",
                "CONTACT_TYPE": "abc",
                "MOBILE": "",
                "EMAIL": "asfs@gmail.com",
                "FROMDATE": "01/01/2017",
                "TODATE": "02/08/18",
                "MEDICATION": "yes",
                "LABTEST": "yes",
                "PACKEGE": "yes",
                "QUERY": "hello doc",
                "VALIDITY": "one"
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
               
            });
        done();
    });
    it("Should read share records  from blockchain", function(done) {

        /*** calling readRecords api ***/
        request(app)
        api.post('/Share/readRecords')
            .send({
                "EHRID": "ehr",
                "OTP":"9080"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.status.should.equal(200);
                // res.body.should.have.property('EHRID');
                // res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Field should not be empty during reading shareReport details", function(done) {

        /*** calling readRecords api ***/
        request(app)
        api.post('/Share/readRecords')
            .send({
                "EHRID": "",
                "OTP":"9080"
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                // res.status.should.equal(200);
                // res.body.should.have.property('EHRID');
                // res.body.data.should.equal(result.message);
            });
        done();
    });
})