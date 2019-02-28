module.exports = {
    loginCount: loginCount,
    updateAPIsTime: updateAPIsTime,
    successCount: successCount,
    deviceCount: deviceCount,
    medicalCount: medicalCount,
    shareCount: shareCount
};
var sqlQuery = require("../sdk/sqlQuery");
var queryExcute = require("../models/queryExcute")


function loginCount(EHRID) {

    var params = [EHRID]
    queryExcute.dbconfig(sqlQuery.loginCount, params).then((connection) => {

        return connection;
    })

}

function updateAPIsTime(widgetName, process, time) {


    switch (process) {
        case "add":
            var params = [time, widgetName]
            queryExcute.dbconfig(sqlQuery.addAPIs, params).then((connection) => {

            })
            break;

        case "read":
            var params = [time, widgetName]
            queryExcute.dbconfig(sqlQuery.readAPIs, params).then((connection) => {

            })
            break;
        case "update":
            var params = [time, widgetName]
            queryExcute.dbconfig(sqlQuery.updateAPIs, params).then((connection) => {

            })

            break;
        case "delete":
            var params = [time, widgetName]
            queryExcute.dbconfig(sqlQuery.delateAPIs, params).then((connection) => {

            })

            break;
        case "summary":
            var params = [time, widgetName]
            queryExcute.dbconfig(sqlQuery.summaryAPIs, params).then((connection) => {

            })

            break;

        default:
            break;
    }

}

function successCount(WIDGETNAME, result, process) {

    switch (process) {
        case "add":
            var params = [WIDGETNAME];
            if (result === 200) {
                queryExcute.dbconfig(sqlQuery.addSuccessCount, params).then((connection) => {

                });
            } else if (result === 400 || result === 401 || result === 404) {
                queryExcute.dbconfig(sqlQuery.addFailureCount, params).then((connection) => {

                });
            }
            break;

        case "read":
            var params = [WIDGETNAME];
            if (result === 200) {


                queryExcute.dbconfig(sqlQuery.readSuccessCount, params).then((connection) => {

                })
            } else if (result === 400 || result === 401 || result === 404) {
                queryExcute.dbconfig(sqlQuery.readFailureCount, params).then((connection) => {

                })
            }
            break;
        case "update":
            var params = [WIDGETNAME]
            if (result == 200) {
                queryExcute.dbconfig(sqlQuery.updateSuccessCount, params).then((connection) => {

                })
            } else if (result == 400 || result == 401 || result == 404) {
                queryExcute.dbconfig(sqlQuery.updateFailureCount, params).then((connection) => {

                })
            }
            break;
        case "delete":
            var params = [WIDGETNAME]
            if (result == "200") {
                queryExcute.dbconfig(sqlQuery.deleteSuccessCount, params).then((connection) => {

                })
            } else if (result == 400 || result == 401 || result == 404) {
                queryExcute.dbconfig(sqlQuery.deleteFailureCount, params).then((connection) => {

                })
            }
            break;
        case "summary":
            var params = [WIDGETNAME]
            if (result == "200") {
                queryExcute.dbconfig(sqlQuery.summarySuccessCount, params).then((connection) => {

                })
            } else if (result == 400 || result == 401 || result == 404) {
                queryExcute.dbconfig(sqlQuery.summaryFailureCount, params).then((connection) => {

                })
            }
            break;

        default:
            break;
    }




}

function deviceCount(process) {
    switch (process) {
        case "mobile":
            var params = ['MOBILE'];
            queryExcute.dbconfig(sqlQuery.deviceCount, params).then((connection) => {

                return connection;
            })

            break;

        case "desktop":
            var params = ['DESKTOP'];
            queryExcute.dbconfig(sqlQuery.deviceCount, params).then((connection) => {

                return connection;
            })
            break;

        default:
            break;
    }
}

function medicalCount(process) {
    switch (process) {
        case "friend":
            var params = [];
            queryExcute.dbconfig(sqlQuery.friend, params).then((connection) => {
                console.log(connection)
                return connection;
            })

            break;

        case "medical":
            var params = [];
            queryExcute.dbconfig(sqlQuery.doctor, params).then((connection) => {
                console.log("connection", connection)
                return connection;
            })
            break;

        default:
            break;
    }
}

function shareCount(EHRID) {
    return new Promise((resolve) => {

        var params = [EHRID];
        queryExcute.dbconfig(sqlQuery.addShareCount, params).then((connection) => {
            var params = [EHRID];
            queryExcute.dbconfig(sqlQuery.getShareCount, params).then((connection) => {
                return resolve({
                    id: connection.result[0][0],
                });
            })
        })
    })

}