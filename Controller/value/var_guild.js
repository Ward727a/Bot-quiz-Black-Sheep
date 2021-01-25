const {classGuild} = require("../class/class_guild");

let tempGuild = new classGuild("");

function var_guildSet(guildData){

    tempGuild = guildData;

}
exports.var_guildSet = var_guildSet;

function var_guildGet(){

    return tempGuild;

}
exports.var_guildGet = var_guildGet;