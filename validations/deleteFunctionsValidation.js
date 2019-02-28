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
const deleteData = require('../functions/deleteData');


/** @module Validations */

module.exports = {
    deleteDataLabTestValidation: deleteDataLabTestValidation,
    deleteAllergyValidation: deleteAllergyValidation,
    deleteMedicationValidation: deleteMedicationValidation,
    deleteBloodPressureValidation: deleteBloodPressureValidation,
    deleteContactValidation: deleteContactValidation,

    deleteDataBMIValidation: deleteDataBMIValidation,
    deleteDataSPO2Validation: deleteDataSPO2Validation,
    deleteDataHeartRateValidation: deleteDataHeartRateValidation,
    deleteDataRespiratoryRateValidation: deleteDataRespiratoryRateValidation,
    deleteDataBloodGlucoseValidation: deleteDataBloodGlucoseValidation,
    deleteDataActivityValidation: deleteDataActivityValidation,
    deleteBodyTemperatureValidation: deleteBodyTemperatureValidation,
    deleteHealthtipsValidation: deleteHealthtipsValidation,
    deleteDisabilityTypeValidation: deleteDisabilityTypeValidation,
    deleteGLUCOSEMASTERValidation: deleteGLUCOSEMASTERValidation,
    deleteALLERGYMASTERValidation: deleteALLERGYMASTERValidation,
    deletePHYSICALACTIVITYMASTERValidation: deletePHYSICALACTIVITYMASTERValidation,
    deletePERSONRELATIONSHIPValidation: deletePERSONRELATIONSHIPValidation,
    deleteBloodGroupValidation: deleteBloodGroupValidation,

    deleteMedicineDosageMasterValidation: deleteMedicineDosageMasterValidation,
    deleteMedicineIntakeMasterValidation: deleteMedicineIntakeMasterValidation,
    deleteMedicineStrengthMasterValidation: deleteMedicineStrengthMasterValidation,
    deleteLabTestMasterValidation: deleteLabTestMasterValidation,

    deletePHRdocsValidation: deletePHRdocsValidation,
    deleteurlshareConfigValidation: deleteurlshareConfigValidation,
    deleteMasterTableValidation: deleteMasterTableValidation
};

/** @function deleteDataLabTestValidation 
 * validation of mandatory fields.
 */
function deleteDataLabTestValidation(req, callback) {
    const key = (req.body.EHRID) + widget.LabTest;
    const id = req.body.ID;


    if (!req.body.EHRID || !id || !req.body.EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        deleteData.deleteData(key, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            });

    }
}
/** @function deleteDataActivityValidation 
 * validation of mandatory fields.
 */
function deleteDataActivityValidation(req, callback) {
    var EHRID = req.body.EHRID;
    const key = EHRID + widget.Activity;
    const id = req.body.ID;

    if (!EHRID || !id || !EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        deleteData.deleteData(key, id)
            .then(result => {
                callback("", result);
            })
            .catch(function (err) {
                callback(err, "");
            });
    }
}

/** @function deleteAllergyValidation 
 * validation of mandatory fields.
 */
function deleteAllergyValidation(req, callback) {
    const key = (req.body.EHRID) + widget.Allergy;
    const id = req.body.ID;

    if (!req.body.EHRID || !id || !req.body.EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        deleteData.deleteData(key, id)
            .then(result => {
                callback("", result);
            })
            .catch(function (err) {
                callback(err, "");
            });

    }
}

/** @function deleteMedicationValidation 
 * validation of mandatory fields.
 */
function deleteMedicationValidation(req, callback) {
    const key = (req.body.EHRID) + widget.Medication;
    const id = req.body.ID;
    if (!req.body.EHRID || !id || !req.body.EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        deleteData.deleteData(key, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            });

    }
}

/** @function deleteBloodPressureValidation 
 * validation of mandatory fields.
 */
function deleteBloodPressureValidation(req, callback) {
    const key = (req.body.EHRID) + widget.BloodPressure;
    const id = req.body.ID;
    if (!req.body.EHRID || !id || !req.body.EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        deleteData.deleteData(key, id)
            .then(result => {
                callback("", result);
            })
            .catch(function (err) {
                callback(err, "");
            });

    }
}

/** @function deleteContactValidation 
 * validation of mandatory fields.
 */
function deleteContactValidation(req, callback) {
    const key = (req.body.EHRID) + widget.Contact;
    const id = req.body.ID;
    if (!key || !id) {

        res.status(400).json({
            message: 'fields should not be empty'
        });

    } else {
        deleteData.deleteData(key, id)
            .then(result => {
                callback("", result);
            })
            .catch(function (err) {
                callback(err, "");
            });
    }
}


/** @function deleteDataBloodGlucoseValidation 
 * validation of mandatory fields.
 */

function deleteDataBloodGlucoseValidation(req, callback) {
    const key = (req.body.EHRID).toString() + widget.BloodGlucose;
    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function deleteDataBMIValidation 
 * validation of mandatory fields.
 */
function deleteDataBMIValidation(req, callback) {
    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BMI;
    const id = req.body.ID


    if (!EHRID || !id || !EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteDataSPO2Validation 
 * validation of mandatory fields.
 */
function deleteDataSPO2Validation(req, callback) {
    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.spo2;
    const id = req.body.ID


    if (!EHRID || !id || !EHRID.trim() || !id.trim()) {


        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteDataHeartRateValidation 
 * validation of mandatory fields.
 */
function deleteDataHeartRateValidation(req, callback) {
    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.HeartRate;
    const id = req.body.ID


    if (!EHRID || !id || !EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteDataRespiratoryRateValidation 
 * validation of mandatory fields.
 */
function deleteDataRespiratoryRateValidation(req, callback) {
    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.Respiratory;
    const id = req.body.ID


    if (!EHRID || !id || !EHRID.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteBodyTemperatureValidation 
 * validation of mandatory fields.
 */
function deleteBodyTemperatureValidation(req, callback) {
    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BodyTemperature;
    const id = req.body.ID


    if (!key || !id) {


        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                logger.debug("result=======>>>>>>>>>>", result)
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function deleteHealthtipsValidation 
 * validation of mandatory fields.
 */
function deleteHealthtipsValidation(req, callback) {
    const key = "HEALTHTIPSTEST"

    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteDisabilityTypeValidation 
 * validation of mandatory fields.
 */
function deleteDisabilityTypeValidation(req, callback) {
    var key = "DISABILITYTYPE";

    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

/** @function deleteGLUCOSEMASTERValidation 
 * validation of mandatory fields.
 */
function deleteGLUCOSEMASTERValidation(req, callback) {
    var key = req.body.key
    const id = req.body.ID

    /** checking inputs field empty or not*/
    if (!key || !id) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        deleteData.deleteData(key, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })

    }
}
/** @function deleteALLERGYMASTERValidation 
 * validation of mandatory fields.
 */
function deleteALLERGYMASTERValidation(req, callback) {
    var key = req.body.key
    const id = req.body.ID

    /** checking inputs field empty or not*/
    if (!key || !id) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");

    } else {
        deleteData.deleteData(key, id)
            .then(result => {

                callback("", result);
            })
            .catch(function (err) {

                callback(err, "");
            })

    }
}
/** @function deletePHYSICALACTIVITYMASTERValidation 
 * validation of mandatory fields.
 */
function deletePHYSICALACTIVITYMASTERValidation(req, callback) {
    const key = (req.body.key);
    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deletePERSONRELATIONSHIPValidation 
 * validation of mandatory fields.
 */
function deletePERSONRELATIONSHIPValidation(req, callback) {
    const key = (req.body.key);
    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteBloodGroupValidation 
 * validation of mandatory fields.
 */
function deleteBloodGroupValidation(req, callback) {
    const key = (req.body.key).toString();

    const id = req.body.ID

    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteMedicineDosageMasterValidation 
 * validation of mandatory fields.
 */
function deleteMedicineDosageMasterValidation(req, callback) {
    const key = (req.body.key).toString();

    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteMedicineIntakeMasterValidation 
 * validation of mandatory fields.
 */
function deleteMedicineIntakeMasterValidation(req, callback) {
    const key = (req.body.key).toString();

    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteMedicineStrengthMasterValidation 
 * validation of mandatory fields.
 */
function deleteMedicineStrengthMasterValidation(req, callback) {
    const key = (req.body.key).toString();

    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {

                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
/** @function deleteLabTestMasterValidation 
 * validation of mandatory fields.
 */
function deleteLabTestMasterValidation(req, callback) {
    const key = (req.body.key).toString();

    const id = req.body.ID


    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}


function deletePHRdocsValidation(req, callback) {
    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.phrDocs;
    const id = req.body.ID


    if (!EHRID || !id || !EHRID.trim() || !id.trim()) {


        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

function deleteMasterTableValidation(req, callback) {

    const key = req.body.key.toString();
    const id = req.body.ID
    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}

function deleteurlshareConfigValidation(req, callback) {

    const key = req.body.key.toString();
    const id = req.body.ID
    if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}
function deleteurlshareConfigValidation(req, callback) {
    
    const key = req.body.key.toString();
    const id = req.body.ID
  if (!key || !id || !key.trim() || !id.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        deleteData.deleteData(key, id)
            .then(function (result) {
                callback("", result);

            }).catch(function (err) {
                logger.error(err)
                callback(err, "");
            })
    }
}