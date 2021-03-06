
const Discord = require('discord.js');
const fs = require('fs');

const config = require('./model/JSON/config.json');
const {classGuild} = require("./Controller/class/class_guild");
const {var_guildSet} = require("./Controller/value/var_guild");
const {quizJSON} = require("./Controller/Function/other/settingsFileVar");
const {canGuild} = require("./Controller/Function/other/Guild/data/canGuild");
const {initGuild} = require("./Controller/Function/other/Guild/initGuildData");
const client = new Discord.Client();

const { v4: uuidv4 } = require('uuid');


const {setup} = require("./Controller/client/Commands/setup");

// Command functions stocked in "Admin" folder
const {qSetup} = require("./Controller/client/Commands/Admin/qsetup");
const {qReset} = require("./Controller/client/Commands/Admin/qreset");
const {qHelp} = require("./Controller/client/Commands/Admin/qhelp");

// Command functions stocked in "Player" folder
const {qLeave} = require("./Controller/client/Commands/Player/qLeave");
const {qJoin} = require("./Controller/client/Commands/Player/qJoin");
const {hint} = require("./Controller/client/Commands/Player/hint");

// Command functions stocked in "Questions" folder
const {removeQuestions} = require("./Controller/client/Commands/Questions/removeQuestion");
const {questionList} = require("./Controller/client/Commands/Questions/questionList");

// Command functions stocked in "Commands" Folder
const {qList} = require("./Controller/client/Commands/Quiz/qList");
const {qRemove} = require("./Controller/client/Commands/Quiz/qRemove");

// Command functions stocked in "Hint" folder
const {newHint} = require('./Controller/client/Commands/Hint/newHint');


// Functions stocked in "Player" folder
const {hasRole} = require("./Controller/Function/Player/Role/hasRole");
const {getPlayerInfo} = require('./Controller/Function/Player/getPlayerInfo');
const {getPenalty} = require("./Controller/Function/Player/Penalty/getPenalty");

// Functions stocked in "Question" folder
const {getQuestion} = require('./Controller/Function/Question/getQuestion');
const {isQuestionChannel} = require('./Controller/Function/Question/isQuestionChannel');
const {nextQuestion} = require('./Controller/Function/Question/nextQuestion');
const {registerQuestion} = require('./Controller/Function/Question/registerQuestion');

// Functions stocked in "other" folder
const {getLang} = require('./Controller/Function/other/lang/getLangString');
const {initLang} = require("./Controller/Function/other/lang/initLang");

// Functions stocked in "Quiz" folder
const {registerQuiz} = require('./Controller/Function/Quiz/registerQuiz');

// Functions stocked in "LOG" folder
const {logInfo} = require("./Controller/Function/LOG/logInfo");
const {logError} = require("./Controller/Function/LOG/logError");

// Functions stocked in "Hint" folder
const {registerHint} = require("./Controller/Function/Hint/registerHint");


// Values functions set
const {var_hintSet} = require("./Controller/value/var_hint");
const {var_hintGet} = require("./Controller/value/var_hint");


// calling needed classes
const {classQuiz} = require('./Controller/class/class_quiz.js');
const {classQuestion} = require('./Controller/class/class_question');
const {classHint} = require('./Controller/class/class_hint');

const prefix = config.PREFIX;
const comment = config.COMMENTARY;

let newQuiz = [];
let newQuestion = [];
let newHintList = [];

let lang = null;

let blockHint = false;

client.on("ready", function (){

    initLang();
    for(let guild of client.guilds.cache.array()){

        initGuild(guild.id);

    }

    lang = getLang('main');

});

// CREATION QUIZ ET QUESTION
client.on("message", function (message){
    let valid;
    let item;
    let key;

    if (message.author.bot) return;
    if(message.content.startsWith('!filesetup')) return;

    let questionStep = isQuestionChannel(message.channel.id, false, true)
    let quiz = isQuestionChannel(message.channel.id, true, false)
    let question = getQuestion(quiz, false, questionStep, "")
    let playerDatas = getPlayerInfo(message.author.id, true);
    let playerData


    const channel = client.channels.cache.get(message.channel.id);

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');

    let guildData = new classGuild(message.guild.id);

    var_guildSet(guildData);


    if(canGuild(message.guild.id, "canQuiz")) {
        const penality = getPenalty(message.author.id, quiz, true, question['uid']);
        if (args[0] === 'hint' || message.content.charAt(0) !== prefix) {
            if (penality !== false && penality.time !== undefined) {

                channel.send(penality.reason.replace('%time%', penality.time).replace('%name%', message.author.username));
                blockHint = true;
                return;

            }
        }

        if (message.content.charAt(0) === prefix) return;
        if (message.content.charAt(0) === comment) return;

        if (isQuestionChannel(message.channel.id, false, false)) {


            for (let u of playerDatas) {
                if (u.quizID === quiz) {
                    playerData = u;
                }
            }
            if (question['response'] === undefined) {
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
        for (const items of var_hintGet()) {

            if (items._author === message.author.id && items._creatingStep !== 3) {

                valid = 3;

                key = Object.keys(var_hintGet()).find(key => var_hintGet()[key] === items);
                item = items;

            }
        }

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
                break;
            case 3:
                switch (item.creatingStep) {
                    case 0:
                        item.content = message.content;
                        item.creatingStep += 1;

                        channel.send(lang['hintContentSet'].replace('%content%', message.content));

                        var_hintSet(key, item);
                        break;
                    case 1:
                        item.penalityString = message.content;
                        item.creatingStep += 1;

                        channel.send(lang['hintPenaltyStringSet'].replace('%penaltyString%', message.content));

                        var_hintSet(key, item);
                        break;
                    case 2:
                        item.penality = parseInt(message.content);
                        item.creatingStep += 1;

                        channel.send(lang['hintPenaltySet'].replace('%time%', message.content));

                        var_hintSet(key, item);
                        registerHint(item);
                        break;
                }
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

    let guildData = new classGuild(message.guild.id);

    var_guildSet(guildData);

    if(command === 'setup'){
        if(hasRole(message, 'Administrateur')) setup(message, channel);

    } else if(command === 'filesetup'){
        if(hasRole(message, 'Administrateur')) initGuild(message.guild.id, true);

    }

    if(canGuild(message.guild.id, "canQuiz")) {


        switch (command) {
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

                quiz = new classQuiz();

                quiz.author = message.author.id;

                newQuiz.push(quiz);

                message.reply(lang['quizBeginCreate']).then(r => logInfo(r)).catch(err => (logError(err)));
                break;
            case "qhelp":
                qHelp(message);
                break;
            case "qstop":
                for (const items of newQuiz) {
                    if (items.author === message.author.id) {
                        let removeindex = newQuiz.indexOf(items);
                        if (removeindex > -1) {
                            newQuiz.splice(removeindex, 1);
                            message.reply(lang['quizQStop']).then().catch(logError("la commande !qstop à provoqué une erreur, info :\ncontenu du message:\n" + message.content + "\nAuteur: " + message.author.username + "(" + message.author.id + ")"));
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
                if (args !== "") {
                    const uid = args[0];
                    let allQuiz = quizJSON();
                    let sQuiz
                    for (const quiz of allQuiz) {
                        let uuid = quiz.uuid;
                        if (uid === uuid) {
                            exist = true;
                            sQuiz = quiz
                            break;
                        }
                    }
                    if (exist) {
                        let question = new classQuestion();
                        let lastQuestion;
                        let id = 0
                        if (getQuestion(uid, true, -1, "") === undefined) {
                        } else {
                            lastQuestion = getQuestion(uid, true, -1, "");
                            id = lastQuestion.id + 1;
                        }

                        if (id === null || id === undefined || isNaN(id)) {
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

                let tempHint = newHint(message, client, args, channel);

                if (tempHint === false) {
                    if (typeof tempHint === classHint) {
                        newHintList.push(tempHint);
                    } else {
                        logError('tempHint n\'est pas une variable de type "classHint".');
                    }
                }
                break;
            case "hint":

                if (!blockHint) hint(author, message, channel);

                break;
            default:
                break;
        }
    } else {

        logError("Le serveur ["+message.guild.name+"] n'as pas l'autorisation de faire des quiz !");

    }
});

client.login(config.BOT_TOKEN).then(logInfo("Bot démarrée avec succès et lier au token discord !", true));


//TODO: Faire une commande pour supprimer une question avec l'UUID
//TODO: Faire un système pour modifier l'id d'une question avec L'UUID
