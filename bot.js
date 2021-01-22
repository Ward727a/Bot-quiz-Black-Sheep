
const Discord = require('discord.js');
const fs = require('fs');

const config = require('./model/config.json');
const {initLang} = require("./Controller/Function/other/lang/initLang");
const client = new Discord.Client();

const { v4: uuidv4 } = require('uuid');

const {removeQuestions} = require("./Controller/client/Commands/Questions/removeQuestion");
const {qSetup} = require("./Controller/client/Commands/Admin/qsetup");
const {qLeave} = require("./Controller/client/Commands/Quiz/qLeave");
const {qJoin} = require("./Controller/client/Commands/Quiz/qJoin");
const {qReset} = require("./Controller/client/Commands/Admin/qreset");
const {setup} = require("./Controller/client/Commands/setup");
const {questionList} = require("./Controller/client/Commands/Questions/questionList");
const {qList} = require("./Controller/client/Commands/Quiz/qList");
const {qHelp} = require("./Controller/client/Commands/Admin/qhelp");
const {qRemove} = require("./Controller/client/Commands/Quiz/qRemove");
const {newHint} = require('./Controller/client/Commands/Hint/newHint');

const {hasRole} = require("./Controller/Function/Player/hasRole");
const {getPlayerInfo} = require('./Controller/Function/Player/getPlayerInfo');

const {getQuestion} = require('./Controller/Function/Question/getQuestion');
const {isQuestionChannel} = require('./Controller/Function/Question/isQuestionChannel');
const {nextQuestion} = require('./Controller/Function/Question/nextQuestion');
const {registerQuestion} = require('./Controller/Function/Question/registerQuestion');

const {getLang} = require('./Controller/Function/other/lang/getLangString');

const {registerQuiz} = require('./Controller/Function/Quiz/registerQuiz');

const {logInfo} = require("./Controller/Function/LOG/logInfo");
const {logError} = require("./Controller/Function/LOG/logError");

const {Quizz} = require('./Controller/class/Quizz.js');
const {C_question} = require('./Controller/class/c_question');
const {classHint} = require('./Controller/class/class_hint');

const prefix = config.PREFIX;
const comment = config.COMMENT;

let newQuiz = [];
let newQuestion = [];
let newHintList = [];

let lang = null;

client.on("ready", function (){

    initLang();

    lang = getLang('main');

});

// CREATION QUIZ ET QUESTION
client.on("message", function (message){
    let valid;
    let item;

    if (message.author.bot) return;
    if (message.content.charAt(0) === prefix) return;

    if(isQuestionChannel(message.channel.id, false, false)){

        if(message.content.charAt(0) === comment) return;

        let questionStep = isQuestionChannel(message.channel.id, false, true)
        let quiz = isQuestionChannel(message.channel.id, true, false)
        let question = getQuestion(quiz, false, questionStep, "")
        let playerDatas = getPlayerInfo(message.author.id, true);
        let playerData

        const channel = client.channels.cache.get(message.channel.id);

        for(let u of playerDatas){
            if(u.quizID === quiz){
                playerData = u;
            }
        }
        if(question['response'] === undefined){
            let questionChannel = client.channels.cache.get(playerData.channelID)
            questionChannel.send(lang['quizAlreadyFinished']);
        } else {
            if (message.content.toUpperCase() === question['response'].toUpperCase()) {
                let questionChannel = client.channels.cache.get(playerData.channelID)
                nextQuestion(message.author.id, quiz, questionChannel, message, client);
            } else {
                channel.send(question['falseResponse']);
            }
        }

    }

    for (const items of newQuiz) {
        if (items.author === message.author.id && items.creatingStep !== 1) {
            valid = 1;
            if (items.uuid == null) {

                items.uuid = uuidv4();

            }

            item = items;
            break;
        }
    }
    for (const items of newQuestion) {
        if (items.author === message.author && items.creatingStep !== 3) {
            valid = 2;

            item = items;
        }
    }

    const channel = client.channels.cache.get(message.channel.id);

    switch (valid) {
        case 1:
            switch (item.creatingStep) {
                case 0:
                    item.title = message.content;
                    item.creatingStep += 1;
                    registerQuiz(item)
                    message.reply(lang['quizTitleSet'].replace('%titleQuiz%', item.title).replace('%uidQuiz%', item.uuid)).then();
                    break;

            }
            break;
        case 2:
            switch (item.creatingStep) {
                case 0:
                    item.question = message.content;
                    item.creatingStep += 1;

                    channel.send(lang['questionContentSet'].replace('%questionContent%', item.question));
                    break;
                case 1:
                    item.response = message.content;
                    item.creatingStep += 1;
                    channel.send(lang['questionResponseSet'].replace('%questionResponse%', item.response));
                    break;
                case 2:
                    item.falseResponse = message.content;
                    item.creatingStep += 1;
                    channel.send(lang['questionFalseSet'].replace('%questionFalse%', item.falseResponse));
                    registerQuestion(item);
                    break;

            }
    }
});


// COMMANDS
client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const author = message.author;
    const channel = client.channels.cache.get(message.channel.id);

    let quiz

    switch(command){
        case "setup":

            setup(message,channel);

            break;
        case "qreset":

            qReset(message, channel, fs);

            break;
        case "qjoin":

            qJoin(args, message, channel, author, client);

            break;
        case "qleave":

            qLeave(channel, message, args, author);

            break;
        case "qsetup":

            qSetup(message, channel, fs, client, args);

            break;
        case 'qremove':

            qRemove(message, args);

            break;
        case "newquiz":
            if (!hasRole(message, "canCreateQuiz")) return;

            quiz = new Quizz();

            quiz.author = message.author.id;

            newQuiz.push(quiz);

            message.reply(lang['quizBeginCreate']).then(r => logInfo(r)).catch(err => (logError(err)));
            break;
        case "qhelp":
            qHelp(message);
            break;
        case "qstop":
            for(const items of newQuiz){
                if(items.author === message.author.id){
                    let removeindex = newQuiz.indexOf(items);
                    if(removeindex > -1){
                        newQuiz.splice(removeindex, 1);
                        message.reply(lang['quizQStop']).then().catch(logError("la commande !qstop à provoqué une erreur, info :\ncontenu du message:\n"+message.content+"\nAuteur: "+message.author.username+"("+message.author.id+")"));
                    }
                }
            }
            break;
        case "qlist":

            qList(channel, fs, message);

            break;
        case "questionlist":

            questionList(message, args, fs, channel);

            break;
        case "removequestion":

            removeQuestions(message, args, channel);

            break;
        case "newquestion":
            if (!hasRole(message, "canCreateQuiz")) return;
            let exist = false;
            if(args !== ""){
                const uid = args[0];
                let allQuiz = JSON.parse(fs.readFileSync('./model/quiz.json', 'utf-8'));
                let sQuiz
                for(const quiz of allQuiz["Quiz"]){
                    let uuid = quiz.uuid;
                    if(uid === uuid){
                        exist = true;
                        sQuiz = quiz
                        break;
                    }
                }
                if(exist){
                    let question = new C_question();
                    let lastQuestion;
                    let id = 0
                    if(getQuestion(uid, true, -1, "") === undefined){
                    } else {
                        lastQuestion = getQuestion(uid, true, -1, "");
                        id = lastQuestion.id+1;
                    }

                    if(id === null || id === undefined || isNaN(id)){
                        id = 0
                    }

                    question.author = message.author;
                    question.uidQuiz = sQuiz.uuid;
                    question.uid = uuidv4();

                    question.id = id;

                    newQuestion.push(question);

                    channel.send(lang['newQuestionCommand'].replace('%quizTitle%', sQuiz.title));
                } else {
                    channel.send(lang['newQuestionCommandError'].replace('%uid%', uid));
                }
            }
            break;
        case "newhint":

            let tempHint = newHint();

            if(tempHint === false) {
                if (typeof tempHint === classHint) {
                    newHintList.push(tempHint);
                } else{
                    logError('tempHint n\'est pas une variable de type "classHint".');
                }
            }
            break;
        default:
            break;
    }
});

client.login(config.BOT_TOKEN).then(logInfo("Bot démarrée avec succès et lier au token discord !", true));


//TODO: Faire une commande pour supprimer une question avec l'UUID
//TODO: Faire un système pour modifier l'id d'une question avec L'UUID
//TODO: Faire un système d'indice
