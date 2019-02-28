

/**
@author: Arun Hosamani
@Version: 1.0.2
@Date: 5/02/2018
@description: DOIT BlockChain project
**/
var rpqbArrayList = require("rpqbarraylist")
var config = require('config');
var dbConfig = config.get('dbConfig');


/**logger integration*/
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

let multichain = require("multichain-node")(dbConfig);

/** @module READDATA*/
module.exports = {
    readData: readData,
    readFamilyMembers: readFamilyMembers,
    auditTrial: auditTrial,
    getValue: getValue,


};

/** @function auditTrial 
 * provide audit trial of data from blockchain.
 */
function auditTrial(params) {

    return new Promise((resolve) => {
        var patientDetails = [];
        var key = params.key;
        var response;
        multichain.listStreamKeyItems({
            stream: "MedicalInfo",
            "key": key,
            verbose: true,
            count: 1000,
            start: 0



        }, (err, res) => {

            if (err == null) {

                for (let i = 0; i < res.length; i++) {
                    var string = '';
                    var data = res[(res.length)-1].data;
                    string = Buffer.from(data, 'hex').toString();

                    patientDetails.push({
                        "publishers": res[i].publishers[0],
                        "key": res[i].key,
                        "data": string,
                        "confirmations": res[i].confirmations,
                        "blocktime": res[i].blocktime,
                        "txid": res[i].txid,

                    });
                }



                return resolve({
                    response: patientDetails
                });
            } else {
                logger.error(err)
            }
        })

    })

}


function getValue(key) {

    return new Promise((resolve, reject) => {

        multichain.listStreamKeyItems({
            stream: "MedicalInfo",
            "key": key,
            count: 1,
            start: 0,
            verbose: true
        }, (err, res) => {
            
            if (err === null) {
                if (res.length === 0) {
                    resolve({
                        'message': "empty key",
                        'code': 201
                    })
                }
                resolve({
                    'message': res[0],
                    'code': 200
                })
            }
            else {
                logger.error(err)
                reject({
                    'message': err,
                    'code': 555
                })
            }
        });
    });
}

/** @function readData 
 * read data from blockchain.
 */
function readData(params) {

    return new Promise((resolve) => {
        var key = params.key;
        var patientDetails = [];
        var response;
        multichain.listStreamKeyItems({
            stream: "MedicalInfo",
            "key": key
        }, (err, res) => {

            var length = res.length;

            if (err == null) {
                if (length == 0) {
                    return resolve({
                        response: "record was not found please check the EHRID!"
                    });
                } else {

                    var string = '';
                    var data = res[length - 1].data;
                    string = Buffer.from(data, 'hex').toString();
                   
                    var strlength = (JSON.parse(string)).length
                    if (strlength == 0) {
                        return resolve({
                            response: "No Records Were Found!"
                        });
                    } else {

                        patientDetails.push({
                            "publishers": res[0].publishers[0],
                            "key": res[0].key,
                            "data": string,
                            "confirmations": res[0].confirmations,
                            "blocktime": res[0].blocktime,
                            "txid": res[0].txid,

                        });
                        return resolve({
                            response: patientDetails
                        });
                    }
                }
            } else {
               logger.error(err)
            }
        })

    })

}


/** @function readFamilyMembers 
 * read family data from blockchain.
 */
function readFamilyMembers(params) {

    return new Promise((resolve) => {
        var key = params.Bhamashahid;
        var patientDetails = [];
        var response;
        multichain.listStreamKeyItems({
            stream: "MedicalInfo",
            "key": "EHR"
        }, (err, res) => {
            var length = res.length;

            if (err == null) {
                if (length == 0) {
                    return resolve({
                        response: "record was not found please check the EHRID!"
                    });
                } else {

                    var string = '';
                    var data = res[length - 1].data;
                    string = Buffer.from(data, 'hex').toString();

                    map = new Map(JSON.parse(string))

                    return resolve({
                        response: map
                    });
                }
            } else {
               logger.error(err)
            }
        })

    })

}


