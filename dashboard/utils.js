'use strict'
//logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");


module.exports = {
    topHospitalsCount: topHospitalsCount,
    districtsCount: districtsCount,
    txCount: txCount,
    topUserCount: topUserCount
}

var oracledb = require('oracledb');
var config = require('config');
oracledb.autoCommit = true;
var OraConfig = config.get('OraConfig');

function topHospitalsCount(hospitals) {
    return new Promise(function (resolve, reject) {
        let conn; // Declared here for scoping purposes
        oracledb
            .getConnection(OraConfig)
            .then(function (c) {
                logger.debug('Connected to database');
                conn = c;
                var bindvars = {
                    i: hospitals  // Bind type is determined from the data.  Default direction is BIND_IN
                };
                return conn.execute(
                    "BEGIN HOSPITALS_COUNT(:i); END;",
                    bindvars,
                    {
                        outFormat: oracledb.OBJECT
                    }
                );
            })
            .then(
                function (result) {
                    logger.debug('Query executed');

                },
                function (err) {
                    logger.error('Error occurred', err);

                }
            )
            .then(function () {
                if (conn) {
                    // If conn assignment worked, need to close.
                    conn.close();

                }
            })
            .then(function () {
                logger.debug('Connection closed');
                resolve()
            })
            .catch(function (err) {
                // If error during close, just log.
                logger.error(err);
                reject(err)
            });
    });
}

function txCount() {

    return new Promise(function (resolve, reject) {
        let conn; // Declared here for scoping purposes
        oracledb
            .getConnection(OraConfig)
            .then(function (c) {
                logger.debug('Connected to database');
                conn = c;
                return conn.execute(
                    'UPDATE TRANSACTION_COUNTS SET NOOFTRANSACTIONSTODAY=NOOFTRANSACTIONSTODAY+1', {}, {
                        outFormat: oracledb.OBJECT
                    }
                );
            })
            .then(
                function (result) {
                    logger.debug('Query executed');

                },
                function (err) {
                    logger.error(err);

                }
            )
            .then(function () {
                if (conn) {
                    // If conn assignment worked, need to close.
                    conn.close();

                }
            })
            .then(function () {
                logger.debug('Connection closed');
                resolve()
            })
            .catch(function (err) {
                // If error during close, just log.
                logger.error(err);
                reject(err)
            });
    });
}

function topUserCount(ehrId, patientName) {
    return new Promise(function (resolve, reject) {
        let conn; // Declared here for scoping purposes
        oracledb
            .getConnection(OraConfig)
            .then(function (c) {
                logger.debug('Connected to database');
                conn = c;
                var bindvars = {
                    i1: ehrId, // Bind type is determined from the data.  Default direction is BIND_IN
                    i2: patientName
                };
                return conn.execute(
                    "BEGIN USER_COUNT(:i1,:i2); END;",
                    bindvars, {
                        outFormat: oracledb.OBJECT
                    }
                );
            })
            .then(
                function (result) {
                    logger.debug('Query executed');

                },
                function (err) {
                    logger.error(err);

                }
            )
            .then(function () {
                if (conn) {
                    // If conn assignment worked, need to close.
                    conn.close();

                }
            })
            .then(function () {
                logger.debug('Connection closed');
                resolve()
            })
            .catch(function (err) {
                // If error during close, just log.
                logger.error(err);
                reject(err)
            });
    });
}

function districtsCount(district) {
    return new Promise(function (resolve, reject) {
        let conn; // Declared here for scoping purposes
        var date = new Date();
        var month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ][date.getMonth()];
        var year = date.getFullYear();
        oracledb
            .getConnection(OraConfig)
            .then(function (c) {
                logger.debug('Connected to database');
                conn = c;
                var bindvars = {
                    i1: district, // Bind type is determined from the data.  Default direction is BIND_IN
                    i2: month,
                    i3: year,
                };
                return conn.execute(
                    "BEGIN DISTRICT_COUNT(:i1,:i2,:i3); END;",
                    bindvars, {
                        outFormat: oracledb.OBJECT
                    }
                );
            })
            .then(
                function (result) {
                    logger.debug('Query executed');

                },
                function (err) {
                    logger.error(err);

                }
            )
            .then(function () {
                if (conn) {
                    // If conn assignment worked, need to close.
                    conn.close();

                }
            })
            .then(function () {
                logger.debug('Connection closed');
                resolve()
            })
            .catch(function (err) {
                // If error during close, just log.
                logger.error(err);
                reject(err)
            });
    });
}

