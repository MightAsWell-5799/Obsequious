const keys = require('./auth.json')

const Discord = require('discord.js')
//const png = require('pnglib-es6').default
const client = new Discord.Client()

const Vote = require('./models/vote.js')

client.login(keys.token)

client.on('ready', () => {
    console.log('ready')
})


/**
 * keywords: 
 *  - create
 *  - delete/remove
 */
client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    if (message.guild.id != '854402265052610620') {
        return
    }

    var args = message.content.split(/ */)
    //the regex here just removes all non alphanumeric characters
    var command = args[0].substring(1).toLowerCase().replace(/\W/g, '')
    function endVote() {
        //this will count the number of each reaction on the vote, It 
    }
    switch (command) {
        case 'vc':
            //inputs are time(minutes/hours/days) then the scope (public/council) and then the question string
            //! This will be expanded to allow for channel creation other such things
            break
        case "killvote":
            //input is the vote ID
            break
        case "listvotes":
            //can take the inputs of public/council
            //?returns a list of the currently open votes
            //?open votes will have an ID assigned to them by mongoose during the creation of the poll
            break;
    }
})
