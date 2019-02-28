/**
@author: Rakesh C
@Version: 1.0.2
@Date: 03/02/2018
@description: DOIT BlockChain project
**/
var config = require('config');
var widget = config.get('widget');
/** logger integration */
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");
const readSummaryData = require('../functions/readSummaryData');
const readData = require('../functions/readData');


/** @module Validations */
module.exports = {
    summaryDataLabTestValidation: summaryDataLabTestValidation,
    summaryAllergyValidation: summaryAllergyValidation,
    summaryMedicationValidation: summaryMedicationValidation,
    summaryBloodPressureValidation: summaryBloodPressureValidation,

    summaryDataBloodGlucoseValidation: summaryDataBloodGlucoseValidation,
    summaryDataBMIValidation: summaryDataBMIValidation,
    summaryDataSPO2Validation: summaryDataSPO2Validation,
    summaryDataHeartRateValidation: summaryDataHeartRateValidation,
    summaryDataRespiratoryValidation: summaryDataRespiratoryValidation,

    summaryDataActivityValidation: summaryDataActivityValidation,
    summaryBodyTemperatureValidation: summaryBodyTemperatureValidation
};
/** @function summaryDataLabTestValidation 
 * validation of mandatory fields.
 */
function summaryDataLabTestValidation(req, callback) {

    const key = (req.body.EHRID) + widget.LabTest.toString()

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];

                    var RESULT_TEXT = DATA.data.RESULT_TEXT;
                    var RESULT_UNIT = DATA.data.RESULT_UNIT;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "RESULT_TEXT": RESULT_TEXT,
                        "RESULT_UNIT": RESULT_UNIT,
                        "DATE": DATE
                    }

                    callback("", summaryData);
                }
            })
            .catch(function (err) {
                callback(err, "");
            })
    }
}
/** @function summaryDataActivityValidation 
 * validation of mandatory fields.
 */
function summaryDataActivityValidation(req, callback) {

    var EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.Activity


    if (!EHRID || !EHRID.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {
        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc);
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var ACTIVITY_DESC = DATA.data.ACTIVITY_DESC;
                    var DISTANCE = DATA.data.DISTANCE;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "ACTIVITY_DESC": ACTIVITY_DESC,
                        "DISTANCE": DISTANCE,
                        "DATE": DATE
                    }

                    callback("", summaryData);
                }
            })
            .catch(function (err) {
                callback(err, "");
            })
    }
}

/** @function summaryAllergyValidation 
 * validation of mandatory fields.
 */
function summaryAllergyValidation(req, callback) {
    const key = (req.body.EHRID) + widget.Allergy.toString()

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var ALLERGY_DESCRIPTION = DATA.data.ALLERGY_DESCRIPTION;
                    var SEVERITY = DATA.data.SEVERITY;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "ALLERGY_DESCRIPTION": ALLERGY_DESCRIPTION,
                        "SEVERITY": SEVERITY,
                        "DATE": DATE
                    }

                    callback("", summaryData);
                }
            })
            .catch(function (err) {
                callback(err, "");
            })
    }
}
/** @function summaryMedicationValidation 
 * validation of mandatory fields.
 */
function summaryMedicationValidation(req, callback) {
    const key = (req.body.EHRID).toString() + widget.Medication

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var MEDICINE_NAME = DATA.data.MEDICINE_NAME;
                    var DOSAGE = DATA.data.DOSAGE;
                    var DOSAGE_VALUE = DATA.data.DOSAGE_VALUE;
                    var STRENGTH = DATA.data.STRENGTH;
                    var STRENGTH_VALUE = DATA.data.STRENGTH_VALUE;
                    var HOW_OFTEN = DATA.data.HOW_OFTEN;
                    var FROMDATE = DATA.data.START_DATE;
                    var TODATE = DATA.data.END_DATE;
                    summaryData = {
                        "status": 200,
                        "MEDICINE_NAME": MEDICINE_NAME,
                        "DOSAGE": DOSAGE,
                        "DOSAGE_VALUE": DOSAGE_VALUE,
                        "STRENGTH": STRENGTH,
                        "STRENGTH_VALUE": STRENGTH_VALUE,
                        "HOW_OFTEN": HOW_OFTEN,
                        "FROM": FROMDATE,
                        "TO": TODATE
                    }

                    callback("", summaryData);
                }
            })
            .catch(function (err) {
                callback(err, "");
            })
    }
}
/** @function summaryBloodPressureValidation 
 * validation of mandatory fields.
 */
function summaryBloodPressureValidation(req, callback) {
    const key = (req.body.EHRID) + widget.BloodPressure.toString()

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var SYSTOLIC = DATA.data.SYSTOLIC;
                    var DIASTOLIC = DATA.data.DIASTOLIC;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "SYSTOLIC": SYSTOLIC,
                        "DIASTOLIC": DIASTOLIC,
                        "DATE": DATE
                    }

                    callback("", summaryData);
                }
            })
            .catch(function (err) {
                callback(err, "");
            })
    }
}
/** @function summaryDataBloodGlucoseValidation 
 * validation of mandatory fields.
 */
function summaryDataBloodGlucoseValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BloodGlucose;


    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var GLUCOSE_VALUE = DATA.data.GLUCOSE_VALUE;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "GLUCOSE_VALUE": GLUCOSE_VALUE,
                        "DATE": DATE
                    }

                    callback("", summaryData);
                }
            })
            .catch(function (err) {
                callback(err, "");
            })
    }
}
/** @function summaryDataBMIValidation 
 * validation of mandatory fields.
 */
function summaryDataBMIValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BMI;

    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var HEIGHT = DATA.data.HEIGHT;
                    var WEIGHT = DATA.data.WEIGHT;
                    var BMI = DATA.data.BMI;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "HEIGHT": HEIGHT,
                        "WEIGHT": WEIGHT,
                        "BMI": BMI,
                        "DATE": DATE
                    }


                    callback("", summaryData);
                }

            })
            .catch(function (err) {

                callback(err, "");
            })
    }
}
/** @function summaryDataSPO2Validation 
 * validation of mandatory fields.
 */
function summaryDataSPO2Validation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.spo2;


    if (!EHRID || !EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {

                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var SPO2_VALUE = DATA.data.SPO2_VALUE;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "SPO2_VALUE": SPO2_VALUE,
                        "DATE": DATE

                    }


                    callback("", summaryData);
                }
            })
            .catch(function (err) {

                callback(err, "");
            })
    }
}
/** @function summaryDataHeartRateValidation 
 * validation of mandatory fields.
 */
function summaryDataHeartRateValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.HeartRate;


    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var HEARTRATE_VALUE = DATA.data.HEART_RATE;
                    var DATE = DATA.data.MEASURED_DATE;

                    summaryData = {
                        "status": 200,
                        "HEARTRATE_VALUE": HEARTRATE_VALUE,
                        "DATE": DATE

                    }


                    callback("", summaryData);
                }
            })
            .catch(function (err) {

                callback(err, "");
            })
    }
}
/** @function summaryDataRespiratoryValidation 
 * validation of mandatory fields.
 */
function summaryDataRespiratoryValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.Respiratory;


    if (!EHRID || !EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var RESPRATE_VALUE = DATA.data.RESP_RATE;
                    var DATE = DATA.data.MEASURED_DATE;
                    summaryData = {
                        "status": 200,
                        "RESPRATE_VALUE": RESPRATE_VALUE,
                        "DATE": DATE
                    }


                    callback("", summaryData);
                }
            })
            .catch(function (err) {

                callback(err, "");
            })
    }
}
/** @function summaryBodyTemperatureValidation 
 * validation of mandatory fields.
 */
function summaryBodyTemperatureValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BodyTemperature;


    if (!EHRID || !EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readSummaryData.readSummaryData(key)
            .then(result => {
                if (result.status == 401) {
                    callback("", result);
                } else {
                    var response = JSON.parse(result.query.data)
                    var date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        date1 = Number(date1.data.MEASURED_DATE.split('/').reverse().join(''));
                        date2 = Number(date2.data.MEASURED_DATE.split('/').reverse().join(''));
                        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                    };
                    var date_sort = function (dateA, dateB) {
                        dateA = new Date(dateA.meta.submittedOn);
                        dateB = new Date(dateB.meta.submittedOn);
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;

                    };
                    var sorteddata = response.sort(date_sort_desc)
                    sorteddata = sorteddata.filter(function (entry) { return entry.data.MEASURED_DATE === sorteddata[0].data.MEASURED_DATE });
                    sorteddata = (sorteddata.sort(date_sort));
                    var DATA = sorteddata[0];
                    var BODY_TEMP_VALUE = DATA.data.BODY_TEMP_VALUE;
                    var DATE = DATA.data.MEASURED_DATE;
                    summaryData = {
                        "status": 200,
                        "BODY_TEMP_VALUE": BODY_TEMP_VALUE,
                        "MEASURED_DATE": DATE
                    }


                    callback("", summaryData);
                }
            })
            .catch(function (err) {

                callback(err, "");
            })
    }
}