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


/***     test case for login details    ***/
describe('getEHRID', function() {
    it(, function(done) {

        /*** calling login api ***/
        request(app).post('/getEHRID')
            .send({
            "SSO_ID": "goverdhansingh123",
            "BHAMASHAHID":"123",
            "AADHAR_NO":"4f3443434",
            "PATIENT_NAME":"abc",
            "MEMBER_ID": "fdgf",
            "DATE_OF_BIRTH":"23/01/2018",
            "GENDER":"female",
            "PHOTO":"PHOTO",
            "MOBILE_NUMBER": "2321312",
            "EMAIL": "abc@a.com",
            "ADDRESS": "udb trademark",
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
            "CONTACT_ADDRESS_LINE1":"21ww",
            "CONTACT_ADDRESS_LINE2":"ceww2",
            "CONTACT_TOWN_CITY":"dweITY",
            "CONTACT_DISTRICT":"cdCT",
            "CONTACT_STATE_CODE":"cwww",
            "CONTACT_STATE_NAME":"cewdwe",
            "CONTACT_PINCODE":"cwwE",
            "FATHERS_NAME_ENGLISH":"Arun",
            "MOTHERS_NAME_ENGLISH":"sweta",
            "SPOUSE_NAME_ENGLISH":"pooja",
            "ACK_ID":"dsadwdwd",
            "PHOTO":"www.google.com",
            "NAME_HINDI":"अरुण",
            "FATHERS_NAME_HINDI":"विक्रम",
            "MOTHERS_NAME_HINDI":"विक्रम",
            "SPOUSE_NAME_HINDI":"विक्रम",
            "PASSPORT":"123124242",
            "BANK_NAME":"icici",
            "ACCOUNT":"savings",
            "PAN_NO":"12345768990",
            "VOTER_ID":"36346346",
            "DRIVING_LIENCE_NO":"54sd45",
            "QUALITFICATION":"BE(extc)",
            "IS_EHR_USER":"YES",
            "IS_APPROVED_IHMS_USER":"YES",
            "IS_PROVIDER":"YES",
            "IS_APPROVED_PROVIDER":"YES",
            "IS_ACTIVE":"YES"})

            .set("Accept", 'application/json')
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('SSO_ID');
                res.body.should.have.property('BHAMASHAHID');
                res.body.should.have.property('MEMBER_ID');
                res.status.should.equal(200);
                res.body.data.should.equal(res);
            });
        done();
    });
});
