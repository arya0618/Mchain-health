/**
@author: Arun Hosamani
@Version: 1.0.2
@Date: 03/02/2018
@description: DOIT BlockChain project
**/
var config = require('config');
var widget = config.get('widget');
var format = require('date-format');
/** logger integration */
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");
const addData = require('../functions/addData');

/** @module Validations */

module.exports = {
    addLabTestValidation: addLabTestValidation,
    addAllergyValidation: addAllergyValidation,
    addMedicationValidation: addMedicationValidation,
    addBloodPressureValidation: addBloodPressureValidation,
    addContactsValidation: addContactsValidation,
    addNotificationValidation: addNotificationValidation,

    addBloodGlucoseValidation: addBloodGlucoseValidation,
    addBMIValidation: addBMIValidation,
    addSPO2Validation: addSPO2Validation,
    addHeartRateValidation: addHeartRateValidation,
    addRespiratoryRateValidation: addRespiratoryRateValidation,
    addActivityValidation: addActivityValidation,
    addBodyTemperatureValidation: addBodyTemperatureValidation,
    addHealthTipsValidation: addHealthTipsValidation,
    addCountryStateValidation: addCountryStateValidation,
    addDisabilityTypeValidation: addDisabilityTypeValidation,

    addGLUCOSEMASTERValidation: addGLUCOSEMASTERValidation,
    addALLERGYMASTERValidation: addALLERGYMASTERValidation,
    addPHYSICALACTIVITYMASTERValidation: addPHYSICALACTIVITYMASTERValidation,
    addPERSONRELATIONSHIPValidation: addPERSONRELATIONSHIPValidation,
    addBloodGroupValidation: addBloodGroupValidation,

    addMedicineDosageMasterValidation: addMedicineDosageMasterValidation,
    addMedicineIntakeMasterValidation: addMedicineIntakeMasterValidation,
    addMedicineStrengthMasterValidation: addMedicineStrengthMasterValidation,
    addLabTestMasterValidation: addLabTestMasterValidation,

    addShareUrlConfigrValidation: addShareUrlConfigrValidation,
    addPHRdocumentsValidation: addPHRdocumentsValidation,
    addDocCategoryValidation: addDocCategoryValidation,
    addAllergyServityMasterValidation: addAllergyServityMasterValidation,
    addAllergySinceMasterValidation: addAllergySinceMasterValidation,
    addProviderMasterValidation: addProviderMasterValidation,
    addQualificationMasterValidation: addQualificationMasterValidation,
    addsectorMasterValidation: addsectorMasterValidation

};

/** @function addLabTestValidation 
 * validation of mandatory fields.
 */
function addLabTestValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()


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

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {

                callback(err, "");
            })
    }
}

/** @function addActivityValidation 
 * validation of mandatory fields.
 */
function addActivityValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()


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
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {


                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addAllergyValidation
 * validation of mandatory fields.
 */
function addAllergyValidation(req, callback) {
    const EHRID = req.body.EHRID.toString();
    var date = format('dd/MM/yyyy', new Date());
    var MEASURED_DATE = date.toString();
    var key = EHRID + widget.Allergy;
    var value = {
        "SSO_ID": req.body.SSO_ID,
        "ALLERGY_CODE": req.body.ALLERGY_CODE,
        "ALLERGY_DESCRIPTION": req.body.ALLERGY_DESCRIPTION,
        "IS_CURRENT": req.body.IS_CURRENT,
        "SINCE": req.body.SINCE.toString(),
        "SINCE_DURATION": req.body.SINCE_DURATION,
        "SEVERITY": req.body.SEVERITY,
        "NOTES": req.body.NOTES,
        "MEASURED_DATE": MEASURED_DATE,
        "CONFIDENTIALITY_STATUS": req.body.CONFIDENTIALITY_STATUS
    }
    var key = EHRID + widget.Allergy;

    if (!EHRID || !value.SSO_ID || !value.ALLERGY_CODE || !value.IS_CURRENT || !value.SINCE || !value.SINCE_DURATION || !value.CONFIDENTIALITY_STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}


/** @function addMedicationValidation
 * validation of mandatory fields.
 */
function addMedicationValidation(req, callback) {
    const EHRID = req.body.EHRID.toString();
    var date = format('dd/MM/yyyy', new Date());
    var MEASURED_DATE = date.toString();
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
        "MEASURED_DATE": MEASURED_DATE,
        "NOTES": req.body.NOTES,
        "CONFIDENTIALITY_STATUS": req.body.CONFIDENTIALITY_STATUS
    }

    var key = EHRID + widget.Medication

    if (!EHRID || !value.SSO_ID || !value.MEDICINE_NAME || !value.STRENGHTH || !value.STRENGHTH_VALUE || !value.DOSAGE || !value.DOSAGE_VALUE || !value.INTAKE_MODE || !value.HOW_OFTEN || !value.REASON_FOR_TAKING || !value.START_DATE || !value.END_DATE || !value.CONFIDENTIALITY_STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addBloodPressureValidation
 * validation of mandatory fields.
 */
function addBloodPressureValidation(req, callback) {
    const EHRID = req.body.EHRID.toString();
    var value = {
        "SSO_ID": req.body.SSO_ID,
        "MEASURED_DATE": req.body.MEASURED_DATE,
        "SYSTOLIC": req.body.SYSTOLIC.toString(),
        "DIASTOLIC": req.body.DIASTOLIC.toString(),
        "NOTES": req.body.NOTES,
        "CONFIDENTIALITY_STATUS": req.body.CONFIDENTIALITY_STATUS
    }
    var key = EHRID + widget.BloodPressure;

    if (!EHRID || !value.SSO_ID || !value.MEASURED_DATE || !value.SYSTOLIC || !value.DIASTOLIC || !value.CONFIDENTIALITY_STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addContactsValidation
 * validation of mandatory fields.
 */
function addContactsValidation(req, callback) {
    const EHRID = req.body.EHRID.toString();
    var date = format('dd/MM/yyyy', new Date());
    var MEASURED_DATE = date.toString();
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
        "CREATED_DATE": MEASURED_DATE
    }
    var key = EHRID + widget.Contact;

    if (!EHRID || !value.CONTACT_TYPE || !value.CONTACT_NAME || !value.MOBILE_NO || !value.EMAIL_ADDRESS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addBloodGlucoseValidation
 * validation of mandatory fields.
 */
function addBloodGlucoseValidation(req, callback) {
    var EHRID = req.body.EHRID.toString()

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
    };

    if (!EHRID || !SSO_ID || !GLUCOSE_VALUE || !MEASURED_AT || !MEASURED_AT_VALUE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !GLUCOSE_VALUE.trim() || !MEASURED_AT.trim() || !MEASURED_AT_VALUE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addBMIValidation
 * validation of mandatory fields.
 */
function addBMIValidation(req, callback) {
    var EHRID = req.body.EHRID.toString()

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




    if (!EHRID || !SSO_ID || !HEIGHT || !WEIGHT || !BMI || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !HEIGHT.trim() || !WEIGHT.trim() || !BMI.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err);
                callback(err, "");
            })
    }
}

/** @function addSPO2Validation
 * validation of mandatory fields.
 */
function addSPO2Validation(req, callback) {
    var EHRID = req.body.EHRID.toString();

    var SSO_ID = req.body.SSO_ID;
    var SPO2_VALUE = req.body.SPO2_VALUE.toString();

    var MEASURED_DATE = req.body.MEASURED_DATE;
    var NOTES = req.body.NOTES;
    var CONFIDENTIALITY_STATUS = req.body.CONFIDENTIALITY_STATUS;


    var key = EHRID + widget.spo2;

    var value = {
        'SSO_ID': SSO_ID,
        'SPO2_VALUE': SPO2_VALUE,
        'MEASURED_DATE': MEASURED_DATE,
        'NOTES': NOTES,
        'CONFIDENTIALITY_STATUS': CONFIDENTIALITY_STATUS
    };

    if (!EHRID || !SSO_ID || !SPO2_VALUE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !SPO2_VALUE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err);
                callback(err, "");
            });
    }
}

/** @function addHeartRateValidation
 * validation of mandatory fields.
 */
function addHeartRateValidation(req, callback) {
    var EHRID = req.body.EHRID.toString();

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
    };
    if (!EHRID || !SSO_ID || !HEART_RATE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !HEART_RATE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err);
                callback(err, "");
            })
    }
}

/** @function addRespiratoryRateValidation
 * validation of mandatory fields.
 */
function addRespiratoryRateValidation(req, callback) {

    var EHRID = req.body.EHRID.toString();
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
    };

    if (!EHRID || !SSO_ID || !RESP_RATE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !RESP_RATE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        addData.addData(key, value)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err);
                callback(err, "");
            })
    }
}

/** @function addNotificationValidation
 * validation of mandatory fields.
 */
function addNotificationValidation(req, callback) {
    var EHRID = req.body.EHRID.toString()

    var key = EHRID + widget.notification

    var date = new Date();
    var currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var STATUS = "true";
    var value = {
        "EHRID": EHRID,
        "RESPONSED_BY": req.body.RESPONSED_BY,
        "RESPONSED_ON": currentDate,
        "SHARED_ON": req.body.SHARED_ON,
        "QUERY": req.body.QUERY,
        "RESPONSE": req.body.RESPONSE,
        "STATUS": STATUS
    }

    if (!EHRID || !value.RESPONSED_ON || !value.SHARED_ON || !value.RESPONSE || !value.RESPONSED_BY) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err);
                callback(err, "");
            })
    }
}

/** @function addBodyTemperatureValidation
 * validation of mandatory fields.
 */
function addBodyTemperatureValidation(req, callback) {
    const EHRID = req.body.EHRID.toString()
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
    var key = EHRID + widget.BodyTemperature

    if (!EHRID || !SSO_ID || !BODY_TEMP_VALUE || !MEASURED_DATE || !CONFIDENTIALITY_STATUS || !EHRID.trim() || !SSO_ID.trim() || !BODY_TEMP_VALUE.trim() || !MEASURED_DATE.trim() || !CONFIDENTIALITY_STATUS.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addHealthTipsValidation
 * validation of mandatory fields.
 */
function addHealthTipsValidation(req, callback) {

    var CATEGORY_DESCRIPTION = req.body.CATEGORY_DESCRIPTION;
    var VALID_FROM = req.body.VALID_FROM;
    var VALID_TO = req.body.VALID_TO;
    var CATEGORY_DESCRIPTION_HINDI = req.body.CATEGORY_DESCRIPTION_HINDI;


    var value = {
        'CATEGORY_DESCRIPTION': CATEGORY_DESCRIPTION,
        'VALID_FROM': VALID_FROM,
        'VALID_TO': VALID_TO,
        'CATEGORY_DESCRIPTION_HINDI': CATEGORY_DESCRIPTION_HINDI,

    }
    const key = "HEALTHTIPSTEST"


    if (!CATEGORY_DESCRIPTION || !VALID_FROM || !VALID_TO || !CATEGORY_DESCRIPTION.trim() || !VALID_FROM.trim() || !VALID_TO.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addCountryStateValidation
 * validation of mandatory fields.
 */
function addCountryStateValidation(req, callback) {

    var STATE_CODE = req.body.STATE_CODE;
    var STATE_NAME = req.body.STATE_NAME;
    var STATE_CODE_NUM = req.body.STATE_CODE_NUM;
    var STATE_TYPE = req.body.STATE_TYPE;
    var STATUS = "A"
    var key = "STATE";

    var value = {
        'STATE_CODE': STATE_CODE,
        'STATE_NAME': STATE_NAME,
        'STATE_CODE_NUM': STATE_CODE_NUM,
        'STATE_TYPE': STATE_TYPE,
        "STATUS": STATUS

    }

    if (!STATE_CODE || !STATE_NAME || !STATE_CODE_NUM || !STATE_TYPE || !STATE_CODE.trim() || !STATE_NAME.trim() || !STATE_CODE_NUM.trim() || !STATE_TYPE.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addMasterData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addDisabilityTypeValidation
 * validation of mandatory fields.
 */
function addDisabilityTypeValidation(req, callback) {

    var DISB_CODE = req.body.DISB_CODE;
    var DISB_DESCRIPTION = req.body.DISB_DESCRIPTION;

    var STATUS = req.body.STATUS;

    var key = "DISABILITYTYPE";

    var value = {
        'DISB_CODE': DISB_CODE,
        'DISB_DESCRIPTION': DISB_DESCRIPTION,
        "STATUS": STATUS
    }

    if (!DISB_CODE || !DISB_DESCRIPTION || !STATUS || !STATUS.trim() || !DISB_CODE.trim() || !DISB_DESCRIPTION.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addGLUCOSEMASTERValidation
 * validation of mandatory fields.
 */
function addGLUCOSEMASTERValidation(req, callback) {

    var MEASURE_TYPE = req.body.MEASURE_TYPE;
    var MEASURE_DESCRIPTION = req.body.MEASURE_DESCRIPTION;
    var STATUS = req.body.STATUS;
    var value = {
        "MEASURE_TYPE": MEASURE_TYPE,
        "MEASURE_DESCRIPTION": MEASURE_DESCRIPTION,
        "STATUS": STATUS

    }
    const key = "GLUCOSEMASTER"


    if (!MEASURE_TYPE || !MEASURE_DESCRIPTION || !STATUS || !STATUS.trim() || !MEASURE_TYPE.trim() || !MEASURE_DESCRIPTION.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}



/** @function addALLERGYMASTERValidation
 * validation of mandatory fields.
 */
function addALLERGYMASTERValidation(req, callback) {

    var ALLERGY_CODE = req.body.ALLERGY_CODE.toString();
    var ALLERGY_DESCRIPTION = req.body.ALLERGY_DESCRIPTION;
    var ALLERGY_CLASSIFICATION = req.body.ALLERGY_CLASSIFICATION;
    var STATUS = req.body.STATUS;

    var value = {
        "ALLERGY_CODE": ALLERGY_CODE,
        "ALLERGY_DESCRIPTION": ALLERGY_DESCRIPTION,
        "ALLERGY_CLASSIFICATION": ALLERGY_CLASSIFICATION,
        "STATUS": STATUS

    }
    const key = "ALLERGYMASTER"


    if (!ALLERGY_CODE || !ALLERGY_DESCRIPTION || !STATUS || !STATUS.trim() || !ALLERGY_CODE.trim() || !ALLERGY_CLASSIFICATION || !ALLERGY_DESCRIPTION.trim() || !ALLERGY_CLASSIFICATION.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addPHYSICALACTIVITYMASTERValidation
 * validation of mandatory fields.
 */
function addPHYSICALACTIVITYMASTERValidation(req, callback) {

    var ACTIVITY_CODE = req.body.ACTIVITY_CODE;
    var ACTIVITY_DESCRIPTION = req.body.ACTIVITY_DESCRIPTION;
    var STATUS = req.body.STATUS;

    var value = {
        'ACTIVITY_CODE': ACTIVITY_CODE,
        'ACTIVITY_DESCRIPTION': ACTIVITY_DESCRIPTION,
        "STATUS": STATUS

    }
    const key = "PHYSICALACTIVITY"


    if (!ACTIVITY_CODE || !ACTIVITY_DESCRIPTION || !STATUS || !STATUS.trim() || !ACTIVITY_CODE.trim() || !ACTIVITY_DESCRIPTION.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addPERSONRELATIONSHIPValidation
 * validation of mandatory fields.
 */
function addPERSONRELATIONSHIPValidation(req, callback) {

    var REL_CODE = req.body.REL_CODE;
    var REL_NAME = req.body.REL_NAME;
    var STATUS = req.body.STATUS;

    var value = {
        'REL_CODE': REL_CODE,
        'REL_NAME': REL_NAME,
        "STATUS": STATUS

    }
    const key = "PERSONRELATIONSHIP"


    if (!REL_CODE || !REL_NAME || !STATUS || !STATUS.trim() || !REL_CODE.trim() || !REL_NAME.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addBloodGroupValidation
 * validation of mandatory fields.
 */
function addBloodGroupValidation(req, callback) {

    var BLGRP_CODE = req.body.BLGRP_CODE;
    var BLGRP_DESCRIPTION = req.body.BLGRP_DESCRIPTION;
    var STATUS = req.body.STATUS;

    var value = {
        "BLGRP_CODE": BLGRP_CODE,
        'BLGRP_DESCRIPTION': BLGRP_DESCRIPTION,
        "STATUS": STATUS

    }
    var key = "BLGRP1234"


    if (!BLGRP_CODE || !BLGRP_DESCRIPTION || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addMedicineDosageMasterValidation
 * validation of mandatory fields.
 */
function addMedicineDosageMasterValidation(req, callback) {

    var DISOSAGE_VALUE = req.body.DISOSAGE_VALUE;
    var STATUS = req.body.STATUS;

    var value = {
        "DISOSAGE_VALUE": DISOSAGE_VALUE,
        "STATUS": STATUS

    }
    var key = "MDMASTER"


    if (!DISOSAGE_VALUE || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addMedicineIntakeMasterValidation
 * validation of mandatory fields.
 */
function addMedicineIntakeMasterValidation(req, callback) {

    var INTAKE_VALUE = req.body.INTAKE_VALUE;
    var STATUS = req.body.STATUS;

    var value = {
        "INTAKE_VALUE": INTAKE_VALUE,
        "STATUS": STATUS

    }
    var key = "MIMASTER"


    if (!INTAKE_VALUE || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addMedicineStrengthMasterValidation
 * validation of mandatory fields.
 */
function addMedicineStrengthMasterValidation(req, callback) {

    var STRENGTH_VALUES = req.body.STRENGTH_VALUES;
    var STATUS = req.body.STATUS;

    var value = {
        "STRENGTH_VALUES": STRENGTH_VALUES,
        "STATUS": STATUS

    }
    var key = "MSMASTER"


    if (!STRENGTH_VALUES || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addLabTestMasterValidation
 * validation of mandatory fields.
 */
function addLabTestMasterValidation(req, callback) {

    var TEST_CODE = req.body.TEST_CODE;
    var TEST_NAME = req.body.TEST_NAME;
    var TEST_UOM = req.body.TEST_UOM;
    var STATUS = req.body.STATUS;

    var value = {
        "TEST_CODE": TEST_CODE,
        "TEST_NAME": TEST_NAME,
        "TEST_UOM": TEST_UOM,
        "STATUS": STATUS
    }
    var key = "LTMASTER"


    if (!TEST_CODE || !TEST_CODE || !TEST_UOM || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function addShareUrlConfigrValidation
 * validation of mandatory fields.
 */
function addShareUrlConfigrValidation(req, callback) {
    var URL_ID = req.body.URL_ID;
    var CON_MODE = req.body.CON_MODE;
    var CON_URL = req.body.CON_URL;
    var MODIFIED_ON = "";
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
    var CREATED_ON = dd + '/' + mm + '/' + yyyy;

    var PARAM_NAME = req.body.PARAM_NAME;
    var CLIENT_ID = req.body.CLIENT_ID;
    var RU_PARAM = req.body.RU_PARAM;
    var STATUS = req.body.STATUS;

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


    if (!URL_ID || !CON_MODE || !CON_URL || !PARAM_NAME || !CLIENT_ID || !RU_PARAM || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}
function addPHRdocumentsValidation(req, callback) {
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
    var CREATED_DATE_TIME = dd + '/' + mm + '/' + yyyy;

    var BHAMASHAH_ID = req.body.BHAMASHAH_ID;

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



    if (!key || !phrdoc_ID || !BHAMASHAH_ID || !CREATED_BY_SSO_ID || !DOCUMENT_URL || !DOCUMENT_NAME) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}


function addDocCategoryValidation(req, callback) {

    var CATEGORY_CODE = req.body.CATEGORY_CODE.toString();
    var CATEGORY_DESCRIPTION = req.body.CATEGORY_DESCRIPTION;
    var STATUS = req.body.STATUS
    var value = {
        "CATEGORY_CODE": CATEGORY_CODE,
        "CATEGORY_DESCRIPTION": CATEGORY_DESCRIPTION,
        "STATUS": STATUS

    }
    var key = "DOC_CATEGORY"


    if (!CATEGORY_CODE || !CATEGORY_DESCRIPTION || !STATUS || !STATUS.trim() || !CATEGORY_DESCRIPTION.trim()) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}
function addAllergyServityMasterValidation(req, callback) {

    var ALLSERV_id = req.body.ALLSERV_id.toString();
    var SEVERITY = req.body.SEVERITY;
    var DESCRIPTION = req.body.DESCRIPTION;
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
    var CREATEDON = dd + '/' + mm + '/' + yyyy;

    var CREATEDBY = req.body.CREATEDBY;
    var MODIFIEDON = "";
    var MODIFIEDBY = "";
    var STATUS = req.body.STATUS;

    var value = {
        "ALLSERV_id": ALLSERV_id,
        "SEVERITY": SEVERITY,
        "DESCRIPTION": DESCRIPTION,
        "CREATEDON": CREATEDON,
        "CREATEDBY": CREATEDBY,
        "MODIFIEDON": MODIFIEDON,
        "MODIFIEDBY": MODIFIEDBY,
        "STATUS": STATUS

    }
    var key = "ALLERGY_SEVERITY"


    if (!ALLSERV_id || !SEVERITY || !DESCRIPTION || !CREATEDBY || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}

function addAllergySinceMasterValidation(req, callback) {

    var ALLSINCE_id = req.body.ALLSINCE_id.toString();
    var SINCE = req.body.SINCE;
    var DESCRIPTION = req.body.DESCRIPTION;
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
    var CREATEDON = dd + '/' + mm + '/' + yyyy;

    var CREATEDBY = req.body.CREATEDBY;
    var MODIFIEDON = "";
    var MODIFIEDBY = "";
    var STATUS = req.body.STATUS;
    var value = {
        "ALLSINCE_id": ALLSINCE_id,
        "SINCE": SINCE,
        "DESCRIPTION": DESCRIPTION,
        "CREATEDON": CREATEDON,
        "CREATEDBY": CREATEDBY,
        "MODIFIEDON": MODIFIEDON,
        "MODIFIEDBY": MODIFIEDBY,
        "STATUS": STATUS

    }
    var key = "ALLERGY_SINCE"


    if (!ALLSINCE_id || !SINCE || !DESCRIPTION || !CREATEDBY || !STATUS) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}
function addProviderMasterValidation(req, callback) {

    var PROFESSION_ID = req.body.PROFESSION_ID.toString();
    var PROFESSION_NAME = req.body.PROFESSION_NAME;
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
    var CREATED_ON = dd + '/' + mm + '/' + yyyy;

    var CREATED_BY = req.body.CREATED_BY;
    var MODIFIED_ON = "";
    var MODIFIED_BY = "";
    var STATUS = req.body.STATUS;

    var value = {
        "PROFESSION_ID": PROFESSION_ID,
        "PROFESSION_NAME": PROFESSION_NAME,

        "CREATED_ON": CREATED_ON,
        "CREATED_BY": CREATED_BY,
        "MODIFIED_ON": MODIFIED_ON,
        "MODIFIED_BY": MODIFIED_BY,
        "STATUS": STATUS

    }
    var key = "PROVIDER_MASTER"


    if (!PROFESSION_ID || !PROFESSION_NAME || !STATUS || !CREATED_BY) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}
function addQualificationMasterValidation(req, callback) {

    var QUALIFICATION_ID = req.body.QUALIFICATION_ID.toString();
    var QUALIFICATION_DESC = req.body.QUALIFICATION_DESC;
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
    var CREATED_ON = dd + '/' + mm + '/' + yyyy;

    var CREATED_BY = req.body.CREATED_BY;
    var MODIFIED_ON = "";
    var MODIFIED_BY = "";
    var STATUS = req.body.STATUS;

    var value = {
        "QUALIFICATION_ID": QUALIFICATION_ID,
        "QUALIFICATION_DESC": QUALIFICATION_DESC,

        "CREATED_ON": CREATED_ON,
        "CREATED_BY": CREATED_BY,
        "MODIFIED_ON": MODIFIED_ON,
        "MODIFIED_BY": MODIFIED_BY,
        "STATUS": STATUS

    }
    var key = "QUALIFICATION_MASTER"


    if (!QUALIFICATION_ID || !QUALIFICATION_DESC || !STATUS || !CREATED_BY) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}
function addsectorMasterValidation(req, callback) {

    var SECTOR_ID = req.body.SECTOR_ID.toString();
    var SECTOR_NAME = req.body.SECTOR_NAME;
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
    var CREATED_ON = dd + '/' + mm + '/' + yyyy;

    var CREATED_BY = req.body.CREATED_BY;
    var MODIFIED_ON = "";
    var MODIFIED_BY = "";
    var STATUS = req.body.STATUS;
    var value = {
        "SECTOR_ID": SECTOR_ID,
        "SECTOR_NAME": SECTOR_NAME,

        "CREATED_ON": CREATED_ON,
        "CREATED_BY": CREATED_BY,
        "MODIFIED_ON": MODIFIED_ON,
        "MODIFIED_BY": MODIFIED_BY,
        "STATUS": STATUS

    }
    var key = "SECTOR_MASTER"


    if (!SECTOR_ID || !SECTOR_NAME || !STATUS || !CREATED_BY) {

        err = {
            "status": 400,
            "message": 'fields should not be empty'
        }
        callback(err, "");

    } else {

        addData.addData(key, value)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {

                logger.error(err)
                callback(err, "");
            })
    }
}
