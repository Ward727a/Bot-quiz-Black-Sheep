const {getLang} = require("../../../Function/other/lang/getLangString");

function qHelp(message){
    let lang = getLang('qhelp');
    message.reply(lang['helpString']).then(r => console.info(r));
}
exports.qHelp = qHelp;