/**
@author: Arun Hosamani
@Version: 1.0.2
@Date: 15/01/2018
@description: DOIT BlockChain project
**/
'use strict';

var bcSdk = require('../sdk/invoke');
/** logger integration */
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");
var uniqid = require('uniqid');

/**
 * A module that will add data into the blockchain!
 * @module addData
 */
/** Add Data into blockchain.*/
exports.addData = (key, value) => {
    return new Promise((resolve, reject) => {
        var input = {};
        input.data = value;
        input.meta = {
            'submittedOn': new Date()
        }
        input.ID = uniqid()

        const addData = ({
            key: key,
            value: input,

        });

        bcSdk.addData({
            addData: addData
        })
            .then(function (result) {
                if (result.response == "record already exist!") {
                    return resolve({
                        "status": 401,
                        "message": result.response
                    });
                } else {
                    resolve({
                        "status": 200,
                        "message": "Your Information is stored into blockchain"
                    });
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

/**
 * A module that will add profile data into the blockchain!
 * @module addProfileData
 */
/** Add Profile Data into blockchain.*/
exports.addProfileData = (key, value) => {
    return new Promise((resolve, reject) => {
        const addProfileData = ({
            key: key,
            value: value
        });

        bcSdk.addProfileData({
            addProfileData: addProfileData
        }).then(function (result) {
            resolve({
                "status": 200,
                "message": result
            });
        })
            .catch(err => {
                if (err.code == 401) {
                    reject({
                        "status": 401,
                        "message": 'Request Already Updated!'
                    });
                } else {

                    reject({
                        "status": 500,
                        "message": 'Internal Server Error !'
                    });
                }
            });
    });
}

/**
 * A module that will add generate ehrid and add it into the blockchain!
 * @module addEhrId
 */
/** Add EhrId Data into blockchain.*/
exports.addEhrId = (BMID, value) => {
    return new Promise((resolve, reject) => {
        var EHRID = value.BHAMASHAHID + "_" + uniqid.time();
        value.BMID = BMID
        value.EHRID = EHRID

        bcSdk.addEhrId(value)
            .then(function (result) {

                resolve({
                    "status": 200,
                    "message": result
                })
            })
            .catch(err => {
                reject({
                    "status": 500,
                    "message": 'Something went wrong please try again later!!'
                });

            });
    });
}

/**
 * A module that will add master table data into the blockchain!
 * @module addMasterData
 */
/** Add Master Table Data into blockchain.*/
exports.addMasterData = (key, value) => {
    return new Promise((resolve, reject) => {
        var input = {};
        input.data = value;

        const addData = ({
            key: key,
            value: input,

        });

        bcSdk.addData({
            addData: addData
        })
            .then(function (result) {
                if (result.response == "record already exist!") {
                    return resolve({
                        "status": 401,
                        "message": result.response
                    })
                } else {
                    resolve({
                        "status": 200,
                        "message": "Your Information is stored into blockchain"
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


