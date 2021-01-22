const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const {logError} = require('../../../Function/LOG/logError');
const {getLang} = require('../../../Function/other/lang/getLangString');

const {classHint} = require('../../../class/class_hint');

function newHint(message, client, args){

    let newHint = new classHint();

    let lang = getLang('newHint');

    if(args.length !== 0){

        newHint.author = message.author.id;
        newHint.uid = uuidv4();
        newHint.uidQuestion = args[0];

    } else {

        logError(lang['errorArgsEmpty']);

    }

}

exports.newHint = newHint;