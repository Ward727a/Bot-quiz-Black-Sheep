const {removeQuiz} = require("../../../Function/Quiz/removeQuiz");
const {hasRole} = require("../../../Function/Player/hasRole");

function qRemove(message, args){
    if(!hasRole(message, "canCreateQuiz")) return;

    removeQuiz(args[0], message);
}

exports.qRemove = qRemove;