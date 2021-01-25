const fs = require('fs');
const {quizJSON} = require("../other/settingsFileVar");

function getQuiz(uid){
    let data = quizJSON()

    for (let quiz of data){
        if(quiz.uuid === uid){
            return quiz;
        }
    }
    return null;
}

exports.getQuiz = getQuiz;