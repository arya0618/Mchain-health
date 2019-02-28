/**
@author: Sathiyan Baskaran
@Version: 1.0.2
@Date: 15/01/2018
@description: DOIT BlockChain project
**/
'use strict';

var bcSdk = require('../sdk/invoke');
var bcSdkQ = require('../sdk/query');
/** logger integration */
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");


/**
 * A module that will add data into the blockchain!
 * @module updateConfidentialityStatus
 */
/** update Master Confidentiality Status Status into blockchain.*/
exports.updateConfidentialityStatus = (key, ENCOUNTERDETAILS_MASTERSTATUS, PackageDetails_MasterStaus, labresults_MasterStaus, Medications_MasterStatus, Package, Medicine, labtest) => {
    return new Promise(async (resolve, reject) => {

        let query = await bcSdkQ.readData({
            key: key
        })
        if (query.response == "record was not found please check the EHRID!") {
            return resolve({
                "status": 404,
                "message": "record was not found please check the EHRID!"
            })

        } else {
            var record = JSON.parse(query.response[0].data)

            //===============================locking and unlocking master status for all=============================================================//
            if (ENCOUNTERDETAILS_MASTERSTATUS == "R") {

                record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";

                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "R";

                for (let a = 0; a < record[0].ENCOUNTERDETAILS.packageDetails.packages.length; a++) {
                    record[0].ENCOUNTERDETAILS.packageDetails.packages[a].status = "R"
                }
                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "R"
                for (let b = 0; b < record[0].ENCOUNTERDETAILS.LabResults.reports.length; b++) {
                    record[0].ENCOUNTERDETAILS.LabResults.reports[b].STATUS = "R"
                }
                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "R";
                for (let c = 0; c < record[0].ENCOUNTERDETAILS.Medications.Medicine.length; c++) {
                    record[0].ENCOUNTERDETAILS.Medications.Medicine[c].MEDICAL_STATUS = "R"
                }

            }
            if (ENCOUNTERDETAILS_MASTERSTATUS == "U") {

                record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";

                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "U";
                for (let a = 0; a < record[0].ENCOUNTERDETAILS.packageDetails.packages.length; a++) {
                    record[0].ENCOUNTERDETAILS.packageDetails.packages[a].status = "U"
                }
                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "U"
                for (let b = 0; b < record[0].ENCOUNTERDETAILS.LabResults.reports.length; b++) {
                    record[0].ENCOUNTERDETAILS.LabResults.reports[b].STATUS = "U"
                }
                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "U";
                for (let c = 0; c < record[0].ENCOUNTERDETAILS.Medications.Medicine.length; c++) {
                    record[0].ENCOUNTERDETAILS.Medications.Medicine[c].MEDICAL_STATUS = "U"
                }

            }
            //=====================================locking masterstatus for packages======================================================//
            if (PackageDetails_MasterStaus == "R") {
                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "R";
                if (record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus && record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus) {
                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                }
                for (let a = 0; a < record[0].ENCOUNTERDETAILS.packageDetails.packages.length; a++) {
                    record[0].ENCOUNTERDETAILS.packageDetails.packages[a].status = "R"
                }
            }
            if (PackageDetails_MasterStaus == "U") {
                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "U";
                if (record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus || record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.LabResults.MasterStatus) {
                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                }
                for (let a = 0; a < record[0].ENCOUNTERDETAILS.packageDetails.packages.length; a++) {
                    record[0].ENCOUNTERDETAILS.packageDetails.packages[a].status = "U"
                }
            }
            //================================locking  and unlocking masterstatus for labtests ================================================================//
            if (labresults_MasterStaus == "R") {
                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "R"
                if (record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                }
                for (let b = 0; b < record[0].ENCOUNTERDETAILS.LabResults.reports.length; b++) {
                    record[0].ENCOUNTERDETAILS.LabResults.reports[b].STATUS = "R"
                }
            }
            if (labresults_MasterStaus == "U") {
                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "U"
                if (record[0].ENCOUNTERDETAILS.LabResults.MasterStatus || record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                }
                for (let b = 0; b < record[0].ENCOUNTERDETAILS.LabResults.reports.length; b++) {
                    record[0].ENCOUNTERDETAILS.LabResults.reports[b].STATUS = "U"
                }
            }
            //====================locking and unlocking masterstatus for medications=================================================//
            if (Medications_MasterStatus == "R") {
                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "R";
                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                }

                for (let c = 0; c < record[0].ENCOUNTERDETAILS.Medications.Medicine.length; c++) {
                    record[0].ENCOUNTERDETAILS.Medications.Medicine[c].MEDICAL_STATUS = "R"
                }
            }
            if (Medications_MasterStatus == "U") {
                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "U";
                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.LabResults.MasterStatus || record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                }
                for (let c = 0; c < record[0].ENCOUNTERDETAILS.Medications.Medicine.length; c++) {
                    record[0].ENCOUNTERDETAILS.Medications.Medicine[c].MEDICAL_STATUS = "U"
                }
            }
            //===================individual elements of object status change==============================================================//


            if (Medicine != undefined && Medicine != "no") {

                var rep = JSON.stringify(Medicine)

                for (let c = 0; c < record[0].ENCOUNTERDETAILS.Medications.Medicine.length; c++) {

                    if (rep === JSON.stringify(record[0].ENCOUNTERDETAILS.Medications.Medicine[c])) {
                        if (Medicine.MEDICAL_STATUS == "R") {
                            Medicine.MEDICAL_STATUS = "U"
                            record[0].ENCOUNTERDETAILS.Medications.Medicine[c] = Medicine

                            var isSame = CheckMedicationStatus(record[0].ENCOUNTERDETAILS.Medications.Medicine)

                            if (isSame == true) {
                                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "R"
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                                }
                            }
                            else {
                                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "U"
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.LabResults.MasterStatus || record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                                }
                            }
                        }
                        else {
                            Medicine.MEDICAL_STATUS = "R"
                            record[0].ENCOUNTERDETAILS.Medications.Medicine[c] = Medicine

                            var isSame = CheckMedicationStatus(record[0].ENCOUNTERDETAILS.Medications.Medicine)

                            if (isSame == true) {
                                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "R"
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                                }
                            }
                            else {
                                record[0].ENCOUNTERDETAILS.Medications.MatsterStatus = "U"
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.LabResults.MasterStatus || record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                                }
                            }
                        }
                    }
                }

            }
            if (labtest != undefined && labtest != "no") {

                var rep = JSON.stringify(labtest)

                for (let c = 0; c < record[0].ENCOUNTERDETAILS.LabResults.reports.length; c++) {

                    if (rep === JSON.stringify(record[0].ENCOUNTERDETAILS.LabResults.reports[c])) {

                        if (labtest.STATUS == "R") {
                            labtest.STATUS = "U"
                            record[0].ENCOUNTERDETAILS.LabResults.reports[c] = labtest
                            var isSame = CheckLabTestStatus(record[0].ENCOUNTERDETAILS.LabResults.reports)

                            if (isSame == true) {
                                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "R"
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                                }
                            }
                            else {
                                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "U"
                                if (record[0].ENCOUNTERDETAILS.LabResults.MasterStatus || record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                                }
                            }
                        }
                        else {
                            labtest.STATUS = "R"
                            record[0].ENCOUNTERDETAILS.LabResults.reports[c] = labtest
                            var isSame = CheckLabTestStatus(record[0].ENCOUNTERDETAILS.LabResults.reports)

                            if (isSame == true) {
                                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "R"
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                                }
                            }
                            else {
                                record[0].ENCOUNTERDETAILS.LabResults.MasterStatus = "U"
                                if (record[0].ENCOUNTERDETAILS.LabResults.MasterStatus || record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                                }
                            }
                        }
                    }
                }

            }
            if (Package != undefined && Package != "no") {
                var rep = JSON.stringify(Package)

                for (let c = 0; c < record[0].ENCOUNTERDETAILS.packageDetails.packages.length; c++) {

                    if (rep === JSON.stringify(record[0].ENCOUNTERDETAILS.packageDetails.packages[c])) {

                        if (Package.status == "R") {

                            Package.status = "U"

                            record[0].ENCOUNTERDETAILS.packageDetails.packages[c] = Package
                            var isSame = CheckPackageStatus(record[0].ENCOUNTERDETAILS.packageDetails.packages)

                            if (isSame == true) {
                                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "R";
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                                }
                            }
                            else {
                                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "U";
                                if (record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus || record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.LabResults.MasterStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                                }
                            }
                        }
                        else {
                            Package.status = "R"
                            record[0].ENCOUNTERDETAILS.packageDetails.packages[c] = Package
                            var isSame = CheckPackageStatus(record[0].ENCOUNTERDETAILS.packageDetails.packages)

                            if (isSame == true) {
                                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "R";
                                if (record[0].ENCOUNTERDETAILS.Medications.MatsterStatus && record[0].ENCOUNTERDETAILS.LabResults.MasterStatus && record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "R";
                                }
                            }
                            else {
                                record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus = "U";
                                if (record[0].ENCOUNTERDETAILS.packageDetails.masterLockStatus[0].masterLockStatus || record[0].ENCOUNTERDETAILS.Medications.MatsterStatus || record[0].ENCOUNTERDETAILS.LabResults.MasterStatus) {
                                    record[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus = "U";
                                }
                            }
                        }
                    }
                }

            }

            let multi = await bcSdk.updateMasterStatus({
                key: key,
                value: record
            })
            return resolve({
                "status": 200,
                "message": "record was updated"
            })

        }

    })
}


function CheckMedicationStatus(array) {

    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].MEDICAL_STATUS !== array[i + 1].MEDICAL_STATUS) {
            return false;
        }
    }
    return true;

}

function CheckLabTestStatus(array) {

    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].STATUS !== array[i + 1].STATUS) {
            return false;
        }
    }
    return true;

}

function CheckPackageStatus(array) {

    for (var i = 0; i < array.length; i++) {

        if (array[0].status == "R") {
            return true;
        }
    }
    return false;

}