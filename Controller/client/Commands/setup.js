const {hasRole} = require("../../Function/Player/hasRole");

function setup(message, channel){

    if(!hasRole(message, 'Amiral')) return;

    for(let i of message.guild.roles.cache.values()){
        if(i.name === "canCreateQuiz"){
            message.reply("Le serveur à déjà les roles nécessaire, veuillez vérifier.").then(console.log);
            return;
        }
    }

    let roleData = {data:{name:"canCreateQuiz",color:"DEFAULT"},reason:'Necessaire pour créé des quiz'};
    message.guild.roles.create(roleData).then(console.log).catch(console.error);

    channel.send("Mise en place terminer !")
}

exports.setup = setup;