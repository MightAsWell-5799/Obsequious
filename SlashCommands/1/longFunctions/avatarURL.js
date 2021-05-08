function avatarURL(ID, avatar) {
    var avatarFile = avatar
    avatar.startsWith("a_") ? avatarFile = avatarFile + '.gif' : avatarFile = avatarFile + '.png'
    return `https://cdn.discordapp.com/avatars/${ID}/${avatarFile}?size=512`



if(condition){}else{}

}

exports.avatarURL = avatarURL
