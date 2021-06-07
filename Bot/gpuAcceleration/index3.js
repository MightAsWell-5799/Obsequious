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
    outArray = []
    cArray.forEach((Element) => {
        outArray.push([Element.r, Element.g, Element.b])
    })

    //outArray = [[], [], []]
    //cArray.forEach((Element) => {
    //    outArray[0].push(Element.r)
    //    outArray[1].push(Element.g)
    //    outArray[2].push(Element.b)
    //})
    //console.timeEnd('convertGPU')
    return outArray
}

var testListPre = convert(dummy.list)

//console.log(testListPre)
var testList = testListPre
//for (var i = 0; i <2; i++){
//    testList += testListPre
//}
var testLength = testList.length

const lengthOfArray = testLength

//sub kernel
//does one colour at a time
console.time('create')
const kernel1C = cpu
    .createKernel(function (v) {
        if (
            (v[this.thread.x][0] - v[this.thread.y][0]) ** 2 +
                (v[this.thread.x][1] - v[this.thread.y][1]) ** 2 +
                (v[this.thread.x][2] - v[this.thread.y][2]) ** 2 <
            150
        ) {
            return 1
        } else {
            return 0
        }
    })
    .setPipeline(true)
    .setOutput([lengthOfArray, lengthOfArray])

//sum kernel
const kernel2C = cpu
    .createKernel(function (v) {
        var sum = 0
        for (let i = 0; i < this.output.x; i++) {
            sum += v[this.thread.x][i]
        }
        return sum
    })
    .setOutput([lengthOfArray])
//dimensions are from right to left

const kernel1G = gpu
    .createKernel(function (v) {
        if ((v[this.thread.x] - v[this.thread.y]) ** 2 < 150) {
            return 1
        } else {
            return 0
        }
    })
    .setPipeline(true)
    .setOutput([lengthOfArray, lengthOfArray])

//square kernel
const kernel2G = gpu
    .createKernel(function (v) {
        var sum = 0
        for (let i = 0; i < this.output.x; i++) {
            sum += v[this.thread.x][i]
        }
        return sum
    })
    .setOutput([lengthOfArray])
//dimensions are from right to left

console.timeEnd('create')

const reps = 100

var perfTimeGPU = 0
var filterTimeGPU = 0

for (let i = 0; i < reps; i++) {
    var t0 = performance.now()
    console.time('d1')
    var result = kernel1G(testList)
    console.timeEnd('d1')

    console.time('d2')
    var result1 = kernel2G(result)
    console.timeEnd('d2')

    console.time('toArray')
    var result2 = result.toArray()
    console.timeEnd('toArray')
    var t2 = performance.now()
    var sortableArrayG = []
    //console.log(result.length)
    for (let j = 0; j < result1.length; j++) {
        var temp = { name: dummy.list[j].name, totalNear: result1[j], nearPixels: result2[j] }
        sortableArrayG[j] = temp
    }
    //result.delete()
    var filteredArray = []
    var usedSet = new Set()
    sortableArrayG.forEach((Element, index) => {
        if (!usedSet.has(Element.name)) {
            usedSet.add(Element.name)
            Element.nearPixels.forEach((pixel, position) => {
                if (pixel) {
                    usedSet.add(sortableArrayG[position].name)
                }
            })
            filteredArray.push(Element.name)
        }
    })
    //console.log(filteredArray)
    var t1 = performance.now()
    perfTimeGPU += t1 - t0
    filterTimeGPU = t1 - t2
    console.log(t1 - t0)
}
console.log('GPU done')
var perfTimeCPU = 0
var filterTimeCPU = 0

for (let i = 0; i < reps; i++) {
    var t0 = performance.now()
    console.time('d1')
    var result = kernel1C(testList)
    console.timeEnd('d1')
    console.time('d2')
    var result1 = kernel2C(result)
    console.timeEnd('d2')
    var t2 = performance.now()
    var sortableArrayC = []
    for (let j = 0; j < result.length; j++) {
        var temp = { name: dummy.list[j].name, totalNear: result1[j], nearPixels: result[j] }
        sortableArrayC[j] = temp
    }
    var filteredArray = []
    var usedSet = new Set()
    sortableArrayC.forEach((Element, index) => {
        if (!usedSet.has(Element.name)) {
            usedSet.add(Element.name)
            Element.nearPixels.forEach((pixel, position) => {
                if (pixel) {
                    usedSet.add(sortableArrayC[position].name)
                }
            })
            filteredArray.push(Element.name)
        }
    })
    //console.log(filteredArray)
    var t1 = performance.now()
    perfTimeCPU += t1 - t0
    filterTimeCPU = t1 - t2
    console.log(t1 - t0)
}
console.log('CPU done')

//console.log(sortableArray[sortableArray.length - 1], sortableArray.length)
console.log({ perfTimeGPU, perfTimeCPU })

console.log(`GPU: ${Math.floor(perfTimeGPU / reps)}\nCPU: ${Math.floor(perfTimeCPU / reps)}`)
console.log(`Ratio: ${Math.floor((perfTimeGPU / perfTimeCPU) * 1000) / 1000}`)

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
