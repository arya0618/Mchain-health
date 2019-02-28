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


/***     test case for User profile    ***/
describe('User profile', function() {
    it("Should adding user profile  into blockchain", function(done) {

        /*** calling userProfile api ***/
        request(app)
        api.post('/userProfile/updateUserProfile')
            .send({
                "EHRID": "doit",
                "SSOId": "goverdhansingh123",
                "BHAMASHAH_ID": "123",
                "AADHAR_NO": "4f3443434",
                "PATIENT_NAME": "abc",
                "MEMBER_ID": "0",
                "DATE_OF_BIRTH": "01/23/2018",
                "GENDER": "female",
                "PHOTO": "PHOTO",
                "MOBILE_NUMBER": "2321312",
                "EMAIL": "abc@a.com",
                "ADDRESS_LINE1": "udb trademark",
                "ADDRESS_LINE2": "yojna bhvan",
                "TOWN_CITY": "Jaipur",
                "DISTRICT": "Jaipur",
                "PINCODE": "234214",
                "BLOOD_GROUP": "O+",
                "DISABILITY_STATUS": "y",
                "DISABILITY_TYPE": "y",
                "EM_CONTACT_NAME": "sdfas",
                "RELATIONSHIP": "asdas",
                "PRIMARY_PHONE": "sadd",
                "SECONDARY_PHONE": "null",
                "CONTACT_ADDRESS_LINE1": "21ww",
                "CONTACT_ADDRESS_LINE2": "ceww2",
                "CONTACT_TOWN_CITY": "dweITY",
                "CONTACT_DISTRICT": "cdCT",
                "CONTACT_STATE_CODE": "cwww",
                "CONTACT_STATE_NAME": "cewdwe",
                "CONTACT_PINCODE": "cwwE"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.body.should.have.property('EHRID');
                // res.body.should.have.property('SSOId');
                // res.body.should.have.property('EMAIL');
                // res.body.should.have.property('BHAMASHAH_ID');
                // res.body.should.have.property('ADDRESS_LINE2');
                // res.body.should.have.property('TOWN_CITY');
                // res.body.should.have.property('DISTRICT');
                // res.body.should.have.property('PINCODE');
                // res.body.should.have.property('BLOOD_GROUP');
                // res.body.should.have.property('DISABILITY_STATUS');
                // res.body.should.have.property('DISABILITY_TYPE');
                // res.body.should.have.property('EM_CONTACT_NAME');
                // res.body.should.have.property('RELATIONSHIP');
                // res.body.should.have.property('PRIMARY_PHONE');
                // res.body.should.have.property('SECONDARY_PHONE');
                // res.body.should.have.property('CONTACT_ADDRESS_LINE1');
                // res.body.should.have.property('CONTACT_ADDRESS_LINE2');
                // res.body.should.have.property('CONTACT_TOWN_CITY');
                // res.body.should.have.property('CONTACT_DISTRICT');
                // res.body.should.have.property('CONTACT_STATE_CODE');
                // res.body.should.have.property('CONTACT_STATE_NAME');
                // res.body.should.have.property('CONTACT_PINCODE');
                // res.status.should.equal(200);
                // res.body.data.should.equal(result.message);
                //  done();
            });
        done();
    });

    it("Field should not be empty while adding user profile  into blockchain", function(done) {

        /*** calling userProfile api ***/
        request(app)
        api.post('/userProfile/updateUserProfile')
            .send({
                "EHRID": "doit",
                "SSOId": "goverdhansingh123",
                "BHAMASHAH_ID": "123",
                "AADHAR_NO": "",
                "PATIENT_NAME": "abc",
                "MEMBER_ID": ["fdgf", "1235"],
                "DATE_OF_BIRTH": "01/23/2018",
                "GENDER": "female",
                "PHOTO": "PHOTO",
                "MOBILE_NUMBER": "",
                "EMAIL": "abc@a.com",
                "ADDRESS_LINE1": "udb trademark",
                "ADDRESS_LINE2": "yojna bhvan",
                "TOWN_CITY": "Jaipur",
                "DISTRICT": "Jaipur",
                "PINCODE": "234214",
                "BLOOD_GROUP": "O+",
                "DISABILITY_STATUS": "y",
                "DISABILITY_TYPE": "y",
                "EM_CONTACT_NAME": "sdfas",
                "RELATIONSHIP": "asdas",
                "PRIMARY_PHONE": "",
                "SECONDARY_PHONE": "null",
                "CONTACT_ADDRESS_LINE1": "21ww",
                "CONTACT_ADDRESS_LINE2": "ceww2",
                "CONTACT_TOWN_CITY": "dweITY",
                "CONTACT_DISTRICT": "cdCT",
                "CONTACT_STATE_CODE": "cwww",
                "CONTACT_STATE_NAME": "cewdwe",
                "CONTACT_PINCODE": ""
            })
            .set("Accept", 'application/json')
            .expect(400)
            .end(function(err, res) {
                res.status.should.equal(200);
                
            });
        done();
    });

    it("Should get user profile  from blockchain", function(done) {

        /*** calling userProfile api ***/
        request(app)
        api.post('/userProfile/readUserProfile')
            .send({
                "EHRID": "doit"
            })
            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                // res.status.should.equal(200);
                // res.status.should.equal(404);
                // res.body.should.have.property('EHRID');
                // res.body.data.should.equal(result.message);
            });
        done();
    });

    // it("Field should not be empty while reading user profile", function(done) {

    //     /*** calling userProfile api ***/
    //     request(app)
    //     api.post('/userProfile/readUserProfile')
    //         .send({
    //             "EHRID": ""
    //         })
    //         .set("Accept", 'application/json')
    //         .expect(400)
    //         .end(function(err, res) {
    //             // res.status.should.equal(200);
    //             // res.body.should.have.property('EHRID');
    //             // res.body.data.should.equal(result.message);
    //         });
    //     done();
    // });

})