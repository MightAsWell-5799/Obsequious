function singleNearby(currentPixel, pixelArray, strength) {
    var out = {
        name: currentPixel.name,
        r: currentPixel.r,
        g: currentPixel.g,
        b: currentPixel.b,
        totalNear: 0,
        nearPixels: [],
    }
    for (var i = 0; i < pixelArray.length; i++) {
        var rMin = currentPixel.r - pixelArray[i].r
        var gMin = currentPixel.g - pixelArray[i].g
        var bMin = currentPixel.b - pixelArray[i].b
        distance = Math.sqrt(rMin * rMin + gMin * gMin + bMin * bMin)
        if (distance < strength) {
            out.nearPixels.push(pixelArray[i].name)
        }
    }

    out.totalNear = out.nearPixels.length
    return out
}

/**
 * @param pixelArray array of colours, object shape is {r:int, g:int, b:int, name:string}
 * Strong : 72
 * Weak : 27
 */
function collectNearby(pixelArray,strength) {
    var outMap = new Map()

    for (var i = 0; i < pixelArray.length; i++) {
        var temp = singleNearby(pixelArray[i], pixelArray, strength)

        outMap.set(temp.name, temp)
    }
    
    //console.log(outMap)
    return outMap
}

module.exports = { collectNearby }
