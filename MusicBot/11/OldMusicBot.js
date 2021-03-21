switch (args) {
    case 'play':
        //play (not from the player/it is from user)
        play(true)
        console.log('play')
        break
    case 'skip':
        console.log('skip')
        let toSkip
        //calculate how many songs to remove
        if (typeof parseInt(message.content.split(' ')[1]) == 'number' && parseInt(message.content.split(' ')[1]) > 0) {
            toSkip = parseInt(message.content.split(' ')[1])
        } else {
            toSkip = 1
        }

        //probably a new function now
        shiftQueue(toSkip)
        break
    case 'queue':
        console.log('queue')
        try {
            if (queue.get(serverID).length == 0 && currentSong.get(serverID) == undefined) {
                message.channel.send('This server has no queue')
            } else {
                message.channel.send(currentSong.get(serverID) + queue.get(serverID))
            }
        } catch (e) {
            console.log(e)
        }

        break
    case 'stop':
        console.log('stop')
        queue.set(serverID, new Array())
        try {
            message.guild.me.voice.channel.leave()
        } catch (e) {
            console.log(e)
        }
        break
    case 'pause':
        console.log('pause')
        try {
            var connection = await message.guild.me.voice.channel.join()
            connection.dispatcher.pause()
        } catch (e) {
            console.log(e)
        }
        break
    case 'resume':
        console.log('resume')
        try {
            var connection = await message.member.voice.channel.join()
            connection.dispatcher.resume()
        } catch (e) {
            console.log(e)
        }
        break
    case 'loop':
        //manages triggering loopAll and loopOne

        console.log(args)
        switch (args[1]) {
            case 'all':
                loopType.set(serverID, 'all')
                var help = new Discord.MessageEmbed()
                help.setTitle('Loop').setColor(0xdcebff).setDescription('Looping the entire queue.')
                message.channel.send(help)
                break
            case 'one':
            case 'single':
                loopType.set(serverID, 'one')
                var help = new Discord.MessageEmbed()
                help.setTitle('Loop').setColor(0xdcebff).setDescription('Looping the first song.')
                message.channel.send(help)
                break
            case 'none':
            case 'off':
                loopType.set(serverID, 'none')
                var help = new Discord.MessageEmbed()
                help.setTitle('Loop').setColor(0xdcebff).setDescription('Looping disabled.')
                message.channel.send(help)
                break
            default:
                var help = new Discord.MessageEmbed()
                help.setTitle('Loop')
                    .setColor(0xdcebff)
                    .setDescription('Music command')
                    .addField((name = 'All'), (value = 'Loops the entire queue.'), (inline = false))
                    .addField((name = 'One'), (value = 'Loops the first song.'), (inline = false))
                    .addField((name = 'Nonde'), (value = 'Will play the queue normally.'), (inline = false))
                message.channel.send(help)
                break
        }

        console.log({ loopType })
        break
}

async function getSongLink(querry) {
    //returns a song link based on a querry
    let link
    console.log(ytdl.validateURL(querry))
    if (ytdl.validateURL(querry)) {
        link = querry
    } else {
        let links
        try {
            links = await (await yts(querry)).videos
        } catch (e) {
            console.log(e)
        }
        link = links[0].url
    }
    console.log(link)
    return link
}

async function play(fromUser) {
    let querry = song
    let link
    //playstat = is the music player already playing something
    var playStat = isPlaying.get(serverID)
    var link2 = await getSongLink(querry)
    console.log('i escaped the await')

    //if(song.length() == 0){message.channel.send("couldn't retrieve the link"); return;}

    if (fromUser) {
        link = link2
        currentSong.set(serverID, link)
    } else {
        link = currentSong.get(serverID)
        console.log('new link' + link)
        //tells the player it's not playing so that the next song gets played
        playStat = false
    }

    var connection
    //try to join a channel
    try {
        connection = await message.member.voice.channel.join()
    } catch (e) {
        console.log(e)
    }
    if (playStat) {
        return
    } else {
        //if it isn't playing, it sets the playing value to true
        isPlaying.set(serverID, true)
    }
    console.log(link)
    connection.play(ytdl(link, { filter: 'audioonly' })).on('finish', () => {
        var saveCurrentSong = currentSong.get(serverID)
        console.log({ saveCurrentSong })
        //puts the first song from the queue into current song
        let queueForPlayer = queue.get(serverID)
        console.log(queueForPlayer)
        switch (loopType.get(serverID)) {
            case 'all':
                queueForPlayer.push(saveCurrentSong)
                console.log(queue.get(serverID), currentSong.get(serverID))
                currentSong.set(serverID, queueForPlayer[0])
                console.log(queue.get(serverID), currentSong.get(serverID))
                queueForPlayer.shift()
                console.log(queue.get(serverID), currentSong.get(serverID))
                queue.set(serverID, queueForPlayer)
                console.log(queue.get(serverID), currentSong.get(serverID))
                break
            case 'one':
                currentSong.set(serverID, saveCurrentSong)
                break
            case 'none':
                queueForPlayer.shift()
                queue.set(serverID, queueForPlayer)
                break
        }
        play(false)
    })
}
function shiftQueue(skipHowMany) {
    let serverQueue = queue.get(serverID)
    let currentSongPlaying = currentSong.get(serverID)
    serverQueue.unshift(currentSongPlaying)

    //add loops for one and all here

    serverQueue.splice(0, skipHowMany)

    queue.set(serverID, serverQueue)

    currentSong.set(serverID, queue.get(serverID)[0])
    let newQueue = queue.get(serverID).shift()
    queue.set(serverID, newQueue)

    console.log(serverQueue)

    if (queue.get(serverID) == undefined || queue.get(serverID).length == 0) {
        try {
            message.guild.me.voice.channel.leave()
        } catch (e) {
            console.log(e)
        }
        isPlaying.set(serverID, false)
        var playStat = isPlaying.get(serverID)
        console.log('playstat ', playStat)
    } else {
        play(false)
    }
}
