// /**
// @author: Piyusha Patel
// @Version: 1.0.2
// @Date: 17/01/2018
// @description: DOIT BlockChain project
// **/
// 'use strict';
// const express = require('express');
// const chai = require('chai');  
// const expect = require('chai').expect;
// chai.use(require('chai-http'));
// const app = require('../app');

// const router = express.Router();
// require('../routes')(router);
// app.use('/', router);
// var mlog=require('mocha-logger')
// var empty = require('is-empty');
// var assert = require('assert');
// var should = require("should");

// var sinon = require('sinon');
// var http = require('http');
// var request = require("supertest");

// var config = require('config');
// var TestIp = config.get('TestIp');
// console.log("TestIp",TestIp);
// var api = request("http://"+TestIp.host+":3000")
// console.log("api",api);


// /***     test case for auditrail w   ***/
// describe('auditrail section ', function(req, res) { 
//     it("should read all blocks data from blockchain based key",function(done){
//         request(app) 
//         api
//           .post('/auditTrial')
//           .send({      "EHRID":"test_ACTIVITY"
//                    })
//           .set("Accept",'application/json')
//           .expect(200)
//           .end(function(err,res){
//             res.status.should.equal(200);
//             res.body.should.have.property('EHRID');
//             res.body.data.should.equal(Object);
        
//           });
//           done();
//         });   
      

// });