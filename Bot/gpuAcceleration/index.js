const { GPU } = require('gpu.js')

const gpu = new GPU({ mode: 'gpu' })
const cpu = new GPU({ mode: 'cpu' })
const { performance } = require('perf_hooks')

const dummy = require('./test2.json')
/**
 *
 * @param {Array} cArray
 * @returns
 */
function convert(cArray) {
    console.time('convertGPU')
    //outArray = []
    outArray = [[], [], []]
    cArray.forEach((Element) => {
        outArray[0].push(Element.r)
        outArray[1].push(Element.g)
        outArray[2].push(Element.b)
    })
    console.timeEnd('convertGPU')
    return outArray
}

function test(processor) {
    const lengthOfArray = dummy.list.length
    //sub kernel
    const kernel1 = processor
        .createKernel(function (v) {
            return v[this.thread.z][this.thread.x] - v[this.thread.z][this.thread.y]
        })
        .setPipeline(true)
        .setOutput([lengthOfArray, lengthOfArray, 3])

    //square kernel
    const kernel2 = processor
        .createKernel(function (v) {
            return v[this.thread.z][this.thread.y][this.thread.x]
        })
        .setOutput([lengthOfArray, lengthOfArray, 3])
    //dimensions are from right to left
    kernel2(kernel1(convert(dummy.list)))
    // Result: Texture

    // Result: Float32Array[0, 1, 2, 3, ... 99]
    

    //console.log(result1.length, result1[0].length, result1[0][0].length)
    //console.log(result2.length, result2[0].length, result2[0][0].length)
    //
    //console.log(result1[0][0])
    //console.log(result2[0][0])
}
var perfTimeCPU = 0
for (let i = 0; i < 10; i++) {
    var t0 = performance.now()
    test(cpu)
    var t1 = performance.now()
    perfTimeCPU += t1 - t0
    console.log((t1 - t0))
}
var perfTimeGPU = 0
for (let i = 0; i < 10; i++) {
    var t0 = performance.now()
    test(gpu)
    var t1 = performance.now()
    perfTimeGPU += t1 - t0
    console.log((t1 - t0))
}



console.log({perfTimeGPU, perfTimeCPU})
