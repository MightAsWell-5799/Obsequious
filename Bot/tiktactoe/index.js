const Discord = require('discord.js')
const keys = require('./auth.json')
const client = new Discord.Client()

function newGame() {
    return {
        TL: 0,
        TM: 0,
        TR: 0,
        ML: 0,
        MM: 0,
        MR: 0,
        BL: 0,
        BM: 0,
        BR: 0,
        turn: 0,
        O: '',
        X: '',
    }
}

function turnOf(game) {
    if (game.turn % 2 == 0) {
        return 'O'
    }
    return 'X'
}

client.login(keys.token)

client
    .on('ready', () => {
        console.log('ready')
    })
    .on('error', (Error) => {
        console.log(error)
    })

client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    if (message.content === '?') {
        message.react('👍')
        message.react('👎')
    }
    if (!message.content.startsWith(keys.prefix)) {
        return
    }

    try {
        var serverID = message.guild.id
    } catch (e) {}

    var args = message.content.split(/ +/)
    var command = args[0].substring(1).toLowerCase()
    var args = message.content.split(' ')

    switch (command) {
        case 'challenge':
            if (message.mentions.members.size < 1) {
                message.channel.send('You must mention a member to challenge')
                break
            }
            message.channel.send(`${
                message.mentions.members.first().user.username
            } has been challenged by ${message.author.username}. 
            
            Do you accept?`)
            
            break
    }
})
