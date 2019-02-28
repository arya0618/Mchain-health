/**
@author: Sathiyan Baskaran
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
const updateConfidentialityStatus = require('../functions/updateConfidentialityStatus');

/** @module Validations */
module.exports = {
    updateLabTestValidation: updateLabTestValidation,
    updateAllergyValidation: updateAllergyValidation,
    updateMedicationValidation: updateMedicationValidation,
    updateBloodPressureValidation: updateBloodPressureValidation,
    updateContactValidation: updateContactValidation,

    updateBloodGlucoseValidation: updateBloodGlucoseValidation,
    updateBMIValidation: updateBMIValidation,
    updateSPO2Validation: updateSPO2Validation,
    updateHeartRateValidation: updateHeartRateValidation,
    updateRespiratoryRateValidation: updateRespiratoryRateValidation,
    updateActivityValidation: updateActivityValidation,
    updateBodyTemperatureValidation: updateBodyTemperatureValidation,
    updateHealthtipsValidation: updateHealthtipsValidation,
    updateDisabilityTypeValidation: updateDisabilityTypeValidation,
    updateGLUCOSEMASTERValidation: updateGLUCOSEMASTERValidation,
    updateALLERGYMASTERValidation: updateALLERGYMASTERValidation,
    updatePHYSICALACTIVITYMASTERValidation: updatePHYSICALACTIVITYMASTERValidation,
    updatePERSONRELATIONSHIPValidation: updatePERSONRELATIONSHIPValidation,
    updateBloodGroupValidation: updateBloodGroupValidation,

    updateMedicineDosageMasterValidation: updateMedicineDosageMasterValidation,
    updateMedicineIntakeMasterValidation: updateMedicineIntakeMasterValidation,
    updateMedicineStrengthMasterValidation: updateMedicineStrengthMasterValidation,
    updateLabTestMasterValidation: updateLabTestMasterValidation,
    updateshareURLconfigValidation: updateshareURLconfigValidation,
    updatePHRdocsValidation: updatePHRdocsValidation,
    updateDocCategoryValidation: updateDocCategoryValidation,
    updateAllServityMasterValidation: updateAllServityMasterValidation,
    updateAllSinceMasterValidation: updateAllSinceMasterValidation,
    updateProvideMasterValidation: updateProvideMasterValidation,
    updatequalificationMasterValidation: updatequalificationMasterValidation,
    updatesectorMasterValidation: updatesectorMasterValidation,
    updateNotificationStatusValidation: updateNotificationStatusValidation

};

/** @function updateLabTestValidation 
 * validation of mandatory fields.
 */
function updateLabTestValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()

    var ID = req.body.ID
    var SSO_ID = req.body.SSO_ID;
    var TEST_CODE = req.body.TEST_CODE;
    var TEST_NAME = req.body.TEST_NAME;
    var RESULT_TEXT = req.body.RESULT_TEXT;
    var RESULT_UNIT = req.body.RESULT_UNIT;
    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;

    var value = {
        "SSO_ID": SSO_ID,
        "TEST_CODE": TEST_CODE,
        "TEST_NAME": TEST_NAME,
        "RESULT_TEXT": RESULT_TEXT,
        "RESULT_UNIT": RESULT_UNIT,
        "MEASURED_DATE": MEASURED_DATE,
        "NOTES": NOTES,
        "CONFIDENTIALITY_STATUS": CONFIDENTIALITY_STATUS
    }
    var key = EHRID + widget.LabTest


    if (!EHRID || !SSO_ID || !TEST_CODE || !TEST_NAME || !RESULT_TEXT || !RESULT_UNIT || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !TEST_CODE.trim() || !TEST_NAME.trim() || !RESULT_TEXT.trim() || !RESULT_UNIT.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}

/** @function updateActivityValidation 
 * validation of mandatory fields.
 */
function updateActivityValidation(req, callback) {

    const EHRID = req.body.EHRID.toString()

    var ID = req.body.ID;
    var SSO_ID = req.body.SSO_ID;
    var ACTIVITY_ID = req.body.ACTIVITY_ID;
    var ACTIVITY_DESC = req.body.ACTIVITY_DESC;
    var MEASURED_DATE = req.body.MEASURED_DATE;
    var DISTANCE = req.body.DISTANCE.toString();
    var TOTAL_TIME_HOUR = req.body.TOTAL_TIME_HOUR.toString();
    var TOTAL_TIME_MIN = req.body.TOTAL_TIME_MIN.toString();
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;

    var value = {
        "ID": ID,
        "SSO_ID": SSO_ID,
        "ACTIVITY_ID": ACTIVITY_ID,
        "ACTIVITY_DESC": ACTIVITY_DESC,
        "MEASURED_DATE": MEASURED_DATE,
        "DISTANCE": DISTANCE,
        "TOTAL_TIME_HOUR": TOTAL_TIME_HOUR,
        "TOTAL_TIME_MIN": TOTAL_TIME_MIN,
        "NOTES": NOTES,
        "CONFIDENTIALITY_STATUS": CONFIDENTIALITY_STATUS
    }

    var key = EHRID + widget.Activity


    if (!EHRID || !SSO_ID || !ACTIVITY_ID || !DISTANCE || !TOTAL_TIME_HOUR || !TOTAL_TIME_MIN || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !ACTIVITY_ID.trim() || !TOTAL_TIME_MIN.trim() || !TOTAL_TIME_HOUR.trim() || !DISTANCE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {


        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");



    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}

/** @function updateAllergyValidation 
 * validation of mandatory fields.
 */
function updateAllergyValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()
    const key = (req.body.EHRID) + widget.Allergy;
    const id = req.body.ID;
    var value = {
        "SSO_ID": req.body.SSO_ID,
        "ALLERGY_CODE": req.body.ALLERGY_CODE,
        "ALLERGY_DESCRIPTION": req.body.ALLERGY_DESCRIPTION,
        "IS_CURRENT": req.body.IS_CURRENT,
        "SINCE": req.body.SINCE.toString(),
        "SINCE_DURATION": req.body.SINCE_DURATION,
        "SEVERITY": req.body.SEVERITY,
        "NOTES": req.body.NOTES,
        "MEASURED_DATE": req.body.MEASURED_DATE,
        "CONFIDENTIALITY_STATUS": req.body.CONFIDENTIALITY_STATUS
    }
    if (!EHRID || !value.SSO_ID || !value.ALLERGY_CODE || !value.IS_CURRENT || !value.SINCE || !value.SINCE_DURATION || !value.CONFIDENTIALITY_STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}

/** @function updateMedicationValidation 
 * validation of mandatory fields.
 */
function updateMedicationValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()
    const key = (req.body.EHRID) + widget.Medication;
    const id = req.body.ID;
    var value = {
        "SSO_ID": req.body.SSO_ID,
        "MEDICINE_NAME": req.body.MEDICINE_NAME,
        "STRENGHTH": req.body.STRENGHTH,
        "STRENGHTH_VALUE": req.body.STRENGHTH_VALUE,
        "DOSAGE": req.body.DOSAGE,
        "DOSAGE_VALUE": req.body.DOSAGE_VALUE,
        "INTAKE_MODE": req.body.INTAKE_MODE,
        "HOW_OFTEN": req.body.HOW_OFTEN,
        "REASON_FOR_TAKING": req.body.REASON_FOR_TAKING,
        "START_DATE": req.body.START_DATE,
        "END_DATE": req.body.END_DATE,
        "MEASURED_DATE": req.body.MEASURED_DATE,
        "NOTES": req.body.NOTES,
        "CONFIDENTIALITY_STATUS": req.body.CONFIDENTIALITY_STATUS
    }


    if (!EHRID || !value.SSO_ID || !value.MEDICINE_NAME || !value.STRENGHTH || !value.STRENGHTH_VALUE || !value.DOSAGE || !value.DOSAGE_VALUE || !value.INTAKE_MODE || !value.HOW_OFTEN || !value.REASON_FOR_TAKING || !value.START_DATE || !value.END_DATE || !value.MEASURED_DATE || !value.CONFIDENTIALITY_STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}

/** @function updateBloodPressureValidation 
 * validation of mandatory fields.
 */
function updateBloodPressureValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()
    const key = (req.body.EHRID) + widget.BloodPressure;
    const id = req.body.ID;
    var value = {
        "SSO_ID": req.body.SSO_ID,
        "MEASURED_DATE": req.body.MEASURED_DATE,
        "SYSTOLIC": req.body.SYSTOLIC.toString(),
        "DIASTOLIC": req.body.DIASTOLIC.toString(),
        "NOTES": req.body.NOTES,
        "CONFIDENTIALITY_STATUS": req.body.CONFIDENTIALITY_STATUS
    }


    if (!EHRID || !value.SSO_ID || !value.MEASURED_DATE || !value.SYSTOLIC || !value.DIASTOLIC || !value.CONFIDENTIALITY_STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}

/** @function updateContactValidation 
 * validation of mandatory fields.
 */
function updateContactValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()
    const key = (req.body.EHRID) + widget.Contact;
    const id = req.body.ID;
    var value = {
        "SSO_ID": req.body.SSO_ID,
        "CONTACT_TYPE": req.body.CONTACT_TYPE,
        "CONTACT_NAME": req.body.CONTACT_NAME,
        "SPECIALTY": req.body.SPECIALTY,
        "HOSP_CLINIC_NAME": req.body.HOSP_CLINIC_NAME,
        "ADDRESS_LINE_1": req.body.ADDRESS_LINE_1,
        "ADDRESS_LINE_2": req.body.ADDRESS_LINE_2,
        "CITY_TOWN": req.body.CITY_TOWN,
        "DISTRICT": req.body.DISTRICT,
        "STATE": req.body.STATE,
        "STATE_CODE": req.body.STATE_CODE,
        "PIN": req.body.PIN,
        "MOBILE_NO": req.body.MOBILE_NO,
        "EMAIL_ADDRESS": req.body.EMAIL_ADDRESS,
        "CREATED_DATE": req.body.CREATED_DATE
    }

    if (!EHRID || !value.SSO_ID || !value.CONTACT_TYPE || !value.CONTACT_NAME || !value.DISTRICT || !value.STATE_CODE || !value.MOBILE_NO || !value.EMAIL_ADDRESS || !value.CREATED_DATE) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateBloodGlucoseValidation 
 * validation of mandatory fields.
 */
function updateBloodGlucoseValidation(req, callback) {

    var EHRID = req.body.EHRID.toString()

    var ID = req.body.ID
    var SSO_ID = req.body.SSO_ID;
    var GLUCOSE_VALUE = req.body.GLUCOSE_VALUE.toString();
    var MEASURED_AT = req.body.MEASURED_AT;
    var MEASURED_AT_VALUE = req.body.MEASURED_AT_VALUE;
    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;


    var key = EHRID + widget.BloodGlucose;

    var value = {

        'SSO_ID': SSO_ID,
        'GLUCOSE_VALUE': GLUCOSE_VALUE,

        'MEASURED_AT': MEASURED_AT,
        'MEASURED_AT_VALUE': MEASURED_AT_VALUE,
        'MEASURED_DATE': MEASURED_DATE,

        'NOTES': NOTES,
        'CONFIDENTIALITY_STATUS': CONFIDENTIALITY_STATUS


    }

    if (!EHRID || !SSO_ID || !GLUCOSE_VALUE || !MEASURED_AT || !MEASURED_AT_VALUE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !GLUCOSE_VALUE.trim() || !MEASURED_AT.trim() || !MEASURED_AT_VALUE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateBMIValidation 
 * validation of mandatory fields.
 */
function updateBMIValidation(req, callback) {

    var EHRID = req.body.EHRID.toString()

    var ID = req.body.ID
    var SSO_ID = req.body.SSO_ID;
    var HEIGHT = req.body.HEIGHT.toString();
    var WEIGHT = req.body.WEIGHT.toString();
    var BMI = req.body.BMI.toString();
    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;


    var key = EHRID + widget.BMI;

    var value = {
        'SSO_ID': SSO_ID,
        'MEASURED_DATE': MEASURED_DATE,
        'HEIGHT': HEIGHT,
        'WEIGHT': WEIGHT,
        'BMI': BMI,
        'NOTES': NOTES,
        'CONFIDENTIALITY_STATUS': CONFIDENTIALITY_STATUS
    }




    if (!EHRID || !ID || !SSO_ID || !HEIGHT || !WEIGHT || !BMI || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !ID.trim() || !SSO_ID.trim() || !HEIGHT.trim() || !WEIGHT.trim() || !BMI.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateSPO2Validation 
 * validation of mandatory fields.
 */
function updateSPO2Validation(req, callback) {

    const key = (req.body.EHRID).toString() + widget.spo2;
    var ID = req.body.ID
    var SSO_ID = req.body.SSO_ID;
    var SPO2_VALUE = req.body.SPO2_VALUE.toString();

    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;
    const value = {

        'SSO_ID': SSO_ID,
        'SPO2_VALUE': SPO2_VALUE,
        'MEASURED_DATE': MEASURED_DATE,

        'NOTES': NOTES,
        'CONFIDENTIALITY_STATUS': CONFIDENTIALITY_STATUS


    };

    if (!key || !ID || !SSO_ID || !SPO2_VALUE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !key.trim() || !ID.trim() || !SSO_ID.trim() || !SPO2_VALUE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateHeartRateValidation 
 * validation of mandatory fields.
 */
function updateHeartRateValidation(req, callback) {

    var EHRID = req.body.EHRID.toString()

    var ID = req.body.ID
    var SSO_ID = req.body.SSO_ID;
    var HEART_RATE = req.body.HEART_RATE.toString();

    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;


    var key = EHRID + widget.HeartRate;


    var value = {

        'SSO_ID': SSO_ID,
        'HEART_RATE': HEART_RATE,
        'MEASURED_DATE': MEASURED_DATE,

        'NOTES': NOTES,
        'CONFIDENTIALITY_STATUS': CONFIDENTIALITY_STATUS


    }




    if (!EHRID || !ID || !SSO_ID || !HEART_RATE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !ID.trim() || !SSO_ID.trim() || !HEART_RATE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateRespiratoryRateValidation 
 * validation of mandatory fields.
 */
function updateRespiratoryRateValidation(req, callback) {

    var EHRID = req.body.EHRID.toString()

    var ID = req.body.ID
    var SSO_ID = req.body.SSO_ID;
    var RESP_RATE = req.body.RESP_RATE.toString();

    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;


    var key = EHRID + widget.Respiratory;


    var value = {

        'SSO_ID': SSO_ID,
        'RESP_RATE': RESP_RATE,
        'MEASURED_DATE': MEASURED_DATE,

        'NOTES': NOTES,
        'CONFIDENTIALITY_STATUS': CONFIDENTIALITY_STATUS


    }




    if (!EHRID || !ID || !SSO_ID || !RESP_RATE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !ID.trim() || !SSO_ID.trim() || !RESP_RATE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateBodyTemperatureValidation 
 * validation of mandatory fields.
 */
function updateBodyTemperatureValidation(req, callback) {

    const EHRID = req.body.EHRID.toString()

    var ID = req.body.ID
    var SSO_ID = req.body.SSO_ID;
    var BODY_TEMP_VALUE = req.body.BODY_TEMP_VALUE.toString();
    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;

    var value = {
        'SSO_ID': SSO_ID,
        'BODY_TEMP_VALUE': BODY_TEMP_VALUE,
        'MEASURED_DATE': MEASURED_DATE,
        'NOTES': NOTES,
        'CONFIDENTIALITY_STATUS': CONFIDENTIALITY_STATUS
    }
    var key = EHRID + widget.BodyTemperature;


    if (!EHRID || !SSO_ID || !BODY_TEMP_VALUE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !BODY_TEMP_VALUE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateHealthtipsValidation 
 * validation of mandatory fields.
 */
function updateHealthtipsValidation(req, callback) {

    const key = "HEALTHTIPSTEST"

    var ID = req.body.ID


    var CATEGORY_DESCRIPTION = req.body.CATEGORY_DESCRIPTION;
    var VALID_FROM = req.body.VALID_FROM;
    var VALID_TO = req.body.VALID_TO;
    var CATEGORY_DESCRIPTION_HINDI = req.body.CATEGORY_DESCRIPTION_HINDI;
    var value = {
        'ID': ID,
        'CATEGORY_DESCRIPTION': CATEGORY_DESCRIPTION,
        'VALID_FROM': VALID_FROM,
        'VALID_TO': VALID_TO,
        'CATEGORY_DESCRIPTION_HINDI': CATEGORY_DESCRIPTION_HINDI
    }

    if (!key || !ID || !CATEGORY_DESCRIPTION || !VALID_FROM || !VALID_TO || !key.trim() || !ID.trim || !CATEGORY_DESCRIPTION.trim() || !VALID_FROM.trim() || !VALID_TO.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");


    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);

            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateGLUCOSEMASTERValidation 
 * validation of mandatory fields.
 */
function updateGLUCOSEMASTERValidation(req, callback) {

    var MEASURE_TYPE = req.body.MEASURE_TYPE;
    var MEASURE_DESCRIPTION = req.body.MEASURE_DESCRIPTION;
    var ID = req.body.ID;
    var STATUS = req.body.STATUS

    var value = {
        "MEASURE_TYPE": MEASURE_TYPE,
        "MEASURE_DESCRIPTION": MEASURE_DESCRIPTION,
        "STATUS": STATUS

    }
    var key = req.body.key;

    if (!key || !ID || !STATUS || !MEASURE_TYPE || !MEASURE_DESCRIPTION || !MEASURE_TYPE.trim() || !ID || !MEASURE_DESCRIPTION.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");


    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateALLERGYMASTERValidation 
 * validation of mandatory fields.
 */
function updateALLERGYMASTERValidation(req, callback) {

    var ALLERGY_CODE = req.body.ALLERGY_CODE;
    var ALLERGY_DESCRIPTION = req.body.ALLERGY_DESCRIPTION;
    var ALLERGY_CLASSIFICATION = req.body.ALLERGY_CLASSIFICATION;
    var ID = req.body.ID;
    var key = req.body.key.toString();
    var STATUS = req.body.STATUS
    var value = {
        "ALLERGY_CODE": ALLERGY_CODE,
        "ALLERGY_DESCRIPTION": ALLERGY_DESCRIPTION,
        "ALLERGY_CLASSIFICATION": ALLERGY_CLASSIFICATION,
        "STATUS": STATUS
    }
    /** checking inputs field empty or not*/
    if (!key || !ID || !STATUS || !ALLERGY_CODE || !ALLERGY_DESCRIPTION || !ALLERGY_CLASSIFICATION || !key.trim() || !ID.trim() || !ALLERGY_CODE.trim() || !ALLERGY_DESCRIPTION.trim() || !ALLERGY_CLASSIFICATION.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");


    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updatePHYSICALACTIVITYMASTERValidation 
 * validation of mandatory fields.
 */
function updatePHYSICALACTIVITYMASTERValidation(req, callback) {
    const key = (req.body.key);
    var ID = req.body.ID
    var ACTIVITY_CODE = req.body.ACTIVITY_CODE.toString();
    var ACTIVITY_DESCRIPTION = req.body.ACTIVITY_DESCRIPTION;
    var STATUS = req.body.STATUS
    var value = {
        'ACTIVITY_CODE': ACTIVITY_CODE,
        'ACTIVITY_DESCRIPTION': ACTIVITY_DESCRIPTION,
        "STATUS": STATUS
    }

    if (!key || !ID || !STATUS || !ACTIVITY_CODE || !ACTIVITY_DESCRIPTION || !key.trim() || !ID.trim() || !ACTIVITY_CODE.trim() || !ACTIVITY_DESCRIPTION.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updatePERSONRELATIONSHIPValidation 
 * validation of mandatory fields.
 */
function updatePERSONRELATIONSHIPValidation(req, callback) {
    const key = (req.body.key);
    var ID = req.body.ID
    var REL_CODE = req.body.REL_CODE;
    var REL_NAME = req.body.REL_NAME;
    var STATUS = req.body.STATUS;
    var value = {
        'REL_CODE': REL_CODE,
        'REL_NAME': REL_NAME,
        "STATUS": STATUS

    }

    if (!key || !ID || !STATUS || !REL_CODE || !REL_NAME || !key.trim() || !ID.trim() || !REL_CODE.trim() || !REL_NAME.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateDisabilityTypeValidation 
 * validation of mandatory fields.
 */
function updateDisabilityTypeValidation(req, callback) {
    var ID = req.body.ID
    var DISB_CODE = req.body.DISB_CODE.toString();
    var DISB_DESCRIPTION = req.body.DISB_DESCRIPTION;
    var STATUS = req.body.STATUS

    var key = "DISABILITYTYPE";

    var value = {
        'DISB_CODE': DISB_CODE,
        'DISB_DESCRIPTION': DISB_DESCRIPTION,
        "STATUS": STATUS
    }

    if (!DISB_CODE || !DISB_DESCRIPTION || !DISB_CODE.trim() || !DISB_DESCRIPTION.trim() || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateBloodGroupValidation 
 * validation of mandatory fields.
 */
function updateBloodGroupValidation(req, callback) {

    const key = req.body.key.toString()

    var ID = req.body.ID;
    var BLGRP_CODE = req.body.BLGRP_CODE;
    var BLGRP_DESCRIPTION = req.body.BLGRP_DESCRIPTION;
    var STATUS = req.body.STATUS;

    var value = {
        'ID': ID,
        "BLGRP_CODE": BLGRP_CODE,
        "BLGRP_DESCRIPTION": BLGRP_DESCRIPTION,
        "STATUS": STATUS
    }

    if (!key || !ID || !BLGRP_CODE || !BLGRP_DESCRIPTION || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateMedicineDosageMasterValidation 
 * validation of mandatory fields.
 */
function updateMedicineDosageMasterValidation(req, callback) {
    const key = req.body.key.toString()

    var ID = req.body.ID;
    var DISOSAGE_VALUE = req.body.DISOSAGE_VALUE;
    var STATUS = req.body.STATUS
    var value = {
        "ID": ID,
        "DISOSAGE_VALUE": DISOSAGE_VALUE,
        "STATUS": STATUS
    }
    if (!key || !ID || !DISOSAGE_VALUE || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateMedicineIntakeMasterValidation 
 * validation of mandatory fields.
 */
function updateMedicineIntakeMasterValidation(req, callback) {
    const key = req.body.key.toString()

    var ID = req.body.ID;
    var INTAKE_VALUE = req.body.INTAKE_VALUE;
    var STATUS = req.body.STATUS;
    var value = {
        'ID': ID,
        "INTAKE_VALUE": INTAKE_VALUE,
        "STATUS": STATUS
    }
    if (!key || !ID || !INTAKE_VALUE || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateMedicineStrengthMasterValidation 
 * validation of mandatory fields.
 */
function updateMedicineStrengthMasterValidation(req, callback) {

    const key = req.body.key.toString()

    var ID = req.body.ID;
    var STRENGTH_VALUES = req.body.STRENGTH_VALUES;
    var STATUS = req.body.STATUS;
    var value = {

        "STRENGTH_VALUES": STRENGTH_VALUES,
        "STATUS": STATUS
    }



    if (!key || !ID || !STRENGTH_VALUES || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}
/** @function updateLabTestMasterValidation 
 * validation of mandatory fields.
 */
function updateLabTestMasterValidation(req, callback) {

    const key = req.body.key.toString()

    var ID = req.body.ID;
    var TEST_CODE = req.body.TEST_CODE;
    var TEST_NAME = req.body.TEST_NAME;
    var TEST_UOM = req.body.TEST_UOM;
    var STATUS = req.body.STATUS
    var value = {
        'ID': ID,
        "TEST_CODE": TEST_CODE,
        "TEST_NAME": TEST_NAME,
        "TEST_UOM": TEST_UOM,
        "STATUS": STATUS
    }

    if (!key || !ID || !TEST_CODE || !TEST_NAME || !TEST_UOM || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })
    }

}

/** @function updateshareURLconfigValidation 
 * validation of mandatory fields.
 */
function updateshareURLconfigValidation(req, callback) {
    var URL_ID = req.body.URL_ID.toString();
    var CON_MODE = req.body.CON_MODE;
    var CON_URL = req.body.CON_URL;
    var CREATED_ON = req.body.CREATED_ON;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var MODIFIED_ON = dd + '/' + mm + '/' + yyyy;

    var PARAM_NAME = req.body.PARAM_NAME;
    var CLIENT_ID = req.body.CLIENT_ID;
    var RU_PARAM = req.body.RU_PARAM;
    var ID = req.body.ID;
    var STATUS = req.body.STATUS
    var value = {
        "URL_ID": URL_ID,
        "CON_MODE": CON_MODE,
        "CON_URL": CON_URL,
        "CREATED_ON": CREATED_ON,
        "MODIFIED_ON": MODIFIED_ON,
        "PARAM_NAME": PARAM_NAME,
        "CLIENT_ID": CLIENT_ID,
        "RU_PARAM": RU_PARAM,
        "STATUS": STATUS
    }

    var key = "SHAREURLCONFIG"

    if (!URL_ID || !CON_MODE || !CON_URL || !CREATED_ON || !PARAM_NAME || !CLIENT_ID || !RU_PARAM || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}

function updatePHRdocsValidation(req, callback) {
    var phrdoc_ID = req.body.phrdoc_ID.toString();
    var DOCUMENT_NAME = req.body.DOCUMENT_NAME;
    var DOCUMENT_CATEGORY = req.body.DOCUMENT_CATEGORY;
    var DOCUMENT_DATE = req.body.DOCUMENT_DATE;
    var SOURCE_PROVIDER = req.body.SOURCE_PROVIDER;
    var SOURCE_NAME = req.body.SOURCE_NAME;
    var ADMISSION_DATE = req.body.ADMISSION_DATE.toString();
    var DISCHARGE_DATE = req.body.DISCHARGE_DATE;
    var DOCUMENT_URL = req.body.DOCUMENT_URL;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;
    var CREATED_BY_SSO_ID = req.body.CREATED_BY_SSO_ID;
    var CREATED_DATE_TIME = req.body.CREATED_DATE_TIME;
    var BHAMASHAH_ID = req.body.BHAMASHAH_ID;


    var ID = req.body.ID;
    var value = {
        "phrdoc_ID": phrdoc_ID,
        "DOCUMENT_NAME": DOCUMENT_NAME,
        "DOCUMENT_CATEGORY": DOCUMENT_CATEGORY,
        "DOCUMENT_DATE": DOCUMENT_DATE,
        "SOURCE_PROVIDER": SOURCE_PROVIDER,
        "SOURCE_NAME": SOURCE_NAME,
        "ADMISSION_DATE": ADMISSION_DATE,
        "DISCHARGE_DATE": DISCHARGE_DATE,
        "DOCUMENT_URL": DOCUMENT_URL,
        "NOTES": NOTES,
        "CONFIDENTIALITY_STATUS": CONFIDENTIALITY_STATUS,
        "CREATED_BY_SSO_ID": CREATED_BY_SSO_ID,
        "CREATED_DATE_TIME": CREATED_DATE_TIME,
        "BHAMASHAH_ID": BHAMASHAH_ID
    }
    var key = req.body.EHRID.toString() + widget.phrDocs;



    if (!key || !phrdoc_ID || !SOURCE_PROVIDER || !DOCUMENT_CATEGORY || !DOCUMENT_NAME || !BHAMASHAH_ID || !CREATED_BY_SSO_ID || !DOCUMENT_URL || !DOCUMENT_NAME || !NOTES || !CONFIDENTIALITY_STATUS || !DISCHARGE_DATE) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}
function updateDocCategoryValidation(req, callback) {

    const key = "DOC_CATEGORY"
    var CATEGORY_CODE = req.body.CATEGORY_CODE.toString();
    var CATEGORY_DESCRIPTION = req.body.CATEGORY_DESCRIPTION;
    var STATUS = req.body.STATUS;
    var ID = req.body.ID;

    var value = {
        'ID': ID,
        "CATEGORY_CODE": CATEGORY_CODE,
        "CATEGORY_DESCRIPTION": CATEGORY_DESCRIPTION,
        "STATUS": STATUS
    }

    if (!key || !ID || !STATUS || !CATEGORY_CODE || !CATEGORY_DESCRIPTION || !CATEGORY_DESCRIPTION.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}
function updateAllServityMasterValidation(req, callback) {

    var ALLSERV_id = req.body.ALLSERV_id.toString();
    var SEVERITY = req.body.SEVERITY;
    var DESCRIPTION = req.body.DESCRIPTION;
    var CREATEDON = req.body.CREATEDON
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var MODIFIEDON = dd + '/' + mm + '/' + yyyy;

    var CREATEDBY = req.body.CREATEDBY;
    var MODIFIEDBY = req.body.MODIFIEDBY;
    var STATUS = req.body.STATUS;
    var ID = req.body.ID;
    var value = {
        "ALLSERV_id": ALLSERV_id,
        "SEVERITY": SEVERITY,
        "DESCRIPTION": DESCRIPTION,
        "CREATEDON": CREATEDON,
        "CREATEDBY": CREATEDBY,
        "MODIFIEDON": MODIFIEDON,
        "MODIFIEDBY": MODIFIEDBY,
        "STATUS": STATUS,
        'ID': ID
    }


    var key = "ALLERGY_SEVERITY";

    if (!key || !ID || !MODIFIEDBY || !CREATEDBY || !CREATEDON || !DESCRIPTION || !SEVERITY || !ALLSERV_id || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}

function updateAllSinceMasterValidation(req, callback) {

    var ALLSINCE_id = req.body.ALLSINCE_id.toString();
    var SINCE = req.body.SINCE;
    var DESCRIPTION = req.body.DESCRIPTION;
    var CREATEDON = req.body.CREATEDON
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var MODIFIEDON = dd + '/' + mm + '/' + yyyy;

    var CREATEDBY = req.body.CREATEDBY;

    var MODIFIEDBY = req.body.MODIFIEDBY;
    var STATUS = req.body.STATUS;

    var ID = req.body.ID;

    var value = {
        "ALLSINCE_id": ALLSINCE_id,
        "SINCE": SINCE,
        "DESCRIPTION": DESCRIPTION,
        "CREATEDON": CREATEDON,
        "CREATEDBY": CREATEDBY,
        "MODIFIEDON": MODIFIEDON,
        "MODIFIEDBY": MODIFIEDBY,
        "STATUS": STATUS,
        'ID': ID
    }


    var key = "ALLERGY_SINCE";

    if (!key || !ID || !MODIFIEDBY || !CREATEDBY || !CREATEDON || !DESCRIPTION || !SINCE || !ALLSINCE_id || !STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}

function updateProvideMasterValidation(req, callback) {

    var PROFESSION_ID = req.body.PROFESSION_ID.toString();
    var PROFESSION_NAME = req.body.PROFESSION_NAME;

    var CREATED_ON = req.body.CREATED_ON
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var MODIFIED_ON = dd + '/' + mm + '/' + yyyy;

    var CREATED_BY = req.body.CREATED_BY;

    var MODIFIED_BY = req.body.MODIFIED_BY;
    var STATUS = req.body.STATUS;

    var ID = req.body.ID;

    var value = {
        "PROFESSION_ID": PROFESSION_ID,
        "PROFESSION_NAME": PROFESSION_NAME,

        "CREATED_ON": CREATED_ON,
        "CREATED_BY": CREATED_BY,
        "MODIFIED_ON": MODIFIED_ON,
        "MODIFIED_BY": MODIFIED_BY,
        "STATUS": STATUS,
        'ID': ID
    }


    var key = "PROVIDER_MASTER";

    if (!key || !ID || !MODIFIED_BY || !CREATED_BY || !CREATED_ON || !STATUS || !PROFESSION_NAME || !PROFESSION_ID) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}


function updatequalificationMasterValidation(req, callback) {

    var QUALIFICATION_ID = req.body.QUALIFICATION_ID.toString();
    var QUALIFICATION_DESC = req.body.QUALIFICATION_DESC;

    var CREATED_ON = req.body.CREATED_ON
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var MODIFIED_ON = dd + '/' + mm + '/' + yyyy;

    var CREATED_BY = req.body.CREATED_BY;

    var MODIFIED_BY = req.body.MODIFIED_BY;
    var STATUS = req.body.STATUS;

    var ID = req.body.ID;

    var value = {
        "QUALIFICATION_ID": QUALIFICATION_ID,
        "QUALIFICATION_DESC": QUALIFICATION_DESC,

        "CREATED_ON": CREATED_ON,
        "CREATED_BY": CREATED_BY,
        "MODIFIED_ON": MODIFIED_ON,
        "MODIFIED_BY": MODIFIED_BY,
        "STATUS": STATUS,
        'ID': ID
    }


    var key = "QUALIFICATION_MASTER";

    if (!key || !ID || !MODIFIED_BY || !CREATED_BY || !CREATED_ON || !STATUS || !QUALIFICATION_DESC || !QUALIFICATION_ID) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}

function updatesectorMasterValidation(req, callback) {

    var SECTOR_ID = req.body.SECTOR_ID.toString();
    var SECTOR_NAME = req.body.SECTOR_NAME;

    var CREATED_ON = req.body.CREATED_ON
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var MODIFIED_ON = dd + '/' + mm + '/' + yyyy;

    var CREATED_BY = req.body.CREATED_BY;

    var MODIFIED_BY = req.body.MODIFIED_BY;
    var STATUS = req.body.STATUS;

    var ID = req.body.ID;

    var value = {
        "SECTOR_ID": SECTOR_ID,
        "SECTOR_NAME": SECTOR_NAME,

        "CREATED_ON": CREATED_ON,
        "CREATED_BY": CREATED_BY,
        "MODIFIED_ON": MODIFIED_ON,
        "MODIFIED_BY": MODIFIED_BY,
        "STATUS": STATUS,
        'ID': ID
    }


    var key = "SECTOR_MASTER";

    if (!key || !ID || !MODIFIED_BY || !CREATED_BY || !CREATED_ON || !STATUS || !SECTOR_NAME || !SECTOR_ID) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}

function updateNotificationStatusValidation(req, callback) {

    var EHRID = req.body.EHRID.toString()
    var ID = req.body.ID
    var key = EHRID + widget.notification
    var STATUS = "false";
    var value = {
        "EHRID": EHRID,
        "RESPONSED_BY": req.body.RESPONSED_BY,
        "RESPONSED_ON": req.body.RESPONSED_ON,
        "SHARED_ON": req.body.SHARED_ON,
        "QUERY": req.body.QUERY,
        "RESPONSE": req.body.RESPONSE,
        "STATUS": STATUS
    }

    if (!EHRID || !ID || !value.RESPONSED_ON || !value.SHARED_ON || !value.RESPONSE || !value.RESPONSED_BY || !value.STATUS) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        updateConfidentialityStatus.updateConfidentialityStatus(key, value, ID)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }

}