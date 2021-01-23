const {classPenalty} = require("../../../class/class_penalty");

const {setParticipateJSON} = require("../../other/settingsFileVar");
const {participateJSON} = require("../../other/settingsFileVar");
const {getMinuteTime} = require("../../other/getMinuteTime");

function addPenalty(playerUID, quizUID, hint){

    let penality = new classPenalty();

    penality.id = hint._id;
    penality.questionID = hint._uidQuestion;
    penality.time = getMinuteTime()+hint._penality;
    penality.reason = hint._penalityString;

    console.log(hint._penality);
    console.log(getMinuteTime())
    console.log(penality.time)

    let allData = participateJSON();

    let newData = '{\n  "players":[\n{}'

    for(const data of allData){

        newData+=",\n"

        if(data.memberID === playerUID){

            if(data.quizID === quizUID){

                data.penalty.push(penality);

            }

        }

        newData+=JSON.stringify(data);

    }

    newData+="\n]\n}"

    setParticipateJSON(newData);

    return true;

}

exports.addPenalty = addPenalty;