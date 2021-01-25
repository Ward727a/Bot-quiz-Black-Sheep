const fs = require('fs');
const {participateJSON} = require("../other/settingsFileVar");

function getPlayerInfo(authorID, all){
    let quizIDAscent = []

    let datas = participateJSON();

    for(let data of datas){

        if(data.memberID === authorID){
            if(!all) {
                quizIDAscent.push(data.quizID);
            } else if(all){
                quizIDAscent.push(data);
            }
        }

    }

    return quizIDAscent;
}

exports.getPlayerInfo = getPlayerInfo;