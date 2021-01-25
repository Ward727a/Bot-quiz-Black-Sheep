
const {classGuild} = require("../../../class/class_guild");

const {logInfo} = require("../../LOG/logInfo");

const {getConfig} = require("../settingsFileVar");

const {newGuild} = require("./data/newGuild");
const {getGuild} = require("./data/getGuild");
const {guildExist} = require("./data/checkGuild");

const fs = require('fs');
const {canGuild} = require("./data/canGuild");
const {logError} = require("../../LOG/logError");


function initGuild(idGuild, force = false){

    if(force) console.log('initGuild forced');

    if(guildExist(idGuild) && !force){

        return getGuild(idGuild);

    } else {

        let guild = new classGuild(idGuild);

        if(!force) newGuild(guild);

        logInfo('Guild enregister dans les données');

        const config = getConfig();
        const road = './model/JSON/'+idGuild+'/';

        if(!fs.existsSync(road)){
            fs.mkdirSync(road);
        }

        for(let data of config['baseFile']){

            if(data['perm'] === null || canGuild(idGuild, data['perm'])) {
                if (!fs.existsSync(road + data['name'])) {

                    fs.writeFileSync(road + data['name'], data['content'], 'utf-8');

                } else {

                    logError('Le serveur ' + idGuild + ' à déjà le fichier "' + road + data['name'] + '" !');

                }
            }

        }

        logInfo('Vérif des dossiers');

        let errorFolder = 0;

        for(let data of config['baseFile']){

            if(data['perm'] === null || canGuild(idGuild, data['perm'])) {
                if (!fs.existsSync(road + data['name'])) {
                    errorFolder = errorFolder + 1;
                    logError('Le fichier ' + data['name'] + ' pour le serveur ' + idGuild + ' n\'a pas étais trouvé !');
                }
            }

        }

        if(errorFolder > 0){

            logInfo('Attention, '+errorFolder+' erreur(s) au niveau des fichiers ont étais détecter, veuillez consulter le log d\'erreurs', true);

        }

    }

}

exports.initGuild = initGuild;