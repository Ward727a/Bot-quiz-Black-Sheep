const fs = require('fs');
const {var_getErrorLangCat} = require("../../../value/var_lang");

function getLang(_cat){

    let langAllData = JSON.parse(fs.readFileSync('./model/lang.json'));
    let lang = false;
    let cat;

    let errorLangCat = var_getErrorLangCat();

    if(typeof _cat !== "string"){

        cat = _cat.toString();

    } else {
        cat = _cat;
    }

    if(errorLangCat.includes(cat) === undefined || langAllData === undefined){

        return false;

    }

    if(langAllData[cat] !== undefined){

        lang = langAllData[cat];

    }

    return lang;

}

exports.getLang = getLang;