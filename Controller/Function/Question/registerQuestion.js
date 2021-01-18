const {logInfo} = require("../LOG/logInfo");
const {logError} = require("../LOG/logError");


function registerQuestion(question){

    const fs = require('fs');

    if(question.id === undefined){
        logError("Question['id'] n'est pas défini pour cette question !\n"+question);
        return;
    }
    try{
        if(fs.existsSync('./model/question.json')){
            fs.readFile('./model/question.json', 'utf-8', (err, data)=>{
                if(err) {

                    logError(err);

                    throw err;
                }
                let newSData = JSON.stringify(question);
                data = data.toString().slice(0,-4);
                let newData = data+",\n    "+newSData+"\n  ]\n}";
                fs.writeFile('./model/question.json', newData, 'utf-8', (err)=>{
                    if (err) {

                        logError(err);

                        throw err;
                    }
                });
            });
        } else {
            fs.writeFile('./model/question.json', JSON.stringify(question), 'utf-8', (err)=>{
                if (err) {

                    logError(err);

                    throw err;
                }
            });
        }
    } catch(err) {

        logError(err);

        throw err;
    }

    logInfo("Question '"+question.uid+"' créé avec succès", false);

}

exports.registerQuestion = registerQuestion;