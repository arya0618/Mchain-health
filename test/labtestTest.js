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



//------------------------ test case Lab test------
describe('Lab test', function() {
    it("should add labTest data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=LABTEST')
        .send({"EHRID":"test",
          "SSO_ID": "SSO_ID",
        "TEST_CODE": "090",
        "TEST_NAME": "bloodtest",
        "RESULT_TEXT": "b-ve",
        "RESULT_UNIT": "result-unit",
        "MEASURED_DATE": "09/22/2017",
        "NOTES": "take your test papers",
        "CONFIDENTIALITY_STATUS":"L"
              })
        .set("Accept",'application/json')
        .set("content-type","application/json")
        .expect(200)
        .end(function(err,res){
           res.status.should.equal(200);
          res.body.should.have.property('EHRID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('TEST_CODE');
          res.body.should.have.property('TEST_NAME');
          res.body.should.have.property('RESULT_TEXT');
          res.body.should.have.property('RESULT_UNIT');
          res.body.should.have.property('MEASURED_DATE');
          res.body.should.have.property('NOTES');
          res.body.should.have.property('CONFIDENTIALITY_STATUS');
         // res.status.should.equal(200);
          res.body.data.should.equal(result.message);
     
        });
        done();
      });

      // it("should not add same labtest record  into blockchain",function(done){
      //   request(app) 
      //   api
      //     .post('/addData?WIDGET=LABTEST')
      //     .send({"EHRID":"test",
      //       "SSO_ID": "SSO_ID",
      //     "TEST_CODE": "090",
      //     "TEST_NAME": "bloodtest",
      //     "RESULT_TEXT": "b-ve",
      //     "RESULT_UNIT": "result-unit",
      //     "MEASURED_DATE": "09/22/2017",
      //     "NOTES": "take your test papers",
      //     "CONFIDENTIALITY_STATUS":"L"
      //           })
      //     .set("Accept",'application/json')
      //     .set("content-type","application/json")
      //     .expect(401)
      //     .end(function(err,res){
      //        res.status.should.equal(401);
      //       res.body.should.have.property('EHRID');
      //       res.body.should.have.property('SSO_ID');
      //       res.body.should.have.property('TEST_CODE');
      //       res.body.should.have.property('TEST_NAME');
      //       res.body.should.have.property('RESULT_TEXT');
      //       res.body.should.have.property('RESULT_UNIT');
      //       res.body.should.have.property('MEASURED_DATE');
      //       res.body.should.have.property('NOTES');
      //       res.body.should.have.property('CONFIDENTIALITY_STATUS');
      //      // res.status.should.equal(200);
      //       res.body.data.should.equal(result.message);
       
      //     });
      //     done();
      //   });
  

      it("fields should not be empty during adding labtest data",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=LABTEST')
          .send({"EHRID":"",
            "SSO_ID": "",
          "TEST_CODE": "05",
          "TEST_NAME": "sugartest",
          "RESULT_TEXT": "high",
          "RESULT_UNIT": "result-unit",
          "MEASURED_DATE": "09/22/2017",
          "NOTES": "take your test papers",
          "CONFIDENTIALITY_STATUS":"L"
          
                })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
             res.status.should.equal(400);
            // res.body.should.have.property('EHRID');
            // res.body.should.have.property('SSO_ID');
            // res.body.should.have.property('TEST_CODE');
            // res.body.should.have.property('TEST_NAME');
            // res.body.should.have.property('RESULT_TEXT');
            // res.body.should.have.property('RESULT_UNIT');
            // res.body.should.have.property('MEASURED_DATE');
            // res.body.should.have.property('NOTES');
            // res.body.should.have.property('CONFIDENTIALITY_STATUS');
           
            // res.body.data.should.equal(result.message);
       
          });
          done();
        });

      it("should get labtest data from blockchain",function(done){
        request(app)
        api
        .post('/readData?WIDGET=LABTEST')
        .send({"EHRID":"test",
           "PERIOD":"365"
           
        })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
        res.status.should.equal(200)
          res.body.should.have.property('EHRID');
          res.body.should.have.property('FROMDATE');
          res.body.should.have.property('TODATE');
          res.body.should.have.property('PERIOD');
         // res.status.should.equal(200);
          res.body.data.should.equal(result.message);
        
         //done();
       
        });
        done();
      });
it("fields should not be empty while reading labtest dATA from blockchain",function(done){
        request(app)
        api
        .post('/readData?WIDGET=LABTEST')
        .send({"EHRID":"",
          
           "PERIOD":"365"
        })
        .set("Accept",'application/json')
        .expect(400)
        .end(function(err,res){
        res.status.should.equal(400)
          res.body.should.have.property('EHRID');
          res.body.should.have.property('FROMDATE');
          res.body.should.have.property('TODATE');
          res.body.should.have.property('PERIOD');
        
          res.body.data.should.equal(result.message); 
        });
        done();
      });

      it("should update labtest status into blockchain",function(done){
        request(app)
        api
        .post('/updateData?WIDGET=LABTEST')
        .send({  "EHRID" : "test",   
        "ID":"7ifkfkffkkf",          
          "SSO_ID": "SSO_ID",
          "TEST_CODE": "05",
          "TEST_NAME": "bloodtest",
          "RESULT_TEXT": "b+ve",
          "RESULT_UNIT": "result-unit",
          "MEASURED_DATE": "09/22/2017",
          "NOTES": "take your test papers",
          "CONFIDENTIALITY_STATUS":"U"})
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('EHRID');
          res.body.should.have.property('ID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('TEST_CODE');
          res.body.should.have.property('TEST_NAME');
          res.body.should.have.property('RESULT_TEXT');
          res.body.should.have.property('RESULT_UNIT');
          res.body.should.have.property('MEASURED_DATE');
          res.body.should.have.property('NOTES');
          res.body.should.have.property('CONFIDENTIALITY_STATUS');
          res.body.data.should.equal(result.message);
       //  done();
        });
        done();
      });
    
        it("should get labtest summary from blockchain",function(done){
          request(app)  
          api
            .post('/summaryData?WIDGET=LABTEST')
            .send({  "EHRID":"test"})
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
            res.body.should.have.property('EHRID');
              res.body.data.should.equal(result.message);
        // done();
            
            });
            done();
          });
    
          it("should delete labtest record from blockchain",function(done){
            request(app)
            api
            .post('/deleteData?WIDGET=LABTEST')
            .send({  "EHRID":"test",
               "ID":"7ifkfkfkkf"
          })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
            
              res.status.should.equal(200);
              res.body.should.have.property('EHRID');
              res.body.should.have.property('ID');//checking this property avialable in json
              res.body.data.should.equal(result.message)
            });
            done();
          });
    
          it("fields should not be empty during deleting data of labtest",function(done){
            request(app)
            api
            .post('/deleteData?WIDGET=LABTEST')
            .send({  "EHRID":"",
               "ID":""       })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
            
              res.status.should.equal(200);
              res.body.should.have.property('EHRID');
              res.body.should.have.property('ID');//checking this property avialable in json
              res.body.data.should.equal(result.message)
            });
            done();
          });
    })  
