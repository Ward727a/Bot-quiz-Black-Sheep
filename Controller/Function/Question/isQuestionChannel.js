const fs = require('fs');
const {participateJSON} = require("../other/settingsFileVar");

function isQuestionChannel(channelID, getQuiz, getQuestionStep){
    let data = participateJSON()

    for(let player of data){

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