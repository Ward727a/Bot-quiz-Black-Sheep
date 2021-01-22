const {getLang} = require("../../../Function/other/lang/getLangString");
const {removeQuestion} = require("../../../Function/Question/removeQuestion");
const {getQuestion} = require("../../../Function/Question/getQuestion");
const {hasRole} = require("../../../Function/Player/hasRole");

function removeQuestions(message, args, channel){
    if (!hasRole(message, "canCreateQuiz")) return;

    if(args !== ""){

        if(getQuestion('', false, '', args[0])!== false){

            removeQuestion(args[0]);
            let lang = getLang('removequestion');
            channel.send(lang['deleteString']);

        }

    }
}

exports.removeQuestions = removeQuestions;