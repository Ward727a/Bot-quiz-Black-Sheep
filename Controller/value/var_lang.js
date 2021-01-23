

let errorLangCat = [String];


function var_pushErrorLangCat(_errorLangCat){

    errorLangCat.push(_errorLangCat);
    return errorLangCat;

}
exports.var_pushErrorLangCat = var_pushErrorLangCat;
function var_getErrorLangCat(){

    return errorLangCat;

}
exports.var_getErrorLangCat = var_getErrorLangCat;