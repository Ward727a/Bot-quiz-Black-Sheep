const {getLang} = require("../../Function/other/lang/getLangString");
const {hasRole} = require("../../Function/Player/Role/hasRole");

function setup(message, channel){

    if(!hasRole(message, 'Administrateur')) return;

    let lang = getLang('setup');

    for(let i of message.guild.roles.cache.values()){
        if(i.name === "canCreateQuiz"){
            message.reply(lang['alreadySetup']).then(console.log);
            return;
        }
    }

    let roleData = {data:{name:"canCreateQuiz",color:"DEFAULT"},reason:'Necessaire pour créé des quiz'};
    message.guild.roles.create(roleData).then(console.log).catch(console.error);

    channel.send(lang['setupEnd'])
}

exports.setup = setup;