const { GPU } = require('gpu.js')

const gpu = new GPU()

const getArrayValues = () => {
    //Create 2D arrary here
    const values = [[], []]

    // Insert Values into first array
    for (let y = 0; y < 600; y++) {
        values[0].push([])
        values[1].push([])

        // Insert values into second array
        for (let x = 0; x < 600; x++) {
            values[0][y].push(Math.random())
            values[1][y].push(Math.random())
        }
    }

    //Return filled array
    return values
}
const multiplyLargeValues = gpu
    .createKernel(function (a, b) {
        let sum = 0
        for (let i = 0; i < 600; i++) {
            sum += a[this.thread.y][i] * b[i][this.thread.x]
        }
        return sum
    })
    .setOutput([600, 600])

const largeArray = getArrayValues()
console.log(largeArray)
console.time("apple")
const out = multiplyLargeValues(largeArray[0], largeArray[1])
console.timeEnd("apple")


