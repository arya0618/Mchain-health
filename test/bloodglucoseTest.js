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


var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");


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



//-----------test case for blood glucose-----------------------------   
describe('Blood glucoseData', function() {
    it("should add blood glucose data into blockchain",function(done){
      request(app)  
      api
        .post('/addData?WIDGET=BLOODGLUCOSE')
        .send({  "EHRID":"test",
        "SSO_ID":"goverdhansingh123",
        "GLUCOSE_VALUE":"65",
        "MEASURED_AT":"90",
        "MEASURED_AT_VALUE":"90",
        "MEASURED_DATE":"01/11/2018",
       "NOTES":"blood reposrt",
        "CONFIDENTIALITY_STATUS":"U"})
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
         res.status.should.equal(200);
          // res.body.should.have.property('EHRID');
          // res.body.should.have.property('SSO_ID');
          // res.body.should.have.property('GLUCOSE_VALUE');
          // res.body.should.have.property('MEASURED_AT');
          // res.body.should.have.property('MEASURED_AT_VALUE');
          // res.body.should.have.property('MEASURED_DATE');
          // res.body.should.have.property('NOTES');
          // res.body.should.have.property('CONFIDENTIALITY_STATUS');
          //  res.body.data.should.equal(result.message);
       //  done();
        });
        done();
      });

      it("fields should not be empty during adding bloodglucose data",function(done){
        request(app)  
        api
          .post('/addData?WIDGET=BLOODGLUCOSE')
          .send({  "EHRID":"",
          "SSO_ID":"goverdhansingh123",
          "GLUCOSE_VALUE":"",
          "MEASURED_AT":"45",
          "MEASURED_AT_VALUE":"45",
          "MEASURED_DATE":"01/11/2018",
         "NOTES":"blood reposrt",
          "CONFIDENTIALITY_STATUS":""})
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
            res.status.should.equal(400);
            // res.body.should.have.property('EHRID');
            // res.body.should.have.property('SSO_ID');
            // res.body.should.have.property('GLUCOSE_VALUE');
            // res.body.should.have.property('MEASURED_AT');
            // res.body.should.have.property('MEASURED_AT_VALUE');
            // res.body.should.have.property('MEASURED_DATE');
            // res.body.should.have.property('NOTES');
            // res.body.should.have.property('CONFIDENTIALITY_STATUS');
            //  res.body.data.should.equal(result.message);
         //  done();
          });
          done();
        });
   
 
        it("should get blood glucose Summary from blockchain",function(done){
          request(app)  
          api
            .post('/summaryData?WIDGET=BLOODGLUCOSE')
            .send({  "EHRID":"test"
            })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              // res.body.should.have.property('EHRID');
              // res.body.data.should.equal(result.message);
          
            });
            done();
          });

          it("fields should not empty during reading summary data of bloodglucose",function(done){
            request(app)  
            api
              .post('/summaryData?WIDGET=BLOODGLUCOSE')
              .send({  "EHRID":""
              })
              .set("Accept",'application/json')
              .expect(400)
              .end(function(err,res){
                res.status.should.equal(200);
                // res.body.should.have.property('EHRID');
                // res.body.data.should.equal(result.message);
            
              });
              done();
            });
       
        
            it("should update blood glucose Status into blockchain",function(done){
              request(app) 
              api
                .post('/updateData?WIDGET=BLOODGLUCOSE')
                .send({  "EHRID":"test",
                "ID":"7ifkfkkfkf",
                "SSO_ID":"goverdhansingh123",
                "GLUCOSE_VALUE":"60",
                "MEASURED_AT":"45",
                "MEASURED_AT_VALUE":"45",
                "MEASURED_DATE":"01/11/2018", 
                "NOTES":"blood reposrt",
                "CONFIDENTIALITY_STATUS":"u"})
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
          //         res.body.should.have.property('EHRID');
          //         res.body.should.have.property('ID');
          // res.body.should.have.property('SSO_ID');
          // res.body.should.have.property('GLUCOSE_VALUE');
          // res.body.should.have.property('MEASURED_AT');
          // res.body.should.have.property('MEASURED_AT_VALUE');
          // res.body.should.have.property('MEASURED_DATE');
          // res.body.should.have.property('NOTES');
          // res.body.should.have.property('CONFIDENTIALITY_STATUS');
          //         res.body.data.should.equal(result.message);
   
                });
                done();
              });
            
                it("should get blood glucose data from blockchain",function(done){
                  request(app)  
                  api
                    .post('/readData?WIDGET=BLOODGLUCOSE')
                    .send({  "EHRID" : "test", 
                    "FROMDATE":"01/01/2017",
                    "TODATE":"01/30/2018",
                   })
                    .set("Accept",'application/json')
                    .expect(200)
                    .end(function(err,res){
                      res.status.should.equal(200);
                      res.body.should.have.property('EHRID');
                        res.body.should.have.property('FROMDATE');
                      res.body.should.have.property('TODATE');
                    res.body.should.have.property('PERIOD');
                      res.body.data.should.equal(result.message);
                   //  done();
                    });
                   done();
               });
   it("should delete blood glucose record from blockchain",function(done){
            request(app)
            api
            .post('/deleteData?WIDGET=BLOODGLUCOSE')
            .send({  "EHRID":"test",
            "ID":"7ifkfkffk",
            })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
            
              res.status.should.equal(200);
              res.body.should.have.property('EHRID');
              res.body.should.have.property('ID');
              
            res.body.data.should.equal(result.message);
          
            
            });
            done();
          });                     

  it("Feild should be empty during deleting bloodglucose data",function(done){
    request(app)
        api
        .post('/deleteData?WIDGET=BLOODGLUCOSE')
        .send({  "EHRID":"",
        "ID":"",
        })
        .set("Accept",'application/json')
        .expect(400)
        .end(function(err,res){
        
          res.status.should.equal(400);
          res.body.should.have.property('EHRID');
          res.body.should.have.property('ID');
            res.body.data.should.equal(result.response);
      });
            done();
          });                     

});
