
const fs = require('fs');
const {logInfo} = require("../../LOG/logInfo");
const {var_pushErrorLangCat} = require("../../../value/var_lang");


const {logError} = require("../../LOG/logError");

const {getLang} = require("./getLangString");

let allLangCat = [];

function initLang(){

    let langCatData = JSON.parse(fs.readFileSync('./model/JSON/lang.json', 'utf-8'));

    for(let langCat of langCatData['allLangCat']){

        allLangCat.push(langCat);

    }

    for(let langCat of allLangCat){

        let lang = getLang(langCat);

        if(lang === false){

            var_pushErrorLangCat(langCat);

            logError('La catégorie ["'+langCat+'"] n\'existe pas ou ne peut pas être récuperer, vérifier le nom !');

        } else {

            logInfo('La catégorie ["'+langCat+'"] initialiser.');

        }

    }

}
exports.initLang = initLang;