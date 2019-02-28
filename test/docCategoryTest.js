/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 22/03/2018
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
*test case for document category
*/  
describe('Document category', function() {
    it("should add Document category data into blockchain",function(done){
    
      request(app) 
      api.post('/addData?WIDGET=DOC_CATEGORY')
        .send({     
            "CATEGORY_CODE": "94",
"CATEGORY_DESCRIPTION": "MEDICAL TEST",
              })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('CATEGORY_CODE');
         res.body.should.have.property('CATEGORY_DESCRIPTION');
         res.body.data.should.equal(result.message);
      
        });
        done();
      });
      it("fields should not be empty during adding document data",function(done){
    
        request(app) 
        api.post('/addData?WIDGET=DOC_CATEGORY')
          .send({     
                  "CATEGORY_CODE": "",
                    "CATEGORY_DESCRIPTION": "MEDICAL TEST",
                })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
            res.status.should.equal(400);
            res.body.should.have.property('CATEGORY_CODE');
           res.body.should.have.property('CATEGORY_DESCRIPTION');
           res.body.data.should.equal(result.message);
        
          });
          done();
        });

        it("should read Document category data from blockchain",function(done){
    
            request(app) 
            api.post('/readData?WIDGET=DOC_CATEGORY')
              .send({     
                "key":"DOC_CATEGORY"
                    })
              .set("Accept",'application/json')
              .expect(200)
              .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.have.property('key');
               res.body.data.should.equal(result.message);
            
              });
              done();
            });
            it("key should be valid ",function(done){
    
                request(app) 
                api.post('/readData?WIDGET=DOC_CATEGORY')
                  .send({     
                    "key":"DOC_CATEGORY23"
                        })
                  .set("Accept",'application/json')
                  .expect(401)
                  .end(function(err,res){
                    res.status.should.equal(200);
                    res.body.should.have.property('key');
                   res.body.data.should.equal(result.message);
                
                  });
                  done();
                });   
                it("should upate doucment data into blockchain",function(done){
    
                    request(app) 
                    api.post('/updateData?WIDGET=DOC_CATEGORY')
                      .send({ "key":"DOC_CATEGORY",

                      "CATEGORY_CODE": "84",
                      "CATEGORY_DESCRIPTION": "MEDICAL TEST",
                      "ID": "7i3h4n2wxjf21kyod"
                     
                            })
                      .set("Accept",'application/json')
                      .expect(400)
                      .end(function(err,res){
                        res.status.should.equal(400);
                        res.body.should.have.property('CATEGORY_CODE');
                       res.body.should.have.property('CATEGORY_DESCRIPTION');
                       res.body.data.should.equal(result.message);
                    
                      });
                      done();
                    }); 
                    it("should delete doucment data from blockchain",function(done){
    
                        request(app) 
                        api.post('/delteData?WIDGET=DOC_CATEGORY')
                          .send({ "key":"DOC_CATEGORY",
                          "ID": "7i3h4n2wxjf21kyod"
                         
                                })
                          .set("Accept",'application/json')
                          .expect(404)
                          .end(function(err,res){
                            res.status.should.equal(404);
                           // res.body.should.have.property('key');
                           //res.body.should.have.property('ID');
                          // res.body.data.should.equal(result.message);
                        
                          });
                          done();
                        }); 
        
    });