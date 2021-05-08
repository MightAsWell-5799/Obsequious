
const keys = require("./auth.json");

const Discord = require("discord.js");
const png = require("pnglib-es6").default;
const client = new Discord.Client();
const imageDataURI = require("image-data-uri");

const vectorMath = require("./vector");
const makettgline = require("./makettgline");
const makePolarLine = require("./makePolarLine");
const makeLineChart = require("./makeLineChart");

const fs = require("fs");
const colours = ["08415c","cc2936","4da167","d58936","f6f930","e86a92", "016fb9", "d1d646", "390040", "1d3461", "35a7ff", "f5f1ed", "cc4bc2", "bf4e30"];

const Event = require("events");
const { exec, execFile } = require("child_process");
var obsequilock = "247845601641758720";
var safeServers = new Array


var waiting = false;
var waitingChannel = new String();

var confirm = new Event.EventEmitter();
confirm.on("triggered", (state) => {
	if (state) {
		commandrun("reboot");
	}
});

async function commandrun(commandname, message = new Discord.Message()) {
	if (commandname == "exec2") {
		var execed = message.content.substr(6);
		var returned = null;
		await exec(`${execed}`, (err, stdout, stderr) => {
			if (err) {
				console.error(err);
				return;	
			}
			returned = stdout
			console.log({returned});
		})
		.once("close", () => {
			console.log("executed command")
			message.channel.send("completed \n" + returned)
		});
	} else if (commandname == "exec") {
		var execed = message.content.substr(6);
		exec(`/bin/bash minecraft server ssn cmd ${execed}`, (err, stdout, stderr) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(stdout);
		}).once("exit", () => {
			console.log("executed command");
			message.channel.send("completed");
		});
	} else if (commandname == "reboot") {
		exec("sudo reboot now", (err, stdout, stderr) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(stdout);
		});
	} else {
		exec(`/bin/bash minecraft server ssn ${commandname}`, (err, stdout, stderr) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(stdout);
		}).once("exit", () => {
			console.log("executed command");
			message.channel.send("completed");
		});
	}
}

//const keys = require('./../../auth.json')

//client.login(keys.btoken)
client.login(keys.token);

client.on("ready", async () => {
	console.log("ready");

	var guildList = client.guilds.cache
	var guildIDList = guildList.keyArray()
    
    	guildIDList.forEach(async Element =>{
        	try{
        		if((await guildList.get(Element.toString()).members.fetch("247845601641758720")).user.username){
		        	safeServers.push(Element.toString())
            			//console.log("has me")
        		} else {
			        //console.log("no me")
		        } } catch(e){}
    		})

	});

async function createImage(squareHeight, cArray, msg, dims) {
	var squareWidth = squareHeight;

	var gridArrayWidth;
	var gridArrayHeight;

	if (dims === undefined) {
		gridArrayWidth = Math.ceil(Math.sqrt(cArray.length));
		gridArrayHeight = Math.ceil(Math.sqrt(cArray.length));
		console.log("made it here");
	} else {
		gridArrayWidth = dims[0];
		gridArrayHeight = dims[1];
	}
	console.log({ gridArrayHeight, gridArrayWidth });
	var height = gridArrayHeight * squareHeight;
	var width = gridArrayWidth * squareWidth;
	//var totalSquares = gridArrayHeight * gridArrayWidth

	//console.log(cArray.length)

	var ColourMap = new Map();
	cArray.forEach((Element) => {
		//console.log(Element)
		if (ColourMap.has(Element)) {
		} else {
			ColourMap.set(Element, "blank");
		}
	});
	var image = new png(width, height, ColourMap.size + 2, "white");
	ColourMap.forEach((value, key) => {
		ColourMap.set(key, image.createColor(key));
	});

	console.log(ColourMap);
	for (let y = 0; y < gridArrayHeight; y++) {
		//selects horizontal square
		for (let z = 0; z < gridArrayWidth; z++) {
			//selects vertical square line
			var point = y * gridArrayWidth + z;
			//console.log("point " + point)
			//console.log( "is " + cArray[point])
			var currentColor = ColourMap.get(cArray[point]);
			for (let i = 0; i < squareHeight; i++) {
				//goes horizontally this distance
				for (let l = 0; l < squareWidth; l++) {
					//travels vertically down one column of pixels in a square
					let x = z * squareWidth + l;
					//let y2 = l%100
					image.setPixel(x, i + squareHeight * y, currentColor);
				}
			}
		}
		//console.log(y)
	}
	var imageTitle = msg;
	await imageDataURI.outputFile(image.getDataURL(), `./colours/${imageTitle}`);
	var toSend = new Discord.MessageEmbed();
	toSend.setTitle("Your Art.");
	toSend.attachFiles(`./colours/${msg}.png`);
	return toSend;
}
//palette preview image
createImage(50, colours, "asdf");

async function createMatrix(drawFile) {
    var i = 0
    var colourMap = new Map()
    drawFile.colourNames.forEach((Element) => {
        colourMap.set(Element, drawFile.colours[i])
        i++
    })
    //console.log(colourMap)
    var outDrawing = new Array()
    drawFile.drawing.forEach((Element) => {
        outDrawing.push(colourMap.get(Element))
    })
    //console.log(outDrawing)
    //console.log(colours)
    return outDrawing
}

var emoteHelp = new Discord.MessageEmbed();
function makePairs(messageArray) {
	var iPairsPushIndex = 0;
	var iMessageArrayIndex = 0;
	var pairs = new Array(Array());

	for (iMessageArrayIndex = 0; iMessageArrayIndex < messageArray.length; iMessageArrayIndex++) {
		if (pairs[iPairsPushIndex].length % 2 == 0 && pairs[iPairsPushIndex].length !== 0) {
			pairs.push(Array());
			pairs[iPairsPushIndex + 1].push(parseInt(messageArray[iMessageArrayIndex]));
			iPairsPushIndex++;
		} else {
			pairs[iPairsPushIndex].push(messageArray[iMessageArrayIndex]);
		}
	}

	//console.log(pairs)
	return pairs;
}
async function sortPairs(pairsIn) {
	var pairsOut;
	var iPairSort = 0;
	var loopSort = 0;
	for (loopSort = 0; loopSort < pairsIn.length; loopSort++) {
		for (iPairSort = 0; iPairSort < pairsIn.length; iPairSort++) {
			var altSort = iPairSort + 1;
			var first = pairsIn[iPairSort][0];
			try {
				var second = pairsIn[altSort][1];
			} catch (e) {
				break;
			}
			//console.log({ iPairSort, first, second, pairsIn })
			var temp1;
			var temp2;

			if (pairsIn[altSort][0] < pairsIn[iPairSort][0]) {
				temp1 = pairsIn[iPairSort];
				temp2 = pairsIn[altSort];
				pairsIn[iPairSort] = temp2;
				pairsIn[altSort] = temp1;
				//console.log('swapped')
			}
		}
	}
	pairsOut = pairsIn;
	return pairsOut;
}
async function defineHelps() {
	var thisarraything = (await client.guilds.fetch("757052713489006652")).emojis.cache;
	var potat = thisarraything.keyArray();
	var lego = new Map();
	potat.forEach((Element) => lego.set(thisarraything.get(Element).name, thisarraything.get(Element).id));
	emoteHelp
		.setTitle("Emotes")
		.setColor(0xdcebff)
		.addField((name = "Joy"), (value = `<:ObsequiJoy:${lego.get("ObsequiJoy")}>`), (inline = true))
		.addField((name = "Derp"), (value = `<:Derp:${lego.get("ObsequiDerp")}>`), (inline = true))
		.addField((name = "Lenny"), (value = `<:ObsequiLenny:${lego.get("ObsequiLenny")}>`), (inline = true))
		.addField((name = "Concerned"), (value = `<:ObsequiConcerned:${lego.get("ObsequiConcerned")}>`), (inline = true))
		.addField((name = "Loopy"), (value = `<:ObsequiLoopy:${lego.get("ObsequiLoopy")}>`), (inline = true))
		.addField((name = "Yell"), (value = `<:ObsequiYell:${lego.get("ObsequiYell")}>`), (inline = true))
		.addField((name = "Sad"), (value = `<:ObsequiSad:${lego.get("ObsequiSad")}>`), (inline = true))
		.addField((name = "Wicked"), (value = `<:ObsequiWicked:${lego.get("ObsequiWicked")}>`), (inline = true))
		.addField((name = "Soulless"), (value = `<:ObsequiSoulless:${lego.get("ObsequiSoulless")}>`), (inline = true));
}
defineHelps();

const remiFile = require("./drawings/remi.json");
const sebFile = require("./drawings/rainbowandsky.json");
const serinFile =require("./drawings/serin.json")

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



client.on("message", async (message) => {
	//console.log(calcPolarDistance(['0', '10', '-8', -9]))
	//if(message.content.replace(" ", "").search("simp") >= 0){message.member.setNickname("simp")}
	if (message.author.id == obsequilock && waiting == true && message.channel.id == waitingChannel) {
		if (message.content.split(/ +/)[0] == "yes" || message.content.split(/ +/)[0] == "y") {
			confirm.emit("triggered", true);
			message.channel.send("Rebooting server.");
		} else {
			message.channel.send("Reboot cancelled.");
			confirm.emit("triggered", false);
		}
		waiting = false;
		return;
	}
	if (message.author.bot) {
		return;
	}


	/*if(message.guild.id == "760866540659671102"){
        	var test = (Math.random() + await checkUser(message.author.id) + twoBoost/10) 
        	if(test > 0.97){
            		console.log({twoBoost, oneBoost, test})
            		console.log("rude")
            		twoBoost = Math.floor((oneBoost/(Math.exp(twoBoost)) + 1 ))
            		oneBoost++
            		await message.channel.send(messagesToSend[randomNum()])
        	}
        
    	}/**/


	if (!message.content.startsWith(keys.prefix)) {
		return;
	}
	
	try {
		var serverID = message.guild.id;
	} catch (e) {}
	
	//below is the string of the querry or whatever
	var args = message.content.toLowerCase().substring(keys.prefix.length).split(/ +/);
    

        //lock out of other servers
	
        /*if(safeServers.includes(message.guild.id)){
        }else {
            message.channel.send("Obsequious is not active in this server currently.");
            return;
        }/**/

    var song1 = args.splice(1);
    var command = args[0];

    var args = message.content.toLowerCase().substring(keys.prefix.length).split(/ +/);
    
	switch (command) {
		case "reboot":
			if (message.author.id !== obsequilock) {
				break;
			}
			message.channel.send("Are you sure you want to do this?");
			waiting = true;
			waitingChannel = message.channel.id;
			break;
		case "restart":
			if (message.author.id !== obsequilock) {
				break;
			}
			commandrun(command, message);
			message.channel.send("Restarting the server..");
			break;
		case "backup":
			if (message.author.id !== obsequilock) {
				break;
			}
			commandrun(command, message);
			break;
		case "exec":
			if (message.author.id !== obsequilock) {
				break;
			}
			commandrun(command, message);
			break;
		case "exec2":
			if (message.author.id !== obsequilock) {
				break;
			}
			commandrun(command, message);
			break;

		case 'flex':
            		message.channel.send(
                		'This bot probably has a better physics grade than you do.',
            		)
            		break
        	case 'serino':
            		var colorMatrix = await createMatrix(serinFile)
            		message.channel.send(
                		await createImage(
                    		9,
                    		colorMatrix,
                    		message.id,
                    		serinFile.dims,
                    		serinFile.name,
                		),
            		)
            		break
		case "remi":
			message.channel.send(await createImage(20, remiFile.drawing, message.id, [18, 18]));
			break;
		case "custom":
			message.channel.send(await createImage(20, sebFile.drawing, message.id, sebFile.dims));
			break;
		case "cc":
			args.shift();
			if (args[0] == "dims") {
				args.shift();
				var dims = [args.shift(), args.shift()];
			}

			var cList = args;
			console.log(dims);
			console.log(cList);
			message.channel.send(await createImage(25, cList, message.id, dims));

			break;
		case "preview":
			var toSend = new Discord.MessageEmbed();
			toSend.setTitle("Palette Colours");
			toSend.setDescription("Count from left to right starting at one to select a colour.");
			toSend.attachFiles("./colours/asdf.png");
			//toSend.setImage("https://cdn.discordapp.com/attachments/760965640210219008/796384002041708544/asdf.png")
			message.channel.send(toSend);
			break;
		case "palette":
			if (!(message.guild.id == "760866540659671102")) {
				break;
			}
			var selected = Math.floor(Math.random() * colours.length);
			if (parseInt(args[1]) > 0 && parseInt(args[1]) < colours.length + 1) {
				selected = parseInt(args[1]) - 1;
			}
			//put this into a function with the colour command one
			var list = new Array();
			message.member.roles.cache.keyArray().forEach((Element) => {
				var rawPos = parseInt(message.member.roles.cache.get(Element).rawPosition);
				var role = message.member.roles.cache.get(Element);
				list.push(rawPos, role);
			});
			var temp1 = await sortPairs(makePairs(list));
			var temp2 = temp1[temp1.length - 2][1];
			temp2.setColor(colours[selected]);
			//console.log("set colour to " + colours[selected])
			break;

		case "color":
		case "colour":
		case "c":
			if (!(message.guild.id == "760866540659671102")) {
				break;
			}
			var list = new Array();
			message.member.roles.cache.keyArray().forEach((Element) => {
				var rawPos = parseInt(message.member.roles.cache.get(Element).rawPosition);
				var role = message.member.roles.cache.get(Element);
				list.push(rawPos, role);
			});
			var temp1 = await sortPairs(makePairs(list));
			var temp2 = temp1[temp1.length - 2][1];
			switch (args[1]) {
				case "hex":
					if (!(args[2].length > 6)) {
						try {
							temp2.setColor(parseInt(args[2], 16));
						} catch (e) {}
					}
					break;
				case "decimal":
					if (!(args[2].length > 8)) {
						try {
							temp2.setColor(parseInt(args[2]));
						} catch (e) {}
					}
					break;
				default:
					break;
			}
			break;
		case "vote":
			await message.delete();

			var messagesAll = await await message.channel.messages.fetch(true);
			var voteable = messagesAll.get(messagesAll.keyArray()[0]);
			voteable.react("👍");
			voteable.react("👎");

			break;
		case "pfp":
            		//console.log('pfp')
            		var testPFP
            		var usePFP
            		var useName
            		if (message.mentions.members.size) {
                		testPFP = message.mentions.members.first().user.avatar
                		usePFP = message.mentions.members.first().user.avatarURL()
                		useName = message.mentions.members
                    		.first()
                    		.displayName.toString()
            		} else {
                		testPFP = message.author.avatar
                		usePFP = message.author.avatarURL()
                		useName = message.author.username
            		}

                	if(testPFP.substring(0,2) === "a_"){
                    		usePFP = usePFP.split(".")
                    		usePFP[usePFP.length - 1] = "gif"
                    		usePFP = usePFP.join(".")
                	}

            		var toSend = new Discord.MessageEmbed()
            		toSend.setTitle(useName)

            		toSend.setImage(`${usePFP}?size=512`)
            		toSend.setColor(0xdcebff)
            		message.channel.send(toSend)
            		break;
		case "id":
			var useID;
			var syntacc;
			var usePFP;
			try {
				useID = message.mentions.members.first().user.id;
				syntacc = message.mentions.members.first().displayName;
				usePFP = message.mentions.members.first().user.avatar;
			} catch (e) {
				useID = message.author.id;
				syntacc = message.author.username;
				usePFP = message.author.avatar;
			}

			var sendID = new Discord.MessageEmbed();
			sendID.setTitle(syntacc);
			sendID.setDescription(`ID: ${useID}`);
			sendID.setThumbnail(`https://cdn.discordapp.com/avatars/${useID}/${usePFP}?size=512`);

			message.channel.send(sendID);
			break;
		case "obsequimote":
		case "emote":
			var thisarraything = (await client.guilds.fetch("757052713489006652")).emojis.cache;
			var potat = thisarraything.keyArray();
			var lego = new Map();
			potat.forEach((Element) => lego.set(thisarraything.get(Element).name, thisarraything.get(Element).id));

			if (args[1] == "help") {
				emoteHelp.setDescription("&emote {Emoji}");
				message.channel.send(emoteHelp);
				break;
			}
			var thisarraything = (await client.guilds.fetch("757052713489006652")).emojis.cache;
			var potat = thisarraything.keyArray();
			var lego = new Map();
			potat.forEach((Element) => lego.set(thisarraything.get(Element).name, thisarraything.get(Element).id));
			if (args[1] == "all") {
				var potat2 = new Array();
				lego.forEach((value, key, map) => {
					potat2.push(key);
				});
				var finalstring = new String();
				potat2.forEach((Element) => {
					finalstring = finalstring + " " + `<:${Element}:${lego.get(Element)}>`;
				});
				message.channel.send(finalstring);
				break;
			}

			`<:ObsequiJoy:${lego.get("ObsequiJoy")}>`;

			try {
				var cappt = args[1].split("")[0].toUpperCase() + args[1].substring(1);
			} catch (e) {
				message.channel.send(emoteHelp);
				break;
			}

			message.channel.send(`<:Obsequi${args[1]}:${lego.get(`Obsequi${cappt}`)}>`);
			break;
		case "react":
			var thisarraything = (await client.guilds.fetch("757052713489006652")).emojis.cache;
			var potat = thisarraything.keyArray();
			var lego = new Map();
			potat.forEach((Element) => lego.set(thisarraything.get(Element).name, thisarraything.get(Element).id));

			if (args[1] == "help") {
				emoteHelp.setDescription("&react {Emoji} {member}");

				message.channel.send(emoteHelp);
				break;
			}

			try {
				var cappt = args[1].split("")[0].toUpperCase() + args[1].substring(1);
			} catch (e) {
				message.channel.send(emoteHelp);
				break;
			}
			var useMem;
			try {
				useMem = message.mentions.users.first().id;
			} catch (e) {
				useMem = message.author.id;
			}
			await message.guild.member(useMem).lastMessage.react(lego.get(`Obsequi${cappt}`));
			//console.log(await message.guild.users.fetch(useMem))
			//.react(`<:Obsequi${args[1]}:${lego.get(`Obsequi${cappt}`)}>`)
			break;
		case "ttg":
			var toSend = new Discord.MessageEmbed();
			toSend
				.setTitle("Time to Ground")
				.setColor(0xdcebff)
				.setDescription(`The object took ${vectorMath.calcTimeY([args[1], args[2] | 0, args[3] | -10])} to land.`)
				.setImage(makettgline.makeTTGLine([args[1], args[2] | 0, args[3] | -10]));
			message.channel.send(toSend);

			break;
		case "polarprojectile":
			var toSend = new Discord.MessageEmbed();
			console.log(args);
			if ((args[1] > 10000) | (args[2] > 10000) | (args[3] > 10000) | (args[4] > 10000)) {
				message.channel.send("values too large");
				break;
			}
			var path = await makePolarLine.makePolarLine([args[1], args[2], args[3] | 0, args[4] | -10, serverID, message.id]);
			toSend
				.setTitle("Polar Projectile")
				.setColor(0xdcebff)
				.setDescription(`${vectorMath.calcPolarDistance([args[1], args[2], args[3] | 0, args[4] | -10])}`)
				.attachFiles("./" + path)
				.setImage(`attachment://${path}`);
			message.channel.send(toSend);
			break;
		case "makegraph":
			var path = await makeLineChart.makeLineChart([song1, serverID, message.id]);
			var toSend = new Discord.MessageEmbed();
			toSend
				.setTitle("Your Chart")
				.setColor(0xdcebff)
				.attachFiles("./" + path)
				.setDescription(`Points: `);
			message.channel.send(toSend);
			break;
		case "nsfw":
			if (message.channel.nsfw) {
				message.channel.send("No you sick fuck.");
			}
			break;
		case "":
			message.channel.send("Do you want something?");
			break;
		default:
			break;
	}
});


