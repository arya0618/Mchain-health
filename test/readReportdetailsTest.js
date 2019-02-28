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


/***     test case for Report Details    ***/
describe('Report Details', function() {
    it("Should get Report Details Status into blockchain", function(done) {
        request(app)
        api.post('/Report/readReportdetails')
            .send({
                    "EHRID":"ehridtest",
                    "PERIOD":"365",
                    "meditation":"yes",
                    "labtest":"yes",
                    "package":"yes"                    
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('PERIOD');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Field shoud not be empty during reading report details", function(done) {
        request(app)
        api.post('/Report/readReportdetails')
            .send({
                "EHRID":"ehridtest",
                "PERIOD":"",
                "meditation":"yes",
                "labtest":"yes",
                "package":"yes"        
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('EHRID');
                res.body.should.have.property('PERIOD');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });
})