
const fs = require('fs');

function getPlayerChannelByQuiz(quiz){
    let quizChannelAscent = []

    let datas = JSON.parse(fs.readFileSync('./model/participate.json', 'utf-8'));

    for(let data of datas['players']){

        if(data.quizID === quiz){
            quizChannelAscent.push(data.channelID);
        }

    }

    return quizChannelAscent;
}

exports.getPlayerChannelByQuiz = getPlayerChannelByQuiz;