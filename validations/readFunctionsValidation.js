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
const readData = require('../functions/readData');

/** @module Validations */
module.exports = {
    readLabTestValidation: readLabTestValidation,
    readAllergyValidation: readAllergyValidation,
    readMedicationValidation: readMedicationValidation,
    readBloodPressureValidation: readBloodPressureValidation,
    readContactValidation: readContactValidation,

    readBMIValidation: readBMIValidation,
    readSPO2Validation: readSPO2Validation,
    readHeartRateValidation: readHeartRateValidation,
    readRespiratoryRateValidation: readRespiratoryRateValidation,
    readBloodGlucoseValidation: readBloodGlucoseValidation,
    readActivityValidation: readActivityValidation,
    readBodyTemperatureValidation: readBodyTemperatureValidation,
    readHealthTipsValidation: readHealthTipsValidation,
    readMasterData: readMasterData,
    readGLUCOSEMASTERValidation: readGLUCOSEMASTERValidation,
    readALLERGYMASTERValidation: readALLERGYMASTERValidation,
    readPHYSICALACTIVITYMASTERValidation: readPHYSICALACTIVITYMASTERValidation,
    readPERSONRELATIONSHIPValidation: readPERSONRELATIONSHIPValidation,
    readBloodGroupValidation: readBloodGroupValidation,


    readMedicineDosageMasterValidation: readMedicineDosageMasterValidation,
    readMedicineIntakeMasterValidation: readMedicineIntakeMasterValidation,
    readMedicineStrengthMasterValidation: readMedicineStrengthMasterValidation,
    readLabTestMasterValidation: readLabTestMasterValidation,
    readPhrDocsValidation: readPhrDocsValidation,
    readMasterTableValidation: readMasterTableValidation

};

/** @function readActivityValidation 
 * validation of mandatory fields.
 */
function readActivityValidation(req, callback) {
    var EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.Activity;

    var period = req.body.PERIOD;

    if (!EHRID || !EHRID.trim()) { /**checkig input fiedls empty or not if yes then throwing error message */

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}
/** @function readLabTestValidation 
 * validation of mandatory fields.
 */
function readLabTestValidation(req, callback) {
    const key = (req.body.EHRID).toString() + widget.LabTest;
    var period = req.body.PERIOD;

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {
        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}

/** @function readAllergyValidation 
 * validation of mandatory fields.
 */
function readAllergyValidation(req, callback) {
    const key = (req.body.EHRID).toString() + widget.Allergy;
    var period = req.body.PERIOD;

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}

/** @function readMedicationValidation 
 * validation of mandatory fields.
 */
function readMedicationValidation(req, callback) {
    const key = (req.body.EHRID).toString() + widget.Medication;
    var period = req.body.PERIOD;

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}

/** @function readBloodPressureValidation 
 * validation of mandatory fields.
 */
function readBloodPressureValidation(req, callback) {
    const key = (req.body.EHRID).toString() + widget.BloodPressure;
    var period = req.body.PERIOD;

    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}

/** @function readContactValidation 
 * validation of mandatory fields.
 */
function readContactValidation(req, callback) {
    const key = (req.body.EHRID).toString() + widget.Contact;
    if (!req.body.EHRID || !req.body.EHRID.trim()) {
        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}


/** @function readBMIValidation 
 * validation of mandatory fields.
 */
function readBMIValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BMI;
    var period = req.body.PERIOD;

    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readSPO2Validation 
 * validation of mandatory fields.
 */
function readSPO2Validation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.spo2;
    var period = req.body.PERIOD;

    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}

/** @function readHeartRateValidation 
 * validation of mandatory fields.
 */
function readHeartRateValidation(req, callback) {
    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.HeartRate;
    var period = req.body.PERIOD;

    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readRespiratoryRateValidation 
 * validation of mandatory fields.
 */
function readRespiratoryRateValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.Respiratory;
    var period = req.body.PERIOD;

    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readBloodGlucoseValidation 
 * validation of mandatory fields.
 */
function readBloodGlucoseValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BloodGlucose;
    var period = req.body.PERIOD;

    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readBodyTemperatureValidation 
 * validation of mandatory fields.
 */
function readBodyTemperatureValidation(req, callback) {

    const EHRID = req.body.EHRID;
    const key = (EHRID).toString() + widget.BodyTemperature;
    var period = req.body.PERIOD;

    if (!EHRID || !EHRID.trim()) {

        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readData(key, period, req)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}

/** @function readHealthTipsValidation 
 * validation of mandatory fields.
 */
function readHealthTipsValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) { /** validating input fields coming from UI */

        err = {
            "status": 400,
            "message": 'fields should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {
                callback("", result);
            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readMasterData 
 * validation of mandatory fields.
 */
function readMasterData(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        };
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}


/** @function readGLUCOSEMASTERValidation 
 * validation of mandatory fields.
 */
function readGLUCOSEMASTERValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) { /** validating input fields coming from UI */

        err = {
            "status": 400,
            "message": 'Invalid Request !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readALLERGYMASTERValidation 
 * validation of mandatory fields.
 */
function readALLERGYMASTERValidation(req, callback) {


    const key = (req.body.key).toString()


    if (!key || !key.trim()) { /** validating input fields coming from UI */


        err = {
            status: 400,
            message: 'fields should not be empty'
        };
        callback(err, "");
    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readPHYSICALACTIVITYMASTERValidation 
 * validation of mandatory fields.
 */

function readPHYSICALACTIVITYMASTERValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readPERSONRELATIONSHIPValidation 
 * validation of mandatory fields.
 */
function readPERSONRELATIONSHIPValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {
                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }

}
/** @function readBloodGroupValidation 
 * validation of mandatory fields.
 */
function readBloodGroupValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}


/** @function readMedicineDosageMasterValidation 
 * validation of mandatory fields.
 */
function readMedicineDosageMasterValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}
/** @function readMedicineIntakeMasterValidation 
 * validation of mandatory fields.
 */
function readMedicineIntakeMasterValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}
/** @function readMedicineStrengthMasterValidation 
 * validation of mandatory fields.
 */
function readMedicineStrengthMasterValidation(req, callback) {
    const key = req.body.key;


    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}
/** @function readLabTestMasterValidation 
 * validation of mandatory fields.
 */
function readLabTestMasterValidation(req, callback) {
    const key = req.body.key;
    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        };
        callback(err, "");

    } else {
        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}

function readPhrDocsValidation(req, callback) {
    var EHRID = req.body.EHRID.toString();
    const key = EHRID + widget.phrDocs;


    if (!key || !key.trim() || !EHRID) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}

function readMasterTableValidation(req, callback) {
    const key = req.body.key;

    if (!key || !key.trim()) {

        err = {
            "status": 400,
            "message": 'field should nor be empty !'
        }
        callback(err, "");

    } else {

        readData.readDataWithoutDate(key)
            .then(function(result) {

                callback("", result);

            }).catch(function(err) {
                callback(err, "");
            });
    }
}
