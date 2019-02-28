'use strict';
// logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

var oracledb = require('oracledb');
oracledb.autoCommit = true;
var config = require('config');
var OraConfig = config.get('OraConfig');
//logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");




exports.fetchfamilymembers = (BHAMASHAH_ID) =>

    new Promise((resolve, reject) => {
        var response;
        let conn; // Declared here for scoping purposes
        oracledb
            .getConnection(OraConfig)
            .then(function (c) {
               
                conn = c;
                var bindvars = {
                    i: BHAMASHAH_ID  // Bind type is determined from the data.  Default direction is BIND_IN
                };
                return conn.execute(
                    'SELECT BHAMASHAH_ID,MEMBERID,EHRID FROM  KEYSTORE WHERE BHAMASHAH_ID = :i',
                    bindvars,
                    {
                        outFormat: oracledb.OBJECT
                    }
                );
            })
            .then(
                function (result) {
                   
                    response = result.rows

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
               
                resolve({
                    message: response
                })

            })
            .catch(function (err) {
                // If error during close, just log.
                logger.error(err);

            });
    });