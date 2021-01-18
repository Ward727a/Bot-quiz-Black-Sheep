const fs = require('fs');

function removeQuestion(uid){
    let data = JSON.parse(fs.readFileSync('./model/question.json', 'utf-8'));
    let newData = '{\n  "questions":[\n'

    let index = 0

    for (let u of data['questions']){

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
            fs.writeFileSync('./model/question.json', newData, 'utf-8')
        }

    }

}

exports.removeQuestion = removeQuestion;