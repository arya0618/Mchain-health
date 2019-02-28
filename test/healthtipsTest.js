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






//------------------------test case for health tips-------------------------------------------
describe('HEALTHTIPS', function() {
    it("should add HEALTHTIPS data into blockchain",function(done){
                request(app) 
                api
                  .post('/addData?WIDGET=HEALTHTIPS')
                  .send({
                    "CATEGORY_DESCRIPTION": "Include physical activity in your daily routine. " , 
                   "VALID_FROM":"01/12/2018",
                    "VALID_TO": "01/21/2018",
                   "CATEGORY_DESCRIPTION_HINDI":"अपने दैनिक दिनचर्या में शारीरिक गतिविधि शामिल करें" 
                           
                         } )
                  .set("Accept",'application/json')
                  .expect(200)
                  .end(function(err,res){
                    res.body.should.have.property('CATEGORY_DESCRIPTION');
                    res.body.should.have.property('VALID_FROM');
                    res.body.should.have.property('VALID_TO');
                    res.body.should.have.property('CATEGORY_DESCRIPTION_HINDI');
                    res.status.should.equal(200); 
                    res.body.data.should.equal(result.message);
                  });
                  done();
                });
                it("this helathtips record already present into blockchain",function(done){
                  request(app) 
                  api
                    .post('/addData?WIDGET=HEALTHTIPS')
                    .send({
                      "CATEGORY_DESCRIPTION": "Include physical activity in your daily routine. " , 
                     "VALID_FROM":"01/12/2018",
                      "VALID_TO": "01/21/2018",
                     "CATEGORY_DESCRIPTION_HINDI":"अपने दैनिक दिनचर्या में शारीरिक गतिविधि शामिल करें" 
                             
                           } )
                    .set("Accept",'application/json')
                    .expect(401)
                    .end(function(err,res){
                      res.body.should.have.property('CATEGORY_DESCRIPTION');
                      res.body.should.have.property('VALID_FROM');
                      res.body.should.have.property('VALID_TO');
                      res.body.should.have.property('CATEGORY_DESCRIPTION_HINDI');
                      res.status.should.equal(200); 
                      res.body.data.should.equal(result.message);
                    });
                    done();
                  });
           
                // it("fields should not be empty during reading healthtips ",function(done){
                //   request(app) 
                //   api
                //     .post('/readData?WIDGET=HEALTHTIPS')
                //     .send({
                //      "key":""        
                //            })
                //     .set("Accept",'application/json')
                //     .expect(400)
                //     .end(function(err,res){
                //       res.body.should.have.property('key');
                //       res.status.should.equal(400); 
                //       res.body.data.should.equal(result.message);
                //     });
                //     done();
                //   });
      
                it("should read HEALTHTIPS data from blockchain",function(done){
                  request(app) 
                  api
                    .post('/readData?WIDGET=HEALTHTIPS')
                    .send({
                     "key":"HEALTHTIPSTEST"      
                           })
                    .set("Accept",'application/json')
                    .expect(200)
                    .end(function(err,res){
                      res.body.should.have.property('key');
                      res.status.should.equal(200); 
                      res.body.data.should.equal(result.message);
                    });
                    done();
                  });
                  it("should update HEALTHTIPS data into blockchain",function(done){
                    request(app) 
                    api
                      .post('/updateData?WIDGET=HEALTHTIPS')
                      .send({
                        "key":"HEALTHTIPSTEST" ,
                        "CATEGORY_DESCRIPTION": "Hello. " , 
                       "VALID_FROM":"1/01/2018",
                        "VALID_TO": "16/01/2018",
                       "CATEGORY_DESCRIPTION_HINDI":"अपने दैनिक दिनचर्या में शारीरिक गतिविधि शामिल करें" ,
                       "ID":"7i3h4ne7njdbmmcj8"
                               
                             })
                      .set("Accept",'application/json')
                      .expect(200)
                      .end(function(err,res){
                        res.body.should.have.property('CATEGORY_DESCRIPTION');
                        res.body.should.have.property('VALID_FROM');
                        res.body.should.have.property('VALID_TO');
                        res.body.should.have.property('CATEGORY_DESCRIPTION_HINDI');
                        res.status.should.equal(200); 
                        res.body.data.should.equal(result.message);
                      });
                      done();
                    });
        
                  it("should delte HEALTHTIPS data from blockchain",function(done){
                    request(app) 
                    api
                      .post('/deleteData?WIDGET=HEALTHTIPS')
                      .send({
                        "key":"HEALTHTIPTEST"       ,
                    "ID": "7i3h4ne7njdbmmcj8"
   
                             })
                      .set("Accept",'application/json')
                      .expect(200)
                      .end(function(err,res){
                        res.body.should.have.property('key');
                        res.body.should.have.property('ID');
                        res.status.should.equal(200); 
                        res.body.data.should.equal(result.message);
                      });
                      done();
                    });
                    it("field should not be empty during healthtips data",function(done){
                      request(app) 
                      api
                        .post('/deleteData?WIDGET=HEALTHTIPS')
                        .send({
                          "key":""       ,
                      "ID": "7i3h4ne7njdbmmcj8"
     
                               })
                        .set("Accept",'application/json')
                        .expect(400)
                        .end(function(err,res){
                          res.body.should.have.property('key');
                          res.body.should.have.property('ID');
                          res.status.should.equal(200); 
                          res.body.data.should.equal(result.message);
                        });
                        done();
                      });
                   
    
              });
