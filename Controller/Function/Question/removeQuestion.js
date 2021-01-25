const fs = require('fs');
const {setQuestionJSON} = require("../other/settingsFileVar");
const {questionJSON} = require("../other/settingsFileVar");

function removeQuestion(uid){
    let data = questionJSON();
    let newData = '{\n  "questions":[\n'

    let index = 0

    for (let u of data){

        if(u.uid === uid){



        } else {

            if(index !== 0){
                newData+=",\n"
            }
            index++
            newData+= u

        }

        if(data['questions'].length === index+1){
            newData+="\n  ]\n" +
                "}"
            setQuestionJSON(newData)
        }

    }

}

exports.removeQuestion = removeQuestion;