const {classPenalty} = require("../../../class/class_penalty");

const {participateJSON} = require("../../other/settingsFileVar");
const {getMinuteTime} = require("../../other/getMinuteTime");

function getPenalty(playerID, quizUID, completeProcess = false, questionRestricted =""){

    let nTime = getMinuteTime();
    let allData = participateJSON();

    console.log(nTime);

    let penalties = [classPenalty];
    let tempPenalties = [classPenalty];

    if(questionRestricted === "") {

        for (const data of allData) {

            if (data.memberID === playerID && data.quizID === quizUID) {

                penalties = data.penalty;
                break;
            }

        }

    } else {

        for (let data of allData) {

            if (data.memberID === playerID && data.quizID === quizUID) {

                tempPenalties = data.penalty;
                break;
            }

        }
        if(tempPenalties.length === 0) return false;
        for(let data of tempPenalties){
            if(data['questionID'] === questionRestricted){

                penalties.push(data);

            }

        }

    }

    if(penalties.length !== 0){

        if(completeProcess) {
            for (const data of penalties) {

                if (data['time'] > nTime) {

                    return {'time': data['time'] - nTime, 'reason': data['reason']};

                }

            }
        } else {

            return penalties;

        }

        return false;

    } else {

        return false;

    }

}

exports.getPenalty = getPenalty;