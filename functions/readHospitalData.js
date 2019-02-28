

'use strict';
var bcSdk = require('../sdk/query');
// logger integration
var log4js = require("log4js");
log4js.configure("./config/log4js.json");
var logger = log4js.getLogger("test-file-appender");
const oracledb = require('oracledb');

exports.readHospitalData = (EHRID, key1, period, req, medi, labtest, packageD) => {
    return new Promise(async function (resolve, reject) {
        function pad(number, length) {
            var str = String(number);
            return (str.length >= length) ? str : (new Array(length - str.length + 1).join('0')) + str;
        }

        var dateFrom;
        var dateTo;
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



        var aData = [];
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
                'status': 401,
                'data': "please check the Ehrid"
            })
        }
        if (count1[0][0] == 0) {
            return resolve({
                'status': 404,
                'data': "No Hospital records for this Ehrid"
            })
        }

        let multi;
        var count = count1[0][0]
        
        for (let i = 8; i < count; i++) {
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
                    var dtCheck = DATA[0].ENCOUNTERDETAILS.ADDMISSION_DATE;
                    var parts = dtCheck.split("/");
                    var dateCheck = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));

                    var from = Date.parse(dateFrom);
                    var to = Date.parse(dateTo);
                    var check = Date.parse(dateCheck);
                    var filteredData;
                    if ((check >= from && check <= to) == true) {
                        var packageDetails = []
                        var LabResults = []
                        var Medications = []
                        var meddata;
                        var labdata;
                        var packageData;

                        if (medi == "yes") {

                            if (DATA[0].ENCOUNTERDETAILS.Medications.Medicine.length == 0) {
                                Medications.length = 0;

                            } else if (DATA[0].ENCOUNTERDETAILS.Medications.Medicine.length >= 1) {

                                for (let a = 0; a < DATA[0].ENCOUNTERDETAILS.Medications.Medicine.length; a++) {
                                    if (DATA[0].ENCOUNTERDETAILS.Medications.Medicine[a].DRUG_DESCRIPTION == null) {
                                      
                                        meddata = [];
                                    } else {
                                        Medications.push(DATA[0].ENCOUNTERDETAILS.Medications.Medicine[a])
                                        meddata = {
                                            "MatsterStatus": DATA[0].ENCOUNTERDETAILS.Medications.MatsterStatus,
                                            "Medicine": Medications
                                        }
                                    }
                                }
                            }

                        }
                        if (labtest == "yes") {
                            if (DATA[0].ENCOUNTERDETAILS.LabResults.reports.length == 0) {
                                LabResults.length = 0;
                            }
                            else if (DATA[0].ENCOUNTERDETAILS.LabResults.reports.length >= 1) {
                                for (let b = 0; b < DATA[0].ENCOUNTERDETAILS.LabResults.reports.length; b++) {
                                    if (DATA[0].ENCOUNTERDETAILS.LabResults.reports[b].TEST_NAME == null) {
                                        labdata = [];
                                    } else {
                                        LabResults.push(DATA[0].ENCOUNTERDETAILS.LabResults.reports[b])
                                        labdata = {
                                            "MatsterStatus": DATA[0].ENCOUNTERDETAILS.LabResults.MasterStatus,
                                            "reports": LabResults
                                        }
                                       
                                    }

                                }
                            }
                        }



                        if (packageD == "yes") {
                            packageDetails.push(DATA[0].ENCOUNTERDETAILS.packageDetails)
                        }

                        filteredData = {
                            "ENCOUNTERDETAILS": {
                                "EHRID": DATA[0].ENCOUNTERDETAILS.EHRID,
                                "HOSPITAL_NAME": DATA[0].ENCOUNTERDETAILS.HOSPITAL_NAME,
                                "ADDMISSION_DATE": dtCheck,
                                "DISCHARGE_DATE": dis,
                                "PATIENT_NAME": DATA[0].ENCOUNTERDETAILS.PATIENT_NAME,
                                "ENCOUNTERTYPE": DATA[0].ENCOUNTERDETAILS.ENCOUNTERTYPE,
                                "ENCOUNTER_SPECIALITY": DATA[0].ENCOUNTERDETAILS.ENCOUNTER_SPECIALITY,
                                "TID": DATA[0].ENCOUNTERDETAILS.TID,
                                "ENCOUNTERDETAILS_MasterStatus": DATA[0].ENCOUNTERDETAILS.ENCOUNTERDETAILS_MasterStatus,
                                "packageDetails": packageDetails,
                                "LabResults": labdata,
                                "Medications": meddata
                            }
                        }

                        aData.push(filteredData)

                    } else {
                        
                    }

                    if (i === count - 1) {
                        return resolve({
                            status: 200,
                            data: aData
                        })
                    }

                }

            }
            catch (err) {
                logger.error(err)
                return reject(err)
            }
        }

    })
};
