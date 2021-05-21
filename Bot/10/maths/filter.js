var sorts = require('./sorts')

/**
 *
 * @param {Map} colourMap
 * @return {Array<String>}
 */
function filterColours(colourMap) {
    var popularityMap = new Map()
    var popularityArray = new Array()
    var usedSet = new Set()
    var mostPopular = new Array()

    colourMap.forEach((value, key) => {
        popularityMap.set(key, value.totalNear)
        popularityArray.push([value.totalNear, key])
    })

    var list = sorts.sortPairs(popularityArray)
    var j = 1
    while (mostPopular.length < 16) {
        if (j == list.length) {
            break
        }
        
            var temp = list[list.length - j]
            if (!usedSet.has(temp[1])) {
                usedSet.add(temp[1])
                colourMap.get(temp[1]).nearPixels.forEach((Element) => {
                    usedSet.add(Element[0])
                })
                mostPopular.push(temp[1])
            }
            j++
        
    }

    //console.log(usedSet)
    return mostPopular
}

module.exports = { filterColours }
