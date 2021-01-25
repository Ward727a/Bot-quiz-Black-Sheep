const {guildJSON} = require("../../settingsFileVar");

function canGuild(idGuild, permission){

    let allData = guildJSON();

    for (let data of allData){

        if(data._uidGuild === idGuild){

            switch (permission){

                case "canQuiz":
                    return data._canQuiz;
                case "canAdminServer":
                    return data._canAdminServer;

            }

        }

    }

    throw new Error('"'+idGuild+'" could not been found!');

}

exports.canGuild = canGuild;