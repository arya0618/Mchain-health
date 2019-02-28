/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 19/02/2018
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
var mlog=require('mocha-logger')
var empty = require('is-empty');
var assert = require('assert');
var should = require("should");

var sinon = require('sinon');
var http = require('http');
var request = require("supertest");

var config = require('config');
var TestIp = config.get('TestIp');

var api = request("http://"+TestIp.host+":3000")



/**test case for sessionAuntheticate */  
describe('sessionAuntheticate', function() {
    it("should read sessionAuntheticate data from blockchain",function(done){
      request(app) 
      api
        .post('/sessionAuthenticate')
        .send({      "SSO_ID":"GOVERDHANSINGH123",  
 
        "IS_EHR_USER":"YES",
       
        "IS_PROVIDER":"YES",
        "IS_APPROVED_PROVIDER":"YES"            })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
        //  res.status.should.equal(200);
        //   res.body.should.have.property('SSO_ID');
        // res.body.should.have.property('IS_EHR_USER');
        // res.body.should.have.property('IS_PROVIDER');
        // res.body.should.have.property('IS_APPROVED_PROVIDER');
        // res.body.data.should.equal(result.message);
      
        });
        done();
      });
      it("field shoild not be empty during sessionAunthetication ",function(done){
        request(app) 
        api
          .post('/sessionAuthenticate')
          .send({      "SSO_ID":"rajgov",  
          "IS_EHR_USER":null,
          "IS_PROVIDER":"YES",
          "IS_APPROVED_PROVIDER":"YES"            })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
          // res.status.should.equal(200);
          // res.body.should.have.property('SSO_ID');
          // res.body.should.have.property('IS_EHR_USER');
          // res.body.should.have.property('IS_PROVIDER');
          // res.body.should.have.property('IS_APPROVED_PROVIDER');
          // res.body.data.should.equal(result.message);
        
          });
          done();
        });

        it("field shoild not be empty during sessionAunthetication ",function(done){
          request(app) 
          api
            .post('/sessionAuthenticate')
            .send({      
            "SSO_ID":"",  
            "IS_EHR_USER":"YES",
            "IS_PROVIDER":"YES",
            "IS_APPROVED_PROVIDER":"YES"          
            })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
            res.status.should.equal(400);
            // res.body.should.have.property('SSO_ID');
            // res.body.should.have.property('IS_EHR_USER');
            // res.body.should.have.property('IS_PROVIDER');
            // res.body.should.have.property('IS_APPROVED_PROVIDER');
            // res.body.data.should.equal(result.message);
          
            });
            done();
          });
    });