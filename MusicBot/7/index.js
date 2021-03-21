const Discord = require('discord.js')
const client = new Discord.Client()
const keys = {"token": "NjI5NTM0MzA4NTE1ODQwMDAw.XxGcpw.f1ifpOLnWeYR_4j1-6AhArnKZf0", "prefix":"#"}

const fs = require("fs")






const messagesToSend = ["weird", "rude", "misc agressive statement", "some random rude message", "okay then"]


let safeServers = new Array
let nonoServers = new Array
var guildList
var guildIDList



client.login(keys.token)
client.on('ready', async () => {
    guildList = client.guilds.cache
    guildIDList = guildList.keyArray()
    console.log('ready')
    
    await guildIDList.forEach(async Element =>{
        try{
        if((await guildList.get(Element.toString()).members.fetch("247845601641758720")).user.username){
            
            safeServers.push(Element.toString())
            console.log(Element)

            apple = safeServers
            //console.log("has me")
        } else {
            //console.log("no me")
        } } catch(e){ 
            nonoServers.push(Element.toString())
        }
    })
    console.log({safeServers, nonoServers})
    var potato = new Array
    
    
})

function randomNum(){
    var temp = Math.ceil(Math.random() * messagesToSend.length) - 1
    //console.log(temp)
    return temp

}
var oneBoost = 1
var twoBoost = 0
const ExtraRespond = ["327989170566070272", "434861320891006976", "763204543974473749"] 
    
    function checkUser(ID){
        if(ExtraRespond.includes(ID)){
            return (0.01)
        } else {
            return (0)
        }
    }



client.on('message', async (message) => {
    //console.log(safeServers)
    
    if (message.author.bot) {
        return
    }
//console.log(safeServers)
    //console.log(messagesToSend)
    
    if(message.guild.id == "760866540659671102"){
        var test = (Math.random() + await checkUser(message.author.id)) 
        if(test > 0.99){
            console.log({twoBoost, oneBoost, test})
            console.log("rude")
            twoBoost = Math.floor((oneBoost/(Math.exp(twoBoost) + 1) ))
            oneBoost++
            await message.channel.send(messagesToSend[randomNum()])
        }
        
    }/**/

    if (!message.content.startsWith(keys.prefix)) {
        return
    }
    //!make this into a function below to call in case of weird thing
    //console.log(message.guild.id)
    //console.log(safeServers)
    if(safeServers.includes(message.guild.id.toString())){
        //console.log("weird shit")
    }else {
        message.channel.send("Obsequious is not active in this server currently.");
        return;
    }

    var args = message.content.split(' ')
    //below is command
    var command = args[0].substring(1).toLowerCase()
    //below is the array of the querry
    var song1 = args.splice(1)
    //below is the string of the querry or whatever
    var args = message.content.split(' ')
    //console.log({command})
    switch (command) {
        case "a":
            if(message.author.id == "247845601641758720") {
                //console.log({safeServers, nonoServers})
                nonoServers.forEach(Element =>{
                    guildList.get(Element).systemChannel.send(
                        message.content.substring(3)
                        
                    )
                })
            }
        break;
        case "contains":
            message.channel.send("potato")
            break;
    }
})

