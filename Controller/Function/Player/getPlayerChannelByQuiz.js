
const fs = require('fs');
const {participateJSON} = require("../other/settingsFileVar");

function getPlayerChannelByQuiz(quiz){
    let quizChannelAscent = []

    let datas = participateJSON();

    for(let data of datas){

        if(data.quizID === quiz){
            quizChannelAscent.push(data.channelID);
        }

    }

    return quizChannelAscent;
}

exports.getPlayerChannelByQuiz = getPlayerChannelByQuiz;