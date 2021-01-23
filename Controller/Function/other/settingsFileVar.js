
const fs = require("fs");

function hintJSON() {
    return JSON.parse(fs.readFileSync('./model/hint.json', 'utf-8'))['hints'];
}
function participateJSON(){
    return JSON.parse(fs.readFileSync('./model/participate.json', 'utf-8'))['players'];
}
function questionJSON(){
    return JSON.parse(fs.readFileSync('./model/question.json', 'utf-8'))['questions'];
}
function quizJSON(){
    return JSON.parse(fs.readFileSync('./model/quiz.json', 'utf-8'))['Quiz'];
}

function setHintJSON(data){
    fs.writeFileSync('./model/hint.json', data, 'utf-8');
}
function setParticipateJSON(data){
    fs.writeFileSync('./model/participate.json', data, 'utf-8');
}
function setQuestionJSON(data){
    fs.writeFileSync('./model/question.json', data, 'utf-8');
}
function setQuizJSON(data){
    fs.writeFileSync('./model/quiz.json', data, 'utf-8');
}


exports.hintJSON = hintJSON;
exports.participateJSON = participateJSON;
exports.questionJSON = questionJSON;
exports.quizJSON = quizJSON;

exports.setHintJSON = setHintJSON;
exports.setParticipateJSON = setParticipateJSON;
exports.setQuestionJSON = setQuestionJSON;
exports.setQuizJSON = setQuizJSON;