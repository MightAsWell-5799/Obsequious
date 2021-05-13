const Discord = require('discord.js')
const client = new Discord.Client()
const keys = require('./auth.json')

client.login(keys.token)
client.on('ready', () => console.log('ready'))
client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    if (!message.content.toLowerCase().startsWith(keys.prefix)) {
        return
    }
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return
    }
    var args = message.content.split(/ +/)
    var command = args[0].substring(1).toLowerCase()
    var args = message.content.split(' ')
    switch (command) {
        case 'prep':
            var roleString = 'Tried to set the following roles to be transparent: \n'
            ;(await message.guild.roles.fetch(undefined,true, true)).cache.forEach((role) => {
                try {
                    if(role.id != message.guild.roles.everyone.id){
                    var temp = role.hexColor
                    role.setColor("DEFAULT")
                    roleString += ` - ${role.name}   (Original hex: ${temp})\n`}
                } catch (err) {
                    
                }
            })
            
            var outMessage = roleString
            message.channel.send(outMessage)
            break
    }
})
