const {logError} = require("../Function/LOG/logError");
const {getLang} = require("../Function/other/lang/getLangString");

const {classHint} = require('../class/class_hint');

let hintTempList = [classHint];

let lang = getLang('var_hint');

function var_hintPush(v){

    hintTempList.push(v);
    return hintTempList;

}
exports.var_hintPush = var_hintPush;

function var_hintGet(){

    return hintTempList;

}
exports.var_hintGet = var_hintGet;

function var_hintSet(key, newValue){

    hintTempList[key] = newValue;

    if(hintTempList[key] !== newValue) logError(lang['errorHintSet'].replace('%key%', key));

}
exports.var_hintSet = var_hintSet;