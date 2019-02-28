/**
@author: Sathiyan Baskaran
@Version: 1.0.2
@Date: 18/01/2018
@description: DOIT BlockChain project
**/
'use strict';

var bcSdk = require('../sdk/invoke');
/** logger integration */
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

/**
 * A module that will add data into the blockchain!
 * @module updateConfidentialityStatus
 */
/** update Confidentiality Status into blockchain.*/
exports.updateConfidentialityStatus = (key, value, ID) => {
    return new Promise((resolve, reject) => {


        var input = {};
        input.data = value;
        input.meta = {
            'submittedOn': new Date()
        }
        input.ID = ID
        const addData = ({
            key: key,
            value: input
        });

        bcSdk.updateConfidentialityStatus({
            updateConfidentialityStatus: addData
        })

            .then(function (result) {
                if (result.response == "record was not found please check the EHRID!") {
                    return resolve({
                        "status": 401,
                        "message": result.response
                    })
                } else {
                    return resolve({
                        "status": 200,
                        "message": "Confedentiality Status updated into blockchain"
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