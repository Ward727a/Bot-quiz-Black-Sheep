const {guildJSON} = require("../../settingsFileVar");

function getGuild(idGuild){

    if(idGuild === undefined || idGuild === null) throw new Error("\""+idGuild+"\" could not be null or undefined!");

    let allData = guildJSON();

    for(let data of allData){

        if(data._uidGuild === idGuild){

            return data;

        }

    }

    throw new Error("Could not find \""+idGuild+"\" in JSON file, please re-check!");

}

exports.getGuild = getGuild;