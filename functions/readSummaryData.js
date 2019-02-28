/**
@author: Shraddha Kharat
@Version: 1.0.2
@Date: 15/01/2018
@description: DOIT BlockChain project
**/
'use strict';

var bcSdk = require('../sdk/query');
/** logger integration */
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

/**
 * A module readsummarydata will read summary of data of that widget..!!
 * @module readSummaryData
 */


/** readSummaryData from blockchain */
exports.readSummaryData = (key) => {
    return new Promise((resolve, reject) => {


        bcSdk.readData({
            key: key
        })
            .then((result) => {

                if (result.response == "record was not found please check the EHRID!") {
                    return resolve({
                        "status": 401,
                        "query": result.response
                    })
                } else if (result.response == "No Records Were Found!") {
                    return resolve({
                        status: 404,
                        data: result.response
                    })

                } else {
                    resolve({
                        "status": 200,
                        "query": result.response[0]
                    })
                }
            })

            .catch(err => {


                logger.error(err);

                reject({
                    "status": 500,
                    "message": 'Something went wrong please try again later!!'
                });

            });
    });
}