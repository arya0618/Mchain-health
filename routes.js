'use strict';
var apiBenchmark = require('api-benchmark');
const fs = require('fs');
const addData = require("./functions/addData");
const addEhrId = require('./functions/addData');
const readData = require('./functions/readData');
const deleteData = require('./functions/deleteData');
const fetchfamilymembers = require('./functions/fetchfamilymembers');
const readSwitchmember = require('./functions/readSwitchmember');
const readHospitalSummary = require('./functions/readHospitalSummary');
const readFamilymembers = require('./functions/readFamilymembers');

//config.json
var config = require('config');
var configWidget = config.get('widget');
var uniqid = require('uniqid');

//logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

const updateStatus = require("./functions/updateStatus");
const readHospitalData = require("./functions/readHospitalData");
const readSummaryData = require('./functions/readSummaryData');
const updateConfidentialityStatus = require('./functions/updateConfidentialityStatus');
const dashboard = require("./dashboard/utils");
const geoInformation = require('./functions/geoInformation');
const addShareReport = require('./functions/addShareReport');
// validation functions
const addFunctionsValidation = require('./validations/addFunctionsValidation');
const readFunctionsValidation = require('./validations/readFunctionsValidation');
const updateFunctionsValidation = require('./validations/updateFunctionsValidation');
const deleteFunctionsValidation = require('./validations/deleteFunctionsValidation');
const summaryFunctionsValidation = require('./validations/summaryFunctionsValidation');
var mongoose = require('mongoose');
const cors = require('cors');
var path = require('path');
var express = require('express');


var device = require('device');
var counts = require("./functions/counts");
var ehridsfunc = require("./functions/ehrids");


//========================================================APIS=============================================//
/** Express router providing user related routes
 * @module routers
 * @requires express
 */

/**
 * express module
 * @const
 */
module.exports = router => {
    /**
     * Route serving login form.
     * @name get/killmePlease
     * @function
     * @memberof module:routers/killmePlease
     * @inner
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.get('/killmePlease', function () {
        process.exit();
    });

    /**
     * Route serving adding data for different widgets in the application,where widget names are given in query string.
     * @name post/addData
     * @function
     * @memberof module:routers/addData
     * @inner
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/addData", cors(), (req, res) => {
        req.startTimeAPI = Date.now();

        dashboard.txCount().then(function () {
            var query = require('url').parse(req.url, true).query;
            var widget = query.WIDGET;
            switch (widget) {

                case "LABTEST":
                    addFunctionsValidation.addLabTestValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;
                case "ALLERGY":
                    addFunctionsValidation.addAllergyValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;
                case "MEDICATION":
                    addFunctionsValidation.addMedicationValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;
                case "BLOODPRESSURE":
                    addFunctionsValidation.addBloodPressureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;
                case "CONTACT":
                    addFunctionsValidation.addContactsValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;
                case "ACTIVITY":
                    addFunctionsValidation.addActivityValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;

                case "BLOODGLUCOSE":
                    addFunctionsValidation.addBloodGlucoseValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;

                case "BMI":

                    addFunctionsValidation.addBMIValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {

                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;


                case "SPO2":
                    addFunctionsValidation.addSPO2Validation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;


                case "HEARTRATE":
                    addFunctionsValidation.addHeartRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;

                case "RESPIRATORYRATE":
                    addFunctionsValidation.addRespiratoryRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;
                case "BODYTEMPERATURE":
                    addFunctionsValidation.addBodyTemperatureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "add");
                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "add", time / 1000);
                        }
                    });
                    break;
                case "NOTIFICATION":
                    addFunctionsValidation.addNotificationValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                /*** this case for adding heslthips into blockchain      */
                case "HEALTHTIPS":
                    addFunctionsValidation.addHealthTipsValidation(req, function (err, result) {

                        if (err) { /** checking error codition and returing error message */
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({ /** sending response with status */
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "COUNTRY_STATE":
                    addFunctionsValidation.addCountryStateValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                /*** this case for adding glucose-master data into blockchain      */

                case "GLUCOSEMASTER":
                    addFunctionsValidation.addGLUCOSEMASTERValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({ /** checking error codition and returing error message */
                                message: err
                            });
                        } else {
                            res.status(result.status).json({ /** sending response with status */
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                /* this case for adding allergy-master data into blockchain      */

                case "ALLERGYMASTER":
                    addFunctionsValidation.addALLERGYMASTERValidation(req, function (err, result) {

                        if (err) { /** checking error codition and returing error message */
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({ /** sending response with status */

                                status: result.status,
                                message: result.message

                            });
                        }
                    });
                    break;

                case "PHYSICAL_ACTIVITY_MASTER":
                    addFunctionsValidation.addPHYSICALACTIVITYMASTERValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "DISABILITYTYPE":
                    addFunctionsValidation.addDisabilityTypeValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "PERSON_RELATIONSHIP":
                    addFunctionsValidation.addPERSONRELATIONSHIPValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "BLOODGROUP":
                    addFunctionsValidation.addBloodGroupValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "MEDICINEDOSAGEMASTER":
                    addFunctionsValidation.addMedicineDosageMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "MEDICINEINTAKEMASTER":
                    addFunctionsValidation.addMedicineIntakeMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "MEDICINESTRENGTHMASTER":
                    addFunctionsValidation.addMedicineStrengthMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "LABTESTMASTER":
                    addFunctionsValidation.addLabTestMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "SHAREURL_CONFIGMASTER":
                    addFunctionsValidation.addShareUrlConfigrValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "PHR_DOCUMENT":
                    addFunctionsValidation.addPHRdocumentsValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "DOC_CATEGORY":
                    addFunctionsValidation.addDocCategoryValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "ALLERGY_SEVERITY":
                    addFunctionsValidation.addAllergyServityMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "ALLERGY_SINCE":
                    addFunctionsValidation.addAllergySinceMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "PROVIDER_MASTER":
                    addFunctionsValidation.addProviderMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "QUALIFICATION_MASTER":
                    addFunctionsValidation.addQualificationMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "SECTOR_MASTER":
                    addFunctionsValidation.addsectorMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;


            }
        })
    })
    /**
     * Route serving reading data from different widgets in the application,where widget names are given in query string.
     * @name post/readData
     * @function
     * @memberof module:routers/readData
     * @inner
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/readData", cors(), (req, res) => {
        req.startTimeAPI = Date.now()
        dashboard.txCount().then(function () {
            var query = require('url').parse(req.url, true).query;
            var widget = query.WIDGET;


            switch (widget) {

                case "LABTEST":
                    readFunctionsValidation.readLabTestValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;

                case "ALLERGY":
                    readFunctionsValidation.readAllergyValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;

                case "MEDICATION":
                    readFunctionsValidation.readMedicationValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;

                case "BLOODPRESSURE":
                    readFunctionsValidation.readBloodPressureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;
                case "CONTACT":
                    readFunctionsValidation.readContactValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {

                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;
                case "ACTIVITY":
                    readFunctionsValidation.readActivityValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;

                case "BMI":
                    readFunctionsValidation.readBMIValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;

                case "SPO2":
                    readFunctionsValidation.readSPO2Validation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;

                case "HEARTRATE":
                    readFunctionsValidation.readHeartRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "readd", time / 1000);
                        }
                    });
                    break;

                case "RESPIRATORYRATE":
                    readFunctionsValidation.readRespiratoryRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;

                case "BLOODGLUCOSE":
                    readFunctionsValidation.readBloodGlucoseValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;
                case "BODYTEMPERATURE":
                    readFunctionsValidation.readBodyTemperatureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "read");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,

                                message: result.data
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "read", time / 1000);
                        }
                    });
                    break;
                case "HEALTHTIPS":
                    readFunctionsValidation.readHealthTipsValidation(req, function (err, result) {

                        if (err) {
                            logger.debug(err);
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;

                case "COUNTRY_STATE":
                    readFunctionsValidation.readMasterData(req, function (err, result) {

                        if (err) {
                            logger.debug(err);
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,

                                message: result.data
                            });
                        }
                    });
                    break;
                case "DISABILITYTYPE":
                    readFunctionsValidation.readMasterData(req, function (err, result) {

                        if (err) {
                            logger.debug(err);
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,

                                message: result.data
                            });
                        }
                    });
                    break;
                case "HEALTHTIPS":
                    readFunctionsValidation.readHealthTipsValidation(req, function (err, result) {

                        if (err) {
                            logger.debug(err);
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,

                                message: result.data
                            });
                        }
                    });
                    break;
                case "GLUCOSEMASTER":
                    readFunctionsValidation.readGLUCOSEMASTERValidation(req, function (err, result) {

                        if (err) {
                            logger.debug(err);
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                /*** this case for reading allergy-master data ***/
                case 'ALLERGYMASTER':
                    readFunctionsValidation.readALLERGYMASTERValidation(req, function (err, result) {

                        if (err) {
                            logger.debug(err);
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                case "PHYSICAL_ACTIVITY_MASTER":
                    readFunctionsValidation.readPHYSICALACTIVITYMASTERValidation(req, function (err, result) {

                        if (err) {
                            logger.debug(err)
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,

                                message: result.data
                            });
                        }
                    });
                    break;

                case "PERSON_RELATIONSHIP":
                    readFunctionsValidation.readPERSONRELATIONSHIPValidation(req, function (err, result) {

                        if (err) {
                            logger.debug(err)
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,

                                message: result.data
                            });
                        }
                    });
                    break;
                case "BLOODGROUP":
                    readFunctionsValidation.readBloodGroupValidation(req, function (err, result) {

                        if (err) {
                            logger.debug(err)
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                case "MEDICINEDOSAGEMASTER":
                    readFunctionsValidation.readMedicineDosageMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                case "MEDICINEINTAKEMASTER":
                    readFunctionsValidation.readMedicineIntakeMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                case "MEDICINESTRENGTHMASTER":
                    readFunctionsValidation.readMedicineStrengthMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                case "LABTESTMASTER":
                    readFunctionsValidation.readLabTestMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                case 'SHAREURL_CONFIGMASTER':
                    if (req.body.key == configWidget.SHAREURL_CONFIGMASTER) {
                        readFunctionsValidation.readMasterTableValidation(req, function (err, result) {

                            if (err) {
                                res.status(err.status).json({
                                    message: err
                                });
                            } else {
                                res.status(result.status).json({
                                    status: result.status,
                                    message: result.data
                                });
                            }

                        })
                    } else {
                        res.status(401).json({
                            message: "Please check the  key in input parameters"
                        });
                    }
                    break;
                case "PHR_DOCUMENT":
                    readFunctionsValidation.readPhrDocsValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.data
                            });
                        }
                    });
                    break;
                case "DOC_CATEGORY":
                    if (req.body.key == configWidget.DOC_CATEGORY) {
                        readFunctionsValidation.readMasterTableValidation(req, function (err, result) {

                            if (err) {
                                res.status(err.status).json({
                                    message: err
                                });
                            } else {
                                res.status(result.status).json({
                                    status: result.status,
                                    message: result.data
                                });
                            }
                        });
                    } else {
                        res.status(401).json({

                            message: "Please check the  key in input parameters"
                        });
                    }
                    break;
                case 'ALLERGY_SEVERITY':
                    if (req.body.key == configWidget.ALLERGY_SEVERITY) {
                        readFunctionsValidation.readMasterTableValidation(req, function (err, result) {

                            if (err) {
                                res.status(err.status).json({
                                    message: err
                                });
                            } else {
                                res.status(result.status).json({
                                    status: result.status,
                                    message: result.data
                                });
                            }
                        });
                    } else {
                        res.status(401).json({

                            message: "Please check the  key in input parameters"
                        });
                    }
                    break;
                case "ALLERGY_SINCE":
                    if (req.body.key === configWidget.ALLERGY_SINCE) {
                        readFunctionsValidation.readMasterTableValidation(req, function (err, result) {

                            if (err) {
                                res.status(err.status).json({
                                    message: err
                                });
                            } else {
                                res.status(result.status).json({
                                    status: result.status,
                                    message: result.data
                                });
                            }
                        });
                    } else {
                        res.status(401).json({

                            message: "Please check the  key in input parameters"
                        });
                    }
                    break;

                case "PROVIDER_MASTER":
                    if (req.body.key === configWidget.PROVIDER_MASTER) {
                        readFunctionsValidation.readMasterTableValidation(req, function (err, result) {

                            if (err) {
                                res.status(err.status).json({
                                    message: err
                                });
                            } else {
                                res.status(result.status).json({
                                    status: result.status,
                                    message: result.data
                                });
                            }
                        });
                    } else {
                        res.status(401).json({
                            message: "Please check the  key in input parameters"
                        });
                    }
                    break;
                case "QUALIFICATION_MASTER":
                    if (req.body.key === configWidget.QUALIFICATION_MASTER) {
                        readFunctionsValidation.readMasterTableValidation(req, function (err, result) {

                            if (err) {
                                res.status(err.status).json({
                                    message: err
                                });
                            } else {
                                res.status(result.status).json({
                                    status: result.status,
                                    message: result.data
                                });
                            }
                        });
                    } else {
                        res.status(401).json({
                            status: 401,
                            message: "Please check the  key in input parameters"
                        });
                    }
                    break;
                case "SECTOR_MASTER":
                    if (req.body.key === configWidget.SECTOR_MASTER) {
                        readFunctionsValidation.readMasterTableValidation(req, function (err, result) {

                            if (err) {
                                res.status(err.status).json({
                                    message: err
                                });
                            } else {
                                res.status(result.status).json({
                                    status: result.status,
                                    message: result.data
                                });
                            }
                        });
                    } else {
                        res.status(401).json({

                            message: "Please check the  key in input parameters"
                        });
                    }
                    break;

            }
        })
    })
    /**
     * Route serving updating data for different widgets in the application,where widget names are given in query string.
     * @name post/updateData
     * @function
     * @memberof module:routers/updateData
     * @inner
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/updateData", cors(), (req, res) => {
        req.startTimeAPI = Date.now()
        dashboard.txCount().then(function () {
            var query = require('url').parse(req.url, true).query;
            var widget = query.WIDGET;


            switch (widget) {

                case "LABTEST":
                    updateFunctionsValidation.updateLabTestValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;
                case "ALLERGY":
                    updateFunctionsValidation.updateAllergyValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;
                case "MEDICATION":
                    updateFunctionsValidation.updateMedicationValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;
                case "BLOODPRESSURE":
                    updateFunctionsValidation.updateBloodPressureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;
                case "CONTACT":
                    updateFunctionsValidation.updateContactValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Contacts has been successfully updated."
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;

                case "BLOODGLUCOSE":
                    updateFunctionsValidation.updateBloodGlucoseValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;

                case "BMI":
                    updateFunctionsValidation.updateBMIValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;

                case "SPO2":
                    updateFunctionsValidation.updateSPO2Validation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;

                case "HEARTRATE":
                    updateFunctionsValidation.updateHeartRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;

                case "RESPIRATORYRATE":
                    updateFunctionsValidation.updateRespiratoryRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;
                case "ACTIVITY":
                    updateFunctionsValidation.updateActivityValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({

                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,

                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;
                case "BODYTEMPERATURE":
                    updateFunctionsValidation.updateBodyTemperatureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "update");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "update", time / 1000);
                        }
                    });
                    break;



                /** this case for updating glucose-master  */
                case "GLUCOSEMASTER":
                    updateFunctionsValidation.updateGLUCOSEMASTERValidation(req, function (err, result) {

                        if (err) { /**checking error condition and if yes then throw error */
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({ /**sending response with status */
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                /** this case for updating allergy-master details */
                case "ALLERGYMASTER":
                    updateFunctionsValidation.updateALLERGYMASTERValidation(req, function (err, result) {

                        if (err) { /**checking error condition and if yes then throw error */
                            res.status(err.status).json({
                                message: err
                            });
                        } else { /**sending response with status */
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case "PHYSICAL_ACTIVITY_MASTER":
                    updateFunctionsValidation.updatePHYSICALACTIVITYMASTERValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "PERSON_RELATIONSHIP":
                    updateFunctionsValidation.updatePERSONRELATIONSHIPValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "DISABILITYTYPE":
                    updateFunctionsValidation.updateDisabilityTypeValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Disability data has been successfully updated."
                            });
                        }
                    });
                    break;

                case "BLOODGROUP":
                    updateFunctionsValidation.updateBloodGroupValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "MEDICINEDOSAGEMASTER":
                    updateFunctionsValidation.updateMedicineDosageMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "MEDICINEINTAKEMASTER":
                    updateFunctionsValidation.updateMedicineIntakeMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "MEDICINESTRENGTHMASTER":
                    updateFunctionsValidation.updateMedicineStrengthMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "LABTESTMASTER":
                    updateFunctionsValidation.updateLabTestMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "SHAREURL_CONFIGMASTER":
                    updateFunctionsValidation.updateshareURLconfigValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'PHR_DOCUMENT':
                    updateFunctionsValidation.updatePHRdocsValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'DOC_CATEGORY':
                    updateFunctionsValidation.updateDocCategoryValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'ALLERGY_SEVERITY':
                    updateFunctionsValidation.updateAllServityMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'ALLERGY_SINCE':
                    updateFunctionsValidation.updateAllSinceMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'PROVIDER_MASTER':
                    updateFunctionsValidation.updateProvideMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'QUALIFICATION_MASTER':
                    updateFunctionsValidation.updatequalificationMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'SECTOR_MASTER':
                    updateFunctionsValidation.updatesectorMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
                case 'NOTIFICATION':
                    updateFunctionsValidation.updateNotificationStatusValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: "Data has been updated successfully."
                            });
                        }
                    });
                    break;
            }
        })
    })
    /**
     * Route serving delete data for different widgets in the application,where widget names are given in query string.
     * @name post/deleteData
     * @function
     * @memberof module:routers/deleteData
     * @inner
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/deleteData", cors(), (req, res) => {
        req.startTimeAPI = Date.now()
        dashboard.txCount().then(function () {
            var query = require('url').parse(req.url, true).query;
            var widget = query.WIDGET;


            switch (widget) {

                case "LABTEST":
                    deleteFunctionsValidation.deleteDataLabTestValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete")

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI
                            counts.updateAPIsTime(widget, "delete", time / 1000)
                        }
                    });
                    break;

                case "ALLERGY":
                    deleteFunctionsValidation.deleteAllergyValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete")

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI
                            counts.updateAPIsTime(widget, "delete", time / 1000)
                        }
                    });
                    break;

                case "MEDICATION":
                    deleteFunctionsValidation.deleteMedicationValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete")

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI
                            counts.updateAPIsTime(widget, "delete", time / 1000)
                        }
                    });
                    break;

                case "BLOODPRESSURE":
                    deleteFunctionsValidation.deleteBloodPressureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;
                case "CONTACT":
                    deleteFunctionsValidation.deleteContactValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;

                case "BLOODGLUCOSE":
                    deleteFunctionsValidation.deleteDataBloodGlucoseValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;

                case "BMI":
                    deleteFunctionsValidation.deleteDataBMIValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;

                case "SPO2":
                    deleteFunctionsValidation.deleteDataSPO2Validation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;

                case "HEARTRATE":
                    deleteFunctionsValidation.deleteDataHeartRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;

                case "RESPIRATORYRATE":
                    deleteFunctionsValidation.deleteDataRespiratoryRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;
                case "ACTIVITY":
                    deleteFunctionsValidation.deleteDataActivityValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;
                case "BODYTEMPERATURE":
                    deleteFunctionsValidation.deleteBodyTemperatureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "delete")

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "delete", time / 1000);
                        }
                    });
                    break;
                /** this case for deleting healthtips details */
                case "HEALTHTIPS":
                    deleteFunctionsValidation.deleteHealthtipsValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message

                            });
                        }
                    });
                    break;

                /** this case for deleting glucose-master details */
                case "GLUCOSEMASTER":
                    deleteFunctionsValidation.deleteGLUCOSEMASTERValidation(req, function (err, result) {

                        if (err) { /**checking error condition and throwing error if yes */
                            res.status(err.status).json({
                                message: err
                            });
                        } else { /**sending response with status */
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                /** this case for deleting allergy-master details */
                case "ALLERGYMASTER":
                    deleteFunctionsValidation.deleteALLERGYMASTERValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({ /**checking error condition and throwing error if there */
                                message: err
                            });
                        } else {
                            res.status(result.status).json({ /**sending response with status */
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "PHYSICAL_ACTIVITY_MASTER":
                    deleteFunctionsValidation.deletePHYSICALACTIVITYMASTERValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "DISABILITYTYPE":
                    deleteFunctionsValidation.deleteDisabilityTypeValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "PERSON_RELATIONSHIP":
                    deleteFunctionsValidation.deletePERSONRELATIONSHIPValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "MEDICINEDOSAGEMASTER":
                    deleteFunctionsValidation.deleteMedicineDosageMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "MEDICINEINTAKEMASTER":
                    deleteFunctionsValidation.deleteMedicineIntakeMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "MEDICINESTRENGTHMASTER":
                    deleteFunctionsValidation.deleteMedicineStrengthMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "LABTESTMASTER":
                    deleteFunctionsValidation.deleteLabTestMasterValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "SHAREURL_CONFIGMASTER":
                    deleteFunctionsValidation.deleteurlshareConfigValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "BLOODGROUP":
                    deleteFunctionsValidation.deleteBloodGroupValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "PHR_DOCUMENT":
                    deleteFunctionsValidation.deletePHRdocsValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "DOC_CATEGORY":
                    deleteFunctionsValidation.deleteMasterTableValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "ALLERGY_SEVERITY":
                    deleteFunctionsValidation.deleteMasterTableValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "ALLERGY_SINCE":
                    deleteFunctionsValidation.deleteMasterTableValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
                case "PROVIDER_MASTER":
                    deleteFunctionsValidation.deleteMasterTableValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "QUALIFICATION_MASTER":
                    deleteFunctionsValidation.deleteMasterTableValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;

                case "SECTOR_MASTER":
                    deleteFunctionsValidation.deleteMasterTableValidation(req, function (err, result) {

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                status: result.status,
                                message: result.message
                            });
                        }
                    });
                    break;
            }
        })
    })
    /**
     * Route serving summary data(i.e the last records over view ) for different widgets in the application,where widget names are given in query string.
     * @name post/summaryData
     * @function
     * @memberof module:routers/summaryData
     * @inner
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/summaryData", cors(), (req, res) => {
        req.startTimeAPI = Date.now()
        dashboard.txCount().then(function () {
            var query = require('url').parse(req.url, true).query;
            var widget = query.WIDGET;


            switch (widget) {

                case "LABTEST":
                    summaryFunctionsValidation.summaryDataLabTestValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary")

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI
                            counts.updateAPIsTime(widget, "summary", time / 1000)
                        }
                    });
                    break;
                case "ACTIVITY":
                    summaryFunctionsValidation.summaryDataActivityValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary")

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({

                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;


                case "ALLERGY":
                    summaryFunctionsValidation.summaryAllergyValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;
                case "MEDICATION":
                    summaryFunctionsValidation.summaryMedicationValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;
                case "BLOODPRESSURE":
                    summaryFunctionsValidation.summaryBloodPressureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;
                case "BLOODGLUCOSE":
                    summaryFunctionsValidation.summaryDataBloodGlucoseValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({

                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;

                case "BMI":
                    summaryFunctionsValidation.summaryDataBMIValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({

                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;
                case "SPO2":
                    summaryFunctionsValidation.summaryDataSPO2Validation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({

                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;
                case "HEARTRATE":
                    summaryFunctionsValidation.summaryDataHeartRateValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({

                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;

                case "RESPIRATORYRATE":
                    summaryFunctionsValidation.summaryDataRespiratoryValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({

                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;
                case "BODYTEMPERATURE":
                    summaryFunctionsValidation.summaryBodyTemperatureValidation(req, function (err, result) {
                        counts.successCount(widget, result.status, "summary");

                        if (err) {
                            res.status(err.status).json({
                                message: err
                            });
                        } else {
                            res.status(result.status).json({
                                message: result
                            });
                            var time = Date.now() - req.startTimeAPI;
                            counts.updateAPIsTime(widget, "summary", time / 1000);
                        }
                    });
                    break;


            }
        })
    });
    /**
     * Route serving for creating the object  which the user wants to share with other participants with otp generation.
     * @name post/Share/reportShare
     * @function
     * @memberof module:routers/Share
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/Share/reportShare", cors(), (req, res) => {
        req.startTimeAPI = Date.now()
        var EHRID = req.body.EHRID;
        var key1 = EHRID + configWidget.HospitalRecords;



        var validity = req.body.VALIDITY;
        var expiry_date = ""
        var givenDate = ""
        var d = new Date();
        if (validity == "one") {
            givenDate = parseInt(1);
            d.setDate(d.getDate() + givenDate);
            expiry_date = (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());

        } else if (validity == "two") {
            givenDate = parseInt(2);
            d.setDate(d.getDate() + givenDate);
            expiry_date = (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());

        } else if (validity == "week") {
            givenDate = parseInt(7);
            d.setDate(d.getDate() + givenDate);
            expiry_date = (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());

        } else if (validity == "month") {
            d.setMonth(d.getMonth() + 1);
            expiry_date = (d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
        } else if (validity == "permanent") {
            expiry_date = "permanent";

        }
        var medication = req.body.meditation;
        var labtest = req.body.labtest;
        var packageDetails = req.body.package;
        var value = {
            "CONTACT_NAME": req.body.CONTACT_NAME,
            "MEMBER_ID": req.body.MEMBER_ID,
            "EMPID": req.body.EMPID,
            "CONTACT_TYPE": req.body.CONTACT_TYPE,
            "MOBILE": req.body.MOBILE,
            "EMAIL": req.body.EMAIL,
            "FROMDATE": req.body.FROMDATE,
            "TODATE": req.body.TODATE,
            "MEDICATION": req.body.MEDICATION,
            "LABTEST": req.body.LABTEST,
            "PACKAGE": req.body.PACKEGE,
            "QUERY": req.body.QUERY,
            "VALIDITY": req.body.VALIDITY,
        }

        var medicalReport = [];
        var bodyTemp = ""
        var heartRate = ""
        var respiratory = ""
        var bloodPressure = ""
        var SPO2 = ""
        var BMI = ""
        var bloodGlucose = ""
        var labTest = ""
        var medications = ""
        var allergy = ""
        var userDetails = ""



        if (!req.body.EHRID || !value.MOBILE || !value.EMAIL || !value.FROMDATE || !value.TODATE || !value.VALIDITY) {

            res.status(400).json({
                "message": 'Invalid Request!'
            })

        } else {
            addShareReport.addShareData(EHRID, key1, "", req, value.MEDICATION, value.LABTEST, value.PACKAGE)
                .then(function (result) {


                    medicalReport = result.data
                }).catch(function (err) {
                    medicalReport = err
                })


            summaryFunctionsValidation.summaryBodyTemperatureValidation(req, function (err, result) {

                if (err) {
                    bodyTemp = err
                } else {
                    bodyTemp = result

                }
            })


            summaryFunctionsValidation.summaryDataHeartRateValidation(req, function (err, result) {

                if (err) {
                    heartRate = err
                } else {
                    heartRate = result
                }
            })
            summaryFunctionsValidation.summaryDataRespiratoryValidation(req, function (err, result) {

                if (err) {
                    respiratory = err
                } else {
                    respiratory = result
                }
            });
            summaryFunctionsValidation.summaryBloodPressureValidation(req, function (err, result) {

                if (err) {
                    bloodPressure = err
                } else {
                    bloodPressure = result
                }
            });
            summaryFunctionsValidation.summaryDataSPO2Validation(req, function (err, result) {

                if (err) {
                    SPO2 = err
                } else {
                    SPO2 = result
                }
            });
            summaryFunctionsValidation.summaryDataBMIValidation(req, function (err, result) {

                if (err) {
                    BMI = err
                } else {
                    BMI = result
                }
            });
            summaryFunctionsValidation.summaryDataBloodGlucoseValidation(req, function (err, result) {

                if (err) {
                    bloodGlucose = err
                } else {
                    bloodGlucose = result
                }
            });

            var readReq = {
                "body": {
                    "EHRID": req.body.EHRID,
                    "FROMDATE": req.body.FROMDATE,
                    "TODATE": req.body.TODATE,
                }
            }


            readData.readProfileData(req.body.EHRID).then(result => {


                var response = result.data

                if (result.status == 200) {
                    userDetails = response
                } else {
                    userDetails = "No data found for this EHRID"
                }

            });



            readFunctionsValidation.readLabTestValidation(readReq, function (err, result) {


                if (err) {
                    labTest = err
                } else {
                    if (result.status == 200) {
                        var arr = []
                        for (var i = 0; i < result.data[0].data.length; i++) {

                            if (result.data[0].data[i].CONFIDENTIALITY_STATUS == "U") {

                                arr.push(result.data[0].data[i])
                            }
                        }

                        labTest = arr
                    } else {
                        labTest = result
                    }
                }
            });
            readFunctionsValidation.readAllergyValidation(readReq, function (err, result) {

                if (err) {
                    allergy = err
                } else {
                    if (result.status == 200) {
                        var arr = []
                        for (var i = 0; i < result.data[0].data.length; i++) {

                            if (result.data[0].data[i].CONFIDENTIALITY_STATUS == "U") {

                                arr.push(result.data[0].data[i])
                            }
                        }

                        allergy = arr
                    } else {
                        allergy = result
                    }
                }
            });
            readFunctionsValidation.readMedicationValidation(readReq, function (err, result) {

                if (err) {
                    medication = err
                } else {
                    if (result.status == 200) {
                        var arr = []
                        for (var i = 0; i < result.data[0].data.length; i++) {

                            if (result.data[0].data[i].CONFIDENTIALITY_STATUS == "U") {

                                arr.push(result.data[0].data[i])
                            }
                        }
                        medications = arr
                    } else {
                        medications = result
                    }

                    var date = new Date();
                    var currentDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                    setTimeout(function () {
                        var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                        var shareReport = {
                            "EXPIRY_DATE": expiry_date,
                            "OTP": otp,
                            "SHARED_ON": currentDate,
                            "USER_DETAILS": userDetails,
                            "MEDICAL_REPORT": medicalReport,
                            "BODY_TEMP": bodyTemp,
                            "HEART_RATE": heartRate,
                            "RESPIRATORY": respiratory,
                            "BLOOD_PRESSURE": bloodPressure,
                            "SPO2": SPO2,
                            "BMI": BMI,
                            "BLOOD_Glucose": bloodGlucose,
                            "LAB_TEST": labTest,
                            "MEDICATION": medications,
                            "ALLERGY": allergy,
                        }
                        counts.shareCount(req.body.EHRID)
                            .then(function (count) {
                                var shareKey = (req.body.EHRID) + configWidget.share + "_" + count.id
                                addData.addData(shareKey, shareReport)
                                    .then(function (result) {
                                        counts.medicalCount(value.CONTACT_TYPE);
                                        return res.status(result.status).json({
                                            message: result.message,
                                            "contactInfo": {
                                                "CONTACT_NAME": value.CONTACT_NAME,
                                                "CONTACT_TYPE": value.CONTACT_TYPE,
                                                "MOBILE": value.MOBILE,
                                                "EMAIL": value.EMAIL,
                                                "VALIDITY": value.VALIDITY
                                            },
                                            "otp": otp,
                                            "shareID": shareKey
                                        });
                                    })
                                    .catch(err => res.status(err.status).json({
                                        message: err.message
                                    }).json({
                                        status: err.status
                                    }));
                            })
                    }, 250);
                }
            });
        }
    })

    /**
     * Route serving for sending the created object  which the user wants to share with other participants with otp generation.
     * @name post/Share/readRecords
     * @function
     * @memberof module:routers/Share
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */

    router.post("/Share/readRecords", cors(), (req, res) => {
        req.startTimeAPI = Date.now()
        const key = (req.body.shareID);

        if (!req.body.shareID) {
            res.status(400).json({
                "message": 'Invalid Request!'
            })
        } else {

            readData.readProfileData(key)
                .then(function (result) {
                    if (result.status == 401) {
                        return res.json({
                            "status": 401,
                            "err": result.data
                        });

                    } else {
                        var rest = result.data;
                        var getOtp = req.body.OTP;
                        for (var i = 0; i < rest.length; i++) {
                            var otp = rest[i].data.OTP;
                            global.expiryDate = rest[i].data.EXPIRY_DATE;

                            if (otp == getOtp) {
                                var liveStatus = dateComparison();
                                if (liveStatus == true || global.expiryDate == "permanent") {
                                    return res.json({
                                        "status": result.status,
                                        "response": rest[i].data
                                    });
                                } else {
                                    return res.json({
                                        "status": 400,
                                        "response": {
                                            "err": "Date Expired."
                                        }
                                    });
                                }
                            }

                            function dateComparison() {
                                // Getting the current date at midnight.  
                                var now = new Date();
                                var todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                                // Set specificDate to a specified date at midnight.
                                var split = global.expiryDate.split("/")
                                var specificDate = new Date(split[2], split[1], split[0]);
                                // Compare the two dates by comparing the millisecond  
                                if (todayAtMidn.getTime() > specificDate.getTime()) {
                                    return false
                                } else if (todayAtMidn.getTime() == specificDate.getTime()) {
                                    return true
                                } else if (todayAtMidn.getTime() < specificDate.getTime()) {
                                    return true
                                }
                            }
                        }

                        return res.json({
                            "status": 400,
                            "response": {
                                "err": "Please enter a valid OTP."
                            }
                        });
                    }
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    })

    /**
     * Route serving for updating user profile.
     * @name post/userProfile/updateUserProfile
     * @function
     * @memberof module:routers/userProfile
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */

    router.post("/userProfile/updateUserProfile", (req, res) => {
        dashboard.txCount().then(function () {
            dashboard.districtsCount(req.body.DISTRICT).then(function () {
                const EHRID = (req.body.EHRID)

                var userInputObj = req.body;
                var dbObj = {};
                var keysInObj = Object.keys(req.body)

                if (!EHRID || !req.body.BHAMASHAHID || !req.body.MEMBER_ID || !req.body.PATIENT_NAME) {
                    res.status(400).json({
                        "message": 'Invalid Request!'
                    })
                } else {

                    readData.readProfileData(EHRID)
                        .then(function (result) {
                            dbObj = result.data
                            for (var i = 0; i < keysInObj.length; i++) {
                                var key = keysInObj[i]

                                var inputData = Object.getOwnPropertyDescriptor(userInputObj, key);
                                if (!dbObj.hasOwnProperty(key)) {
                                    dbObj[key] = inputData.value;
                                    // dbObj.keysInObj[i] = userInputObj.keysInObj[i]
                                }
                                var dbData = Object.getOwnPropertyDescriptor(dbObj, key);

                                if (dbData.value !== inputData.value) {

                                    dbObj[key] = inputData.value;
                                }
                            }


                            addData.addProfileData(EHRID, dbObj)
                                .then(result => {

                                    res.status(result.status).json({
                                        message: "Your Information is stored into BlockChain"
                                    });
                                })
                                .catch(err => res.status(err.status).json({
                                    message: err.message
                                }).json({
                                    status: err.status
                                }));
                        })
                        .catch(err => res.status(err.status).json({
                            message: err.data
                        }));
                }
            })
        })
    }),

        /**
         * Route serving for reading user profile.
         * @name post/userProfile/readUserProfile
         * @function
         * @memberof module:routers/userProfile
         * @inner 
         * @param {string} path - Express path
         * @param {callback} middlewear - Express middlewear.
         */
        router.post("/userProfile/readUserProfile", cors(), (req, res) => {
            const key = (req.body.EHRID);

            if (!key || !req.body.EHRID) {
                res.status(400).json({
                    "message": 'Please enter correct EHRID'
                })
            } else {
                readData.readProfileData(key)
                    .then(function (result) {
                        //   var response = JSON.parse(result.data)

                        return res.status(result.status).json({
                            message: result
                        })
                    })
                    .catch(err => res.status(err.status).json({
                        message: err.data
                    }));
            }
        })

    /**
     * Route serving for reading family member profile.
     * @name post/userProfile/familyMemberdetails
     * @function
     * @memberof module:routers/userProfile
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */


    router.post("/userProfile/familyMemberdetails", cors(), (req, res) => {
        dashboard.txCount().then(function () {

            const BHAMASHAHID = req.body.BHAMASHAHID;
            var finalresponse = []
            if (!BHAMASHAHID) {
                res.status(400).json({
                    message: 'Please mention the Bhamashah ID.'
                });
            } else {
                readFamilymembers.getFamilydata(BHAMASHAHID)
                    .then(function (result) {

                        return res.status(result.status).json({
                            message: result.message
                        });
                    })
                    .catch(err =>
                        res.status(err.status).json({
                            message: err.message
                        }));
            }

        })
    })

    /**
     * Route serving for reading Report details i.e it reads users profile and all widget details.
     * @name post/userProfile/familyMemberdetails
     * @function
     * @memberof module:routers/userProfile
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */

    router.post("/Report/readReportdetails", cors(), (req, res) => {
        return new Promise(async function (resolve, reject) {
            dashboard.txCount().then(function () {
                const UserProfile = req.body.EHRID;
                var EHRID = req.body.EHRID;
                var key1 = EHRID + configWidget.HospitalRecords;
                var medication = req.body.medication;
                var labtest = req.body.labtest;
                var packageDetails = req.body.package;
                const Medication = (req.body.EHRID) + configWidget.Medication;
                const LabTest = (req.body.EHRID) + configWidget.LabTest;
                const bglucose = (req.body.EHRID) + configWidget.BloodGlucose;
                const BMI = (req.body.EHRID) + configWidget.BMI;
                const bodytemp = (req.body.EHRID) + configWidget.BodyTemperature;
                const SPO2 = (req.body.EHRID) + configWidget.spo2;
                const HEARTRATE = (req.body.EHRID) + configWidget.HeartRate;
                const RESPRATE = (req.body.EHRID) + configWidget.Respiratory;
                const ALLERGY = (req.body.EHRID) + configWidget.Allergy;
                const BLOODPRESSURE = (req.body.EHRID) + configWidget.BloodPressure;
                var period = req.body.PERIOD;
                var array = [];
                return new Promise(async function (resolve, reject) {
                    let userProfiledata = await readData.readProfileData(UserProfile)

                    array.push({
                        'UserProfile': userProfiledata.data
                    })
                    let hospitalrecs = await readHospitalData.readHospitalData(EHRID, key1, period, req, medication, labtest, packageDetails)

                    if (Array.isArray(hospitalrecs.data)) {
                        array.push({
                            'HospitalRecords': hospitalrecs.data
                        })
                    } else {
                        array.push({
                            'HospitalRecords': []
                        })
                    }
                    let MedicationReports = await readData.readData(Medication, period, req)
                    if (Array.isArray(MedicationReports.data)) {
                        array.push({
                            'Medication': MedicationReports.data
                        })
                    } else {
                        array.push({
                            'Medication': []
                        })
                    }
                    let labtestdata = await readData.readData(LabTest, period, req)
                    if (Array.isArray(labtestdata.data)) {
                        array.push({
                            'LabTest': labtestdata.data
                        })
                    } else {
                        array.push({
                            'LabTest': []
                        })
                    }
                    let bgglucosedata = await readData.readData(bglucose, period, req)
                    if (Array.isArray(bgglucosedata)) {
                        array.push({
                            'bglucose': bgglucosedata.data
                        })
                    } else {
                        array.push({
                            'bglucose': []
                        })
                    }

                    let bmidata = await readData.readData(BMI, period, req)
                    if (Array.isArray(bmidata.data)) {
                        array.push({
                            'BMI': bmidata.data
                        })
                    } else {
                        array.push({
                            'BMI': []
                        })
                    }

                    let bodytempdata = await readData.readData(bodytemp, period, req)
                    if (Array.isArray(bodytemp.data)) {
                        array.push({
                            'bodytemp': bodytempdata.data
                        })
                    } else {
                        array.push({
                            'bodytemp': []
                        })
                    }

                    let spo2data = await readData.readData(SPO2, period, req)
                    if (Array.isArray(spo2data.data)) {
                        array.push({
                            'SPO2': spo2data.data
                        })
                    } else {
                        array.push({
                            'SPO2': []
                        })
                    }

                    let heartratedate = await readData.readData(HEARTRATE, period, req)
                    if (Array.isArray(heartratedate)) {
                        array.push({
                            'HEARTRATE': heartratedate.data
                        })
                    } else {
                        array.push({
                            'HEARTRATE': []
                        })
                    }

                    let respiratorydata = await readData.readData(RESPRATE, period, req)
                    if (Array.isArray(respiratorydata)) {
                        array.push({
                            'RESPRATE': respiratorydata.data
                        })
                    } else {
                        array.push({
                            'RESPRATE': []
                        })
                    }

                    let allergydata = await readData.readData(ALLERGY, period, req)
                    if (Array.isArray(allergydata)) {
                        array.push({
                            'ALLERGY': allergydata.data
                        })
                    } else {
                        array.push({
                            'ALLERGY': []
                        })
                    }

                    let bloodpresuredata = await readData.readData(BLOODPRESSURE, period, req)
                    if (Array.isArray(bloodpresuredata)) {
                        array.push({
                            'BLOODPRESSURE': bloodpresuredata.data
                        })
                    } else {
                        array.push({
                            'BLOODPRESSURE': []
                        })
                    }
                    return res.send({
                        "status": 200,
                        "reportdetails": array
                    });
                })
            })
                .catch(err => {
                    loger.error(err)
                    res.status(err.status).json({
                        message: err.message
                    })
                });
        })
    })

    /**
     * Route serving for reading notifications.
     * @name post/readNotifications
     * @function
     * @memberof module:routers/readNotifications
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/readNotifications", cors(), (req, res) => {
        var EHRID = req.body.EHRID.toString()
        const key = (EHRID) + configWidget.notification;

        if (!EHRID || !EHRID.trim()) { /** cheching input field should not be empty */
            res.status(400).json({
                message: 'Please mention the EHRID.'
            });

        } else {
            readData.readDataWithoutDate(key)
                .then(function (result) {
                    var response = result.data
                    return res.status(result.status).json({
                        "response": response
                    })
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });

    /**
     * Route serving for reading hospital records(here every patient has a ehrid with range which is equal to the number of records viz
     *  abc_qw_HOSPITAL_RECORDS_0
     *  abc_qw_HOSPITAL_RECORDS_1
     * abc_qw_HOSPITAL_RECORDS_2).
     * @name post/HospitalRecords/readHospitalRecords
     * @function
     * @memberof module:routers/HospitalRecords
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/HospitalRecords/readHospitalRecords", cors(), (req, res) => {
        const EHRID = req.body.EHRID;
        const key1 = EHRID + configWidget.HospitalRecords;
        var period = req.body.PERIOD;
        var medi = req.body.medication;
        var labtest = req.body.labtest;
        var packageD = req.body.package;
        if (!key1 || !medi || !labtest || !packageD) {

            res.status(400).json({
                message: 'Please check the input fields and try again.'
            });

        } else {
            readHospitalData.readHospitalData(EHRID, key1, period, req, medi, labtest, packageD)
                .then(result => {

                    return res.status(result.status).json({
                        message: result.data
                    });
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    })
    //-----------------------service for test only---@author risabh-----------------------------------------//
    router.post("/HospitalRecords/AddDataHospitalRecords", cors(), (req, res) => {
        dashboard.txCount().then(function () {
            if (1 == 1) {

                var key = (req.body.EHRID.toString()) + configWidget.HospitalRecords;

                var value = req.body
            }


            addData.addData(key, value)
                .then(result => {
                    res.status(result.status).json({
                        message: result.message
                    });

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        })
    })

    /**
     *  Route serving for updating ConfidentialityStatus hospital records
     * @name post/HospitalRecords/ConfidentialityStatus
     * @function
     * @memberof module:routers/HospitalRecords
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/HospitalRecords/eConfidentialityStatus", cors(), (req, res) => {
        dashboard.txCount().then(function () {

            const key = req.body.EHRID;
            const ENCOUNTERDETAILS_MASTERSTATUS = req.body.ENCOUNTERDETAILS_MASTERSTATUS;
            const PackageDetails_MasterStaus = req.body.PackageDetails_MasterStaus;
            const labresults_MasterStaus = req.body.labresults_MasterStaus;
            const Medications_MasterStatus = req.body.Medications_MasterStatus;
            const Package = req.body.Package;
            const Medicine = req.body.Medicine;
            const labtest = req.body.labtest;

            if (!key) {

                res.status(400).json({
                    message: 'Please check the input fields and try again.'
                });

            } else {
                updateStatus.updateConfidentialityStatus(key, ENCOUNTERDETAILS_MASTERSTATUS, PackageDetails_MasterStaus, labresults_MasterStaus, Medications_MasterStatus, Package, Medicine, labtest)
                    .then(result => {
                        res.status(result.status).json({
                            message: result.message
                        });
                    })
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }).json({
                        status: err.status
                    }));
            }
        })
    })

    /**
     *  Route serving for summary of hospital records
     * @name post/HospitalRecords/readHospitalRecordsSummary
     * @function
     * @memberof module:routers/HospitalRecords
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/HospitalRecords/readHospitalRecordsSummary", cors(), (req, res) => {
        dashboard.txCount().then(function () {
            var EHRID = (req.body.EHRID);
            var key1 = (req.body.EHRID) + configWidget.HospitalRecords;
            var period = 100000;

            if (!key1 || !EHRID) {
                res.status(400).json({
                    message: 'Please mention the EHRID.'
                });

            } else {

                readHospitalSummary.readHospitalSummary(EHRID, key1, period)
                    .then(function (result) {
                        if (result.data === "please check the EHRID") {
                            return res.status(200).json({
                                'data': "please check the EHRID"
                            });
                        }
                        if (result.data === "no summary for the EHRID") {
                            return res.status(200).json({
                                'data': "no summary for the EHRID"
                            });
                        }

                        var DATA = result.data.ENCOUNTERDETAILS;

                        var HospitalName = DATA.HOSPITAL_NAME;
                        var DATE = DATA.ADDMISSION_DATE;
                        return res.status(200).json({
                            "HospitalName": HospitalName,
                            "DATE": DATE
                        });
                    })

                    .catch(err => {
                        loger.error(err)
                        res.status(err.status).json({
                            message: err.message
                        })
                    });
            }
        })
    });
    //addlanguage
    router.post("/addlanguage", cors(), (req, res) => {
        var MENU_ID = req.body.MENU_ID;
        var LABEL_ENGLISH = req.body.LABEL_ENGLISH;
        var LABEL_HINDI = req.body.LABEL_HINDI;
        var PROPERTY_VALUE = req.body.PROPERTY_VALUE;
        var value = {
            'MENU_ID': MENU_ID,
            'LABEL_ENGLISH': LABEL_ENGLISH,
            'LABEL_HINDI': LABEL_HINDI,
            'PROPERTY_VALUE': PROPERTY_VALUE
        }
        const key = "MENU_LABEL"


        addData.addData(key, value)
            .then(result => {

                res.status(result.status).json({
                    message: result.message
                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    })

    //readlanguage
    router.post("/readlanguage", cors(), (req, res) => {
        const key = req.body.key;


        readData.readDataWithoutDate(key)
            .then(result => {
                res.status(result.status).json({
                    message: result
                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    })

    //update language
    router.post("/updatelanguage", cors(), (req, res) => {
        const key = (req.body.key).toString();
        var ID = req.body.ID
        var MENU_ID = req.body.MENU_ID;
        var LABEL_ENGLISH = req.body.LABEL_ENGLISH;
        var LABEL_HINDI = req.body.LABEL_HINDI;
        var PROPERTY_VALUE = req.body.PROPERTY_VALUE;

        var value = {
            'MENU_ID': MENU_ID,
            'LABEL_ENGLISH': LABEL_ENGLISH,
            'LABEL_HINDI': LABEL_HINDI,
            'PROPERTY_VALUE': PROPERTY_VALUE
        }

        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                res.status(result.status).json({
                    message: result.message
                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    })

    //delete language
    router.post("/deletelanguage", cors(), (req, res) => {
        const key = (req.body.key).toString();
        const id = req.body.ID

        deleteData.deleteData(key, id)
            .then(result => {

                res.status(result.status).json({
                    message: result.message
                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    })

    //====================================api for benchmarking the webservices=======================================================//
    router.get('/benchmark', function (req, res) {
        var routes = {
            route1: routes_json.route1,
            route2: routes_json.route2,
            route3: routes_json.route3,
            route4: routes_json.route4,
            route5: routes_json.route5,
            route6: routes_json.route6,
            route7: routes_json.route7,
            route8: routes_json.route8,
            route9: routes_json.route9,
            route10: routes_json.route10,
            route11: routes_json.route11,
            route12: routes_json.route12,
            route13: routes_json.route13,
            route14: routes_json.route14,
            route15: routes_json.route15,
            route16: routes_json.route16,
            route17: routes_json.route17,
            route18: routes_json.route18,
            route19: routes_json.route19,
            route20: routes_json.route20,
            route21: routes_json.route21,
            route22: routes_json.route22,
            route23: routes_json.route23,
            route24: routes_json.route24,
            route25: routes_json.route25,
            route26: routes_json.route26,
            route27: routes_json.route27,
            route28: routes_json.route28,
            route29: routes_json.route29,
            route30: routes_json.route30,
            route31: routes_json.route31,
            route32: routes_json.route32,
            route33: routes_json.route33

        }

        var options = {
            debug: true,
            runMode: 'parallel',
            maxConcurrentRequests: 1,
            delay: 0,
            maxTime: 5,
            minSamples: 100,
            stopOnError: false
        };

        var services = {
            "nodeJS": "http://localhost:3000"
        };

        apiBenchmark.measure(services, routes, options, function (err, results) {

            apiBenchmark.getHtml(results, function (error, html) {
                fs.writeFileSync('./views/index.html', html);
                res.render("index.html")
            });
        });
    });

    /**
     *  Route serving for creating,updating and getting ehr ids 
     * @name post/getEHRID/
     * @function
     * @memberof module:routers/getEHRID
     * @inner 
     * @param {string} path - Express path
     * @param {callback} middlewear - Express middlewear.
     */
    router.post("/getEHRID", cors(), (req, res) => {
        dashboard.txCount().then(function () {
            if (!req.body.hasOwnProperty("SSO_ID")) {
                var value = {
                    "SSO_ID": "",
                    "DOB": "",
                    "BHAMASHAHID": req.body.BHAMASHAHID,
                    "MEMBER_ID": req.body.MEMBER_ID,
                    "NAME_ENGLISH": "",
                    "FATHERS_NAME_ENGLISH": "",
                    "MOTHERS_NAME_ENGLISH": "",
                    "SPOUSE_NAME_ENGLISH": "",
                    "AADHARNO": "",
                    "EMAIL": "",
                    "MOBILENO": "",
                    "GENDER": "",
                    "ACK_ID": "",
                    "PHOTO": "",
                    "ADDRESS": "",
                    "NAME_HINDI": "",
                    "FATHERS_NAME_HINDI": "",
                    "MOTHERS_NAME_HINDI": "",
                    "SPOUSE_NAME_HINDI": "",
                    "PASSPORT": "",
                    "BANK_NAME": "",
                    "ACCOUNT": "",
                    "PAN_NO": "",
                    "VOTER_ID": "",
                    "DRIVING_LIENCE_NO": "",
                    "QUALITFICATION": "",
                    "IS_EHR_USER": "N",
                    "IS_APPROVED_IHMS_USER": "N",
                    "IS_PROVIDER": "N",
                    "IS_APPROVED_PROVIDER": "N",
                    "IS_ACTIVE": "A"
                }
                var BMID = value.BHAMASHAHID + "_" + value.MEMBER_ID + "_" + "";
                if (!value.BHAMASHAHID || !value.MEMBER_ID) {
                    res.status(400).json({
                        message: 'Please check the input fields and try again.'
                    });
                } else {
                    addEhrId.addEhrId(BMID, value)
                        .then(function (result) {
                            var response = result.message
                            return res.status(result.status).json({
                                "response": response
                            })
                        })
                        .catch(err => res.status(err.status).json({
                            message: err.message
                        }));
                }
            } else {
                var mydevice = device(req.headers['user-agent']);
                counts.deviceCount(mydevice.type);

                var value = {
                    "SSO_ID": ifExists(req.body.SSO_ID),
                    "DATE_OF_BIRTH": ifExists(req.body.DATE_OF_BIRTH),
                    "BHAMASHAHID": ifExists(req.body.BHAMASHAHID),
                    "MEMBER_ID": ifExists(req.body.MEMBER_ID),
                    "PATIENT_NAME": ifExists(req.body.PATIENT_NAME),
                    "FATHERS_NAME_ENGLISH": ifExists(req.body.FATHERS_NAME_ENGLISH),
                    "MOTHERS_NAME_ENGLISH": ifExists(req.body.MOTHERS_NAME_ENGLISH),
                    "SPOUSE_NAME_ENGLISH": ifExists(req.body.SPOUSE_NAME_ENGLISH),
                    "AADHAR_NO": ifExists(req.body.AADHAR_NO),
                    "EMAIL": ifExists(req.body.EMAIL),
                    "MOBILE_NUMBER": ifExists(req.body.MOBILE_NUMBER),
                    "GENDER": ifExists(req.body.GENDER),
                    "ACK_ID": ifExists(req.body.ACK_ID),
                    "PHOTO": ifExists(req.body.PHOTO),
                    "ADDRESS": ifExists(req.body.ADDRESS),
                    "NAME_HINDI": ifExists(req.body.NAME_HINDI),
                    "FATHERS_NAME_HINDI": ifExists(req.body.FATHERS_NAME_HINDI),
                    "MOTHERS_NAME_HINDI": ifExists(req.body.MOTHERS_NAME_HINDI),
                    "SPOUSE_NAME_HINDI": ifExists(req.body.SPOUSE_NAME_HINDI),
                    "PASSPORT": ifExists(req.body.PASSPORT),
                    "BANK_NAME": ifExists(req.body.BANK_NAME),
                    "ACCOUNT": ifExists(req.body.ACCOUNT),
                    "PAN_NO": ifExists(req.body.PAN_NO),
                    "VOTER_ID": ifExists(req.body.VOTER_ID),
                    "DRIVING_LIENCE_NO": ifExists(req.body.DRIVING_LIENCE_NO),
                    "QUALITFICATION": ifExists(req.body.QUALITFICATION),
                    "IS_EHR_USER": ifExists("Y"),
                    "IS_APPROVED_IHMS_USER": ifExists("N"),
                    "IS_PROVIDER": ifExists("N"),
                    "IS_APPROVED_PROVIDER": ifExists("N"),
                    "IS_ACTIVE": ifExists("A")
                }
                var BMID = value.BHAMASHAHID + "_" + value.MEMBER_ID + "_" + value.SSO_ID;

                if (!value.SSO_ID || !value.BHAMASHAHID || !value.MEMBER_ID) {
                    res.status(400).json({
                        message: 'Please check the input fields and try again.'
                    });
                } else {
                    addEhrId.addEhrId(BMID, value)
                        .then(function (result) {
                            // counts.successCount(configWidget, result.status, "add")
                            var response = result.message
                            dashboard.topUserCount(response.result.EHRID, response.result.PATIENT_NAME).then(function () {
                                return res.status(result.status).json({
                                    "response": response
                                })
                            })
                        })
                        .catch(err => res.status(err.status).json({
                            message: err.message
                        }));
                }
            }
        })
    });

    function ifExists(value) {
        if (value === undefined) {
            return "";
        } else {
            return value;
        }

    }
    router.post("/getDOB", cors(), (req, res) => {

        var dob = req.body.DOB
        if (!dob) {
            res.status(400).json({
                message: 'Please provide a valid date.'
            });

        } else {
            var splitDOB = dob.split("/")
            var bday = parseInt(splitDOB[1]);
            var bmo = (parseInt(splitDOB[0]) - 1);
            var byr = parseInt(splitDOB[2]);
            var byr;
            var age;
            var now = new Date();
            var tday = now.getDate();
            var tmo = (now.getMonth());
            var tyr = (now.getFullYear()); {
                if ((tmo > bmo) || (tmo == bmo & tday >= bday)) {
                    age = byr
                } else {
                    age = byr + 1
                }
                return res.status(200).json({
                    "age": tyr - age,
                });

            }
        }
    })

    router.post("/sessionAuthenticate", cors(), (req, res) => {

        var SSO_ID = req.body.SSO_ID;
        var IS_EHR_USER = req.body.IS_EHR_USER;
        var IS_PROVIDER = req.body.IS_PROVIDER;
        var IS_APPROVED_PROVIDER = req.body.IS_APPROVED_PROVIDER;
        var EHRID = req.body.EHRID;

        if (!SSO_ID || !IS_EHR_USER || !IS_PROVIDER || !IS_APPROVED_PROVIDER || !EHRID) {
            res.status(400).json({
                message: 'Please check the input fields and try again.'
            });
        } else {
            readData.sessionAuntheticate(EHRID, SSO_ID)
                .then(function (result) {
                    return res.status(result.status).json({
                        "response": result.message
                    })
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });

    router.post("/countByID", cors(), (req, res) => {
        var EHRID = req.body.EHRID

        readData.readProfileData(EHRID)
            .then(function (result) {
                var response = result.data
                var split = result.data.key.split("_")
                return res.status(result.status).json({
                    "COUNT": response.length,
                    "EHRID": split[0],
                    "WIDGET": split[1],
                    "DATA": response
                })

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    })


    router.post("/auditTrial", cors(), (req, res) => {


        const EHRID = req.body.EHRID;
        const FROMDATE = req.body.FROMDATE;
        const TODATE = req.body.TODATE;

        readData.auditTrial(EHRID, FROMDATE, TODATE)
            .then(function (result) {

                return res.status(result.status).json({
                    "data": result.data
                });
            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }));


    })

    //---------------------------------API for switchmember----------------------------------//
    router.post("/readSwitchmember", cors(), (req, res) => {
        dashboard.txCount().then(function () {

            const BHAMASHAHID = req.body.BHAMASHAHID;
            const MEMBERID = req.body.MEMBERID;

            if (!BHAMASHAHID || !MEMBERID) {

                res.status(400).json({
                    message: 'fields should not be empty'
                });


            } else {
                readSwitchmember.getSwitchmember(BHAMASHAHID, MEMBERID)
                    .then(function (result) {
                        return res.status(result.status).json({
                            message: result.message
                        });
                    })
                    .catch(err =>
                        res.status(err.status).json({
                            message: err.message
                        }));
            }

        })
    })


    router.get("/GetGeoData", cors(), (req, res) => {

        var query = require('url').parse(req.url, true).query;

        geoInformation.getgeoInformation(query.GEO)
            .then(function (result) {

                return res.status(result.status).json({
                    status: result.status,
                    message: JSON.parse(result.message.data)
                });

            }).catch(err => res.status(err.status).json({
                message: err.message
            }));

    });

    // router.post("/addMem", cors(), (req, res) => {

    //     var userList = req.body

    //     if (userList.length == 0) {
    //         return res.status(400).json({
    //             status: 400,
    //             message: "Data is not valid or Null"
    //         })
    //     } else {

    //         ehridsfunc.addMembers(userList).then(function(result) {

    //             return res.status(result.status).json({
    //                 status: result.status,
    //                 message: result.message

    //             });
    //         })
    //     }

    // })

    router.post("/addMembers", cors(), (req, res) => {

        var userList = req.body
        var user_Member_Ids = [];

        var x = 0;
        var loopArray = function (arr) {
            user_Member_Ids.push(arr[x].MEMBER_ID)
            if (arr[x].BHAMASHAHID == "" || arr[x].MEMBER_ID == "") {
                return res.status(400).json({
                    status: 400,
                    message: "BHAMASHAHID or MEMBER_ID should not be null"
                })
            }
            arr[x].SSO_ID = ""
            var BMID = arr[x].BHAMASHAHID + "_" + arr[x].MEMBER_ID + "_" + "";
            addEhrId.addEhrId(BMID, arr[x])
                .then(function (result) {
                    if (result.status == 200) {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            ehridsfunc.addMembers(userList, user_Member_Ids).then(function (result) {

                                return res.status(result.status).json({
                                    status: result.status,
                                    message: result.message

                                });
                            })
                        }
                    } else {
                        return res.status(result.status).json({
                            status: result.status,
                            message: result.message

                        });
                    }

                })
        }
        loopArray(userList);
    })
}