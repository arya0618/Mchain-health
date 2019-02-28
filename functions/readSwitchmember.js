'use strict';
var bcSdk = require('../sdk/query');
var dateFormat = require('dateformat');
// logger integration
var config = require('config');

var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

const switchmembers = require('./switchmembers');
const readData = require('./readData');
module.exports = {
    getSwitchmember: getSwitchmember
}

function getSwitchmember(BHAMASHAH_ID, MEMBERID) {
    return new Promise(async (resolve, reject) => {

        var finalresponse = []

        switchmembers.switchmembers(BHAMASHAH_ID, MEMBERID)
            .then(function (result) {
                
                if (result.message.length === 0) {

                    return reject({
                        status: 401,
                        message: "NO record present on this BHAMASHA_ID AND MEMBERID"
                    });
                } else {
                    var response = result.message;
               
                    var key = response[0].EHRID
                    readData.readProfileData(response[0].EHRID)
                        .then(function (result) {
                            
                            if (result.data === "record was not found please check the EHRID!") {
                                return reject({
                                    status: 401,
                                    "message": result.data
                                })
                            }
                            return resolve({
                                status: 200,

                                "message": {
                                    key: key,
                                    "data": result.data
                                }
                            })
                        })
                }

            }).catch(function (err) {
                logger.error(err)
            })

    })
}