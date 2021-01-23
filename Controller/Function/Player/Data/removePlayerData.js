const fs = require('fs');
const {getPlayerInfo} = require('../getPlayerInfo.js');

function removePlayerData(message, dataToRemove){
    if(getPlayerInfo(dataToRemove.memberID, false).indexOf(dataToRemove.quizID) !== -1){

        let allData = JSON.parse(fs.readFileSync('./model/participate.json', 'utf-8'));

        let next = false

        let arData = []
        let newData = '{\n' +
            '  "players":[\n' +
            '    {}';

        for(let data of allData['players']){

            arData.push(data);

        }

        if(arData !== []){

            console.log("ardata = ")
            console.log(arData);

            for(let index in arData) {

                let data = arData[index];

                console.log(data);

                console.log(data.step);


                if (data.step !== undefined) {
                    console.log("01")
                    console.log(data.memberID + "-" + data.quizID);
                    console.log(dataToRemove.memberID + "-" + dataToRemove.quizID);
                    if (data.memberID === dataToRemove.memberID && data.quizID === dataToRemove.quizID) {
                        console.log("02")

                        let index2del = arData.indexOf(data);

                        if (index2del !== -1) {
                            console.log("03")

                            console.log(index2del);


                            const o = message.guild.channels.cache.find(channel => channel.id === data.channelID);

                            if(o !== undefined) {
                                o.delete('Le membre à quitter le quiz');
                            }

                            arData.splice(index2del, 1);

                            console.log("data removed");
                            console.log(arData)

                            next = true;

                        }

                    }

                }
            }

        }

        if(next === false) return;
        for(let data of arData){
            newData+= ",\n" +
                JSON.stringify(data);
            if(arData.length-1 <= arData.indexOf(data)){
                newData+="\n  ]\n}"
            }
        }
        if(arData.length === 0){
            newData+="\n  ]\n}"
        }

        fs.writeFileSync('./model/participate.json', newData,'utf-8');

        console.log("NEW DATA SAVED")

    }
}

exports.removePlayerData = removePlayerData;