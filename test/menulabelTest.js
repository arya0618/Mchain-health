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


/***     test case for LANGUAGE   ***/
describe('LANGUAGE', function() {
    it("Should add language data into blockchain", function(done) {

        /*** calling addlanguage api ***/
        request(app)
        api
            .post('/addlanguage')
            .send({
                "MENU_ID": "17",
                "LABEL_ENGLISH": "Lab Results",
                "LABEL_HINDI": "लैब परिणाम",
                "PROPERTY_VALUE": "labResult"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('MENU_ID');
                // res.body.should.have.property('LABEL_ENGLISH');
                // res.body.should.have.property('LABEL_HINDI');
                // res.body.should.have.property('PROPERTY_VALUE');
                // res.status.should.equal(200);
                // //res.body.data.should.equal(result);
            });
        done();
    });

    it("This data of language already exist", function(done) {

        /*** calling addlanguage api ***/
        request(app)
        api
            .post('/addlanguage')
            .send({
                "MENU_ID": "17",
                "LABEL_ENGLISH": "Lab Results",
                "LABEL_HINDI": "लैब परिणाम",
                "PROPERTY_VALUE": "labResult"
            })
            .set("Accept", 'application/json')
            .expect(401)
            .end(function(err, res,request) {
                //request.body.should.have.property('MENU_ID');
                //res.body.should.have.property('LABEL_ENGLISH');
                //res.body.should.have.property('LABEL_HINDI');
                //res.body.should.have.property('PROPERTY_VALUE');
                res.status.should.equal(401);
               // res.body.data.should.equal(Object);
            });
        done();
    });

    it("Field should not be empty during adding language", function(done) {

        /*** calling addlanguage api ***/
        request(app)
        api
            .post('/addlanguage')
            .send({
                "MENU_ID": "17",
                "LABEL_ENGLISH": "Lab Results",
                "LABEL_HINDI": "लैब परिणाम",
                "PROPERTY_VALUE": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
            //     res.body.should.have.property('MENU_ID');
            //     res.body.should.have.property('LABEL_ENGLISH');
            //     res.body.should.have.property('LABEL_HINDI');
            //     res.body.should.have.property('PROPERTY_VALUE');
            //     res.status.should.equal(200);
            //    // res.body.data.should.equal(result.message);
            });
        done();
    });
    it("Field should not be empty during reading language", function(done) {

        /*** calling readlanguage api ***/
        request(app)
        api
            .post('/readlanguage')
            .send({
                "key": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                // res.body.should.have.property('key');
                // res.status.should.equal(200);
                //res.body.data.should.equal(result.message);
            });
        done();
    });

    it("Should read language data into blockchain", function(done) {

        /*** calling readlanguage api ***/
        request(app)
        api
            .post('/readlanguage')
            .send({
                "key": "MENU_LABEL"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('key');
                // res.status.should.equal(200);
              //  res.body.data.should.equal(result.message);
            });
        done();
    });
    it("Should update language data into blockchain", function(done) {

        /*** calling updatelanguage api ***/
        request(app)
        api
            .post('/updatelanguage')
            .send({
                "key": "MENU_LABEL",
                "MENU_ID": "17",
                "LABEL_ENGLISH": "Lab Results",
                "LABEL_HINDI": "लैब परिणाम",
                "PROPERTY_VALUE": "labResult",
                "ID": "dd9p9jdwxx708"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
            //     res.body.should.have.property('key');
            //     res.body.should.have.property('MENU_ID');
            //     res.body.should.have.property('LABEL_ENGLISH');
            //     res.body.should.have.property('LABEL_HINDI');
            //     res.body.should.have.property('PROPERTY_VALUE');
            //     res.body.should.have.property('ID');
            //     res.status.should.equal(200);
            //   //  res.body.data.should.equal(result.message);
            });
        done();
    });
    it("Should delete language Details Status into blockchain", function(done) {

        /*** calling deletelanguage api ***/
        request(app)
        api.post('/deletelanguage')
            .send({
                "key": "MENU_LABEL",
                "ID": "dd9p9jdwxx708"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('key');
                // res.body.should.have.property('ID');
                // res.status.should.equal(200);
                //res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });
    it("Field shoud not be empty during deleting language data", function(done) {

        /*** calling deletelanguage api ***/
        request(app)
        api.post('/deletelanguage')
            .send({
                "key": "MENU_LABEL",
                "ID": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                // res.body.should.have.property('key');
                // res.body.should.have.property('ID');
                // res.status.should.equal(200);
                //res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

});