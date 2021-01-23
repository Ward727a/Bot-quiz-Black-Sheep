const {classPenalty} = require("./class_penalty");

class Class_player{
    memberID = "";
    quizID = "";
    channelID = "";
    step = 0;
    dateJoin = "";
    dateEnd = "";
    penalty = [];
}

exports.classPlayer = Class_player;