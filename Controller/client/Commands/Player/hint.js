const {getLang} = require("../../../Function/other/lang/getLangString");
const {getHint} = require("../../../Function/Hint/getHint");
const {getPenalty} = require("../../../Function/Player/Penalty/getPenalty");
const {getQuestion} = require("../../../Function/Question/getQuestion");
const {participateJSON} = require("../../../Function/other/settingsFileVar");
const {addPenalty} = require("../../../Function/Player/Penalty/addPenalty");

function hint(author, message, channel){

    let lang = getLang('hint');

    let allData = participateJSON();
    let quizID;
    let questionStep;
    let hint;

    for(const data of allData){

        if(data.channelID === channel.id && data.memberID === author.id){

            quizID = data.quizID;
            questionStep = data.step;
            break;
        }

    }

    let question = getQuestion(quizID, false, questionStep);

    let penalty = getPenalty(author.id, quizID, false, question.uid);

    if(penalty === false){
        hint = getHint(0, question['uid']);

    } else {
        hint = getHint(penalty.length, question['uid']);

    }

    if(hint === null){
        channel.send(lang['allHintUsed']);
        return;

    }
    channel.send(hint._content);
    channel.send(hint._penalityString.replace('%time%', hint._penality).replace('%name%', author.username));

    addPenalty(author.id, quizID, hint);

}

exports.hint = hint;