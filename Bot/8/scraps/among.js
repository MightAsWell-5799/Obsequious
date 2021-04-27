//loop on bot start
var guildIDS = client.guilds.cache.keyArray()
    guildIDS.forEach((Element) => {
        AmongGames.set(Element, new Array())
    })


var AmongGames = new Map()


function amongDeadToggle(serverID, memberID) {
    var temp = AmongGames.get(serverID)
    temp.push(memberID)
    AmongGames.set(serverID, temp)
}

function amongNewRound(serverID) {
    AmongGames.set(serverID, new Array())
}

function amongListenToggle(isDeaf, deafenChannel, force, serverID, memberID) {
    var amongDead = AmongGames.get(serverID)
    console.log(amongDead.length)
    if (isDeaf) {
        var i = 0
        var memberObjectArray = deafenChannel.members
        deafenChannel.members.keyArray().forEach((Element) => {
            if (amongDead.length == 0) {
                if (isDeaf) {
                    memberObjectArray.get(Element).voice.setDeaf(false)
                    //memberObjectArray.get(Element).voice.setMute(false)
                } else {
                    memberObjectArray.get(Element).voice.setDeaf(true)
                    //memberObjectArray.get(Element).voice.setMute(true)
                }
            }
            amongDead.forEach((Element2) => {
                if (Element2 == Element) {
                } else {
                    memberObjectArray.get(Element).voice.setDeaf(false)
                    //memberObjectArray.get(Element).voice.setMute(false)
                }
            })
            i++
        })
    } else if (force) {
        var i = 0
        var memberObjectArray = deafenChannel.members
        deafenChannel.members.keyArray().forEach((Element) => {
            if (amongDead.length == 0) {
                if (isDeaf) {
                    memberObjectArray.get(Element).voice.setDeaf(false)
                    //memberObjectArray.get(Element).voice.setMute(false)
                } else {
                    memberObjectArray.get(Element).voice.setDeaf(true)
                    //memberObjectArray.get(Element).voice.setMute(true)
                }
            }
            amongDead.forEach((Element2) => {
                if (Element2 == Element) {
                } else {
                    memberObjectArray.get(Element).voice.setDeaf(false)
                    //memberObjectArray.get(Element).voice.setMute(false)
                }
            })
            i++
        })
    } else {
        var i = 0
        var memberObjectArray = deafenChannel.members
        deafenChannel.members.keyArray().forEach((Element) => {
            if (amongDead.length == 0) {
                if (isDeaf) {
                    memberObjectArray.get(Element).voice.setDeaf(false)
                    //memberObjectArray.get(Element).voice.setMute(false)
                } else {
                    memberObjectArray.get(Element).voice.setDeaf(true)
                    //memberObjectArray.get(Element).voice.setMute(true)
                }
            }
            amongDead.forEach((Element2) => {
                if (Element2 == Element) {
                } else {
                    memberObjectArray.get(Element).voice.setDeaf(true)
                    //memberObjectArray.get(Element).voice.setMute(true)
                }
            })
            i++
        })
    }
}
var potat
switch (potat) {
    case 'amongtoggle':
        var deafenChannel = message.member.voice.channel
        var isDeaf = message.member.voice.deaf
        var force = args[1]
        console.log()
        amongListenToggle(
            isDeaf,
            deafenChannel,
            force,
            serverID,
            message.member.id,
        )
        message.channel.send('Toggled deafen states.')
        break
    case 'amongdead':
        amongDeadToggle(serverID, message.member.id)
        message.channel.send(
            `${message.member.user.username} is now confirmed dead.`,
        )
        break
    case 'amongreset':
        amongNewRound(serverID)
        message.channel.send('Reset the dead.')
        break
    
}