const fs = require('fs');
const {getErrorLangCat} = require("./lang");

function getLang(_cat){

    let langAllData = JSON.parse(fs.readFileSync('./model/lang.json'));
    let lang = false;
    let cat;

    let errorLangCat = getErrorLangCat();

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