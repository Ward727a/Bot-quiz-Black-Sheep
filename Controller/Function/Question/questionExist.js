const {getQuestion} = require("./getQuestion");


function questionExist(uid){

    if(getQuestion("", false, "", uid).length !== 0){
        return true;
    }else{
        return false;
    }

}

exports.questionExist = questionExist;