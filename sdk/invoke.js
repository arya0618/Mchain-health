/**
@author: Arun Hosamani
@Version: 1.0.2
@Date: 5/02/2018
@description: DOIT BlockChain project
**/
var rpqbArrayList = require("rpqbarraylist")
var config = require('config');
var dbConfig = config.get('dbConfig');
var counts = require("../functions/counts.js")
//var ehrids = require("../models/ehrids")

/**logger integration*/
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");
let multichain = require("multichain-node")(dbConfig);
var OraConfig = config.get('OraConfig');
var queryExcute = require("../models/queryExcute");
var ehridsfunc = require("../functions/ehrids");
var sqlQuery = require("../sdk/sqlQuery");
const addDataUser = require('../functions/addData');


var queryExcute = require("../models/queryExcute");
var ehridsfunc = require("../functions/ehrids");
var sqlQuery = require("../sdk/sqlQuery");

/** @module ADDDATA*/
module.exports = {
    addData: addData,
    addEhrId: addEhrId,
    addProfileData: addProfileData,
    deleteData: deleteData,
    updateConfidentialityStatus: updateConfidentialityStatus,
    updateMasterStatus: updateMasterStatus,
    publishData: publishData
};

/** @function addProfileData 
 * add profile data into blockchain.
 */
function addProfileData(params) {
    return new Promise((resolve) => {
        var key = params.addProfileData.key;
        var hexstring;
        var value = JSON.stringify(params.addProfileData.value);
        let bufStr = Buffer.from(value, 'utf8');
        hexstring = bufStr.toString('hex');

        multichain.publish({
            stream: "MedicalInfo",
            key: key,
            data: hexstring
        }, (err, res) => {
            if (err == null) {
                return resolve({
                    response: res
                });
            } else {
                logger.error(err)
            }
        });
    });
}

function publishData(key, valueString) {
    return new Promise((resolve) => {
        var hexstring;
        let bufStr = Buffer.from(valueString, 'utf8');
        hexstring = bufStr.toString('hex')

        multichain.publish({
            stream: "MedicalInfo",
            key: key,
            data: hexstring
        }, (err, res) => {
            if (err == null) {
                return resolve({
                    response: res,
                    data: valueString
                });
            } else {
                logger.error(err)
                reject(err);
            }
        })
    })
}


/** @function addData 
 * add patient record data into blockchain.
 */
function addData(params) {

    return new Promise((resolve) => {
        var response;
        var list = new rpqbArrayList;
        var key = params.addData.key;


        var hexstring = '';


        multichain.listStreamKeyItems({
            stream: "MedicalInfo",
            "key": key
        }, (err, res) => {

            var length = res.length;
            if (length == 0) {

                list.add(params.addData.value)

                var value = JSON.stringify(list)
                
                let bufStr = Buffer.from(value, 'utf8');
                hexstring = bufStr.toString('hex')
                multichain.publish({
                    stream: "MedicalInfo",
                    key: key,
                    data: hexstring
                }, (err, res) => {
                    if (err == null) {
                        return resolve({
                            response: res
                        });
                    } else {
                        logger.error(err)
                    }
                })
            } else {
                var string = '';

                var data = res[length - 1].data;
                var string = Buffer.from(data, 'hex').toString();

                list.add(JSON.parse(string))

                if (!list.containsInnerObj(params.addData.value.data)) {

                    list.add(params.addData.value)
                    var value = JSON.stringify(list)
                   
                    let bufStr = Buffer.from(value, 'utf8');
                    hexstring = bufStr.toString('hex')
                   

                    multichain.publish({
                        stream: "MedicalInfo",
                        key: key,
                        data: hexstring
                    }, (err, res) => {

                        if (err == null) {
                            return resolve({
                                response: res
                            });
                        } else {
                            logger.error(err)
                        }
                    })
                } else {

                    return resolve({
                        response: "record already exist!"
                    });
                }

            }
        })

    })
}




/** @function addEhrId 
 * add EhrId into blockchain.
 */
function addEhrId(params) {
    return new Promise((resolve, reject) => {
        var response;

        var key = params.BMID;
        var inputBhamasha = params.BHAMASHAHID;
        var inputEHRID = params.EHRID;
        var inputMemberID = params.MEMBER_ID;
        var inputSsoId = params.SSO_ID;
        var hospitalSsoid = "";

        var queryParams = [inputBhamasha, inputMemberID, inputSsoId];
        queryExcute.dbconfig(sqlQuery.checkUser, queryParams).then((get) => {
            
            if (get.result.length === 0) {
                ehridsfunc.verifyAndAddUser(inputBhamasha, inputMemberID, inputSsoId, inputEHRID).then((get) => {
                    if (get.code === 201) {
                       
                        if (!get.hasOwnProperty("EHRID")) {
                            params.EHRID = get.result[0][4];
                        } else {
                            params.EHRID = get.EHRID;
                        }
                        addDataUser.addProfileData(params.EHRID, params)
                            .then(function (result) {
                               
                                return resolve({
                                    result: params
                                });
                            }).catch(function (err) {
                                return reject(err);
                            })

                    } else {
                        return reject({
                            result: get.result
                        })
                    }
                })
            } else {

                if (get.code === 201) {
                    params.EHRID = get.result[0][4];
                    return resolve({
                        result: params
                    })
                } else {
                    return reject({
                        result: get.result
                    })
                }
            }
        })
    })
}

/** @function updateConfidentialityStatus 
 * update ConfidentialityStatus into blockchain.
 */
function updateConfidentialityStatus(params) {

    return new Promise((resolve) => {
        var response;
        var list = new rpqbArrayList;
        var key = params.updateConfidentialityStatus.key;

        var hexstring = '';

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
                    string = Buffer.from(data, 'hex').toString()

                    list.add(JSON.parse(string))

                    var id = params.updateConfidentialityStatus.value.ID


                    var index = list.indexOfObjectsId(id);


                    if (index != -1) {

                        list.remove(index)
                        list.add(params.updateConfidentialityStatus.value)
                    }
                    var value = JSON.stringify(list)

                    let bufStr = Buffer.from(value, 'utf8');
                    hexstring = bufStr.toString('hex')


                    multichain.publish({
                        stream: "MedicalInfo",
                        key: key,
                        data: hexstring
                    }, (err, res) => {

                        if (err == null) {
                            return resolve({
                                response: res
                            });
                        } else {
                            logger.error(err)
                        }
                    })

                }
            } else {
                return resolve({
                    response: err
                });
            }
        })
    })
}


/** @function deleteData 
 * delete patients record.
 */
function deleteData(params) {
    return new Promise((resolve) => {
        var response;
        var list = new rpqbArrayList;
        var key = params.deleteData.key;


        var hexstring = '';
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
                    var string = Buffer.from(data, 'hex').toString();
                    

                    list.add(JSON.parse(string))
                   
                    var id = params.deleteData.value.data
                    var index = list.indexOfObjectsId(id);
                    if (index != -1) {
                        list.remove(index)
                    }
                    var value = JSON.stringify(list)

                    let bufStr = Buffer.from(value, 'utf8');
                    hexstring = bufStr.toString('hex')

                    multichain.publish({
                        stream: "MedicalInfo",
                        key: key,
                        data: hexstring
                    }, (err, res) => {

                        if (err == null) {
                            return resolve({
                                response: res
                            });
                        } else {
                            logger.error(err)
                        }
                    })
                }

            } else {
                logger.error(err)
            }
        })
    })

}

/** @function updateMasterStatus 
 *update confidentiality status for hospital records.
 */
function updateMasterStatus(params) {

    return new Promise((resolve) => {
        var response;
        var key = params.key;
        var hex = '';

        var value = JSON.stringify(params.value)


        let bufStr = Buffer.from(value, 'utf8');
        hex = bufStr.toString('hex')


        multichain.publish({
            stream: "MedicalInfo",
            key: key,
            data: hex
        }, (err, res) => {
            if (err == null) {
                return resolve({
                    response: res
                });
            } else {
                logger.error(err)
            }
        })
    })

}
