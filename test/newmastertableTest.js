/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 26/03/2018
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


/**test case for ALLERGY_SEVERITY*/  
describe('ALLERGY_SEVERITY', function() {
    it("should add ALLERGY_SEVERITY data into blockchain",function(done){
      request(app) 
      api
        .post('/addData?WIDGET=ALLERGY_SEVERITY')
        .send({        "ALLSERV_id": 13,
        "SEVERITY": "SEVERITY_test",
        "DESCRIPTION": "DESCRIPTION_test",
        "CREATEDBY": "abcde"          
            })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('MEASURE_TYPE');
        res.body.should.have.property('MEASURE_DESCRIPTION');
        res.body.data.should.equal(result.message);
      
        });
        done();
      });
      it("fields should not be empty during adding ALLERGY_SEVERITY data",function(done){
        request(app) 
        api
          .post('/addData?WIDGET=ALLERGY_SEVERITY')
          .send({       "ALLSERV_id": 13,
          "SEVERITY": "",
          "DESCRIPTION": "DESCRIPTION_test",
          "CREATEDBY": "abcde"        
              })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
            res.status.should.equal(400);
            res.body.should.have.property('MEASURE_TYPE');
          res.body.should.have.property('MEASURE_DESCRIPTION');
          res.body.data.should.equal(result.message);
        
          });
          done();
        });
  
      it("should read ALLERGY_SEVERITY data into blockchain",function(done){
        request(app) 
        api
          .post('/readData?WIDGET=ALLERGY_SEVERITY')
          .send({      "key":"ALLERGY_SEVERITY"
                   })
          .set("Accept",'application/json')
          .expect(200)
          .end(function(err,res){
            res.status.should.equal(200);
         res.body.should.have.property('MEASURE_TYPE');
          res.body.should.have.property('MEASURE_DESCRIPTION');
          res.body.data.should.equal(result.message);
        
          });
          done();
        });
        it("this key should be valid",function(done){
          request(app) 
          api
            .post('/readData?WIDGET=ALLERGY_SEVERITY')
            .send({      "key":"ALLERGY_SEVERITY8"
                     })
            .set("Accept",'application/json')
            .expect(404)
            .end(function(err,res){
              res.status.should.equal(404);
           res.body.should.have.property('key');
           
            res.body.data.should.equal(result.message);
          
            });
            done();
          });
       
        it("should update ALLERGY_SEVERITY data into blockchain",function(done){
            request(app) 
            api
              .post('/updateData?WIDGET=ALLERGY_SEVERITY')
              .send({   "key":"ALLERGY_SEVERITY",
              "ALLSERV_id": "13",
             "SEVERITY": "SEVERITY_test",
             "DESCRIPTION": "DESCRIPTION_test",
             "CREATEDON": "22/03/2018",
             "CREATEDBY": "abcde",
             "MODIFIEDBY": "bbbb",
             "ID": "7i3h4n802jf2ghi2o"            })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('MEASURE_TYPE');
              res.body.should.have.property('MEASURE_DESCRIPTION');
              res.body.should.have.property('key');
              res.body.should.have.property('ID');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
      
        
        it("should delete ALLERGY_SEVERITY data from blockchain",function(done){
            request(app) 
            api
              .post('/deleteData?WIDGET=ALLERGY_SEVERITY')
              .send({      "key":"ALLERGY_SEVERITY",
              "ID":"7ijkyffdssc"
                       })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
                res.body.should.have.property('ID');
                       res.body.data.should.equal(result.message);
            
              });
              done();
            }); 
            it("should field should ot be empty during deleting ALLERGY_SEVERITY dATA ",function(done){
              request(app) 
              api
                .post('/deleteData?WIDGET=ALLERGY_SEVERITY')
                .send({      "key":"ALLERGY_SEVERITY",
                "ID":""
                         })
                .set("Accept",'application/json')
                .expect(200)
                .end(function(err,res){
                  res.status.should.equal(200);
                  res.body.should.have.property('key');
                  res.body.should.have.property('ID');
                         res.body.data.should.equal(result.message);
              
                });
                done();
              }); 
       

    });


    describe('ALLERGY_SINCE', function() {
        it("should add ALLERGY_SINCE data into blockchain",function(done){
          request(app) 
          api
            .post('/addData?WIDGET=ALLERGY_SINCE')
            .send({        "ALLSERV_id": 13,
            "SINCE": "SINCE_test",
            "DESCRIPTION": "DESCRIPTION_test",
            "CREATEDBY": "abcde"          
                })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('MEASURE_TYPE');
            res.body.should.have.property('MEASURE_DESCRIPTION');
            res.body.data.should.equal(result.message);
          
            });
            done();
          });
          it("fields should not be empty during adding ALLERGY_SINCE data",function(done){
            request(app) 
            api
              .post('/addData?WIDGET=ALLERGY_SINCE')
              .send({       "ALLSERV_id": 13,
              "SEVERITY": "",
              "DESCRIPTION": "DESCRIPTION_test",
              "CREATEDBY": "abcde"        
                  })
              .set("Accept",'application/json')
              .expect(400)
              .end(function(err,res){
                res.status.should.equal(400);
                res.body.should.have.property('MEASURE_TYPE');
              res.body.should.have.property('MEASURE_DESCRIPTION');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
      
          it("should read ALLERGY_SINCE data into blockchain",function(done){
            request(app) 
            api
              .post('/readData?WIDGET=ALLERGY_SINCE')
              .send({      "key":"ALLERGY_SINCE"
                       })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
             res.body.should.have.property('MEASURE_TYPE');
              res.body.should.have.property('MEASURE_DESCRIPTION');
              res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("this key should be valid",function(done){
              request(app) 
              api
                .post('/readData?WIDGET=ALLERGY_SINCE')
                .send({      "key":"ALLERGY_SINCE8"
                         })
                .set("Accept",'application/json')
                .expect(404)
                .end(function(err,res){
                  res.status.should.equal(404);
               res.body.should.have.property('key');
               
                res.body.data.should.equal(result.message);
              
                });
                done();
              });
           
            it("should update ALLERGY_SEVERITY data into blockchain",function(done){
                request(app) 
                api
                  .post('/updateData?WIDGET=ALLERGY_SINCE')
                  .send({   "key":"ALLERGY_SINCE",
                  "ALLSERV_id": "13",
                 "SINCE": "SINCE-test",
                 "DESCRIPTION": "DESCRIPTION_test",
                 "CREATEDON": "22/03/2018",
                 "CREATEDBY": "abcde",
                 "MODIFIEDBY": "bbbb",
                 "ID": "7i3h4n802jf2ghi2o"            })
                  .set("Accept",'application/json')
                  .expect(200)
                  .end(function(err,res){
                    res.status.should.equal(200);
                    res.body.should.have.property('MEASURE_TYPE');
                  res.body.should.have.property('MEASURE_DESCRIPTION');
                  res.body.should.have.property('key');
                  res.body.should.have.property('ID');
                  res.body.data.should.equal(result.message);
                
                  });
                  done();
                });
          
            
            it("should delete ALLERGY_SINCE data from blockchain",function(done){
                request(app) 
                api
                  .post('/deleteData?WIDGET=ALLERGY_SINCE')
                  .send({      "key":"ALLERGY_SINCE",
                  "ID":"7ijkyffdssc"
                           })
                  .set("Accept",'application/json')
                  .expect(200)
                  .end(function(err,res){
                    res.status.should.equal(200);
                    res.body.should.have.property('key');
                    res.body.should.have.property('ID');
                           res.body.data.should.equal(result.message);
                
                  });
                  done();
                }); 
                it("should field should ot be empty during deleting ALLERGY_SINCE dATA ",function(done){
                  request(app) 
                  api
                    .post('/deleteData?WIDGET=ALLERGY_SINCE')
                    .send({      "key":"ALLERGY_SINCE",
                    "ID":""
                             })
                    .set("Accept",'application/json')
                    .expect(200)
                    .end(function(err,res){
                      res.status.should.equal(200);
                      res.body.should.have.property('key');
                      res.body.should.have.property('ID');
                             res.body.data.should.equal(result.message);
                  
                    });
                    done();
                  }); 
           
    
        });
    
