const {hasRole} = require("../../../Function/Player/hasRole");

function qList(channel, fs, message){
    let msg = "";
    let nMsg = "";
    let title = "";
    let uuid = "";
    let allQuiz = "";
    if(!hasRole(message, "canCreateQuiz")) return;
    msg = "Voici une liste des quiz :\n";
    try {

        allQuiz = JSON.parse(fs.readFileSync('./model/quiz.json', 'utf-8'));
        for (const quiz of allQuiz['Quiz']) {
            title = quiz.title;
            uuid = quiz.uuid;

            nMsg = "Titre : `" + title + "`\nUID : `" + uuid + "`\n\n";
            msg += nMsg;
        }
        channel.send(msg);
    } catch (e) {
        console.error(e);
    }
}

exports.qList = qList;