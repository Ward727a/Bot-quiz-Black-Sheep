const {logInfo} = require("../LOG/logInfo");
const {logError} = require("../LOG/logError");


function registerHint(hint){

    const fs = require('fs');

    if(hint.id === undefined){
        logError("Hint['id'] n'est pas défini pour cet indice !\n"+hint);
        return;
    }
    try{
        if(fs.existsSync('./model/hint.json')){
            fs.readFile('./model/hint.json', 'utf-8', (err, data)=>{
                if(err) {

                    logError(err);

                    throw err;
                }
                let newSData = JSON.stringify(hint);
                data = data.toString().slice(0,-4);
                let newData = data+",\n    "+newSData+"\n  ]\n}";
                fs.writeFile('./model/hint.json', newData, 'utf-8', (err)=>{
                    if (err) {

                        logError(err);

                        throw err;
                    }
                });
            });
        } else {
            fs.writeFile('./model/hint.json', JSON.stringify(hint), 'utf-8', (err)=>{
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

    logInfo("Hint '"+hint.uid+"' créé avec succès", false);

}

exports.registerHint = registerHint;