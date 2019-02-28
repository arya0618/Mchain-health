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
describe('BMI_Data', function() {
    it("should add BMI data into blockchain",function(done){
      /**calling addBMI api */
      request(app) 
      api.post('/addData?WIDGET=BMI')
        .send({       "EHRID":"test",
                      "SSO_ID":"goverdhansingh123",
                      "HEIGHT":"60",
                      "WEIGHT":"170",
                       "BMI":"194.44",
                      "MEASURED_DATE":"18/01/2018",
                      "NOTES":"BMI report",
                      "CONFIDENTIALITY_STATUS":"L"
              })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('EHRID');
                  res.body.should.have.property('SSO_ID');
                  res.body.should.have.property('HEIGHT');
                  res.body.should.have.property('WEIGHT');
                  res.body.should.have.property('BMI');
                  res.body.should.have.property('MEASURED_DATE');
                  res.body.should.have.property('NOTES');
                  res.body.should.have.property('CONFIDENTIALITY_STATUS');
                  
          res.body.data.should.equal(result.message);
      
        });
        done();
      });
      
      it("fields should not be empty during add bmi data",function(done){
        /**calling addBMI api */
        request(app) 
        api.post('/addData?WIDGET=BMI')
          .send({      "EHRID":"",
                        "SSO_ID":"goverdhansingh123",
                        "HEIGHT":"",
                        "WEIGHT":"70",
                         "BMI":"194",
                        "MEASURED_DATE":"01/11/2018",
                        "NOTES":"BMI report",
                        "CONFIDENTIALITY_STATUS":"lock"
                })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
            res.status.should.equal(400);
            res.body.should.have.property('EHRID');
                    res.body.should.have.property('SSO_ID');
                    res.body.should.have.property('HEIGHT');
                    res.body.should.have.property('WEIGHT');
                    res.body.should.have.property('BMI');
                    res.body.should.have.property('MEASURED_DATE');
                    res.body.should.have.property('NOTES');
                    res.body.should.have.property('CONFIDENTIALITY_STATUS');
                    
            res.body.data.should.equal(result.message);
         //  done();
          });
          done();
        });
   


        it("should update BMI status into blockchain",function(done){
         /**calling updateBMI api */
 
          request(app)
          api .post('/updateData?WIDGET=BMI')
            .send({                
            "EHRID":"test",
            "ID":"7ifkfkfkkik",
            "submittedOn":"2018-02-06T13:19:31.942Z",
                          "SSO_ID":"goverdhansingh123",
                          "HEIGHT":"60",
                          "WEIGHT":"70",
                           "BMI":"194.44",
                          "MEASURED_DATE":"01/11/2018",
                          "NOTES":"BMI report",
                          "CONFIDENTIALITY_STATUS":"U"})
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('EHRID');
              res.body.should.have.property('ID');
              res.body.should.have.property('SSO_ID');
              res.body.should.have.property('HEIGHT');
              res.body.should.have.property('WEIGHT');
              res.body.should.have.property('BMI');
              res.body.should.have.property('MEASURED_DATE');
              res.body.should.have.property('NOTES');
              res.body.should.have.property('CONFIDENTIALITY_STATUS');
              
              res.body.data.should.equal(result.message);
           //  done();
            });
            done();
          });
        
            it("should get BMI summary from blockchain",function(done){
              /*
              * calling readSummaryBMI api
               */
 
              request(app) 
              api.post('/summaryData?WIDGET=BMI')
                .send({  "EHRID":"test"
                })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
             
                
                res.body.should.have.property('EHRID');
                  res.status.should.equal(200);
                  res.body.data.should.equal(result.message);              
                });
                done();
              });
              it("fields should not be empty during reading summary data of bmi",function(done){
                /*
                * calling readSummaryBMI api
                 */
   
                request(app) 
                api.post('/summaryData?WIDGET=BMI')
                  .send({  "EHRID":""
                  })
                  .set("Accept",'application/json')
                  .expect(400)
                  .end(function(err,res){
               
                  
                  res.body.should.have.property('EHRID');
                    res.status.should.equal(200);
                    res.body.data.should.equal(result.message);              
                  });
                  done();
                });
              


              it("should get BMI data from blockchain",function(done){
                /**calling readBMI data api */
 
                request(app)
                api .post('/readData?WIDGET=BMI')
                .send({"EHRID":"test",
                   "FROMDATE":"01/10/2017",
                   "TODATE":"01/20/2018"
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
                
              it("should delete BMI record from blockchain",function(done){
                request(app)
                api
                .post('/deleteData?WIDGET=BMI')
                .send({  "EHRID":"test",
                "ID":"7ifkfffkjk"
                })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                res.body.should.have.property('EHRID');
                res.body.should.have.property('ID'); /** checking this property avialable in json*/
                res.status.should.equal(200);
                res.body.data.should.equal(result.message);
             
                
                });
                done();
              });         
          it("feilds should not be empty during deleting BMI data",function(done){
            request(app)
            api
            .post('/deleteData?WIDGET=BMI')
            .send({  "EHRID":"",
            "ID":""
            })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
            
              res.body.should.have.property('EHRID');
            res.body.should.have.property('ID'); //checking this property avialable in json
            res.status.should.equal(400);
            res.body.data.should.equal(result.message);
          
            
            });
            done();
          });                     
    });
  
