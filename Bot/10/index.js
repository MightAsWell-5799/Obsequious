const keys = require('./auth.json')
const Discord = require('discord.js')
const client = new Discord.Client()
const tinyColor = require('tinycolor2')
const jimp = require('jimp')

const imageGen = require('./maths/image')

client.login(keys.token)
client.on('ready', () => console.log('ready'))

client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    if (!message.content.startsWith(keys.prefix)) {
        return
    }
    try {
        var serverID = message.guild.id
    } catch (e) {}
    var args = message.content.split(/ +/)
    //below is command
    var command = args[0].substring(1).toLowerCase()
    //below is the array of the querry
    var song1 = args.splice(1)
    //below is the string of the querry or whatever
    var args = message.content.split(' ')
    switch (command) {
        case 'imagepalette':
            if (args[1]) {
                link = args[1]
            } else {
                try {
                    link = message.attachments.first().url
                } catch (e) {
                    message.channel.send('Attach a file or link to an image and try again.')
                    break
                }
            }
            var parts = await imageGen.genImage(link, message)

            //message.channel.send('The most popular colours in your image are:\n ' + parts[0], new Discord.MessageAttachment(`./images/${message.id}.png`))

            //heapdump.writeSnapshot("./images/"+ message.id + '.heapsnapshot');

            break
        case 'test':
            message.channel.send('fgawawg')
            break
    }
})
