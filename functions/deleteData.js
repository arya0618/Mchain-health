/**
@author: Sathiyan Baskaran
@Version: 1.0.2
@Date: 23/01/2018
@description: DOIT BlockChain project
**/
'use strict';

// var request = require('../models/request');
var bcSdk = require('../sdk/invoke');
// logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

/**
 * A module that will delete data from the blockchain!
 * @module deleteData
 */

exports.deleteData = (key, value) => {
    return new Promise((resolve, reject) => {


        var input = {};
        input.data = value;
        input.meta = {
            'submittedOn': new Date()
        }
        const deleteData = ({
            key: key,
            value: input
        });


        bcSdk.deleteData({
            deleteData: deleteData
        })

            .then(function (result) {
                if (result.response == "record was not found please check the EHRID!") {
                    return resolve({
                        "status": 401,
                        "message": result.response
                    })
                } else {


                    resolve({
                        "status": 200,
                        "message": "Your records has been deleted"
                    })
                }
            })

            .catch(err => {

                reject({
                    "status": 500,
                    "message": 'Something went wrong please try again later!!'
                });

            });
    });
}