const Discord = require('discord.js')
const client = new Discord.Client()
const tinyColor = require('tinycolor2')
const jimp = require('jimp')
const { performance } = require('perf_hooks')

const imageMath = require('./collect')
const colourFilter = require('./filter')
function genImage(link, message) {
    var outString = ''
    var mostPopularInts = new Array(16).fill(11111111)
    var mostPopularColours
    var t0 = performance.now()
    var m0 = process.memoryUsage().heapUsed
    //console.time('imageGen')
    var link
    jimp.read(link)
        .then((image) => {
            image.resize(128, 128)
            image.bit
            var h = image.getHeight()
            var w = image.getWidth()
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
                            name:
                                RGBA.r.toString(16).padStart(2, '0') +
                                RGBA.g.toString(16).padStart(2, '0') +
                                RGBA.b.toString(16).padStart(2, '0'),
                        }
                        if (!pixelSet.has(newrgba.name)) {
                            pixelArray.push(newrgba)
                            pixelSet.add(newrgba.name)
                        }
                    })
                }
            }
            var newMap = imageMath.collectNearby(pixelArray)

            mostPopularColours = colourFilter.filterColours(newMap)
            console.log(mostPopularColours)
            //var mostPopularInts = new Array(16).fill(11111111)
            //console.log(mostPopularColours)
            var colorCount = 0
            mostPopularColours.forEach((Element) => {
                var colour = tinyColor(Element)
                mostPopularInts[colorCount] = parseInt(colour.toHex8(), 16)
                colorCount++
            })
        })
        .then(() => {
            new jimp(256, 256, (err, image) => {
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
                mostPopularColours.forEach((value, index) => {
                    if ((index + 1) % 4 == 0) {
                        outString += value + '\n'
                    } else {
                        outString += value + '  '
                    }
                })

                image.write(`./images/${message.id}.png`, () => {
                    var t1 = performance.now()
                    var epoch = Math.floor(t1 - t0)
                    var m1 = process.memoryUsage().heapUsed
                    var variance = Math.floor((m1 - m0) / 1024 / 1024)
                    message.channel.send(
                        'The most popular colours in your image are:\n ' +
                            outString +
                            '\nThis command took me ' +
                            epoch +
                            'ms and used ' +
                            variance +
                            'mb of memory.',
                        new Discord.MessageAttachment(`./images/${message.id}.png`),
                    )
                })

                //var potato = console.timeEnd('imageGen')

                //console.log({ potato })
            })
        })

    console.log('quitting mem func')
}

module.exports = { genImage }
