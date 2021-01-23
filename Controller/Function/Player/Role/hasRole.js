
function hasRole(message, role){

    for(let i of message.member.roles.cache.values()){
        if(i.name === role){
            return true
        }
    }
    return false;
}

exports.hasRole = hasRole;