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


/***     test case for familymember details    ***/
describe('UserProfile familymember details', function() {
    it("Should check family details into  blockchain", function(done) {

        /*** calling familyMemberdetails api ***/
        request(app)
        api.post('/userProfile/familyMemberdetails')
            .send({
                "BHAMASHAH_ID": "VKWPJJP"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('BHAMASHAH_ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);

            });
        done();
    });

    it("Record was not found please check the BHAMASHAH_ID", function(done) {

        /*** calling familyMemberdetails api ***/
        request(app)
        api.post('/userProfile/familyMemberdetails')
            .send({
                "BHAMASHAH_ID": "VKWPJJP0000"
            })
            .set("Accept", 'application/json')
            .expect(401)
            .end(function(err, res) {
                res.body.should.have.property('BHAMASHAH_ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);

            });
        done();
    });

    it("Field should not be empty while reading userprofile", function(done) {

        /*** calling familyMemberdetails api ***/
        request(app)
        api.post('/userProfile/familyMemberdetails')
            .send({
                "BHAMASHAH_ID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.body.should.have.property('BHAMASHAH_ID');
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);

            });
        done();
    });
});