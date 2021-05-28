/**
 *
 * @param {Map} colourMap
 * @return {Array<String>}
 */
const sort = require('./sorts')
function filterColours(colourMap , count) {
    var popularityArray = new Array()
    var usedSet = new Set()
    var mostPopular = new Array()
    //var iterator = Array.from(colourMap.keys())
    //console.log(iterator[0])
    //console.log(colourMap.get(iterator[0]))
    
    colourMap.forEach((value, key) => {
        popularityArray.push([value.totalNear, key])
    })
    popularityArray = sort.sortPairs(popularityArray)

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
