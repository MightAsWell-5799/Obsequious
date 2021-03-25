"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const auth_json_1 = require("./auth.json");
const client = new Discord.Client();
const vectorMath = __importStar(require("./physics/vector"));
const makettgline = __importStar(require("./physics/makettgline"));
const makePolarLine = __importStar(require("./physics/makePolarLine"));
const makeLineChart = __importStar(require("./physics/makeLineChart"));
const colours = ["e86a92", "016fb9", "d1d646", "390040", "1d3461", "35a7ff", "f5f1ed", "cc4bc2", "bf4e30"];
var spaceEmotes;
var emoteHelp;
function defineHelps() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function selectRandomArray(input) {
    return input[Math.floor(Math.random() * input.length)];
}
const shotRoasts = ["You fucking dickbutt, you absolute fucking idiot! You actually fucking missed. \nThis is paper football, how hard is it? You just needa flick the damn piece of paper in a straight line.\nToo gay for that I guess.", "I'm literally gonna turn your intestinal track into a fun sized snickers for that shot."];
const pfpRoasts = ["Here you go you narcissistic piece of shit.", "There are axolotls in caves miles below the surface that evolved not to have eyes and I think they still manage to care more about your pfp than I do."];
client.login(auth_json_1.token);
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ready");
    spaceEmotes = (yield client.guilds.fetch("757052713489006652")).emojis.cache;
    emoteHelp = defineHelps();
}));
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    if (message.author.bot) {
        return;
    }
    if (message.content === "?") {
        message.react("👍");
        message.react("👎");
    }
    if (!message.content.startsWith(auth_json_1.prefix)) {
        return;
    }
    try {
        var serverID = message.guild.id;
    }
    catch (e) { }
    var args = message.content.split(/ +/);
    var command = args[0].substring(auth_json_1.prefix.length).toLowerCase();
    var song1 = args.splice(1);
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
            }
            else {
                message.channel.send(selectRandomArray(shotRoasts));
            }
            break;
        case "flex":
            message.channel.send("This bot probably has a better physics grade than you do.");
            break;
        case "vote":
            yield message.delete();
            var messagesAll = yield message.channel.messages.fetch();
            var voteable = messagesAll.get(messagesAll.keyArray()[0]);
            voteable.react("👍");
            voteable.react("👎");
            break;
        case "pfp":
            var testPFP;
            var usePFP;
            var useName;
            if (message.mentions.members.size) {
                testPFP = message.mentions.members.first().user.avatar;
                usePFP = message.mentions.members.first().user.avatarURL();
                useName = message.mentions.members.first().displayName.toString();
            }
            else {
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
            }
            catch (e) {
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
            var thisarraything = (yield client.guilds.fetch("757052713489006652")).emojis.cache;
            var potat = thisarraything.keyArray();
            var lego = new Map();
            potat.forEach((Element) => lego.set(thisarraything.get(Element).name, thisarraything.get(Element).id));
            if (args[1] == "help") {
                (yield emoteHelp).setDescription("&emote {Emoji}");
                message.channel.send(yield emoteHelp);
                break;
            }
            var thisarraything = (yield client.guilds.fetch("757052713489006652")).emojis.cache;
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
            }
            catch (e) {
                message.channel.send(yield emoteHelp);
                break;
            }
            message.channel.send(`<:Obsequi${args[1]}:${lego.get(`Obsequi${cappt}`)}>`);
            break;
        case "react":
            var thisarraything = (yield client.guilds.fetch("757052713489006652")).emojis.cache;
            var potat = thisarraything.keyArray();
            var lego = new Map();
            potat.forEach((Element) => lego.set(thisarraything.get(Element).name, thisarraything.get(Element).id));
            if (args[1] == "help") {
                (yield emoteHelp).setDescription("&react {Emoji} {member}");
                message.channel.send(yield emoteHelp);
                break;
            }
            try {
                var cappt = args[1].split("")[0].toUpperCase() + args[1].substring(1);
            }
            catch (e) {
                message.channel.send(yield emoteHelp);
                break;
            }
            var useMem;
            try {
                useMem = message.mentions.users.first().id;
            }
            catch (e) {
                useMem = message.author.id;
            }
            yield message.guild.member(useMem).lastMessage.react(lego.get(`Obsequi${cappt}`));
            break;
        case "ttg":
            console.log(parseFloat((_a = args[1]) !== null && _a !== void 0 ? _a : "0"), parseFloat((_b = args[2]) !== null && _b !== void 0 ? _b : "0"), parseFloat((_c = args[3]) !== null && _c !== void 0 ? _c : "-10"));
            console.log({ args });
            var toSend = new Discord.MessageEmbed();
            toSend
                .setTitle("Time to Ground")
                .setColor(0xdcebff)
                .setDescription(`The object took ${vectorMath.calcTimeY(parseFloat((_d = args[1]) !== null && _d !== void 0 ? _d : "0"), parseFloat((_e = args[2]) !== null && _e !== void 0 ? _e : "0"), parseFloat((_f = args[3]) !== null && _f !== void 0 ? _f : "-10"))} to land.`)
                .setImage(makettgline.makeTTGLine(parseFloat((_g = args[1]) !== null && _g !== void 0 ? _g : "0"), parseFloat((_h = args[2]) !== null && _h !== void 0 ? _h : "0"), parseFloat((_j = args[3]) !== null && _j !== void 0 ? _j : "-10")));
            message.channel.send(toSend);
            break;
        case "polarprojectile":
            var toSend = new Discord.MessageEmbed();
            console.log(args);
            if (parseInt(args[1]) > 10000 || parseInt(args[2]) > 10000 || parseInt(args[3]) > 10000 || parseInt(args[4]) > 10000) {
                message.channel.send("values too large");
                break;
            }
            var path = new Array();
            path.push("./" +
                (yield makePolarLine.makePolarLine(parseFloat((_k = args[1]) !== null && _k !== void 0 ? _k : "0"), parseFloat((_l = args[2]) !== null && _l !== void 0 ? _l : "0"), parseFloat((_m = args[3]) !== null && _m !== void 0 ? _m : "0"), parseFloat((_o = args[4]) !== null && _o !== void 0 ? _o : "-10"), serverID, message.id)));
            toSend
                .setTitle("Polar Projectile")
                .setColor(0xdcebff)
                .setDescription(`${vectorMath.polarDistance(parseFloat((_p = args[1]) !== null && _p !== void 0 ? _p : "0"), parseFloat((_q = args[2]) !== null && _q !== void 0 ? _q : "0"), parseFloat((_r = args[3]) !== null && _r !== void 0 ? _r : "0"), parseFloat((_s = args[4]) !== null && _s !== void 0 ? _s : "-10"))}`)
                .attachFiles(path)
                .setImage(`attachment://${path}`);
            message.channel.send(toSend);
            break;
        case "makegraph":
            var path = new Array();
            path.push("./" + (yield makeLineChart.makeLineChart(song1, serverID, message.id)));
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
}));
//# sourceMappingURL=index.js.map