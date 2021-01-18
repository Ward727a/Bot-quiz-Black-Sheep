const fs = require('fs');

function setChannelQuiz(quiz){

    if(quiz === undefined || quiz === null){
        console.error("ERREUR 930321");
        return;
    }
    let newData = "{\n\"Quiz\":["
    let index = 0;

    let datas = JSON.parse(fs.readFileSync('./model/quiz.json', 'utf-8'));

    if(quiz.length !== datas['Quiz'].length){

        for(const data of datas['Quiz']){

            if(index !== 0){
                newData+=",\n";
            }

            if(quiz.find(quizData => quizData.uuid === data.uuid) !== undefined){

                newData+=JSON.stringify(quiz.find(quizData => quizData.uuid === data.uuid));

            } else {
                newData+=JSON.stringify(data);
            }

            index++;

        }

    } else {
        for (const i of quiz) {

            index += 1
            let replaceData = JSON.stringify(i);
            newData += replaceData;
            if (quiz.length !== index) {
                newData += ",\n";
            } else {
                newData += "\n";
            }
        }
    }
    newData+="\n]\n}"

    fs.writeFileSync("./model/quiz.json", newData, "utf-8");


}

exports.setChannelQuiz = setChannelQuiz;