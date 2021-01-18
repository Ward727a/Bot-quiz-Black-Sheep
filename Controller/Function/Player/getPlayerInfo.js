const fs = require('fs');

function getPlayerInfo(authorID, all){
    let quizIDAscent = []

    let datas = JSON.parse(fs.readFileSync('./model/participate.json', 'utf-8'));

    for(let data of datas['players']){

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