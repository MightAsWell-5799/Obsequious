//!This is literally a potato for a slash commands thingie
//?I understand how to use them, but i found a better implementation for them
//?It'll be released soon enough, so imma wait
//?I'll work on the commands with normal obsequi for the time being
//!SCREAAAAAAAAAAAAAAAAAAAAAM


const Discord = require('discord.js')
const mongoose = require('mongoose')
const tinycolor2 = require('tinycolor2')
const auth = require('./auth.json')
const jimp = require('jimp')
const eevee = require('eevee-discord')

const client = new eevee.EeveeCore(auth.token)
const SlashCommands = eevee.SlashCommands

const slashCommands = client.register(SlashCommands)
const avatarURLGet = require('./longFunctions/avatarURL')

const User = require('./dbForms/user')
mongoose.connect('mongodb://localhost:27017/testing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

client.on('ready', async () => {
    await slashCommands.set(
        {
            name: 'addlist',
            description: 'add list item',
            options: [
                {
                    name: 'text',
                    description: 'the list item body',
                    type: '3',
                    required: true,
                },
            ],
        },
        '673388881894440978',
    )
    await slashCommands.set(
        {
            name: 'removelist',
            description: 'remove item',
            options: [
                {
                    name: 'index',
                    description: 'potato',
                    type: 4,
                    required: true,
                },
            ],
        },
        '673388881894440978',
    )
    console.log('ready')
    //console.log(await slashCommands.get({ guildID:  }))
})

slashCommands.on('interaction', async (interaction) => {
    var command = interaction.data.name
    var userID = interaction.member.user.id
    var userName = interaction.member.user.username
    var userAvatar = avatarURLGet.avatarURL(
        userID,
        interaction.member.user.avatar,
    )
    var mongoUser = await User.findOne({ ID: userID })
    if (!mongoUser) {
        console.log('creating new user')
        var temp = new User({
            ID: userID,
            name: userName,
            avatarURL: userAvatar,
            list: [],
        })
        mongoUser = await temp.save()
    }

    switch (command) {
        case 'removelist':
            var val = interaction.data.options[0].value
            mongoUser.list.splice(val - 1, 1)
            mongoUser.save()
            //console.log(interaction.data.options[0].name)
            slashCommands.respond(interaction, {
                type: 4,
                data: {
                    content: 'removed items from list  ',
                },
            })
            break
        case 'addlist':
            var val = interaction.data.options[0].value
            mongoUser.list.push(val)
            mongoUser.save()
            slashCommands.respond(interaction, {
                type: 4,
                data: {
                    content: 'potato:  \n' + val,
                },
            })
            break
    }
})

client.on('raw', (payload) => {})
