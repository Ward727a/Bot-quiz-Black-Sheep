const {guildJSON} = require("../../settingsFileVar");

function guildExist(idGuild){

    let allData = guildJSON();

    for (let data of allData){

        if(data._uidGuild === idGuild){

            return true;

        }

    }

    return false;

}

exports.guildExist = guildExist;