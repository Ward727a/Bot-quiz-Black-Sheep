const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const {questionExist} = require("../../../Function/Question/questionExist");
const {logError} = require('../../../Function/LOG/logError');
const {getLang} = require('../../../Function/other/lang/getLangString');

const {getHintLastID} = require("../../../Function/Hint/getHintLastID");

const {var_hintPush} = require("../../../value/var_hint");

const {classHint} = require('../../../class/class_hint');

function newHint(message, client, args, channel){

    let newHint = new classHint();

    let lang = getLang('newhint');

    if(args.length !== 0){

        newHint.author = message.author.id;
        newHint.uid = uuidv4();
        newHint.id = getHintLastID(args[0])+1;
        newHint.creatingStep = 0;

        if(questionExist(args[0])){
            newHint.uidQuestion = args[0];
        } else {
            logError(lang['errorQuestionNotExist']);
            channel.send(lang['errorQuestionNotExist']);
            return;
        }

        var_hintPush(newHint);

        channel.send(lang['creatingString']);

    } else {

        logError(lang['errorArgsEmptyConsole']);
        channel.send(lang['errorArgsEmpty'])

    }

}

exports.newHint = newHint;