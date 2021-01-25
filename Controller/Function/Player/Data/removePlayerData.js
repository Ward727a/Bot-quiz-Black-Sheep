const fs = require('fs');
const {setParticipateJSON} = require("../../other/settingsFileVar");
const {participateJSON} = require("../../other/settingsFileVar");
const {getPlayerInfo} = require('../getPlayerInfo.js');

function removePlayerData(message, dataToRemove){
    if(getPlayerInfo(dataToRemove.memberID, false).indexOf(dataToRemove.quizID) !== -1){

        let allData = participateJSON();

        let next = false

        let arData = []
        let newData = '{\n' +
            '  "players":[\n' +
            '    {}';

        for(let data of allData){

            arData.push(data);

        }

        if(arData !== []){

            for(let index in arData) {

                let data = arData[index];


                if (data.step !== undefined) {
                    if (data.memberID === dataToRemove.memberID && data.quizID === dataToRemove.quizID) {
                        let index2del = arData.indexOf(data);

                        if (index2del !== -1) {


                            const o = message.guild.channels.cache.find(channel => channel.id === data.channelID);

                            if(o !== undefined) {
                                o.delete('Le membre à quitter le quiz');
                            }

                            arData.splice(index2del, 1);

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

        setParticipateJSON(newData);

    }
}

exports.removePlayerData = removePlayerData;