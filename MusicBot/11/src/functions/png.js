const Discord = require('discord.js')
const png = require('pnglib-es6').default
const client = new Discord.Client()
const imageDataURI = require('image-data-uri')
d
module.exports = {
    createMatrix: function (drawFile){
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
        return outDrawing},
    createImage: async function(squareHeight, cArray, msg, dims, artName){
        var squareWidth = squareHeight
        
    var gridArrayWidth
    var gridArrayHeight

    if (dims === undefined) {
        gridArrayWidth = Math.ceil(Math.sqrt(cArray.length))
        gridArrayHeight = Math.ceil(Math.sqrt(cArray.length))
        console.log('made it here')
    } else {
        gridArrayWidth = dims[0]
        gridArrayHeight = dims[1]
    }
    console.log({ gridArrayHeight, gridArrayWidth })
    var height = gridArrayHeight * squareHeight
    var width = gridArrayWidth * squareWidth
    //var totalSquares = gridArrayHeight * gridArrayWidth

    //console.log(cArray.length)

    var ColourMap = new Map()
    cArray.forEach((Element) => {
        //console.log(Element)
        if (ColourMap.has(Element)) {
        } else {
            ColourMap.set(Element, 'blank')
        }
    })

    var image = new png(width, height, ColourMap.size, 'white')
    ColourMap.forEach((value, key) => {
        ColourMap.set(key, image.createColor(key))
    })

    console.log(ColourMap)
    for (let y = 0; y < gridArrayHeight; y++) {
        //selects horizontal square
        for (let z = 0; z < gridArrayWidth; z++) {
            //selects vertical square line
            var point = y * gridArrayWidth + z
            //console.log("point " + point)
            //console.log( "is " + cArray[point])
            var currentColor = ColourMap.get(cArray[point])
            for (let i = 0; i < squareHeight; i++) {
                //goes horizontally this distance
                for (let l = 0; l < squareWidth; l++) {
                    //travels vertically down one column of pixels in a square
                    let x = z * squareWidth + l
                    //let y2 = l%100
                    image.setPixel(x, i + squareHeight * y, currentColor)
                }
            }
        }
        //console.log(y)
    }
    var imageTitle = msg
    await imageDataURI.outputFile(image.getDataURL(), `./colours/${imageTitle}`)
    var toSend = new Discord.MessageEmbed()
    toSend.setTitle(artName)
    toSend.attachFiles(`./colours/${msg}.png`)
    return toSend
    }
}
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
async function createImage(squareHeight, cArray, msg, dims, artName) {
    var squareWidth = squareHeight

    var gridArrayWidth
    var gridArrayHeight

    if (dims === undefined) {
        gridArrayWidth = Math.ceil(Math.sqrt(cArray.length))
        gridArrayHeight = Math.ceil(Math.sqrt(cArray.length))
        console.log('made it here')
    } else {
        gridArrayWidth = dims[0]
        gridArrayHeight = dims[1]
    }
    console.log({ gridArrayHeight, gridArrayWidth })
    var height = gridArrayHeight * squareHeight
    var width = gridArrayWidth * squareWidth
    //var totalSquares = gridArrayHeight * gridArrayWidth

    //console.log(cArray.length)

    var ColourMap = new Map()
    cArray.forEach((Element) => {
        //console.log(Element)
        if (ColourMap.has(Element)) {
        } else {
            ColourMap.set(Element, 'blank')
        }
    })

    var image = new png(width, height, ColourMap.size, 'white')
    ColourMap.forEach((value, key) => {
        ColourMap.set(key, image.createColor(key))
    })

    console.log(ColourMap)
    for (let y = 0; y < gridArrayHeight; y++) {
        //selects horizontal square
        for (let z = 0; z < gridArrayWidth; z++) {
            //selects vertical square line
            var point = y * gridArrayWidth + z
            //console.log("point " + point)
            //console.log( "is " + cArray[point])
            var currentColor = ColourMap.get(cArray[point])
            for (let i = 0; i < squareHeight; i++) {
                //goes horizontally this distance
                for (let l = 0; l < squareWidth; l++) {
                    //travels vertically down one column of pixels in a square
                    let x = z * squareWidth + l
                    //let y2 = l%100
                    image.setPixel(x, i + squareHeight * y, currentColor)
                }
            }
        }
        //console.log(y)
    }
    var imageTitle = msg
    await imageDataURI.outputFile(image.getDataURL(), `./colours/${imageTitle}`)
    var toSend = new Discord.MessageEmbed()
    toSend.setTitle(artName)
    toSend.attachFiles(`./colours/${msg}.png`)
    return toSend
}