
const fs = require("fs");
const {var_guildGet} = require('../../value/var_guild');

let road = "./model/JSON/";

function initRoadFile() {
    const guild = var_guildGet();
    road = './model/JSON/' + guild.uidGuild + '/';
}

function config(){
    return JSON.parse(fs.readFileSync('./model/JSON/config.json'), 'utf-8');
}
function hintJSON() {
    initRoadFile()
    return JSON.parse(fs.readFileSync(road+'hint.json', 'utf-8'))['hints'];
}
function participateJSON(){
    initRoadFile()
    return JSON.parse(fs.readFileSync(road+'participate.json', 'utf-8'))['players'];
}
function questionJSON(){
    initRoadFile()
    return JSON.parse(fs.readFileSync(road+'question.json', 'utf-8'))['questions'];
}
function quizJSON(){
    initRoadFile()
    return JSON.parse(fs.readFileSync(road+'quiz.json', 'utf-8'))['Quiz'];
}
function guildJSON(){
    initRoadFile()
    return JSON.parse(fs.readFileSync('./model/JSON/guilds.json', 'utf-8'))['guilds'];
}

function setHintJSON(data){
    initRoadFile()
    fs.writeFileSync(road+'hint.json', data, 'utf-8');
}
function setParticipateJSON(data){
    initRoadFile()
    fs.writeFileSync(road+'participate.json', data, 'utf-8');
}
function setQuestionJSON(data){
    initRoadFile()
    fs.writeFileSync(road+'question.json', data, 'utf-8');
}
function setQuizJSON(data){
    initRoadFile()
    fs.writeFileSync(road+'quiz.json', data, 'utf-8');
}
function setGuildJSON(data){
    initRoadFile()
    fs.writeFileSync('./model/JSON/guilds.json', data, 'utf-8');
}

exports.getConfig = config;

exports.hintJSON = hintJSON;
exports.participateJSON = participateJSON;
exports.questionJSON = questionJSON;
exports.quizJSON = quizJSON;
exports.guildJSON = guildJSON;

exports.setHintJSON = setHintJSON;
exports.setParticipateJSON = setParticipateJSON;
exports.setQuestionJSON = setQuestionJSON;
exports.setQuizJSON = setQuizJSON;
exports.setGuildJSON = setGuildJSON;