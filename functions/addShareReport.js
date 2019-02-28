/**
@author: Rakesh C
@Version: 1.0.2
@Date: 15/01/2018
@description: DOIT BlockChain project
**/
var bcSdk = require('../sdk/query');
var dateFormat = require('dateformat');
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
const readHospitalData = require("./readHospitalData");
var logger = log4js.getLogger("test-file-appender");
/**
 * A module that will add ShareData ehrid and add it into the blockchain!
 * @module addShareData
 */
/** Add EhrId Data into blockchain.*/
exports.addShareData = (EHRID, key1, period, req, medi, labtest, packageD) => {
    return new Promise((resolve, reject) => {

        readHospitalData.readHospitalData(EHRID, key1, period, req, medi, labtest, packageD)
            .then(function (result) {
                if (result.status != 200) {
                    return resolve({
                        status: 401,
                        data: result.data
                    })
                } else {

                    var hospital_Rec = result.data
                    var shareData = []

                    for (let i = 0; i < hospital_Rec.length; i++) {
                        if (hospital_Rec[i].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus == "R") {
                            hospital_Rec[i].ENCOUNTERDETAILS.packageDetails.length = 0;
                            hospital_Rec[i].ENCOUNTERDETAILS.LabResults.length = 0;
                            hospital_Rec[i].ENCOUNTERDETAILS.Medications.length = 0;
                            shareData.push(hospital_Rec[i])
                        } else {

                            var labtestdata = [];
                            var meditationData = [];
                            var packageDetailsData = [];

                            var labTest = [];
                            var medication = [];
                            var packageData = [];

                            if (hospital_Rec[i].ENCOUNTERDETAILS.Medications.length != 0) {


                                if (hospital_Rec[i].ENCOUNTERDETAILS.Medications.MatsterStatus == "U") {


                                    for (let j = 0; j < hospital_Rec[i].ENCOUNTERDETAILS.Medications.Medicine.length; j++) {
                                        if (hospital_Rec[i].ENCOUNTERDETAILS.Medications.Medicine[j].MEDICAL_STATUS == "U") {

                                            meditationData.push(hospital_Rec[i].ENCOUNTERDETAILS.Medications.Medicine[j])
                                        }
                                    }
                                    var medicationObj = {
                                        "Medications_MasterLock": "U",
                                        "Medications": meditationData
                                    }
                                    medication.push(medicationObj)

                                } else {
                                    var medicationObj = {
                                        "Medications_MasterLock": "R",
                                        "Medications": meditationData
                                    }
                                    medication.push(medicationObj)
                                }
                            }


                            if (hospital_Rec[i].ENCOUNTERDETAILS.LabResults.length != 0) {


                                if (hospital_Rec[i].ENCOUNTERDETAILS.LabResults.MatsterStatus == "U") {


                                    for (let j = 0; j < hospital_Rec[i].ENCOUNTERDETAILS.LabResults.reports.length; j++) {
                                        if (hospital_Rec[i].ENCOUNTERDETAILS.LabResults.reports[j].STATUS == "U") {

                                            labtestdata.push(hospital_Rec[i].ENCOUNTERDETAILS.LabResults.reports[j])
                                        }
                                    }
                                    var labTestObj = {
                                        "MatsterStatus": "U",
                                        "LabResults": labtestdata
                                    }
                                    labTest.push(labTestObj)

                                } else {
                                    var labTestObj = {
                                        "MatsterStatus": "R",
                                        "LabResults": labtestdata
                                    }
                                    labTest.push(labTestObj)
                                }
                            }


                            if (hospital_Rec[i].ENCOUNTERDETAILS.packageDetails[0].packages.length != 0) {


                                if (hospital_Rec[i].ENCOUNTERDETAILS.packageDetails[0].masterLockStatus[0].masterLockStatus == "U") {


                                    for (let j = 0; j < hospital_Rec[i].ENCOUNTERDETAILS.packageDetails[0].packages.length; j++) {
                                        if (hospital_Rec[i].ENCOUNTERDETAILS.packageDetails[0].packages[j].status == "U") {

                                            packageDetailsData.push(hospital_Rec[i].ENCOUNTERDETAILS.packageDetails[0].packages[j])
                                        }
                                    }

                                    var packageObj = {
                                        "masterLockStatus": "U",
                                        "documentLinks": hospital_Rec[i].ENCOUNTERDETAILS.packageDetails[0].documentLinks,
                                        "packages": packageDetailsData
                                    }
                                    packageData.push(packageObj)

                                } else {
                                    var packageObj = {
                                        "masterLockStatus": "R",
                                        "documentLinks": {},
                                        "packages": packageDetailsData
                                    }
                                    packageData.push(packageObj)
                                }
                            }
                            var data = {
                                "ENCOUNTERDETAILS": {
                                    "HOSPITAL_NAME": hospital_Rec[i].ENCOUNTERDETAILS.HOSPITAL_NAME,
                                    "ADDMISSION_DATE": hospital_Rec[i].ENCOUNTERDETAILS.ADDMISSION_DATE,
                                    "DISCHARGE_DATE": hospital_Rec[i].ENCOUNTERDETAILS.DISCHARGE_DATE,
                                    "TID": hospital_Rec[i].ENCOUNTERDETAILS.TID,
                                    "EHRID": hospital_Rec[i].ENCOUNTERDETAILS.EHRID,
                                    "ENCOUNTER_SPECIALITY": hospital_Rec[i].ENCOUNTERDETAILS.ENCOUNTER_SPECIALITY,
                                    "ENCOUNTERDETAILS_MasterStatus": hospital_Rec[i].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus,
                                    "packageDetails": packageData,
                                    "LabResults": labTest,
                                    "Medications": medication
                                }
                            }
                            shareData.push(data)
                        }
                    }

                    return resolve({
                        status: 200,
                        data: shareData
                    })
                }
            })

            .catch(err => {
                if (err.code == 401) {

                    return reject({
                        status: 401,
                        message: 'cant fetch !'
                    });

                } else {
                    logger.error(err);

                    return reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            })
    })
};