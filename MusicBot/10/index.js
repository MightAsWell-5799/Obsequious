const keys = require('./../../auth.json')
const Discord = require('discord.js')
const client = new Discord.Client()
const mongoose = require('mongoose')
const User = require('./user')
const tinyColor = require('tinycolor2')
client.login(keys.btoken)
client.on('ready', () => console.log('ready'))

mongoose.connect('mongodb://localhost:27017/serino', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    if (!message.content.startsWith(keys.bprefix)) {
        return
    }
    if (!(message.guild.id === '668648487185022977')) {
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
    var bottomChannelPosition = new Array()
    message.guild.channels.cache.forEach((value, key) => {
        if (value.type != 'category') {
            //console.log(value.type)
            bottomChannelPosition.push(value.type)
        }
    })
    bottomChannelPosition = bottomChannelPosition.length - 1
    switch (command) {
        case 'join':
            var role
            var channel
            if (!(await User.findOne({ ID: message.author.id }))) {
                role = await message.guild.roles.create({
                    data: {
                        name: message.author.id,
                    },
                    reason: "created a user's  role",
                })
                channel = await message.guild.channels.create(`${message.author.username}'s room`, {
                    type: 'voice',
                    parent: '805636295283310622',
                    permissionOverwrites: [
                        { id: message.guild.roles.everyone, deny: ['CONNECT'] },
                        { id: message.author.id, allow: ['CONNECT'] },
                    ],
                })
                var user = new User({ ID: message.author.id, role: role.id, channel: channel.id })
                var current = await user.save()
                message.member.roles.add(role)
                message.channel.send('Created a new role and channel for you.')
            } else {
                try {
                    var current = await User.findOne({ ID: message.author.id })
                    //console.log(await message.guild.channels.cache.get(current.channel).name)
                    message.channel.send('You already have a channel and role')
                } catch (e) {
                    message.channel.send('Something went terribly wrong, please ping me fast.')
                }
            }
            break
        case 'rolename':
        case 'rn':
            var current = await User.findOne({ ID: message.author.id })
            if (!current) {
                message.channel.send("You don't seem to have a role at the moment, try running **join** first.")
                break
            }
            args.shift()
            var name = args.join(' ').trim()
            try {
                await message.guild.roles.cache.get(current.role).setName(name)
                message.channel.send(`Changed your role name to **${name}**`)
            } catch (e) {
                message.channel.send(
                    "Couldn't change your role name. This might be because it's too long or contains invalid characters.",
                )
            }
            break
        case 'rolecolor':
        case 'rc':
            var current = await User.findOne({ ID: message.author.id })
            if (!current) {
                message.channel.send("You don't seem to have a role at the moment, try running **join** first.")
                break
            }
            var colour = args[1].replace(/[^a-zA-Z0-9À-ž\s]/g, '')
            var colour2 = new tinyColor(colour).toHex()
            //console.log({colour, colour2})
            try {
                await message.guild.roles.cache.get(current.role).setColor(colour2)
                message.channel.send(`Set your role colour to ${colour}`)
            } catch (e) {
                message.channel.send('Something went wrong. Try a different colour or hex.')
            }
            break
        case 'channelname':
        case 'cn':
            args.shift()
            var name = args.join(' ').trim() + `'s room`
            var current = await User.findOne({ ID: message.author.id })
            if (!current) {
                message.channel.send("You don't seem to have a channel at the moment, try running **join** first.")
                break
            }
            console.log(args.length)
            if (args.length < 1) {
                name = `${message.author.username}'s room`
            }
            try {
                await message.guild.channels.cache.get(current.channel).setName(`${name}`)
                message.channel.send(`set your channel name to **${name}**`)
            } catch (e) {
                message.channel.send(
                    "Couldn't change your channel name. This might be because it's too long or contains invalid characters.",
                )
            }
            break
        case 'lock':
            var current = await User.findOne({ ID: message.author.id })
            if (!current) {
                message.channel.send("You don't seem to have a channel at the moment, try running **join** first.")
                break
            }
            if (message.mentions.members.size < 1) {
                message.channel.send('You must mention the member you would like to unlock the room for.')
                break
            }
            try {
                var channel = await message.guild.channels.cache.get(current.channel)
                var newPerms = channel.permissionOverwrites
                    .array()
                    .concat([{ id: message.mentions.members.first().id, deny: ['CONNECT'] }])
                channel.overwritePermissions(newPerms)

                message.channel.send(`Locked **${message.mentions.members.first().displayName}** out.`)
            } catch (e) {
                message.channel.send('Something went wrong.')
            }
            break
        case 'unlock':
            var current = await User.findOne({ ID: message.author.id })
            if (!current) {
                message.channel.send("You don't seem to have a channel at the moment, try running **join** first.")
                break
            }
            if (message.mentions.members.size < 1) {
                message.channel.send('You must mention the member you would like to unlock the room for.')
                break
            }
            try {
                var channel = await message.guild.channels.cache.get(current.channel)
                var newPerms = channel.permissionOverwrites
                    .array()
                    .concat([{ id: message.mentions.members.first().id, allow: ['CONNECT'] }])
                channel.overwritePermissions(newPerms)

                message.channel.send(`Unlocked the room for **${message.mentions.members.first().displayName}**.`)
            } catch (e) {
                message.channel.send('Something went wrong.')
            }
            break
        case 'reload':
            var current = await User.findOne({ ID: message.author.id })
            if (!current) {
                message.channel.send("You don't seem to have a channel at the moment, try running **join** first.")
                break
            }
            var channel = await message.guild.channels.cache.get(current.channel)
            channel.overwritePermissions([
                { id: message.guild.roles.everyone, deny: ['CONNECT'] },
                { id: message.author.id, allow: ['CONNECT'] },
            ])
            break
        default:
            console.log('not a command')
    }
})
