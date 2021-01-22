

let errorLangCat = [String];


function pushErrorLangCat(_errorLangCat){

    errorLangCat.push(_errorLangCat);
    return errorLangCat;

}
exports.pushErrorLangCat = pushErrorLangCat;
function getErrorLangCat(){

    return errorLangCat;

}
exports.getErrorLangCat = getErrorLangCat;