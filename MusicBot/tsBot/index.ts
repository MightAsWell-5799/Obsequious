import * as Discord from "discord.js";
import { prefix, token } from "./auth.json";
import type { MessageEmbed } from "discord.js";

const client = new Discord.Client();

import * as vectorMath from "./physics/vector";
import * as makettgline from "./physics/makettgline";
import * as makePolarLine from "./physics/makePolarLine";
import * as makeLineChart from "./physics/makeLineChart";
import { makePairs, sortPairs } from "./physics/makeLineChart";

//const png = require("./functions/png.js");
const colours = ["e86a92", "016fb9", "d1d646", "390040", "1d3461", "35a7ff", "f5f1ed", "cc4bc2", "bf4e30"];
var spaceEmotes: Discord.Collection<string, Discord.GuildEmoji>;
//png.createImage()
//palette preview image
//createImage(50, colours, 'asdf')

var emoteHelp;

async function defineHelps() {
	var potat = spaceEmotes.keyArray();
	var lego = new Map();
	potat.forEach((Element) => lego.set(spaceEmotes.get(Element).name, spaceEmotes.get(Element).id));
	var emoteHelp2 = new Discord.MessageEmbed();
	emoteHelp2
		.setTitle("Emotes")
		.setColor(0xdcebff)
		.addField("Joy", `<:ObsequiJoy:${lego.get("ObsequiJoy")}>`, true)
		.addField("Derp", `<:Derp:${lego.get("ObsequiDerp")}>`, true)
		.addField("Lenny", `<:ObsequiLenny:${lego.get("ObsequiLenny")}>`, true)
		.addField("Concerned", `<:ObsequiConcerned:${lego.get("ObsequiConcerned")}>`, true)
		.addField("Loopy", `<:ObsequiLoopy:${lego.get("ObsequiLoopy")}>`, true)
		.addField("Yell", `<:ObsequiYell:${lego.get("ObsequiYell")}>`, true)
		.addField("Sad", `<:ObsequiSad:${lego.get("ObsequiSad")}>`, true)
		.addField("Wicked", `<:ObsequiWicked:${lego.get("ObsequiWicked")}>`, true)
		.addField("Soulless", `<:ObsequiSoulless:${lego.get("ObsequiSoulless")}>`, true);
	return emoteHelp2;
}

function selectRandomArray(input: string[]) {
	return input[Math.floor(Math.random() * input.length)];
}
const shotRoasts: string[] = [
	"You fucking dickbutt, you absolute fucking idiot! You actually fucking missed. \nThis is paper football, how hard is it? You just needa flick the damn piece of paper in a straight line.\nToo gay for that I guess.",
	"I'm literally gonna turn your intestinal track into a fun sized snickers for that shot.",
];
const pfpRoasts: string[] = [
	"Here you go you narcissistic piece of shit.",
	"There are axolotls in caves miles below the surface that evolved not to have eyes and I think they still manage to care more about your pfp than I do.",
];
/*const remiFile = require("./drawings/remi.json");
const sebFile = require("./drawings/rainbowandsky.json");
const serinFile = require("./drawings/serin.json");/** */
client.login(token);
client.on("ready", async () => {
	console.log("ready");
	spaceEmotes = (await client.guilds.fetch("757052713489006652")).emojis.cache;
	emoteHelp = defineHelps();
});

client.on("message", async (message) => {


	//console.log(calcPolarDistance(['0', '10', '-8', -9]))
	//if(message.content.replace(" ", "").search("simp") >= 0){message.member.setNickname("simp")}
	//if(message.content.replace(" ", "").search("simp") >= 0){message.member.setNickname("simp")}
	if (message.author.bot) {
		return;
	}
	if (message.content === "?") {
		message.react("👍");
		message.react("👎");
	}
	if (!message.content.startsWith(prefix)) {
		return;
	}

	try {
		var serverID = message.guild.id;
	} catch (e) {}

	//lock out of other servers
	/*if(safeServers.includes(message.guild.id)){
}else {
message.channel.send("Obsequious is not active in this server currently.");
return;
} /* */

	var args = message.content.split(/ +/);
	//below is command
	var command = args[0].substring(prefix.length).toLowerCase();
	//below is the array of the querry
	var song1 = args.splice(1);
	//below is the string of the querry or whatever
	var args = message.content.split(" ");
	switch (command) {
		case "quit":
			if (message.author.id === "247845601641758720") {
				process.exit();
			}
			break;
		case "pf":
			if (Math.random() > 0.9) {
				message.channel.send("You win!");
			} else {
				message.channel.send(selectRandomArray(shotRoasts));
			}
			break;
		case "flex":
			message.channel.send("This bot probably has a better physics grade than you do.");
			break;
		/*case 'serino':
            var colorMatrix = await createMatrix(serinFile)
            message.channel.send(await createImage(9, colorMatrix, message.id, serinFile.dims, serinFile.name))
            break
        case 'remi':
            message.channel.send(await createImage(20, remiFile.drawing, message.id, [18, 18], serinFile.name))
            break
        case 'custom':
            message.channel.send(await createImage(20, sebFile.drawing, message.id, sebFile.dims, serinFile.name))
            break
        case 'cc':
            args.shift()
            if (args[0] == 'dims') {
                args.shift()
                var dims = [args.shift(), args.shift()]
            }

            var cList = args
            console.log(dims)
            console.log(cList)
            message.channel.send(await createImage(25, cList, message.id, dims))

            break
        case 'preview':
            var toSend = new Discord.MessageEmbed()
            toSend.setTitle('Palette Colours')
            toSend.setDescription('Count from left to right starting at one to select a colour.')
            toSend.attachFiles('./colours/asdf.png')
            //toSend.setImage("https://cdn.discordapp.com/attachments/760965640210219008/796384002041708544/asdf.png")
            message.channel.send(toSend)
            break
        case 'palette':
            if (!(message.guild.id == '760866540659671102')) {
                break
            }
            var selected = Math.floor(Math.random() * colours.length)
            if (parseInt(args[1]) > 0 && parseInt(args[1]) < colours.length + 1) {
                selected = parseInt(args[1]) - 1
            }
            //put this into a function with the colour command one
            var list = new Array()
            message.member.roles.cache.keyArray().forEach((Element) => {
                var rawPos = parseInt(message.member.roles.cache.get(Element).rawPosition)
                var role = message.member.roles.cache.get(Element)
                list.push(rawPos, role)
            })
            var temp1 = await sortPairs(makePairs(list))
            var temp2 = temp1[temp1.length - 2][1]
            temp2.setColor(colours[selected])
            //console.log("set colour to " + colours[selected])
            break /* */

		case "vote":
			await message.delete();

			var messagesAll = await message.channel.messages.fetch();
			var voteable = messagesAll.get(messagesAll.keyArray()[0]);
			voteable.react("👍");
			voteable.react("👎");

			break;
		case "pfp":
			//console.log('pfp')
			var testPFP;
			var usePFP;
			var useName;
			if (message.mentions.members.size) {
				testPFP = message.mentions.members.first().user.avatar;
				usePFP = message.mentions.members.first().user.avatarURL();
				useName = message.mentions.members.first().displayName.toString();
			} else {
				testPFP = message.author.avatar;
				usePFP = message.author.avatarURL();
				useName = message.author.username;
			}

			if (testPFP.substring(0, 2) === "a_") {
				usePFP = usePFP.split(".");
				usePFP[usePFP.length - 1] = "gif";
				usePFP = usePFP.join(".");
			}

			var toSend = new Discord.MessageEmbed();
			toSend.setTitle(selectRandomArray(pfpRoasts));

			toSend.setImage(`${usePFP}?size=512`);
			toSend.setColor(0xdcebff);
			message.channel.send(toSend);
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
				(await emoteHelp).setDescription("&emote {Emoji}");
				message.channel.send(await emoteHelp);
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
				message.channel.send(finalstring.toString());
				break;
			}

			`<:ObsequiJoy:${lego.get("ObsequiJoy")}>`;

			try {
				var cappt = args[1].split("")[0].toUpperCase() + args[1].substring(1);
			} catch (e) {
				message.channel.send(await emoteHelp);
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
				(await emoteHelp).setDescription("&react {Emoji} {member}");

				message.channel.send(await emoteHelp);
				break;
			}

			try {
				var cappt = args[1].split("")[0].toUpperCase() + args[1].substring(1);
			} catch (e) {
				message.channel.send(await emoteHelp);
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
			console.log(parseFloat(args[1] ?? "0"), parseFloat(args[2] ?? "0"), parseFloat(args[3] ?? "-10"));
			console.log({ args });
			var toSend = new Discord.MessageEmbed();
			toSend
				.setTitle("Time to Ground")
				.setColor(0xdcebff)
				.setDescription(
					`The object took ${vectorMath.calcTimeY(parseFloat(args[1] ?? "0"), parseFloat(args[2] ?? "0"), parseFloat(args[3] ?? "-10"))} to land.`
				)
				.setImage(makettgline.makeTTGLine(parseFloat(args[1] ?? "0"), parseFloat(args[2] ?? "0"), parseFloat(args[3] ?? "-10")));
			message.channel.send(toSend);

			break;
		case "polarprojectile":
			var toSend = new Discord.MessageEmbed();
			console.log(args);
			if (parseInt(args[1]) > 10000 || parseInt(args[2]) > 10000 || parseInt(args[3]) > 10000 || parseInt(args[4]) > 10000) {
				message.channel.send("values too large");
				break;
			}
			var path: string[] = new Array();
			path.push(
				"./" +
					(await makePolarLine.makePolarLine(
						parseFloat(args[1] ?? "0"),
						parseFloat(args[2] ?? "0"),
						parseFloat(args[3] ?? "0"),
						parseFloat(args[4] ?? "-10"),
						serverID,
						message.id
					))
			);
			toSend
				.setTitle("Polar Projectile")
				.setColor(0xdcebff)
				.setDescription(
					`${vectorMath.polarDistance(
						parseFloat(args[1] ?? "0"),
						parseFloat(args[2] ?? "0"),
						parseFloat(args[3] ?? "0"),
						parseFloat(args[4] ?? "-10")
					)}`
				)
				.attachFiles(path)
				.setImage(`attachment://${path}`);
			message.channel.send(toSend);
			break;
		case "makegraph":
			var path: string[] = new Array();
			path.push("./" + (await makeLineChart.makeLineChart(song1, serverID, message.id)));
			var toSend = new Discord.MessageEmbed();
			toSend.setTitle("Your Chart").setColor(0xdcebff).attachFiles(path).setDescription(`Points: `);
			message.channel.send(toSend);
			break;
		case "nsfw":
			if (message.channel.type != "dm" && message.channel.nsfw) {
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
