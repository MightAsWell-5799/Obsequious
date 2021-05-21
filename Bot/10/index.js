const keys = require('./auth.json')
const Discord = require('discord.js')
const client = new Discord.Client()
const tinyColor = require('tinycolor2')
const jimp = require('jimp')

const imageMath = require('./maths/collect')
const colourFilter = require('./maths/filter')
client.login(keys.token)
client.on('ready', () => console.log('ready'))

client.on('message', async (message) => {
    if (message.author.bot) {
        return
    }
    if (!message.content.startsWith(keys.prefix)) {
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
    switch (command) {
        case 'imagepalette':
            var tempColourMap = new Map()
            var link
            if (args[1]) {
                link = args[1]
            } else {
                try {
                    link = message.attachments.first().url
                } catch (e) {
                    message.channel.send('Attach a file or link to an image and try again.')
                    break
                }
            }

            await jimp.read(link).then((image) => {
                image.resize(128, 128)
                image.bit
                var h = image.getHeight()
                var w = image.getWidth()
                var totalPixels = h * w
                var pixelArray = []
                var pixelSet = new Set()
                for (let i = 0; i < h; i++) {
                    for (let j = 0; j < w; j++) {
                        image.getPixelColor(j, i, (err, value) => {
                            var RGBA = jimp.intToRGBA(value)
                            var newrgba = {
                                r: RGBA.r,
                                g: RGBA.g,
                                b: RGBA.b,
                                name: '',
                            }
                            var strings = ['', '', '']
                            if (RGBA.r.toString(16).length < 2) {
                                strings[2] = '0' + RGBA.r.toString(16)
                            } else {
                                strings[0] = RGBA.r.toString(16)
                            }
                            if (RGBA.g.toString(16).length < 2) {
                                strings[2] = '0' + RGBA.g.toString(16)
                            } else {
                                strings[1] = RGBA.g.toString(16)
                            }
                            if (RGBA.b.toString(16).length < 2) {
                                strings[2] = '0' + RGBA.b.toString(16)
                            } else {
                                strings[2] = RGBA.b.toString(16)
                            }
                            newrgba.name = strings.join('')
                            if (!pixelSet.has(newrgba.name)) {
                                pixelArray.push(newrgba)
                                pixelSet.add(newrgba.name)
                            }
                        })
                    }
                }
                var newMap = imageMath.collectNearby(pixelArray)
                var mostPopularColours = colourFilter.filterColours(newMap)
                var mostPopularInts = new Array(16).fill(11111111)
                console.log(mostPopularColours)
                var colorCount = 0
                mostPopularColours.forEach((Element) => {
                    var colour = tinyColor(Element)
                    mostPopularInts[colorCount] = (parseInt(colour.toHex8(), 16))
                    colorCount++
                })
                new jimp(256, 256, async (err, image) => {
                    for (let w = 0; w < 4; w++) {
                        //width in colours
                        for (let h = 0; h < 4; h++) {
                            //height in colours
                            for (let j = 0; j < 64; j++) {
                                //j is horizontal in pixel
                                for (let k = 0; k < 64; k++) {
                                    //k is vertical in pixel
                                    var x = w * 64 + j
                                    var y = h * 64 + k
                                    var selectcolour = h * 4 + w
                                    //console.log(mostPopularInts[selectcolour], x, y)
                                    image.setPixelColor(mostPopularInts[selectcolour], x, y)
                                }
                            }
                        }
                    }
                    await image.writeAsync(`./images/${message.id}.png`)
                    var outString = ''

                    mostPopularColours.forEach((value, index) => {
                        if ((index + 1) % 4 == 0) {
                            outString += value + '\n'
                        } else {
                            outString += value + '  '
                        }
                    })

                    await message.channel.send(
                        'The most popular colours in your image are:\n ' + outString,
                        new Discord.MessageAttachment(`./images/${message.id}.png`),
                    )
                })
            })

            break
        case 'test':
            message.channel.send('fgawawg')
            break
    }
})
