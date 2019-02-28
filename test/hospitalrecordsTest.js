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





// describe('Hospital record', function() {
//   it("should update hospital record  into blockchain",function(done){
//     request(app)
//     api.post('/HospitalRecords/eConfedentialityStatus')
//     .send({
//         "key": "VKWPJJP_jefpm8e7_HOSPITAL_RECORDS",
//         "data": [{
//             "EHRID": "VKWPJJP_jefpm8e7_HOSPITAL_RECORDS",
//             "ENCOUNTERDETAILS": {
//                 "HOSPITAL_NAME": "SMS Hospital Jaipur",
//                 "ADDMISSION_DATE": "5/22/2017",
//                 "DISCHARGE_DATE": "6/17/2017",
//                 "TID": "T2305171127083",
//                 "ENCOUNTER_SPECIALITY": "Oncology",
//                 "ENCOUNTERDETAILS_MasterStatus": "U",
//                 "packageDetails": [{
//                     "masterLockStatus": [{
//                         "masterLockStatus": "R"
//                     }],
//                     "packages": [{
//                         "wardType": "Composite Resection & Reconstruction of any type",
//                         "TREATMENT_CATEGORY": "Tertiary",
//                         "TREATMENT_SPECIALITY": "Oncology",
//                         "status": "R"
//                     }],
//                     "documentLinks": {
//                         "preDrPrescription": "20170523/T2305171127083/105/preDrPrescription.pdf",
//                         "CT Scan": "20170617/T2305171127083/10/CT Scan.pdf",
//                         "Detailed Discharge Summary": "20170617/T2305171127083/25/Detailed Discharge Summary.pdf",
//                         "Other Documents or Reports 4": "20170617/T2305171127083/32/Other Documents or Reports 4.pdf",
//                         "Complete blood count (CBC)": "20170523/T2305171127083/5/Complete blood count (CBC).pdf",
//                         "prePatientPhoto": "20170523/T2305171127083/104/prePatientPhoto.jpeg",
//                         "Other Documents or Reports": "20170523/T2305171127083/29/Other Documents or Reports.pdf",
//                         "Other Documents or Reports 3": "20170617/T2305171127083/31/Other Documents or Reports 3.pdf",
//                         "Patient Feedback Form": "20170617/T2305171127083/34/Feedback Form Document.pdf",
//                         "Other Documents or Reports 2": "20170617/T2305171127083/30/Other Documents or Reports 2.pdf",
//                         "Electrocardiograph (ECG) tests": "20170617/T2305171127083/3/Electrocardiograph (ECG) tests.pdf",
//                         "dischargePatientPhoto": "20170617/T2305171127083/106/dischargePatientPhoto.jpeg",
//                         "Biopsy Report": "20170523/T2305171127083/9/Biopsy Report.pdf"
//                     }
//                 }],
//                 "LabResults": [{
//                     "reports": [{
//                         "RESULT_DATE": "6/7/2017",
//                         "TEST_NAME": "Serum Bilirubin Total",
//                         "PARAMETER_NAME": "DIRECT",
//                         "VALUE": "up to ",
//                         "REF.RANGE": "0.2 mg/dl",
//                         "STATUS": "U"
//                     }]
//                 }],
//                 "Medications": [{
//                     "Medicine": [{
//                             "BATCHCODE": "0203D1701.",
//                             "DRUG_DESCRIPTION": "Iohexol Usp (Solution For Injection) Non Ionic Contrast Medium In Sterile Aqueous Solution 300 Mg Iodine/Ml- 50 Ml [236]",
//                             "PRESCRIPTION_DATETIME": null,
//                             "DOSAGE_INSTRUCTION": null,
//                             "DISPENSED_QTY": "1.00",
//                             "START_DATE": "1/1/1970",
//                             "END_DATE": "1/1/1970",
//                             "MEDICAL_STATUS": "U"
//                         },
//                         {
//                             "BATCHCODE": "28%",
//                             "DRUG_DESCRIPTION": "Lignocaine Gel Ip 2 Percent [12]",
//                             "PRESCRIPTION_DATETIME": null,
//                             "DOSAGE_INSTRUCTION": null,
//                             "DISPENSED_QTY": "1.00",
//                             "START_DATE": "1/1/1970",
//                             "END_DATE": "1/1/1970",
//                             "MEDICAL_STATUS": "U"
//                         },
//                         {
//                             "BATCHCODE": "1610275",
//                             "DRUG_DESCRIPTION": "Ryles Tube / Nasogastric Tube (P.V.C) With Radio Opaque Lining Size: 14 [S24.A] ",
//                             "PRESCRIPTION_DATETIME": null,
//                             "DOSAGE_INSTRUCTION": null,
//                             "DISPENSED_QTY": "1.00",
//                             "START_DATE": "1/1/1970",
//                             "END_DATE": "1/1/1970",
//                             "MEDICAL_STATUS": "U"
//                         },
//                         {
//                             "BATCHCODE": "VM14571",
//                             "DRUG_DESCRIPTION": "Close Wound Drainage Device Under Negative Pressure (Closed Wound Suction Unit) Size Of Bellow 200 Ml, Catheter Size 14 [S96.C]",
//                             "PRESCRIPTION_DATETIME": null,
//                             "DOSAGE_INSTRUCTION": null,
//                             "DISPENSED_QTY": "1.00",
//                             "START_DATE": "1/1/1970",
//                             "END_DATE": "1/1/1970",
//                             "MEDICAL_STATUS": "U"
//                         },
//                         {
//                             "BATCHCODE": "17PDO46..",
//                             "DRUG_DESCRIPTION": "Compound Sodium Lactate Inj. Ip [377]",
//                             "PRESCRIPTION_DATETIME": null,
//                             "DOSAGE_INSTRUCTION": null,
//                             "DISPENSED_QTY": "5.00",
//                             "START_DATE": "1/1/1970",
//                             "END_DATE": "1/1/1970",
//                             "MEDICAL_STATUS": "U"
//                         },
//                         {
//                             "BATCHCODE": "38843",
//                             "DRUG_DESCRIPTION": "Sodium Chloride Injection Ip [386]",
//                             "PRESCRIPTION_DATETIME": null,
//                             "DOSAGE_INSTRUCTION": null,
//                             "DISPENSED_QTY": "5.00",
//                             "START_DATE": "1/1/1970",
//                             "END_DATE": "1/1/1970",
//                             "MEDICAL_STATUS": "R"
//                         }
//                     ]
//                 }]
//             }
//         }]
//     })
//     .set("Accept",'application/json')
//     .expect(200)
//     .end(function(err,res){
//       res.body.should.have.property('key');
//       res.body.should.have.property('data');
//       res.status.should.equal(200);
//       res.body.data.should.equal(result.message);
  
//     });
//     done();
//   });

//   it("should get hospital records  from blockchain",function(done){
//      request(app)
//     api.post('/HospitalRecords/readHospitalRecords')
//     .send({
//         "EHRID":"VKWPJJP_jefpm8e7",
//         "PERIOD":"500",
//         "labtest":"yes",
//         "medication":"yes",
//         "package":"yes"
                
//             })
//     .set("Accept",'application/json')
//     .expect(200)
//     .end(function(err,res){
//       res.status.should.equal(err.message);
//       res.body.should.have.property('EHRID');
//       res.body.should.have.property('PERIOD');
//       res.status.should.equal(200);
//       res.body.data.should.equal(result.message);
   
//     });
//     done();
//   });

//   it("fields should not be emoty during reading hospital data",function(done){
//     request(app)
//    api.post('/HospitalRecords/readHospitalRecords')
//    .send({
//        "EHRID":"VKWPJJP_jefpm8e7",
//        "PERIOD":"",
//        "labtest":"yes",
//        "medication":"yes",
//        "package":"yes"
               
//            })
//    .set("Accept",'application/json')
//    .expect(400)
//    .end(function(err,res){
//      res.status.should.equal(err.message);
//      res.body.should.have.property('EHRID');
//      res.body.should.have.property('PERIOD');
//      res.status.should.equal(200);
//      res.body.data.should.equal(result.message);
  
//    });
//    done();
//  });

//   it("should get hospital records summary from blockchain",function(done){
//     request(app)
//    api.post('/HospitalRecords/readHospitalRecordsSummary')
//    .send({
//        "EHRID":"VKWPJJP_jefpm8e7"       
//            })
//    .set("Accept",'application/json')
//    .expect(200)
//    .end(function(err,res){
//      res.status.should.equal(err.message);
//      res.body.should.have.property('EHRID');
     
//      res.status.should.equal(200);
//      res.body.data.should.equal(result.message);
  
//    });
//    done();
//  });
// });
