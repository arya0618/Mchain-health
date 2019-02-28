'use strict'

//sceduller for bsby tid,bsby package details,aarogya medication,aarogaya investigation

const oracledb = require('oracledb');
var config = require('config');
var dbConfig = config.get('dbConfig');
oracledb.autoCommit = true

// const scheduleConf = require("../default.js");
// const scheduleDbConf = scheduleConf.dbConfig;
// console.log(scheduleDbConf);

const getEHRID = require("../functions/addData.js")

let multichain = require("multichain-node")(dbConfig);
function getEmployee(doc, connection) {
  return new Promise(async function (resolve, reject) {


    try {

      let nodata;
      let result = await connection.execute(
        `select distinct
        bsby.TID,bsby.DOCUMENT_TYPE,bsby.DOCUMENT_URL,bsby.SOURCEFEED_SYSTEM,bsby.RECEIVED_DATE,
        bsby.PROCESSED_DATE,
        pkg.BHAMASHAH_ID,pkg.MEMBER_ID,pkg.AADHAR_NO,
        pkg.CRN_NO,pkg.ADMISSION_NO,pkg.PATIENT_NAME,pkg.FATHER_NAME,
        pkg.MOTHER_NAME,pkg.SPOUSE_NAME,pkg.DOB,pkg.GENDER,pkg.ADDRESS,pkg.DISTRICT,pkg.MOBILE_NO,
        pkg.MAIL_ID,pkg.OLD_TID,pkg.PACKAGE_CODE,pkg.PKG_ID,pkg.PACKAGE_CATEGORY_NAME,
        pkg.PACKAGE_SPECIALTY_NAME,pkg.PACKAGE_SUB_SPECIALTY_NAME,pkg.PACKAGE_NAME,pkg.HOSPITAL_CODE,
        pkg.HOSPITAL_NAME,pkg.ADDMISSION_DATE,pkg.DISCHARGE_DATE
        ,smshm.STORENAME,smshm.DRUGNAME,smshm.QUANTITY,
        smshm.UOM,smshm.BATCHCODE,smshm.EXPIRYDATE,smshm.DISPENDEDDATE,smshm.RECEIVED_DATE,
        smshI.ORDERID,smshI.DEPT_NAME,smshI.LAB_NAME,smshI.TEST_CODE,
        smshI.TEST_NAME,smshI.RESULT_DATE,smshI.SAMPLE_NAME,smshI.PARAMETER_NAME,smshI.PARAMETER_VALUE,smshI.UOM,
        smshI.LOW_VALUE,smshI.HIGH_VALUE,smshI.RESULTSTATUS
        from  BSBY_TID_DOCUMENTS bsby LEFT JOIN BSBY_PACKAGE_DETAILS pkg on bsby.TID=pkg.TID
        LEFT JOIN AROGYA_SMSH_MEDICATION smshm on bsby.TID = smshm.TID
        LEFT JOIN AROGYA_SMSH_INVESTIGATION smshI on bsby.TID = smshI.TID
        WHERE bsby.TID='T0108160388734' and((pkg.BHAMASHAH_ID is not NULL and pkg.MEMBER_ID is not null)
        or (smshI.BHAMASHAH_ID is not null and smshI.MEMBER_ID is not null)
        or (smshm.BHAMASHAH_ID is not null and smshm.MEMBER_ID is not null))`,
        // [doc]
      );
      var documentlink = {};
      var Medications = {};
      var LabResults = {};
      var medicine = [];
      var reports = [];
      var EHRID;
      var output = result.rows
      if (output.length == 0) {
        console.log("no details for this tid")
        nodata = await connection.execute(`UPDATE BSBY_TID_DOCUMENTS SET PROCESSED_STATUS='D',PROCESSED_DATE =sysdate WHERE TID=:TID`, [doc])
        console.log("inconsistent records for the TID =", doc, " marked as  D in BSBY_TID_DOCUMENT.....rows affected========>", nodata.rowsAffected)
        resolve("no details for this tid")
      }
      else {
        for (let i = 0; i < output.length; i++) {
          var ind = output[i]
          var TID = ind[0];
          var documentname = ind[1];
          var link = ind[2]
          var BHAMASHAH_ID = ind[6]
          var MEMBER_ID = ind[7]
          var PATIENT_NAME = ind[11]
          var DOB = ind[15];
          var GENDER = ind[16];
          var PACKAGE_CATEGORY_NAME = ind[24];
          var PACKAGE_NAME = ind[27];
          var PACKAGE_SUB_SPECIALTY_NAME = ind[26];
          var HOSPITAL_NAME = ind[29];
          var TEST_NAME = ind[43];
          var PARAMETER_NAME = ind[46];
          var PARAMETER_VALUE = ind[47];
          var LOW_VALUE = ind[49];
          var HIGH_VALUE = ind[50];
          var ADDMISSION_DATE = ind[30];
          var DISCHARGE_DATE = ind[31];
          var UOM = ind[48]
          var RESULT_DATE = ind[44]
          var labUOM = ind[48]
          var DRUGNAME = ind[33]
          var Quantity = ind[34]
          var MEDUOM = ind[35]
          var STORENAME = ind[32]
          var EXPIRYDATE = ind[37]
          var DISPENDEDDATE = ind[38]
          var ENCOUNTERTYPE = "H"

          documentlink[documentname] = link
          if (ind[44] !== null) {
            LabResults.MasterStatus = "U"
            var reportObj = {
              "ResultDate": RESULT_DATE,
              "ParameterName": PARAMETER_NAME,
              "ParameterValue": PARAMETER_VALUE,
              "UOM": labUOM,
              "LowValue": LOW_VALUE,
              "HighValue": HIGH_VALUE,
              "STATUS": "U"
            }
            reports.push(reportObj)

          } else {
            reports = [];
          }
          if (DRUGNAME !== null) {
            Medications.MasterStatus = "U"
            var MedObj = {
              "DrugName": DRUGNAME,
              "UOM": MEDUOM,
              "Quantity": Quantity,
              "ExpiryDate": EXPIRYDATE,
              "StoreName": STORENAME,
              "DispensedDate": DISPENSEDDATE,
              "ReceivedDate": RECEIVEDDATE,
              "STATUS": "U"
            }
            medicine.push(MedObj)
          } else {
            medicine = [];
          }
        }
        var BMID = BHAMASHAH_ID + "_" + MEMBER_ID;
        var value = {
          "BHAMASHAHID": BHAMASHAH_ID,
          "MEMBER_ID": MEMBER_ID,
          "SSO_ID": ""

        }
        let hell = await getEHRID.addEhrId(BMID, value)
        console.log(hell)
        EHRID = hell.message.result.EHRID;

        console.log("data in variable ehrid===========================>", EHRID)



        let incHospitalrecord = await connection.execute(`update keystore set HOSPITAL_RECORDS_COUNT = Coalesce(HOSPITAL_RECORDS_COUNT, 0) + 1 WHERE EHRID =:EHRID`, [EHRID]);
        //console.log(incHospitalrecord.rowsAffected)

        let getinc = await connection.execute(`select HOSPITAL_RECORDS_COUNT from keystore where EHRID=:EHRID`, [EHRID]);

        var counter = getinc.rows[0][0];
        //console.log(counter)
        var EHRIDwithCount = EHRID + "_" + "HOSPITAL_RECORDS" + "_" + counter;
        var ENCOUNTERDETAILS = {
          "EHRID": EHRIDwithCount,
          "PATIENTNAME": PATIENT_NAME,
          "TID": TID,
          "HOSPITAL_NAME": HOSPITAL_NAME,
          "ADDMISSION_DATE": ADDMISSION_DATE,
          "DISCHARGE_DATE": DISCHARGE_DATE,
          "ENCOUNTER_MASTERSTATUS": "U",
          "packageDetails": {
            "masterLockStatus": [{
              "masterLockStatus": "U"
            }],
            "packages": [{
              "PACKAGE_CATEGORY_NAME": PACKAGE_CATEGORY_NAME,
              "PACKAGE_NAME": PACKAGE_NAME,
              "PACKAGE_SUB_SPECIALTY_NAME": PACKAGE_SUB_SPECIALTY_NAME,
              "HOSPITAL_NAME": HOSPITAL_NAME,
              "Status": "U"
            }],
            "documentlink": documentlink

          },
          Medications: {
            "medicine": medicine
          },
          LabResults: {
            "reports": reports
          }
        }

        console.log("ENCOUNTERDETAILS====================>", ENCOUNTERDETAILS)
      }
      var hexstring;
      var value = JSON.stringify(ENCOUNTERDETAILS);
      let bufStr = Buffer.from(value, 'utf8');
      hexstring = bufStr.toString('hex')
      console.log("hexstring", hexstring)
      multichain.publish({
        stream: "MedicalInfo",
        key: EHRIDwithCount,
        data: hexstring
      }, (err, res) => {
        if (err == null) {
          return resolve({
            response: res
          });
        } else {
          console.log(err)
        }
      })
      var bindvars = {
        i: TID  // Bind type is determined from the data.  Default direction is BIND_IN

      };
      connection.execute(
        "BEGIN UPDATESTATUS(:i); END;",
        bindvars,
        function (err, result) {
          if (err) {
            console.log(err)
            console.error("err message====================>", err.message);
            doRelease(connection);
            return;
          }
          console.log(result.outBinds);
          //doRelease(connection);
        });
      console.log("stored procedure executed")
      resolve("sucess");


    } catch (err) { // catches errors in getConnection and the query
      reject(err);
    }
  });
}

async function run() {
  var TIDS;
  let result;
  let res;

  return new Promise(async function (resolve, reject) {

    let connection;

    try {
      connection = await oracledb.getConnection({
        user: "EHRBCSTAGE",
        password: "test123test",
        connectString: "exa03-scan.rajasthan.gov.in:1521/BMSTAGE"
      });


      result = await connection.execute(
        `SELECT distinct TID from  BSBY_TID_DOCUMENTS WHERE PROCESSED_STATUS = 'N' and rownum <= 100000 and TID is not null order by TID`
      )
      TIDS = result.rows

      for (let i = 0; i < TIDS.length; i++) {
        var doc1 = TIDS[i]
        var doc = doc1[0]
        console.log((i + 1) + "/" + TIDS.length + " doc where TID = ", doc)
        res = await getEmployee(doc, connection);
      }

    } catch (err) {
      reject(err)
    } finally {
      connection.release();
    }
  })
}


run();

module.exports = { run: run }