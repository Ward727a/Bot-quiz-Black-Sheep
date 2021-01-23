const fs = require('fs');

function getQuestion(uid, last, id, qUID){
    let data = fs.readFileSync('./model/question.json', 'utf-8')
    let questions = JSON.parse(data);
    let lastQuestion = "";
    let arrayQuestion = []
    let index = 0

    for (let question of questions["questions"]){
        if(qUID !== "" || qUID !== undefined){
            index++
            console.log(qUID);

            if(qUID === question.uid){
                return question;
            }

        }

        if(question.uidQuiz === uid){
            if(id !== -1){
                if(question.id === id){
                    return question;
                }
            }
            if(last){
                if(lastQuestion === ""){
                    lastQuestion = question;
                } else if(lastQuestion['id'] < question.id){
                    lastQuestion = question;
                }
            } else {
                arrayQuestion.push(question);
            }
        }

    }
    if(last){
        return lastQuestion;
    }
    return arrayQuestion
}

exports.getQuestion = getQuestion;