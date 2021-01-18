

function errorLog(msg){

    const fs = require('fs');

    let logData="\n"

    let date = new Date(Date.now());

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if(hours.length === 1){

        hours = "0"+hours;

    }
    if(minutes.length === 1){

        minutes = "0"+minutes;

    }
    if(seconds.length === 1){

        seconds = "0"+seconds;

    }

    logData += hours+":"+minutes+":"+seconds+" [ERREUR] >> "+msg;

    fs.appendFileSync('./model/logs/error.log', logData, "utf-8");

    console.error(logData);

}

exports.logError = errorLog;