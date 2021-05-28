const Discord = require('discord.js')
const client = new Discord.Client()
const tinyColor = require('tinycolor2')
const jimp = require('jimp')
const { performance } = require('perf_hooks')
const fs = require('fs')

const largePXWidth = 10
const gpuAccelerated = require('./gpuAccelerated')
const imageMath = require('./collect')
const colourFilter = require('./filter')
function translateImage(link, message) {
    var t0 = performance.now()
    var m0 = process.memoryUsage().heapUsed
    var pixelArray = []
    //console.time('imageGen')
    var link
    jimp.read(link)
        .then((image) => {
            image.resize(128, 128)
            image.bit
            var h = image.getHeight()
            var w = image.getWidth()

            var pixelSet = new Set()
            console.time("transform")
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
            
            fs.writeFileSync(message.id, JSON.stringify(pixelArray))
            console.timeEnd('transform')
        })
        .then(() => {
            console.time("collect")
            var strongCollected = gpuAccelerated.fullSuite(pixelArray, 150)
            console.timeEnd("collect")
            //console.log(strongCollected)
            console.time("collect2")
            var weakCollected = imageMath.collectNearby(pixelArray, 150)
            console.timeEnd("collect2")
            console.time("filter")
            var strongColours = colourFilter.filterColours(strongCollected, largePXWidth)
            console.timeEnd("filter")
            var weakColours = colourFilter.filterColours(weakCollected, largePXWidth * 4)

            var strongMath = 0
            var weakMath = 0
            strongCollected.forEach((value) => {
                strongMath += value.totalNear
            })
            weakCollected.forEach((value) => {
                weakMath += value.totalNear
            })
            var numbers = [
                strongMath.toLocaleString('en-US', {}),
                weakMath.toLocaleString('en-US', {}),
                pixelArray.length.toLocaleString('en-US', {}),
            ]

            genImage(message, strongColours, strongColours.length, weakColours, weakColours.length, m0, t0, numbers)
        })

    console.log('quitting mem func')
}

function genImage(message, StrongColoursArray, SCL, WeakColoursArray, WCL, m0, t0, numbers) {
    var currentVertShift = 0
    var currentArrayShift = 0
    const pixelSizes = 60
    var fullColours = StrongColoursArray.concat(WeakColoursArray)
    var totalHeight = Math.ceil(pixelSizes * 2.5)
    var totalWidth = Math.ceil(pixelSizes * largePXWidth)
    var outString = ''
    var nameColours = []
    var colorCount = 0

    fullColours.forEach((Element) => {
        var colour = tinyColor(Element)
        nameColours[colorCount] = parseInt(colour.toHex8(), 16)
        colorCount++
    })
    fullColours.forEach((value, index) => {
        if ((index + 1) % largePXWidth == 0) {
            outString += value + '\n'
        } else {
            outString += value + '  '
        }
    })

    new jimp(totalWidth, totalHeight, (err, image) => {
        image.background(0xffffffff)
        //number of strong colours to collect and display
        for (let w = 0; w < largePXWidth; w++) {
            
            if (currentArrayShift >= fullColours.length) {
                break
            }
            //write strong colours
            for (let j = 0; j < pixelSizes; j++) {
                //j is horizontal in pixel
                for (let k = 0; k < pixelSizes; k++) {
                    //k is vertical in pixel
                    var x = w * pixelSizes + j
                    var y = k + currentVertShift
                    var selectcolour = currentArrayShift
                    //!new colour array lol
                    image.setPixelColor(nameColours[selectcolour], x, y)
                }
            }
            currentArrayShift++
        }
        currentVertShift = currentVertShift + pixelSizes
        //write weak colours
        for (let h = 0; h < 2; h++) {
            for (let w = 0; w < largePXWidth * 2; w++) {
                
                if (currentArrayShift >= fullColours.length) {
                    break
                }
                //write strong colours
                for (let j = 0; j < pixelSizes / 2; j++) {
                    //j is horizontal in pixel
                    for (let k = 0; k < pixelSizes / 2; k++) {
                        //k is vertical in pixel
                        var x = (w * pixelSizes) / 2 + j
                        var y = k + currentVertShift
                        var selectcolour = currentArrayShift
                        //!new colour array lol
                        image.setPixelColor(nameColours[selectcolour], x, y)
                    }
                }
                currentArrayShift++
            }
            currentVertShift = currentVertShift + pixelSizes / 2
        }

        //write basic colours

        for (let w = 0; w < largePXWidth * 2; w++) {
            
            if (currentArrayShift >= fullColours.length) {
                break
            }
            //write strong colours
            for (let j = 0; j < pixelSizes / 2; j++) {
                //j is horizontal in pixel
                for (let k = 0; k < pixelSizes / 2; k++) {
                    //k is vertical in pixel
                    var x = (w * pixelSizes) / 2 + j
                    var y = k + currentVertShift
                    var selectcolour = currentArrayShift
                    //!new colour array lol
                    image.setPixelColor(nameColours[selectcolour], x, y)
                }
            }
            
            currentArrayShift++
        }

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
                    'mb of memory.\n' +
                    'I considered:\n - ' +
                    numbers[0] +
                    ' strong colour comparisons.\n - ' +
                    numbers[1] +
                    ' weak colour comparisons.\n - ' +
                    numbers[2] +
                    ' total different colours.',

                new Discord.MessageAttachment(`./images/${message.id}.png`),
            )
        })
    })
}
module.exports = { translateImage: translateImage }
