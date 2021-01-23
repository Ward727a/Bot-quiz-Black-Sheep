const {logError} = require("../../../Function/LOG/logError");
const {getLang} = require("../../../Function/other/lang/getLangString");
const {getRoleID} = require("../../../Function/Player/Role/getRoleID");
const {getQuestion} = require("../../../Function/Question/getQuestion");
const {registerPlayerData} = require("../../../Function/Player/Data/registerPlayerData");
const {getQuiz} = require("../../../Function/Quiz/getQuiz");
const {getPlayerInfo} = require("../../../Function/Player/getPlayerInfo");

const {classPlayer} = require("../../../class/class_player");


function qJoin(args, message, channel, author, client){

    const everyone = message.guild.roles.everyone.id
    const canCreateQuiz = getRoleID('canCreateQuiz', message);

    let lang = getLang('qjoin');
    if(lang === false) return logError('Lang impossible à récupérer !');

    if(args !== "" || args !== undefined){
        let uid = args[0];
        let guild = message.guild
        let quiz = getQuiz(uid);

        if(quiz === null){
            channel.send(lang['quizNotExist']);
            return;
        }

        if(getPlayerInfo(author.id).indexOf(uid) !== -1){
            channel.send(lang['alreadyJoinedQuiz'].replace('%quizTitle%', quiz.title));
            return;
        }

        let joinData = new classPlayer();

        console.log(canCreateQuiz);

        let options = {
            type: 'text',
            parent: quiz.channelID,
            permissionOverwrites:[
                {
                    id: author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: canCreateQuiz,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: everyone,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
        }

        let quizRole = guild.roles.cache.find(roleData => roleData.id === quiz.roleID);

        message.member.roles.add(quizRole).then(r => console.info(r))

        guild.channels.create(author.username, options).then(function(channel){

            const date = new Date(Date.now());

            joinData.channelID = channel.id;
            joinData.memberID = author.id;
            joinData.quizID = uid;
            joinData.dateJoin = date.getUTCDay()+":"+date.getUTCMonth()+":"+date.getUTCHours()+":"+date.getUTCMinutes();

            let joinChannel = client.channels.cache.get(channel.id);

            let question

            question = getQuestion(uid, false, 0, "");

            if(question === undefined || question === null){
                console.log("ER3003903909")
                console.log(question)
                return
            }

            joinChannel.send(question.question)

            registerPlayerData(joinData)
        })
    }
}

exports.qJoin = qJoin;