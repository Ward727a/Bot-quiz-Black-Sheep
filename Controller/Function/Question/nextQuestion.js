
const fs = require('fs');
const {setParticipateJSON} = require("../other/settingsFileVar");
const {participateJSON} = require("../other/settingsFileVar");
const {setLeaderboard} = require("../Quiz/leaderboard/setLeaderboard");

const {getQuiz} = require('../Quiz/getQuiz.js');
const {getPlayerInfo} = require('../Player/getPlayerInfo.js');
const {getQuestion} = require('./getQuestion.js');

function nextQuestion(playerID, quizID, channel, message, client){

    // FOR firstStep
    let playerDatas = getPlayerInfo(playerID, true);
    let playerData;

    // FOR secondStep
    let allData = participateJSON();
    let newData = "{\n" +
        '  "players":[\n'
    let index = 0;

    // FOR thirdStep
    let question
    let playerStep
    let quiz = getQuiz(quizID)
    let dateEnd = "";

    // firstStep

    for(let u of allData){

        index++

        if(u.quizID === quizID && u.memberID === playerID){

            const date = new Date(Date.now());

            u.step = u.step+1
            u.dateEnd = date.getDay()+":"+date.getMonth()+":"+date.getHours()+":"+date.getMinutes();
            dateEnd =  date.getDay()+":"+date.getMonth()+":"+date.getHours()+":"+date.getMinutes();
            playerStep = u.step

        }
        if(index !== 1) {
            newData += ",\n"
        }
        newData+=JSON.stringify(u)

        if(allData['players'].length === index){
            newData+="\n]\n}"
            setParticipateJSON(newData)
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

        let playerTime = playerData.dateJoin.split(':');
        let endPlayerTime = dateEnd.split(':');

        let startMonth = parseInt(playerTime[1])*43800;
        let endMonth = parseInt(endPlayerTime[1])*43800;
        let startDay = parseInt(playerTime[0])*1440;
        let endDay = parseInt(endPlayerTime[0])*1440;
        let startHour = parseInt(playerTime[2])*60;
        let endHour = parseInt(endPlayerTime[2])*60;
        let startMinute = parseInt(playerTime[3])+startHour+startDay+startMonth;
        let endMinute = parseInt(endPlayerTime[3])+endHour+endDay+endMonth;

        let month = 0;
        let day = 0;
        let hours = 0;
        let minutes;

        let totalMinutes = endMinute-startMinute;

        setLeaderboard(quizID, playerID, totalMinutes, client, message);

        while(totalMinutes>=60){
            totalMinutes-=60
            hours+=1;
            if(hours>=24){
                hours = 0;
                day+=1;
                if(day/1440 >= 1){
                    day = 1;
                    month+=1;
                }
            }
        }
        minutes = totalMinutes;
        if(minutes < 0){
            minutes = 0
        }


        channel.send('Bravo !\nVous avez terminé le questionnaire en '+month+' mois, '+day+' jours '+hours+'h et '+minutes+' minutes !');


        message.member.roles.add(endRole).then(console.log)
    }else {
        channel.send(question.question)
    }

}

exports.nextQuestion = nextQuestion;