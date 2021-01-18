const fs = require('fs');

function isQuestionChannel(channelID, getQuiz, getQuestionStep){
    let data = fs.readFileSync('./model/participate.json', 'utf-8')
    let players = JSON.parse(data);

    for(let player of players['players']){

        if(player.channelID === channelID){
            if(getQuiz){
                return player.quizID
            } else if(getQuestionStep){
                return player.step
            }
            return true;
        }

    }

}

exports.isQuestionChannel = isQuestionChannel;