/**
@author: Piyusha Patel
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



/*
*test case for BMI
*/  
describe('GEO information', function() {
    it("should read district information from blockchain",function(done){
     
      request(app) 
      api.get('/GetGeoData?GEO=DISTRICT')
        
      .set("Accept",'application/json')
      .set("content-type",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.be.a('array');
          res.body.data.should.equal(result.message);
      
        });
        done();
      });
      it("should read STATE information from blockchain",function(done){
     
        request(app) 
        api.get('/GetGeoData?GEO=STATE')
          
        .set("Accept",'application/json')
        .set("content-type",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.a('array');
            //res.body.data.should.equal(result.message);
        
          });
          done();
        });
        it("should read BLOCK information from blockchain",function(done){
     
          request(app) 
          api.get('/GetGeoData?GEO=BLOCK')
            
          .set("Accept",'application/json')
          .set("content-type",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.be.a('array');
              //res.body.data.should.equal(result.message);
          
            });
            done();
          });
       
    });