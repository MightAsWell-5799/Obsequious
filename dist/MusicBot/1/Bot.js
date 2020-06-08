const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const keys = require("./../../auth.json");
const search = require("yt-search");



client.login(keys.token)

client.on("ready", ()=> {console.log("ready")})



client.on("message", async msg => {
    
    console.log(msg.content)

    if(!msg.content.startsWith(keys.prefix))
    {return}
    if(msg.author.bot)
    {return}
    console.log("this is a command")

    

    var args = msg.content.split(" ")
    var command = args[0]
    console.log(command)
    var elements = args.splice(1)
    console.log(elements)



function playSong(){}



console.log(msg.content)
var connection








/*async function main(){
    
    try {connection = (await msg.member.voice.channel.join())
        playMoan()
        }
    catch(e){console.log("no vc")}
    
    
    
}
function playMoan(){
    connection.play("C:/Users/sebha/OneDrive/Desktop/DiscordBot/moosic/ashmoan.mp3").on("finish", () => playMoan())
}
if(msg.author.bot){return;} else {main()}


*/




});


//console.log(keys.token);
//exits task, use with the python root to kill music players after it has lost all music in the queue. Reset functions as well
//process.exit("out of here")
