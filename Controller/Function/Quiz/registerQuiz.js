const fs = require('fs');
const {logError} = require("../LOG/logError");

function registerQuiz(Quiz){

    try{
        if(fs.existsSync('./model/quiz.json')){
            fs.readFile('./model/quiz.json', 'utf-8', (err, data)=>{
                if(err) {
                    logError(err)
                    throw err;
                }
                let newSData = JSON.stringify(Quiz);
                data = data.toString().slice(0, -4)
                let newData = data+",\n    "+newSData+"\n  ]\n}";
                fs.writeFile('./model/quiz.json', newData, 'utf-8', (err)=>{
                    if (err) {
                        logError(err)
                        throw err;
                    }
                });
            });
            console.log("end");
        } else {
            fs.writeFile('./model/quiz.json', JSON.stringify(Quiz), 'utf-8', (err)=>{
                if (err) {
                    logError(err)
                    throw err;
                }
            });
            console.log("Fichier créé et écris !");
        }
    } catch(err){
        console.error(err);
    }

}

exports.registerQuiz = registerQuiz;