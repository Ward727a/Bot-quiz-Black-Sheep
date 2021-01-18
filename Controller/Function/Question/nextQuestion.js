
const fs = require('fs');
const {setLeaderboard} = require("../Quiz/leaderboard/setLeaderboard");

const {getQuiz} = require('../Quiz/getQuiz.js');
const {getPlayerInfo} = require('../Player/getPlayerInfo.js');
const {getQuestion} = require('./getQuestion.js');

function nextQuestion(playerID, quizID, channel, message, client){

    // FOR firstStep
    let playerDatas = getPlayerInfo(playerID, true);
    let playerData;

    // FOR secondStep
    let allData = JSON.parse(fs.readFileSync('./model/participate.json', 'utf-8'));
    let newData = "{\n" +
        '  "players":[\n'
    let index = 0;

    // FOR thirdStep
    let question
    let playerStep
    let quiz = getQuiz(quizID)
    let dateEnd = "";

    // firstStep

    for(let u of allData['players']){

        index++

        if(u.quizID === quizID && u.memberID === playerID){

            const date = new Date(Date.now());

            u.step = u.step+1
            u.dateEnd = date.getHours()+":"+date.getMinutes();
            dateEnd =  date.getHours()+":"+date.getMinutes();
            playerStep = u.step

        }
        if(index !== 1) {
            newData += ",\n"
        }
        newData+=JSON.stringify(u)

        if(allData['players'].length === index){
            newData+="\n]\n}"
            fs.writeFileSync('./model/participate.json', newData, 'utf-8')
        }

    }

    // secondStep

    for(let u of playerDatas){

        if(u.quizID === quizID){

            playerData = u

        }

    }

    // thirdStep
    question = getQuestion(quizID, false, playerStep, "");

    if(question.question === undefined) {
        let endRole = message.guild.roles.cache.find(roleData => roleData.id === quiz.roleIDEnd)

        if(endRole === undefined) return;

        let startHour = parseInt(playerData.dateJoin.split(':')[0])*60;
        let endHour = parseInt(dateEnd.split(':')[0])*60;
        let startMinute = parseInt(playerData.dateJoin.split(':')[1])+startHour;
        let endMinute = parseInt(dateEnd.split(':')[1])+endHour;

        let hours = 0;
        let minutes;

        let totalMinutes = endMinute-startMinute;

        setLeaderboard(quizID, playerID, totalMinutes, client, message);

        while(totalMinutes>=60){
            totalMinutes-=60
            hours+=1;
        }
        minutes = totalMinutes;
        if(minutes < 0){
            minutes = 0
        }


        channel.send('Bravo !\nVous avez terminé le questionnaire en '+hours+'h et '+minutes+' minutes !');


        message.member.roles.add(endRole).then(console.log)
    }else {
        channel.send(question.question)
    }

}

exports.nextQuestion = nextQuestion;