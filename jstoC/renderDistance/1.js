

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} number
 * @returns
 */
var positionObject = function objCreated(x, y, z, number) {
    return {
        x: x,
        y: y,
        z: z,
        number: number,
        /**
         * 
         * @param {Object} position 
         * @returns {Number} Distance from the tile
         */
        distance: function (position) {
            let xDist = (position.x - x) ** 2
            let yDist = (position.y - y) ** 2
            let zDist = (position.z - z) ** 2
            let sqrtDist = Math.sqrt(xDist + yDist + zDist)
            return sqrtDist
        },
    }
}


/**
 *
 * @param {Number} size
 * @returns {Array<Array<Array<positionObject>>} cubic array
 */
var cubeArray = function (size) {
    let allArrays = new Array(size);
    for (var i = 0; i < size; i++) {
        allArrays[i] = new Array(size)
        for (var j = 0; j < size; j++) {
            allArrays[i][j] = new Array(size)
            for (var k = 0; k < size; k++) {
                allArrays[i][j][k] = new positionObject(i, j, k, i*size**2 + j*size + k)
            }
        }
    }
    return allArrays
}
/**
 * @typedef {selfPosition} selfPosition
 * @property {Number} x
 * @property {Number} y
 * @property {Number} z
 */
var selfPosition = function (x, y, z) {
    return { x: x, y: y, z: z }
}

var potato2 = new selfPosition(1,1,1)

var tempArray = new cubeArray(6)
var self = new selfPosition(0,0,0)
console.log(tempArray[0][0][0].distance(self))

var tempDistances = new cubeArray(6)

tempDistances.forEach((elementi, indexi) => {
    elementi.forEach((elementj, indexj) => {
        elementj.forEach((elementk, indexk) => {
            tempDistances[indexi][indexj][indexk] = Math.round(elementk.distance(self))
        })
    })

})

console.log(tempDistances)