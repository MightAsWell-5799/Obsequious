const keys = require('./../../auth.json')

const Discord = require('discord.js')
const client = new Discord.Client()
const clock = require("timers")


const rocks = (who, m) => {
  console.log(who + ' potato shit nate ');
};
setTimeout(rocks, 2 * 1000, );

/* 

client.login(keys.btoken)

client.on('ready', () => {
  console.log('ready')
}).on('error', (Error) => {
  console.log(error)
})

/** */