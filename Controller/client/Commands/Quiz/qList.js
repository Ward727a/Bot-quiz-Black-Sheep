const {getLang} = require("../../../Function/other/lang/getLangString");
const {hasRole} = require("../../../Function/Player/hasRole");

function qList(channel, fs, message){
    let msg = "";
    let nMsg = "";
    let title = "";
    let uuid = "";
    let allQuiz = "";

    let lang = getLang('qlist');

    if(!hasRole(message, "canCreateQuiz")) return;
    msg = lang['titleString'];
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