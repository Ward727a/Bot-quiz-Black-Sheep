const fs = require('fs');
const {logError} = require("../../LOG/logError");

function registerPlayerData(datae){

    try{
        if(fs.existsSync('./model/JSON/participate.json')){
            fs.readFile('./model/JSON/participate.json', 'utf-8', (err, data)=>{
                if(err) {
                    logError(err)
                    throw err;
                }
                let newSData = JSON.stringify(datae);
                data = data.toString().slice(0,-4);
                let newData = data+",\n    "+newSData+"\n  ]\n}";
                fs.writeFile('./model/JSON/participate.json', newData, 'utf-8', (err)=>{
                    if (err) {
                        logError(err)
                        throw err;
                    }
                });
            });
            console.log("end");
        } else {
            fs.writeFile('./model/JSON/participate.json', JSON.stringify(datae), 'utf-8', (err)=>{
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

exports.registerPlayerData =registerPlayerData;