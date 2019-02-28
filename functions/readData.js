/**
@author: Piyusha Patel
@Version: 1.0.2
@Date: 17/01/2018
@description: DOIT BlockChain project
**/
'use strict';
var bcSdk = require('../sdk/query');
var dateFormat = require('dateformat');
// logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");

/**
 * A module that reads data on the basis of date and period
 * @module readData
 */

/** readData */
exports.readData = (key, period, req) => {
    return new Promise((resolve, reject) => {

        var dateFrom;
        var dateTo;
        if (period == "" || period == undefined) { /**checking period is empty or not */
            var dtFrom = req.body.FROMDATE;
            var parts = dtFrom.split("/");
            dateFrom = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
            var dtTo = req.body.TODATE;
            var parts = dtTo.split("/");
            dateTo = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));

        } else { /**checking condition for filtering data based on period */
            var dummydate1 = new Date(Date.now());
            dummydate1.setDate(dummydate1.getDate() - parseInt(period));
            dummydate1.setMonth(dummydate1.getMonth());
            dummydate1.setFullYear(dummydate1.getFullYear());

            var dtFrom = (dummydate1.getDate() + "/" + (dummydate1.getMonth() + 1) + "/" + dummydate1.getFullYear()).toString();
            var parts = dtFrom.split("/");
            dateFrom = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));

            var dummydate2 = new Date(Date.now());
            var dtTo = (dummydate2.getDate() + "/" + (dummydate2.getMonth() + 1) + "/" + dummydate2.getFullYear()).toString()
            var parts = dtTo.split("/");
            dateTo = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
        }

        var Adata = [];
        var data = [];

        bcSdk.readData({
            key: key
        })
            .then(function (result) {

                if (result.response == "record was not found please check the EHRID!") {
                    return resolve({
                        status: 401,
                        data: result.response
                    })
                } else if (result.response == "No Records Were Found!") {
                    return resolve({
                        status: 404,
                        data: result.response
                    })

                } else {

                    var DATA = JSON.parse(result.response[0].data)

                    for (let i = 0; i < DATA.length; i++) {
                        var dtCheck = DATA[i].data.MEASURED_DATE;

                        var parts = dtCheck.split("/");
                        var dateCheck = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
                        var from = Date.parse(dateFrom);
                        var to = Date.parse(dateTo);
                        var check = Date.parse(dateCheck);
                        if ((check >= from && check <= to) == true) {
                            DATA[i].data.submittedOn = DATA[i].meta.submittedOn
                            DATA[i].data.ID = DATA[i].ID
                            Adata.push(DATA[i].data)
                        }
                    }

                    data.push({
                        "publishers": result.response[0].publishers,
                        "key": result.response[0].key,
                        "data": Adata,
                        "confirmations": result.response[0].confirmations,
                        "blocktime": result.response[0].blocktime,
                        "txid": result.response[0].txid,
                    })


                    return resolve({ /** sending response with with status */
                        status: 200,
                        data: data
                    })
                }
            })
            .catch(err => {

                logger.error(err);
                return reject({ /** throwing error*/
                    status: 500,
                    message: 'Something went wrong please try again later!!'
                });

            })
    })
};

/**
 * A module that reads data without date and period
 * @module readDataWithoutDate
 */

/** readDataWithoutDate */
exports.readDataWithoutDate = (key) => {
    return new Promise((resolve, reject) => {

        var data = [];
        bcSdk.readData({
            key: key
        })

            .then((result) => {

                if (result.response == "record was not found please check the EHRID!") {
                    return resolve({
                        status: 401,
                        data: result.response
                    })
                } else if (result.response == "No Records Were Found!") {
                    return resolve({
                        status: 404,
                        data: result.response
                    })

                } else {


                    var DATA = JSON.parse(result.response[0].data)

                    for (let i = 0; i < DATA.length; i++) {
                        if (DATA[i].hasOwnProperty("ID")) {
                            DATA[i].data.ID = DATA[i].ID
                            DATA[i].data.submittedOn = DATA[i].meta.submittedOn
                            data.push(DATA[i].data)
                        } else {

                            data.push(DATA[i].data)
                        }
                    }


                    return resolve({
                        status: 200,
                        data: data
                    })

                }
            })

            .catch(err => {

                return reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });

            })
    })
};


/**
 * A module that reads family data based on bhamash id
 * @module readProfileData
 */

/** readProfileData */



exports.readProfileData = (key) => {
    return new Promise((resolve, reject) => {

        bcSdk.readData({
            key: key
        })

            .then((requestarray) => {
                if (requestarray.response == "record was not found please check the EHRID!") {
                    return resolve({
                        status: 401,
                        data: requestarray.response
                    })
                } else if (requestarray.response == "No Records Were Found!") {
                    return resolve({
                        status: 404,
                        data: requestarray.response
                    })

                } else {
                    var data = JSON.parse(requestarray.response[0].data);
                    return resolve({
                        status: 200,
                        data: data
                    })
                }
            })

            .catch(err => {
                logger.error(err)
                return reject({
                    status: 500,
                    message: 'Something went wrong please try again later!!'
                });

            })
    })

};


exports.readfamilyData = (key) => {
    return new Promise(async (resolve, reject) => {

        let hell = await bcSdk.readData({
            key: key
        })
        try {
            if (hell.response == "record was not found please check the EHRID!") {
                return resolve({
                    "status": 401,
                    "data": hell.response
                })
            } else if (hell.response == "No Records Were Found!") {
                return resolve({
                    "status": 404,
                    "data": hell.response
                })

            } else {

                return resolve({
                    status: 200,
                    data: hell.response[0]
                })

            }

        }
        catch (err) {

            return reject({
                status: 500,
                message: hell.err
            });
        }

    })
};






/**
 * A module that reads data of all blocks on given key
 * @module auditTrial
 */

/** auditTrial */


exports.auditTrial = (key, fromDate, toDate) => {

    return new Promise((resolve, reject) => {
        logger.debug("key", key)
        logger.debug("entering into readLatest function.......!")
        var dateFrom;
        var dateTo;

        if (fromDate == "" || fromDate == undefined && toDate == "" || toDate == undefined) {

            var data = [];
            bcSdk.auditTrial({
                key: key
            })
                .then(function (result) {
                    logger.debug(result)
                    

                    for (let i = 0; i < result.response.length; i++) {
                        data.push(result.response[i])
                    }

                    logger.debug(data)
                    return resolve({
                        status: 200,
                        data: data
                    })
                })


                .catch(err => {

                    if (err.code == 401) {

                        return reject({
                            status: 401,
                            message: 'cant fetch record was not found please check the key!'
                        });

                    } else {
                        logger.error(err)

                        return reject({
                            status: 500,
                            message: 'Something went wrong please try again later!!'
                        });
                    }
                })
        } else if (toDate == "" || toDate == undefined) {



            dateFrom = fromDate;
            var dummydate2 = new Date(Date.now());

            dateTo = ((dummydate2.getMonth() + 1) + "/" + dummydate2.getDate() + "/" + dummydate2.getFullYear()).toString()
            var data = [];
            bcSdk.auditTrial({
                key: key
            })
                .then(function (result) {
                    logger.debug(result)


                    for (let i = 0; i < result.response.length; i++) {
                        var DATA = JSON.parse(result.response[i].data)
                        var resdate = new Date(dateFormat(DATA[i].meta.submittedOn, "mm/dd/yyyy"));
                        var dateCheck = ((resdate.getMonth() + 1) + "/" + resdate.getDate() + "/" + resdate.getFullYear()).toString()
                        var from = Date.parse(dateFrom);
                        var to = Date.parse(dateTo);
                        var check = Date.parse(dateCheck);
                        if ((check >= from && check <= to) == true) {

                            data.push(result.response[i])
                        }
                    }

                    logger.debug(data)

                    return resolve({
                        status: 200,
                        data: data
                    })
                })


                .catch(err => {

                    if (err.code == 401) {

                        return reject({
                            status: 401,
                            message: 'cant fetch record was not found please check the key!'
                        });

                    } else {
                        logger.error(err)

                        return reject({
                            status: 500,
                            message: 'Something went wrong please try again later!!'
                        });
                    }
                })
        } else {

            dateFrom = fromDate;

            dateTo = toDate;
            var data = [];
            bcSdk.auditTrial({
                key: key
            })
                .then(function (result) {
                    logger.debug(result)
                    for (let i = 0; i < result.response.length; i++) {
                        var DATA = JSON.parse(result.response[i].data)
                        var resdate = new Date(dateFormat(DATA[i].meta.submittedOn, "mm/dd/yyyy"));
                        var dateCheck = ((resdate.getMonth() + 1) + "/" + resdate.getDate() + "/" + resdate.getFullYear()).toString()
                        var from = Date.parse(dateFrom);
                        var to = Date.parse(dateTo);
                        var check = Date.parse(dateCheck);
                        if ((check >= from && check <= to) == true) {

                            data.push(result.response[i])
                        }
                    }

                    logger.debug(data)

                    return resolve({
                        status: 200,
                        data: share
                    })
                })

                .catch(err => {

                    if (err.code == 401) {

                        return reject({
                            status: 401,
                            message: 'cant fetch record was not found please check the key!'
                        });

                    } else {
                        logger.error(err)

                        return reject({
                            status: 500,
                            message: 'Something went wrong please try again later!!'
                        });
                    }
                })
        }
    })

};

/**
 * A module that reads data of family based on bhamash id
 * @module readFamilyProfileData
 */

/** readFamilyProfileData */

exports.readFamilyProfileData = (Bhamashahid) => {
    return new Promise((resolve, reject) => {

        logger.debug("entering into readFamilyProfileData function.......!")
        logger.debug("creating keys of familymembers")
        bcSdk.readFamilyMembers({
            Bhamashahid: Bhamashahid
        }).then((requestarray) => {
            if (requestarray.response == "record was not found please check the EHRID!") {
                return resolve({
                    status: 401,
                    "data": requestarray.response
                })
            } else if (requestarray.response == "No Records Were Found!") {
                return resolve({
                    status: 404,
                    data: requestarray.response
                })

            }


            var bcdata = requestarray.response;

            let keys = [...bcdata.keys()];

            var spl = ""
            var bmid = Bhamashahid
            var familymembersArray = []
            for (var i = 0; i < keys.length; i++) {


                var res = keys[i].split("_");
                if (bmid == res[0]) {
                    familymembersArray.push(bcdata.get(keys[i]))

                }
            }

            return resolve({
                status: 200,
                data: familymembersArray
            })


        })

            .catch(err => {
                return reject({
                    status: 500,
                    data: 'Something went wrong please try again later!!'
                });
            })

    })

};

/**
 * A module that maintain session
 * @module sessionAuntheticate
 */

/** sessionAuntheticate */
exports.sessionAuntheticate = (EHRID, SSO_ID) => {
    return new Promise((resolve, reject) => {
        var value = {
            SSO_ID: SSO_ID,
            key: EHRID
        }

        bcSdk.readData(value)
            .then(function (result) {

                if (result.response == "record was not found please check the EHRID!") {
                    return resolve({
                        "status": 401,
                        "message": result.response
                    })
                }
                var DATA = JSON.parse(result.response[0].data)
                if (SSO_ID == DATA.SSO_ID) {
                    return resolve({
                        "status": 200,
                        "message": DATA
                    })
                }
                else {
                    resolve({
                        status: 401,
                        "message": "please check the SSO_ID!"
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
