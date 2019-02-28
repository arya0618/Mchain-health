
'use strict';
var time = require("./time");
var scedule=require("./scedule");
var CronJob = require('cron').CronJob;
var date = time.time()

var job = new CronJob('0 0 * * *', function() {
        console.log(date);
        job.stop();
    }, async function(){
        console.log("sceduling  of data starts here")

         let sceduller = await scedule.run()

        job.start()
    },


    true, /* Start the job right now */
    "Asia/Kolkata"
)