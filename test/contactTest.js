'use strict';
/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 17/02/2018
@description: DOIT BlockChain project
**/

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



//----------------- test case for contact details-----------------
describe('Contact Details', function() {
    it("should add contact details  into blockchain",function(done){
        request(app)
        api.post('/addData?WIDGET=CONTACT')
        .send({  
          "EHRID":"ContactTest",
          "SSO_ID":"567",
          "CONTACT_TYPE":"email",
          "CONTACT_NAME":"test",
          "SPECIALITY":"ride",
          "HOSP_CLINIC_NAME":"chennai",
          "ADDRESS_LINE_1":"Chennnai",
          "ADDRESS_LINE_2":"mumbai",
          "CITY_TOWN":"chennai",
          "DISTRICT":"gujarat",
          "STATE":"rajasthan",
          "STATE_CODE":"007",
          "PIN":"600101",
          "MOBILE_NO":"9876543210",
           "EMAIL_ADDRESS":"asdf@gmail.com"
             })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.body.should.have.property('EHRID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('CONTACT_TYPE');
          res.body.should.have.property('CONTACT_NAME');
          res.body.should.have.property('SPECIALITY');
          res.body.should.have.property('HOSP_CLINIC_NAME');
          res.body.should.have.property('ADDRESS_LINE_1');
          res.body.should.have.property('ADDRESS_LINE_2');
          res.body.should.have.property('CITY_TOWN');
          res.body.should.have.property('DISTRICT');
          res.body.should.have.property('STATE');
          res.body.should.have.property('STATE_CODE');
          res.body.should.have.property('PIN');
          res.body.should.have.property('MOBILE_NO');
          res.body.should.have.property('EMAIL_ADDRESS');
          res.status.should.equal(200);
          //res.body.error.should.equal(false);
          res.body.data.should.equal(result.message);
       //  done();
        });
        done();
      });
      it("fields should not be empty during adding contact data",function(done){
        request(app)
        api.post('/addData?WIDGET=CONTACT')
        .send({  
          "EHRID":"",
          "SSO_ID":"567",
          "CONTACT_TYPE":"email",
          "CONTACT_NAME":"test",
          "SPECIALITY":"ride",
          "HOSP_CLINIC_NAME":"chennai",
          "ADDRESS_LINE_1":"Chennnai",
          "ADDRESS_LINE_2":"mumbai",
          "CITY_TOWN":"chennai",
          "DISTRICT":"gujarat",
          "STATE":"rajasthan",
          "STATE_CODE":"007",
          "PIN":"600101",
          "MOBILE_NO":"9876543210",
           "EMAIL_ADDRESS":"asdf@gmail.com"
             })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.body.should.have.property('EHRID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('CONTACT_TYPE');
          res.body.should.have.property('CONTACT_NAME');
          res.body.should.have.property('SPECIALITY');
          res.body.should.have.property('HOSP_CLINIC_NAME');
          res.body.should.have.property('ADDRESS_LINE_1');
          res.body.should.have.property('ADDRESS_LINE_2');
          res.body.should.have.property('CITY_TOWN');
          res.body.should.have.property('DISTRICT');
          res.body.should.have.property('STATE');
          res.body.should.have.property('STATE_CODE');
          res.body.should.have.property('PIN');
          res.body.should.have.property('MOBILE_NO');
          res.body.should.have.property('EMAIL_ADDRESS');
          res.status.should.equal(200);
          //res.body.error.should.equal(false);
          res.body.data.should.equal(result.message);
       //  done();
        });
        done();
      });
   

      it("should update contact details  into blockchain",function(done){
        request(app)
        api.post('/updateData?WIDGET=CONTACT')
        .send({  
          "EHRID":"ContactTest",
          "SSO_ID":"567",
          "CONTACT_TYPE":"email",
          "CONTACT_NAME":"test12",
          "SPECIALITY":"ride",
          "HOSP_CLINIC_NAME":"chennai",
          "ADDRESS_LINE_1":"Chennnai",
          "ADDRESS_LINE_2":"mumbai",
          "CITY_TOWN":"chennai",
          "DISTRICT":"gujarat",
          "STATE":"rajasthan",
          "STATE_CODE":"007",
          "PIN":"600101",
          "MOBILE_NO":"9999988888",
           "EMAIL_ADDRESS":"asdf@gmail.com"
             })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.body.should.have.property('EHRID');
          res.body.should.have.property('ID');
          res.body.should.have.property('SRNO');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('CONTACT_TYPE');
          res.body.should.have.property('CONTACT_NAME');
          res.body.should.have.property('SPECIALITY');
          res.body.should.have.property('HOSP_CLINIC_NAME');
          res.body.should.have.property('ADDRESS_LINE_1');
          res.body.should.have.property('ADDRESS_LINE_2');
          res.body.should.have.property('CITY_TOWN');
          res.body.should.have.property('DISTRICT');
          res.body.should.have.property('STATE');
          res.body.should.have.property('STATE_CODE');
          res.body.should.have.property('PIN');
          res.body.should.have.property('MOBILE_NO');
          res.body.should.have.property('EMAIL_ADDRESS');
          res.status.should.equal(200);
          //res.body.error.should.equal(false);
          res.body.data.should.equal(result.message);
       //  done();
        });
        done();
      });
    
      it("should delete contact details  from blockchain",function(done){
        request(app)
        api.post('/deleteData?WIDGET=CONTACT')
        .send({  
          "EHRID":"ContactTest",
          "ID":"7ioklnmunbvf"
          
          })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.body.should.have.property('EHRID');
          res.body.should.have.property('ID');
          res.status.should.equal(200);
          
          res.body.data.should.equal(result.message);
       //  done();
        });
        done();
      });
      it("fields should not be empty during delete=ing contact data",function(done){
        request(app)
        api.post('/deleteData?WIDGET=CONTACT')
        .send({  
          "EHRID":"",
          "ID":"7ijkefkefncoi"
          
          })
        .set("Accept",'application/json')
        .expect(400)
        .end(function(err,res){
          res.body.should.have.property('EHRID');
          res.body.should.have.property('ID');
          res.status.should.equal(400);
          
          res.body.data.should.equal(result.message);
       //  done();
        });
        done();
      });
      
      it("should read contact details  from blockchain",function(done){
        request(app)
        api.post('/readData?WIDGET=CONTACT')
        .send({  
          "EHRID":"ContactTest"
         })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.body.should.have.property('EHRID');
          res.body.should.have.property('ID');
          res.status.should.equal(200);
          res.body.data.should.equal(result.message);
       
        });
        done();
      });
    })


    
