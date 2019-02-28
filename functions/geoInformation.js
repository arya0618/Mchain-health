'use strict';
// logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

var QuerySDK = require('../sdk/query');
var request = require('request-promise');
var parseString = require('xml2js').parseString;
var bcSdk = require('../sdk/invoke');
var config = require('config');
var ExternalURL = config.get('ExternalURL');

function getgeoInformation(inputType) {
    return new Promise(function (resolve, reject) {
        var inputXMLString = '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">'
            + '<x:Header>'
            + '<tem:AuthHeader>'
            + '<tem:Username>Doit</tem:Username>'
            + '<tem:Password>Doit@123</tem:Password>'
            + '</tem:AuthHeader>'
            + '</x:Header>'
            + '<x:Body>'
            + '<tem:GetMasterData>'
            + '<tem:deptID>IHMSHAC5T7M</tem:deptID>'
            + '<tem:masterDataID>$$masterDataID</tem:masterDataID>'
            + '<tem:isNew>true</tem:isNew>'
            + '<tem:isJSON>true</tem:isJSON>'
            + '</tem:GetMasterData>'
            + '</x:Body>'
            + '</x:Envelope>';

        var inputCode = 0; // default for district
        var key = null;

        switch (inputType) {
            case "STATE":
                inputCode = 17;
                key = "ALL_STATE";
                break;

            case "DIVISION":
                inputCode = 57;
                key = "ALL_DIVISION";
                break;
            case "BLOCK":
                inputCode = 55;
                key = "ALL_BLOCK";
                break;

            case "COUNTRY":
                //for future
                break;
            default:
                inputCode = 56; // default for district
                key = "ALL_DISTRICT";
        }

        //1. read the value from blockchain
        var dataFromBlockchain = null;
        QuerySDK.getValue(key).then(function (result) {




            if (result.code === 201) {
                dataFromBlockchain = "";
            }


            //2. form input xml
            //   inputXMLString = inputResetString;
            inputXMLString = inputXMLString.replace("$$masterDataID", inputCode);

            //3. read the SMCDH api
            const options = {
                method: 'POST',
                uri: ExternalURL.GeoInfo,// read from config file
                headers: {
                    "Content-Type": "text/xml;charset=utf-8",
                },
                body: inputXMLString
            }

            request(options).then(function (response) {

                parseString(response, function (err, result) {
                    const descriptor1 = Object.getOwnPropertyDescriptor(result, 'soap:Envelope');
                    const descriptor2 = Object.getOwnPropertyDescriptor(descriptor1.value, 'soap:Body');
                    var jsonResponse = JSON.parse(descriptor2.value[0].GetMasterDataResponse[0].GetMasterDataResult[0])



                    if (JSON.stringify(jsonResponse) === JSON.stringify(dataFromBlockchain)) {

                        //4. return the value from blockcahin
                        resolve(jsonResponse);
                    }
                    else {

                        //5. compare, if not equal update the value in blockchain

                        bcSdk.publishData(key, JSON.stringify(jsonResponse))
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

                    }



                });
            })


        }).catch(function (err) {
            logger.error(err);
            reject(err)
        });



    }
    );
}
module.exports = {
    getgeoInformation: getgeoInformation
}