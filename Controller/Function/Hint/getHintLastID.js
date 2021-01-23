const {hintJSON} = require("../other/settingsFileVar");
const {classHint} = require("../../class/class_hint");

function getHintLastID(questionUID){

    let hintDatas = hintJSON();
    let lastID = -1;

    for(let data of hintDatas){

        if(data._uidQuestion === questionUID){

            if(data._id >= lastID){

                lastID = data._id;

            }

        }

    }

    return lastID;

}

exports.getHintLastID = getHintLastID;