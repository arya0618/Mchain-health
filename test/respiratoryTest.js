
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



//------------------------ test case RESPIRATORYRATE------
describe('RESPIRATORYRATE', function() {
    it("should add RESPIRATORYRATE data into blockchain",function(done){
      request(app)
      api.post('/addData?WIDGET=RESPIRATORYRATE')
      .send({ "EHRID":"test",              
      'SSO_ID': "SSO_ID",
    'RESP_RATE': "72",
    'MEASURED_DATE': "01/21/2018",
    'NOTES': "NOTES12345",
    'CONFIDENTIALITY_STATUS': "L"  })
      .set("Accept",'application/json')
      .expect(200)
      .end(function(err,res){
        
          res.body.should.have.property('EHRID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('RESP_RATE');
          res.body.should.have.property('MEASURED_DATE');
          res.body.should.have.property('NOTES');
          res.body.should.have.property('CONFIDENTIALITY_STATUS');
       
        res.status.should.equal(200);
        res.body.data.should.equal(result.message);
        
      });
      done();
    });
    it("should not add similar RESPIRATORYRATE data into blockchain",function(done){
      request(app)
      api.post('/addData?WIDGET=RESPIRATORYRATE')
      .send({ "EHRID":"test",              
      'SSO_ID': "SSO_ID",
    'RESP_RATE': "72",
    'MEASURED_DATE': "01/21/2018",
    'NOTES': "NOTES12345",
    'CONFIDENTIALITY_STATUS': "L"  })
      .set("Accept",'application/json')
      .expect(401)
      .end(function(err,res){
        
          res.body.should.have.property('EHRID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('RESP_RATE');
          res.body.should.have.property('MEASURED_DATE');
          res.body.should.have.property('NOTES');
          res.body.should.have.property('CONFIDENTIALITY_STATUS');
       
        res.status.should.equal(401);
        res.body.data.should.equal(result.message);
        
      });
      done();
    });
    it("fields should not be empty during respirstory data",function(done){
      request(app)
      api.post('/addData?WIDGET=RESPIRATORYRATE')
      .send({ "EHRID":"test",              
      'SSO_ID': "",
    'RESP_RATE': "72",
    'MEASURED_DATE': "01/11/2018",
    'NOTES': "NOTES12345",
    'CONFIDENTIALITY_STATUS': "L"  })
      .set("Accept",'application/json')
      .expect(400)
      .end(function(err,res){
        
          res.body.should.have.property('EHRID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('RESP_RATE');
          res.body.should.have.property('MEASURED_DATE');
          res.body.should.have.property('NOTES');
          res.body.should.have.property('CONFIDENTIALITY_STATUS');
       
        res.status.should.equal(200);
        res.body.data.should.equal(result.message);
        
      });
      done();
    });
    it("should update RESPIRATORYRATE status into blockchain",function(done){
      request(app)
      api.post('/updateData?WIDGET=RESPIRATORYRATE')
      .send(
        { "EHRID":"test", 
      "ID":"7ifjkijfkf",             
        'SSO_ID': "SSO_ID",
      'RESP_RATE': "22",
      'MEASURED_DATE': "11/01/2018",
      'NOTES': "NOTES",
      'CONFIDENTIALITY_STATUS': "U"  })
      .set("Accept",'application/json')
      .expect(200)
      .end(function(err,res){
        res.body.should.have.property('EHRID');
        res.body.should.have.property('ID');
        res.body.should.have.property('SSO_ID');
        res.body.should.have.property('RESP_RATE');
        res.body.should.have.property('MEASURED_DATE');
        res.body.should.have.property('NOTES');
        res.body.should.have.property('CONFIDENTIALITY_STATUS');
        res.status.should.equal(200);
        //res.body.error.should.equal(false);
        res.body.data.should.equal(result.message);
     //  done();
      });
      done();
    });
  
      it("should get RESPIRATORYRATE summary into blockchain",function(done){
          request(app)
          api.post('/summaryData?WIDGET=RESPIRATORYRATE')
          .send({  "EHRID":"test"})
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
        
          res.body.should.have.property('EHRID');
          
            res.status.should.equal(200);
            
            res.body.data.should.equal(result.message);
       //  done();
  
          });
          done();
        });
  
        it("should delete RESPIRATORYRATE record from blockchain",function(done){
          request(app)
          api.post('/deleteData?WIDGET=RESPIRATORYRATE')
          .send({  "EHRID":"test",
           "ID":"7ifkfkfkf"  })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
          res.body.should.have.property('EHRID');
            res.body.should.have.property('ID'); //checking this property avialable in json
          res.status.should.equal(200);
          res.body.data.should.equal(result.message);
       
          });
          done();
        });
  
        it("fields should not be empty during deleting data of respiratory rate",function(done){
          request(app)
          api.post('/deleteData?WIDGET=RESPIRATORYRATE')
          .send({  "EHRID":"",
           "ID":""  })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
         
            res.body.should.have.property('EHRID');
            res.body.should.have.property('ID'); //checking this property avialable in json
          res.status.should.equal(200);
          res.body.data.should.equal(result.message);
       
          });
          done();
        });
  
  
      it("should get RESPIRATORYRATE data from blockchain",function(done){
        request(app)
        api.post('/readData?WIDGET=RESPIRATORYRATE')
        .send({"EHRID":"test",
          
           "PERIOD":"365"
        })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
       
          res.body.should.have.property('EHRID');
          res.body.should.have.property('FROMDATE');
          res.body.should.have.property('TODATE');
          res.body.should.have.property('PERIOD');
         
          res.status.should.equal(200);
          res.body.data.should.equal(result.message);
        });
        done();
      });
    })  
  
