

'use strict';
var bcSdk = require('../sdk/query');
// logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");
const oracledb = require('oracledb');

exports.readHospitalSummary = (EHRID, key1, period) => {
    return new Promise(async function (resolve, reject) {
        function pad(number, length) {
            var str = String(number);
            return (str.length >= length) ? str : (new Array(length - str.length + 1).join('0')) + str;
        }



        var dateFrom;
        var dateTo;
        /**checking condition for filtering data based on period */
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




        var aData = [];
        var dates = [];
        var data = [];


        let connection;
        let count1;
        let result;

        try {
            connection = await oracledb.getConnection({
                user: "EHRBCSTAGE",
                password: "test123test",
                connectString: "exa03-scan.rajasthan.gov.in:1521/BMSTAGE"
            });
            result = await connection.execute(`select HOSPITAL_RECORDS_COUNT from KEYSTORE where EHRID =:EHRID`, [EHRID])
            count1 = result.rows
        } catch (err) {
            logger.error(err);

        } finally {
            connection.release();
        }


        if (count1.length == 0) {
            return resolve({
                'status': 200,
                'data': "please check the EHRID"
            })
        }
        if (count1[0][0] == 0) {
            return resolve({
                'status': 200,
                'data': "no summary for the EHRID"
            })
        }
        let multi;
        var count = count1[0][0]
       
        for (let i = 0; i < count; i++) {
            var Key = key1 + "_" + i

          
            try {
                multi = await bcSdk.readData({
                    key: Key
                })

                if (multi.response == "record was not found please check the EHRID!") {
                    return resolve({
                        status: 401,
                        data: multi.response
                    })
                } else if (multi.response == "No Records Were Found!") {
                    return resolve({
                        status: 404,
                        data: multi.response
                    })

                } else {
                    var DATA = JSON.parse(multi.response[0].data)
                    var addmission = DATA[0].ENCOUNTERDETAILS.ADDMISSION_DATE.split('/');
                    var dtCheck = pad(addmission[1], 2) + '/' + pad(addmission[0], 2) + '/' + addmission[2];
                    var discharge = DATA[0].ENCOUNTERDETAILS.DISCHARGE_DATE.split('/');
                    var dis = pad(discharge[1], 2) + '/' + pad(discharge[0], 2) + '/' + discharge[2];
                    var parts = dtCheck.split("/");
                    var dateCheck = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));

                    var from = Date.parse(dateFrom);
                    var to = Date.parse(dateTo);
                    var check = Date.parse(dateCheck);
                    var filteredData;
                    if ((check >= from && check <= to) == true) {

                        filteredData = {
                            "ENCOUNTERDETAILS": {
                                "HOSPITAL_NAME": DATA[0].ENCOUNTERDETAILS.HOSPITAL_NAME,
                                "ADDMISSION_DATE": dtCheck,
                                "DISCHARGE_DATE": dis
                            }
                        }

                        aData.push(filteredData)
                        dates.push(filteredData.ENCOUNTERDETAILS.ADDMISSION_DATE)




                    } else {
                       
                    }

                    if (i === count - 1) {
                       
                        var hell = aData.sort(function (a, b) {
                            var aa = a.ENCOUNTERDETAILS.ADDMISSION_DATE.split('/').reverse().join(),
                                bb = b.ENCOUNTERDETAILS.ADDMISSION_DATE.split('/').reverse().join();
                            return aa > bb ? -1 : (aa < bb ? 1 : 0);
                        });
                        return resolve({
                            status: 200,
                            data: hell[0]
                        })
                    }

                }

            }
            catch (err) {
                return reject(err)
            }
        }

    })
};
