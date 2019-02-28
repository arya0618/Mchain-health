/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 07/03/2018
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


  //------test case for Medication--------
  describe('switchmembers', function() {
    it("should get switchmembers data from blockchain",function(done){          
        request(app)
        api
        .post('/readSwitchmember')
        .send({"BHAMASHAHID":"VKWPJJP",
        "MEMBERID":"7928197"
        })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          // res.status.should.equal(200);
          // res.body.should.have.property('BHAMASHAH_ID');
          // res.body.should.have.property('MEMBER_ID');
          // res.body.data.should.equal(result.message);
       
        });
        done();
      });

      it("fields should not be empty during getting switchmember data",function(done){          
        request(app)
        api
        .post('/readSwitchmember')
        .send({"BHAMASHAHID":"",
        "MEMBERID":"7928197"
        })
        .set("Accept",'application/json')
        .expect(400)
        .end(function(err,res){
          // res.status.should.equal(400);
          // res.body.should.have.property('BHAMASHAH_ID');
          // res.body.should.have.property('MEMBER_ID');
          // res.body.data.should.equal(result.message);
       
        });
        done();
      });

      it("enter valid  inputs",function(done){          
        request(app)
        api
        .post('/readSwitchmember')
        .send({"BHAMASHAHID":"VKWPJJP",
        "MEMBERID":"0987"
        })
        .set("Accept",'application/json')
        .expect(401)
        .end(function(err,res){
          res.status.should.equal(401);
          
        });
        done();
      });


    });