const fs = require('fs');

function getQuiz(uid){
    let data = fs.readFileSync('./model/quiz.json', 'utf-8');
    let quizs = JSON.parse(data);
    console.log(quizs)

    for (let quiz of quizs['Quiz']){
        console.log(quiz)
        if(quiz.uuid === uid){
            console.log("quiz sended");
            return quiz;
        }
    }
    return null;
}

exports.getQuiz = getQuiz;