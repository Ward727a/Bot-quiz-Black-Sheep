const fs = require('fs');

function getQuiz(uid){
    let data = fs.readFileSync('./model/quiz.json', 'utf-8');
    let quizs = JSON.parse(data);

    for (let quiz of quizs['Quiz']){
        if(quiz.uuid === uid){
            return quiz;
        }
    }
    return null;
}

exports.getQuiz = getQuiz;