function getRoleID(roleName, message){

    let roleData = message.guild.roles.cache.find(roleData => roleData.name === roleName);

    return roleData.id;

}

exports.getRoleID = getRoleID;