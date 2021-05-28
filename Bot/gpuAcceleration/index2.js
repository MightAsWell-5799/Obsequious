const { GPU } = require('gpu.js')

const gpu = new GPU({ mode: 'gpu' })

const dummy = require('./dummy.json')

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

function fullSuite(cArray, strength) {
    var kernelArray = convert(cArray)
    //console.log(kernelArray)
    const subKernel = gpu.createKernel(
        function (list) {
            return list[this.thread.x][this.thread.z] - list[this.thread.y][this.thread.z]
        },
        {
            output: [cArray.length, cArray.length, 3],
            precision: 'single',
            argumentTypes: { list: 'Array' },
        },
    )

    const multiply = gpu.createKernel(
        function (a) {
            return a[this.thread.x][this.thread.y][this.thread.z] ** 2
        },
        {
            output: [cArray.length, cArray.length,3],
            precision: 'single',
        },
    )

    const addKernel = gpu.createKernel(
        function (r, g, b) {
            return r[this.thread.x][this.thread.y] + g[this.thread.x][this.thread.y] + b[this.thread.x][this.thread.y]
        },
        {
            output: [cArray.length, cArray.length],
            precision: 'single',
            argumentTypes: ['Array', 'Array', 'Array'],
        },
    )

    const bigKernel = gpu.combineKernels(multiply, subKernel, function (a) {
        return multiply(subKernel(a))
    })
    var result = subKernel(kernelArray)
    //var gpuCollected = addKernel(bigKernel(kernelArray[0]), bigKernel(kernelArray[1]), bigKernel(kernelArray[2]))
    console.log(result)
    //console.log(pairKernel(kernelArray[0]))

    //var test = bigKernel(kernelArray)
    //console.log(gpuCollected)
    //console.log([out0, out1, out2])
    //console.log({GPUColleceted})
    //filterCollect(GPUColleceted, cArray, strength)
    //return outList
}

function filterCollect(collected, unfiltered, strength) {
    //console.log(collected[0])
    //console.log(unfiltered[0])
    var strength2
    for (let i = 0; i < unfiltered.length; i++) {
        var curre
        for (var j = 0; j < unfiltered.length; j++) {
            //for each of the compared pixels with the above
            if (collected[i][j] < strength2) {
            }
        }
    }
    var outMap = new Map()
    var finalList = []
    for (var i = 0; i < collected.length; i++) {
        finalList.push([])
        //for each of the returned pixels
        for (var j = 0; j < collected.length; j++) {
            //for each of the compared pixels with the above
            if (collected[i][j]) {
                finalList[i] = unfiltered[j].name
            }
        }
    }

    unfiltered.forEach((Element, index) => {
        //console.log({name:Element.name, r:unfiltered[index].r, g:unfiltered[index].g, b:unfiltered[index].b})
        var out = Element
        out.nearPixels = finalList[index]
        out.totalNear = finalList[index].length
        outMap.set(Element.name, out)
    })
    return outMap
}

fullSuite(dummy.otherPXList)

//module.exports = { fullSuite }
