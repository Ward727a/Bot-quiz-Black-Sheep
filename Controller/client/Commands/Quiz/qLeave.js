const {removePlayerData} = require("../../../Function/Player/removePlayerData");
const {getPlayerInfo} = require("../../../Function/Player/getPlayerInfo");
const {getQuiz} = require("../../../Function/Quiz/getQuiz");

function qLeave(channel, message, args, author){

    if(args !== "" || args !== undefined) {

        let uid = args[0];
        let quiz = getQuiz(uid);

        if (getPlayerInfo(author.id).indexOf(uid) === -1 || getPlayerInfo(author.id) === "") {
            channel.send("Vous n'êtes pas dans le quiz " + quiz.title + " !");
            return;
        }

        let data2remove = {"memberID":author.id, "quizID": quiz.uuid}

        removePlayerData(message,data2remove);
    }
}

exports.qLeave = qLeave;