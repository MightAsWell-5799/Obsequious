/**
 *
 * @param {Map} colourMap
 * @return {Array<String>}
 */
function filterColours(colourMap , count) {
    var popularityArray = new Array()
    var usedSet = new Set()
    var mostPopular = new Array()

    colourMap.forEach((value, key) => {
        popularityArray.push([value.totalNear, key])
    })

    var j = 1
    while (mostPopular.length < count) {
        if (j == popularityArray.length) {
            break
        }

        var temp = popularityArray[popularityArray.length - j]
        if (!usedSet.has(temp[1])) {
            usedSet.add(temp[1])
            colourMap.get(temp[1]).nearPixels.forEach((Element) => {
                usedSet.add(Element)
            })
            mostPopular.push(temp[1])
        }
        j++
    }

    //console.log(usedSet)
    return mostPopular
}

module.exports = { filterColours }
