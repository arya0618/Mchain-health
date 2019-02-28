/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 10/03/2018
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



var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");


var config = require('config');
var TestIp = config.get('TestIp');

var api = request("http://"+TestIp.host+":3000")



/***     test case for activity widget    ***/
describe('add  section ', function(req, res) { 
//  mlog.log('This is .log()');
  
    it("should add activity details into blockchain",function(){
     
        /*** calling addActivities api ***/
        request(app)
        api .post('/addData?WIDGET=ACTIVITY')
        .type('json')   
        .send({"EHRID":"test",
        "SSO_ID":"goverdhansingh123",
        "ACTIVITY_ID":"06",
        "ACTIVITY_DESC":"cycling",
        "MEASURED_DATE":"09/01/2018",
        "DISTANCE":"2",
        "TOTAL_TIME_HOUR":"0",
        "TOTAL_TIME_MIN":"41",
        "NOTES":"xyz", 
        "CONFIDENTIALITY_STATUS":"L"})
        .set("Accept",'application/json')
        .expect(200)
       .end(function(err,res){
  
        
         // res.body.should.have.property('EHRID');
          // res.body.should.have.property('SSO_ID').type(String);
          
          // res.body.should.have.property('ACTIVITY_ID');
          // res.body.should.have.property('MEASURED_DATE');
          // res.body.should.have.property('TOTAL_TIME_HOUR');
          // res.body.should.have.property('TOTAL_TIME_MIN');
          // res.body.should.have.property('DISTANCE');
          // res.body.should.have.property('NOTES');
          // res.body.should.have.property('CONFIDENTIALITY_STATUS');
        //  res.status.should.equal(200);
         // res.body.data.should.equal(result.message);
         // res.body.data.should.equal(result.message);
           
        });
    
      });


  

      it("should get activity details from blockchain",function(done){
        /*** calling getActivities api ***/
        request(app)
        api
        .post('/readData?WIDGET=ACTIVITY')
        .type('json') 
        .send({"EHRID" : "test", 
       
        
        "PERIOD":"500" })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
         
          
          //      res.body.should.have.property('EHRID');
          //      res.body.should.have.property('FROMDATE');
          //      res.body.should.have.property('TODATE');
          //      res.body.should.have.property('PERIOD');
           //res.status.should.equal(result.status);
        //cres.body.should.equal(result.data);
                    
          
        });
        done();
      });

      it("fileds should not be empty during reading data of activity",function(done){
       
        request(app)
        api
        .post('/readData?WIDGET=ACTIVITY')
        .type('json') 
        .send({"EHRID" : "", 
        "FROMDATE":"01/10/2018",
        "TODATE":"01/20/2018"
       })
        .set("Accept",'application/json')
        .expect(400)
        .end(function(err,res){
         
          
              //  res.body.should.have.property('EHRID');
              //  res.body.should.have.property('FROMDATE');
              //  res.body.should.have.property('TODATE');
              //  res.body.should.have.property('PERIOD');
          res.status.should.equal(400);
         
                    
        });
        done();
      });

   it("should get  activity summary from blockchain",function(done){
         /***calling readActivitySummary api***/
      request(app)
      api
      .post('/summaryData?WIDGET=ACTIVITY')
      .type('json') 
      .send({"EHRID":"test"})
      .set("Accept",'application/json')
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200); 
        //res.body.should.have.property('EHRID');
       // res.body.data.should.equal(result.message);
      //  done();
            });
            done();
          });
   it("fields should not be empty during reading activity summary data ",function(done){
            //calling readActivitySummary api
         request(app)
         api
         .post('/summaryData?WIDGET=ACTIVITY')
         .type('json') 
         .send({"EHRID":""})
         .set("Accept",'application/json')
         .expect(400)
         .end(function(err,res){
           res.status.should.equal(400); 
               });
               done();
             });       
       
      it("should update activity Status into blockchain",function(done){
              request(app)
                api
                .post('/updateData?WIDGET=ACTIVITY')
                .type('json') 
                .send({"EHRID":"test",
                "ID":"7iihfjudmdj",
                "SSO_ID":"goverdhansingh123",
                "ACTIVITY_ID":"02",
                "ACTIVITY_DESC":"cycling",
                "MEASURED_DATE":"01/14/2018",
                "DISTANCE":"2",
                "TOTAL_TIME_HOUR":"0",
                "TOTAL_TIME_MIN":"45",
                "NOTES":"xyz", 
                "CONFIDENTIALITY_STATUS":"U"
                })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                
                  // res.body.should.have.property('EHRID');
                  // res.body.should.have.property('ID');
                  // res.body.should.have.property('SSO_ID');
                  // res.body.should.have.property('ACTIVITY_ID');
                  // res.body.should.have.property('MEASURED_DATE');
                  // res.body.should.have.property('TOTAL_TIME_HOUR');
                  // res.body.should.have.property('TOTAL_TIME_MIN');
                  // res.body.should.have.property('DISTANCE');
                  // res.body.should.have.property('NOTES');
                  // res.body.should.have.property('CONFIDENTIALITY_STATUS');
                  // res.status.should.equal(200);
                  
                  
                  //res.body.data.should.equal(result.message);
               //  done();
                });
                done();
              });
        
              it("should delete activities's record from blockchain",function(done){
                request(app)
               api.post('/deleteData?WIDGET=ACTIVITY')
                .send({  "EHRID":"test",
               "ID":"7iyhujikiki"})
               .type('json') 
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
               
                  
              //     res.body.should.have.property('EHRID');
              //     res.body.should.have.property('ID');
              //     res.status.should.equal(200);
              //  // res.body.data.should.equal(result.message);
             
                
                });
                done();
              });      
              
              it("feild should not be empty during deleteing activity data",function(done){
                request(app)
               api.post('/deleteData?WIDGET=ACTIVITY')
                .send({  "EHRID":"",
               "ID":""})
               .type('json') 
                .set("Accept",'application/json')
                .expect(400)
                .end(function(err,res){
                
                  // res.body.should.have.property('EHRID');
                  // res.body.should.have.property('ID');
                  // res.status.should.equal(400);
               // res.body.data.should.equal(result.message);
             
                
                });
                done();
              });      
              

    });

