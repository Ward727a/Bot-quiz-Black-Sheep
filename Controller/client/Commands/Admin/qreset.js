const {getPlayerChannelByQuiz} = require("../../../Function/Player/getPlayerChannelByQuiz");
const {getLang} = require("../../../Function/other/lang/getLangString");

const fs = require('fs');

function qReset(message, channel){

    let nameQuizToDel = [];

    let lang = getLang('qreset');

    let dataJSON = fs.readFileSync('./model/quiz.json', 'utf-8')
    let allQuiz = JSON.parse(dataJSON);

    console.log(allQuiz);

    for(const i of allQuiz['Quiz']){

        console.log(i);

        const o = message.guild.channels.cache.find(channel => channel.id === i.channelID);

        if(o !== undefined){
            o.delete("!quizreset par "+message.author.username+" ("+message.author.id+")").then(console.log).catch(console.error);
        } else {
            console.error("ERREUR 04993939\n"+o);
        }

        const u = message.guild.roles.cache.find(roleData => roleData.id === i.roleID);
        if(u !== undefined){
            u.delete("!quizreset par "+message.author.username+" ("+message.author.id+")").then(console.log).catch(console.error);
        } else {
            console.error("ERREUR 03993939");
            console.error(u);
        }

        const j = message.guild.roles.cache.find(roleData => roleData.id === i.roleIDEnd);
        if(j !== undefined){
            j.delete("!quizreset par "+message.author.username+" ("+message.author.id+")").then(console.log).catch(console.error);
        } else {
            console.error("ERREUR 02993939");
            console.error(j);
        }

        let userChannels = getPlayerChannelByQuiz(i.uuid)
        for(let user of userChannels){

            const userChannel = message.guild.channels.cache.find(channelData => channelData.id === user)
            if(userChannel !== undefined){
                userChannel.delete("!quizreset par "+message.author.username+" ("+message.author.id+")").then(console.log).catch(console.error);
            } else {
                console.error("ERREUR 01993939");
                console.error(userChannel);
            }

        }

        let leaderboardChannels = message.guild.channels.cache.find(channelData => channelData.id === i.leaderBoardID);
        if(leaderboardChannels !== undefined){
            leaderboardChannels.delete("!quizreset par "+message.author.username+" ("+message.author.id+")").then(console.log).catch(console.error);
        } else {
            console.error("ERREUR 00993939");
            console.error(j);
        }

    }

    for(const i of nameQuizToDel){


    }
    channel.send(lang['resetString']);
}

exports.qReset = qReset;