const {classGuild} = require("../../../../class/class_guild");
const {guildJSON, setGuildJSON} = require("../../settingsFileVar");

function newGuild(guild = classGuild){

    if(!guild instanceof classGuild) throw new Error("\"guild\" need to be an instance of \"class_guild\"");

    if(guild === undefined) throw new Error("\"guild\" could not be undefined!");

    let allData = guildJSON();

    let newData = "{\n" +
        "  \"guilds\":[\n";

    for (let data of allData){

        newData+="    "+JSON.stringify(data);
        newData+=',\n';


    }

    newData+="    "+JSON.stringify(guild)+"\n";
    newData+='  ]\n' +
        '}';

    setGuildJSON(newData);

}

exports.newGuild = newGuild;