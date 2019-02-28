'use strict';
var bcSdk = require('../sdk/query');
var dateFormat = require('dateformat');
// logger integration
var config = require('config');

var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");
const fetchfamilymembers = require('./fetchfamilymembers');
const readData = require('./readData');
module.exports = {
    getFamilydata: getFamilydata
}

function getFamilydata(BHAMASHAH_ID) {
    return new Promise(async (resolve, reject) => {

        var finalresponse = []

        fetchfamilymembers.fetchfamilymembers(BHAMASHAH_ID)
            .then(function (result) {
                if (result.message.length === 0) {

                    return reject({
                        status: 401,
                        message: "NO record present on this BHAMASHA_ID"
                    });
                } else {
                    var response = result.message;

                    return new Promise(async (resolve1, reject1) => {
                        for (var i = 0; i < response.length; i++) {
                            var key = response[i].EHRID
                           
                            let a = await readData.readfamilyData(response[i].EHRID)


                            if (a.data === "record was not found please check the EHRID!") {

                                finalresponse.push({
                                    "EHRID": key,
                                    "data": a.data.toString()
                                })
                            } else {
                                finalresponse.push({
                                    "EHRID": key,
                                    "data": JSON.parse(a.data.data)
                                })
                            }


                            if (response.length === finalresponse.length) {

                                return resolve1(resolve({
                                    status: 200,
                                    "message": finalresponse
                                }))

                            }
                        }

                    })


                }

            }).catch(function(err) {
                logger.error(err)
            })

    })
}