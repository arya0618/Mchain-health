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


  //------test case for Medication--------
  describe(' MedicationData', function() {
    it("should add Medication data into blockchain",function(done){          
        request(app)
        api
        .post('/addData?WIDGET=MEDICATION')
        .send({"EHRID":"test",
          "SSO_ID": "sso123899",
        "MEDICINE_NAME": "MEDICINE_NAME",
        "STRENGHTH": 'xyz',
        "STRENGHTH_VALUE":'STRENGHTH_VALUE',
        "DOSAGE": 'DOSAGE',
        "DOSAGE_VALUE": 'DOSAGE_VALUE',
        "INTAKE_MODE": 'INTAKE_MODE',
        "HOW_OFTEN": 'HOW_OFTEN',
        "REASON_FOR_TAKING": 'REASON_FOR_TAKING',
        "START_DATE": '01/12/2018',
        "END_DATE": '01/18/2018',
        "MEASURED_DATE": '01/19/2018',
        "NOTES": 'fdfdgdgdhdhdh',
        "CONFIDENTIALITY_STATUS":"L"

        })
        .set("Accept",'application/json')
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.should.have.property('EHRID');
          res.body.should.have.property('SSO_ID');
          res.body.should.have.property('MEDICINE_NAME');
          res.body.should.have.property('STRENGHTH');
          res.body.should.have.property('STRENGHTH_VALUE');
          res.body.should.have.property('DOSAGE');
          res.body.should.have.property('DOSAGE_VALUE');
          res.body.should.have.property('INTAKE_MODE');
          res.body.should.have.property('HOW_OFTEN');
          res.body.should.have.property('START_DATE');
          res.body.should.have.property('END_DATE');
          res.body.should.have.property('REASON_FOR_TAKING');
          res.body.should.have.property('NOTES');
          res.body.should.have.property('CONFIDENTIALITY_STATUS'); 
          res.body.data.should.equal(result.message);
       
        });
        done();
      });

      it("fields should not be empty during adding medication data",function(done){          
        request(app)
        api
        .post('/addData?WIDGET=MEDICATION')
        .send({"EHRID":"",
          "SSO_ID": "SSO_ID",
        "MEDICINE_NAME": "",
        "STRENGHTH": 'STRENGHTH',
        "STRENGHTH_VALUE":'STRENGHTH_VALUE',
        "DOSAGE": 'high',
        "DOSAGE_VALUE": 'VALUE',
        "INTAKE_MODE": 'MODE',
        "HOW_OFTEN": 'HOW_OFTEN',
        "REASON_FOR_TAKING": 'REASON_FOR_TAKING',
        "START_DATE": '01/12/2018',
        "END_DATE": '01/18/2018',
        "MEASURED_DATE": '01/19/2018',
        "NOTES": 'fdfdgdgdhdhdh',
        "CONFIDENTIALITY_STATUS":""

        })
        .set("Accept",'application/json')
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          
          res.body.data.should.equal(result.message);
        });
        done();
      });
  
  
        it("should update Medication Status into blockchain",function(done){
          request(app)
          api
            .post('/updateData?WIDGET=MEDICATION')
            .send({"EHRID":"test",
              "SSO_ID": "SSO_ID",
              "ID":"7ifkifkifk",
            "MEDICINE_NAME": "MEDICINE_NAME",
            "STRENGHTH": 'STRENGHTH',
            "STRENGHTH_VALUE":'STRENGHTH_VALUE',
            "DOSAGE": 'DOSAGE',
            "DOSAGE_VALUE": 'DOSAGE_VALUE',
            "INTAKE_MODE": 'INTAKE_MODE',
            "HOW_OFTEN": 'HOW_OFTEN',
            "REASON_FOR_TAKING": 'REASON_FOR_TAKING',
            "START_DATE": '01/11/2018',
            "END_DATE": '01/18/2018',
            "MEASURED_DATE": '01/09/2018',
            "NOTES": 'NOTES',
            "CONFIDENTIALITY_STATUS":"U",
            "submittedOn":"2018-02-06T13:19:31.942Z"
 })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('EHRID');
               res.body.should.have.property('ID');
              res.body.should.have.property('SSO_ID');
              res.body.should.have.property('MEDICINE_NAME');
              res.body.should.have.property('STRENGHTH');
              res.body.should.have.property('STRENGHTH_VALUE');
              res.body.should.have.property('DOSAGE');
              res.body.should.have.property('DOSAGE_VALUE');
              res.body.should.have.property('INTAKE_MODE');
              res.body.should.have.property('HOW_OFTEN');
              res.body.should.have.property('START_DATE');
              res.body.should.have.property('END_DATE');
              res.body.should.have.property('REASON_FOR_TAKING');
              res.body.should.have.property('NOTES');
              res.body.should.have.property('CONFIDENTIALITY_STATUS'); 
              res.body.data.should.equal(result.message);
           
            });
            done();
          });
          it("should get medication Summary from blockchain",function(done){
            request(app)
            api
            .post('/summaryData?WIDGET=MEDICATION')
            .send({  "EHRID":"test" })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('EHRID');
              res.body.data.should.equal(result.message);
           
            });
            done();
          });
          it("fields should not be empty dring reading summary medication data",function(done){
            request(app)
            api
            .post('/summaryData?WIDGET=MEDICATION')
            .send({  "EHRID":"" })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(400);
              res.body.should.have.property('EHRID');
              res.body.data.should.equal(result.message);
           
            });
            done();
          });
          it("should get medication data from blockchain",function(done){
            request(app)
            api
            .post('/readData?WIDGET=MEDICATION')
            .send({  "EHRID" : "test", 
              "PERIOD":"365"
            })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
              res.status.should.equal(200);
              res.body.should.have.property('EHRID');
              res.body.should.have.property('FROMDATE');
              res.body.should.have.property('TODATE');
              res.body.should.have.property('PERIOD');
              res.body.data.should.equal(result.data);
           
            });
            done();
          });
          it("fields should not be empty during reading medication data ",function(done){
            request(app)
            api
            .post('/readData?WIDGET=MEDICATION')
            .send({  "EHRID" : "", 
          "PERIOD":""
           
            })
            .set("Accept",'application/json')
            .expect(400)
            .end(function(err,res){
              res.status.should.equal(400);
              res.body.should.have.property('EHRID');
              
              res.body.should.have.property('PERIOD');
              res.body.data.should.equal(result.data);
           
            });
            done();
          });

        
        
          it("should delete medications record from blockchain",function(done){
            request(app)
            api
            .post('/deleteData?WIDGET=MEDICATION')
            .send({  "EHRID":"test",
                   "ID":"7ifkfkfkfkf"
              })
            .set("Accept",'application/json')
            .expect(200)
            .end(function(err,res){
            if (err) done(err);
            else{
              res.body.should.have.property('EHRID');
              res.body.should.have.property('ID');
              //checking this property avialable in json
            res.status.should.equal(200);
            res.body.data.should.equal(result.message);
         
            }
            });
            done();
          });      
        
        it("fields should not be empty during deleting medication data",function(done){
          request(app)
          api
          .post('/deleteData?WIDGET=MEDICATION')
          .send({  "EHRID":"",
                 "ID":""
            })
          .set("Accept",'application/json')
          .expect(400)
          .end(function(err,res){
          if (err) done(err);
          else{
            res.body.should.have.property('EHRID');
            res.body.should.have.property('ID');
            //checking this property avialable in json
          res.status.should.equal(200);
          res.body.data.should.equal(result.message);
       
          }
          });
          done();
        });      
      


      });