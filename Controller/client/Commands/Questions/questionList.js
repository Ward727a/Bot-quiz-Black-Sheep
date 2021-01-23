const {getLang} = require("../../../Function/other/lang/getLangString");
const {getQuiz} = require("../../../Function/Quiz/getQuiz");
const {hasRole} = require("../../../Function/Player/Role/hasRole");

function questionList(message, args, fs, channel){

    if(!hasRole(message, "canCreateQuiz")) return;

    if(args[0] === undefined || null){

        return;

    }

    let quiz = getQuiz(args[0])
    let bolAllResponse
    if(args[1] === null || args[1] === undefined){
        bolAllResponse = false
    } else {
        bolAllResponse = args[1]
    }


    let lang = getLang('questionlist');
    let msg = lang['titleString'].replace('%quizTitle%', quiz.title);
    channel.send(msg);
    try {

        let allQuiz = JSON.parse(fs.readFileSync('./model/question.json', 'utf-8'));
        for (const u of allQuiz['questions']) {

            if(args[0] === u.uidQuiz) {
                let title = u.question;
                let uuid = u.uid;
                let questionID = u.id
                let qReponse = ''

                if(bolAllResponse){
                    qReponse = '\nRéponse : \`'+u.response+'\`'
                }

                let nMsg = "Titre : `" + title + "`\nUID : `" + uuid +"`\n ID : \`"+questionID+"\`"+ qReponse + "\n\n";

                channel.send(nMsg);
            }
        }
    } catch (e) {
        console.error(e);
    }

}

exports.questionList = questionList;