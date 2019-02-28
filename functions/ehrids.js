var ehrids = require("../models/queryExcute")
var sqlQuery = require("../sdk/sqlQuery");
var uniqid = require('uniqid');
const addData = require('../functions/addData');



exports.verifyAndAddUser = (inputBhamasha, inputMemberID, inputSsoId, inputEHRID) => {
    return new Promise((resolve, reject) => {

        if (inputSsoId != "") {
            //Death Condition Check
            var queryParams = [inputBhamasha, inputSsoId]
            ehrids.dbconfig(sqlQuery.died, queryParams).then((get) => {

                if (get.result.length == 0) {
                    //Death condition Failure
                    //Marriage condition Check
                    var queryParams = [inputSsoId]
                    ehrids.dbconfig(sqlQuery.marriage, queryParams).then((get) => {
                        if (get.result.length != 0) {
                            //Marriage Condition success and update user
                            var marriageEHRID = get.result[0][4]
                            var queryParams = [inputBhamasha, inputMemberID, 'ACTIVE', inputSsoId]
                            ehrids.dbconfig(sqlQuery.updateMarriagedUser, queryParams).then((get) => {


                                if (get.code == 201) {
                                    get.EHRID = marriageEHRID
                                    return resolve(get)
                                } else {
                                    return reject(get)
                                }
                            })
                        } else {
                            //Marriage condition Failure and check the user 
                            var queryParams = [inputBhamasha, inputMemberID]
                            ehrids.dbconfig(sqlQuery.migration, queryParams).then((get) => {
                                if (get.result.length == 0) {
                                    // New User Add user Details
                                    var queryParams = [inputBhamasha, inputMemberID, inputSsoId, inputEHRID, '', 1, 0, 'ACTIVE',0]
                                    ehrids.dbconfig(sqlQuery.newuser, queryParams).then((get) => {


                                        if (get.code == 201) {
                                            get.EHRID = inputEHRID
                                            return resolve(get)
                                        } else {
                                            return reject(get)
                                        }
                                    })
                                } else {
                                    // User exist so Update the users SSOID
                                    var userEHRID = get.result[0][4]

                                    var queryParams = [inputSsoId, inputBhamasha, inputMemberID]
                                    ehrids.dbconfig(sqlQuery.updateUser, queryParams).then((get) => {
                                        if (get.code == 201) {
                                            get.EHRID = userEHRID
                                            return resolve(get)
                                        } else {
                                            return reject(get)
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    //Death condition update
                    var dethEHRID = get.result[0][4]
                    var queryParams = [inputMemberID, inputBhamasha, inputSsoId]
                    ehrids.dbconfig(sqlQuery.updateDeadUser, queryParams).then((get) => {

                        if (get.code == 201) {
                            get.EHRID = dethEHRID
                            return resolve(get)
                        } else {
                            return reject(get)
                        }
                    })
                }
            })
        } else {
            // No SSOID for user so check user exist r not
            var queryParams = [inputBhamasha, inputMemberID]
            ehrids.dbconfig(sqlQuery.migration, queryParams).then((get) => {
                if (get.result.length == 0) {
                    // New User
                    var queryParams = [inputBhamasha, inputMemberID, inputSsoId, inputEHRID, '', 1, 0, 'ACTIVE',0]
                    ehrids.dbconfig(sqlQuery.newuser, queryParams).then((get) => {
                        if (get.code == 201) {
                            get.EHRID = inputEHRID
                            return resolve(get)
                        } else {
                            return reject(get)
                        }
                    })
                } else {
                    // User found 

                    if (get.code == 201) {
                        return resolve(get)
                    } else {
                        return reject(get)
                    }
                }
            })
        }
    })

}

var DB_Member_Ids = [];

exports.addMembers = (userList, user_Member_Ids) => {
    return new Promise((resolve, reject) => {

        var queryParams = [userList[0].BHAMASHAHID, 'ACTIVE']
        ehrids.dbconfig(sqlQuery.getMemberIds, queryParams).then((get) => {

            for (var j = 0; j < get.result.length; j++) {
                DB_Member_Ids.push(get.result[j][0])
            }
            uniqueMember(DB_Member_Ids, user_Member_Ids, function (result) {

                DB_Member_Ids = [];
                if (result.length != 0) {
                    var x = 0;
                    var loopArray = function (arr) {
                        removeUser(userList[0].BHAMASHAHID, arr[x], function (code) {
                            if (code == 201) {
                                x++;
                                if (x < arr.length) {
                                    loopArray(arr);
                                } else {
                                    return resolve({
                                        "status": 200,
                                        "message": "Family Members Details Saved Suscessfully"
                                    })
                                }
                            } else {
                                reject({
                                    "status": 400,
                                    "message": "Check DB Connection"
                                })
                            }
                        });
                    }
                    loopArray(result);
                } else {
                    return resolve({
                        "status": 200,
                        "message": "Family Members Details Saved Suscessfully"
                    })
                }
            })
        })
    })

}

function uniqueMember(B_Member_Ids, user_Member_Ids, callback) {

    var unique = [];


    for (var i = 0; i < B_Member_Ids.length; i++) {
        var found = false;

        for (var j = 0; j < user_Member_Ids.length; j++) { // j < is missed;
            if (B_Member_Ids[i] == user_Member_Ids[j]) {
                found = true;
                break;
            }
        }
        if (found == false) {
            unique.push(B_Member_Ids[i]);
        }
    }
    callback(unique)
}

function removeUser(BHAMASHAHID, MEMBER_ID, callback) {

    var queryParams = ['INACTIVE', BHAMASHAHID, MEMBER_ID]
    ehrids.dbconfig(sqlQuery.statusChange, queryParams).then((get) => {

        if (get.code == 201) {
            callback(get.code);
        }

    })

}