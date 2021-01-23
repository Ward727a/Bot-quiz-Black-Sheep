const {hintJSON} = require("../other/settingsFileVar");

function getHint(id, questionID){

    let allData = hintJSON();

    for(const data of allData){

        if(data._id === id && data._uidQuestion === questionID){

            return data;

        }

    }

    return null;

}

exports.getHint = getHint;