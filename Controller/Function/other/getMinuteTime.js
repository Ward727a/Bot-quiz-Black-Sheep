function getMinuteTime(){

    let date = new Date(Date.now());

    let month = date.getUTCMonth()*43800;
    let day = date.getUTCDay()*1440;
    let hour = date.getUTCHours()*60;
    return parseInt(date.getUTCMinutes()+hour+day+month);

}

exports.getMinuteTime = getMinuteTime;