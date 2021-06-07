const { GPU } = require('gpu.js')

//const gpu = new GPU({ mode: 'gpu' })
//const cpu = new GPU({ mode: 'cpu' })
const { performance } = require('perf_hooks')

const dummy = require('./test2.json')

/**
 *
 * @param {Array} cArray
 * @returns
 */
function convert(cArray) {
    //console.time('convertGPU')
    //n*3
    outArray = []
    cArray.forEach((Element) => {
        outArray.push([Element.r, Element.g, Element.b])
    })
    //3*n
    //outArray = [[], [], []]
    //cArray.forEach((Element) => {
    //    outArray[0].push(Element.r)
    //    outArray[1].push(Element.g)
    //    outArray[2].push(Element.b)
    //})
    //console.timeEnd('convertGPU')
    return outArray
}

var imageFilter = class {
    constructor(mode, trimSize, strong) {
        this.length = trimSize
        
        console.log(this.convertedList.length)
        this.trimmedList = new Array(this.length)
        for (let i = 0; i < this.length; i++) {
            this.trimmedList[i] = new Array(3).fill(-1000)
        }

        //console.log(this.trimmedList[trimSize - 1])
        
        //console.log(this.convertedList[0])
        this.gpu = new GPU({ mode: mode })
        //this.cpu = new GPU({ mode: mode })
        this.kernel1 = this.gpu
            .createKernel(function (v) {
                let temp =
                    (v[this.thread.x][0] - v[this.thread.y][0]) ** 2 +
                    (v[this.thread.x][1] - v[this.thread.y][1]) ** 2 +
                    (v[this.thread.x][2] - v[this.thread.y][2]) ** 2
                if (temp < 150 && temp != 0) {
                    return 1
                } else {
                    return 0
                }
            })
            
            .setLoopMaxIterations(16000)
            .setPipeline(true)
            .setOutput([trimSize, trimSize])

        this.kernel2 = this.gpu
            .createKernel(function (v) {
                var sum = 0
                for (let i = 0; i < this.output.x; i++) {
                    sum += v[this.thread.x][i]
                }
                return sum
            })
            .setOutput([this.length])
    }

    sumNear(list) {
        this.rawList = list
        this.convertedList = convert(list)
        for (var i = 0; i < this.convertedList.length; i++) {
            if (i == trimSize) {
                break
            }
            this.trimmedList[i] = this.convertedList[i]
        }
        console.time('k1')
        var k1 = this.kernel1(this.trimmedList)
        console.timeEnd('k1')
        console.time('k2')
        var k2 = this.kernel2(k1)
        console.timeEnd('k2')
        console.log(k2)
        console.log(k2[k2.length - 1])
        return k2
    }
    associate(nearSummed) {
        let tempPairs = []
        for (let i = 0; i < this.convertedList.length; i++) {
            
            tempPairs[i] = [this.rawList[i].name, nearSummed[i]]
        }
        return tempPairs
    }
}

var GPUClass = new imageFilter(dummy.list, 'gpu', 10000)
var CPUClass = new imageFilter(dummy.list, 'cpu', 10000)
//var BPUClass = new imageFilter(dummy.list, 'gpu', 'cpu')
var reps = 10
var speedG = 0
var speedC = 0
var speedB = 0

for (let i = 0; i < reps; i++) {
    var t0 = performance.now()
    var nearSummed = GPUClass.sumNear()
    var associated = GPUClass.associate(nearSummed)
    console.log({associated})
    var t1 = performance.now()
    speedG += t1 - t0
    console.log('GPU i: ' + i)
}

for (let i = 0; i < reps; i++) {
    var t0 = performance.now()
    var nearSummed = CPUClass.sumNear()
    var associated = CPUClass.associate(nearSummed)
    console.log({associated})
    var t1 = performance.now()
    speedC += t1 - t0
    console.log('CPU i: ' + i)
}
//for (let i = 0; i < reps; i++) {
//    var t0 = performance.now()
//    BPUClass.filter()
//    var t1 = performance.now()
//    speedB += t1 - t0
//    console.log('BPU i: ' + i)
//}

console.log('GPU speed: ' + Math.floor(speedG / reps))
console.log('CPU speed: ' + Math.floor(speedC / reps))
//console.log('BPU speed: ' + Math.floor(speedB / reps))

console.log('Speed Ratio: ' + Math.floor((speedG / speedC) * 1000) / 1000)
