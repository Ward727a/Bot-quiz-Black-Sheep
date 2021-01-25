

function infoLog(msg, useConsole){

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

    logData += hours+":"+minutes+":"+seconds+" [INFO] >> "+msg;

    fs.appendFileSync('./model/JSON/logs/info.log', logData, "utf-8");

    if(useConsole === true) {
        console.log(logData);
    }

}

exports.logInfo = infoLog;