const fs = require('fs');
const {questionJSON} = require("../other/settingsFileVar");

function getQuestion(uid, last, id, qUID){
    let data = questionJSON();
    let lastQuestion = "";
    let arrayQuestion = []
    let index = 0

    for (let question of data){
        if(qUID !== "" || qUID !== undefined){
            index++
            console.log(qUID);

            if(qUID === question.uid){
                return question;
            }

        }

        if(question.uidQuiz === uid){
            if(id !== -1){
                if(question.id === id){
                    return question;
                }
            }
            if(last){
                if(lastQuestion === ""){
                    lastQuestion = question;
                } else if(lastQuestion['id'] < question.id){
                    lastQuestion = question;
                }
            } else {
                arrayQuestion.push(question);
            }
        }

    }
    if(last){
        return lastQuestion;
    }
    return arrayQuestion
}

exports.getQuestion = getQuestion;