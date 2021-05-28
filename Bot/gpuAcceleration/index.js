const { GPU } = require('gpu.js')

const gpu = new GPU({ mode: 'gpu' })
const cpu = new GPU({ mode: 'cpu' })
const { performance } = require('perf_hooks')
//const benchmark = require('@gpujs/benchmark')
const dummy = require('./test2.json')
/**
 *
 * @param {Array} cArray
 * @returns
 */
function convert(cArray) {
    //console.time('convertGPU')
    //outArray = []
    outArray = [[], [], []]
    cArray.forEach((Element) => {
        outArray[0].push(Element.r)
        outArray[1].push(Element.g)
        outArray[2].push(Element.b)
    })
    //console.timeEnd('convertGPU')
    return outArray
}

var testListPre = convert(dummy.list)[0]
//console.log(testListPre)
var testList = testListPre
//for (var i = 0; i <2; i++){
//    testList += testListPre
//}
var testLength = testList.length
console.log(testList)
console.log(testLength)
const lengthOfArray = testLength

//sub kernel
    //does one colour at a time
    console.time("create")
    const kernel1C = cpu
        .createKernel(function (v) {
            if(((v[this.thread.x] - v[this.thread.y])**2)<150){return 1} else {return 0}

        })
        .setPipeline(true)
        .setOutput([lengthOfArray, lengthOfArray])

    //square kernel
    const kernel2C = cpu
        .createKernel(function (v) {
            return v[this.thread.y][this.thread.x]
        })
        .setOutput([lengthOfArray, lengthOfArray])
    //dimensions are from right to left

    const kernel1G = gpu
    .createKernel(function (v) {
        if(((v[this.thread.x] - v[this.thread.y])**2)<150){return 1} else {return 0}
    })
    .setPipeline(true)
    .setOutput([lengthOfArray, lengthOfArray])

//square kernel
const kernel2G = gpu
    .createKernel(function (v) {
        var sum = 0
        for(let i = 0; i <this.output.x; i++){
            sum += v[this.thread.x][i]
        }
        return sum
    })
    .setOutput([lengthOfArray])
//dimensions are from right to left

        console.timeEnd("create")


var perfTimeGPU = 0
for (let i = 0; i < 10; i++) {
    var t0 = performance.now()
    var result = kernel2G(kernel1G(testList))
    var t1 = performance.now()
    perfTimeGPU += t1 - t0
    console.log(t1 - t0)

}
console.log("GPU done")
var perfTimeCPU = 0
for (let i = 0; i < 10; i++) {
    var t0 = performance.now()
    var result = kernel2C(kernel1C(testList))
    var t1 = performance.now()
    perfTimeCPU += t1 - t0
    console.log(t1 - t0)
}
console.log("CPU done")

console.log({ perfTimeGPU, perfTimeCPU })

console.log(`GPU: ${Math.floor(perfTimeGPU/100)}\nCPU: ${Math.floor(perfTimeCPU/100)}`)
console.log(`Ratio: ${Math.floor((perfTimeGPU/perfTimeCPU)*1000)/1000}`)

//
//console.time('start')
//var out = benchmark.benchmark({
//    // options common to all but can be overridden in range or in full_options, preference given to range
//    cpu: cpu,
//    gpu: gpu,
//})
//
//console.timeEnd('start')
//
//console.log(out.data.run_time)
//console.log(out.data)
//
