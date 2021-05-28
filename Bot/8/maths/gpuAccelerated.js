const { GPU } = require('gpu.js')

const gpu = new GPU({ mode: 'gpu' })

function convert(cArray) {
    console.time('convertGPU')
    outArray = []
    //outArray = [[], [], []] r g and b lists
    cArray.forEach((Element) => {
        outArray.push([Element.r, Element.g, Element.b])
    })
    console.timeEnd('convertGPU')
    return outArray
}

function fullSuite(cArray, strength) {
    var kernelArray = convert(cArray)
    const subKernel = gpu.createKernel(
        function (main, pairs) {
            return main[this.thread.y] - pairs[this.thread.x][this.thread.y]
        },
        {
            output: [cArray.length, 3],
            precision: 'single',
        },
    )
    const multiKernel = gpu.createKernel(function (pairs) {
        return pairs[this.thread.x]
    })
    const addKernel = gpu.createKernel(function (pairs) {
        return pairs[this.thread.x]
    })

    //subtract each pair, then square them, then add them

    const kernel = gpu.createKernel(
        function (test, strength) {
            var rMin = test[this.thread.y][0] - test[this.thread.x][0]
            var gMin = test[this.thread.y][1] - test[this.thread.x][1]
            var bMin = test[this.thread.y][2] - test[this.thread.x][2]
            var out = rMin * rMin + gMin * gMin + bMin * bMin

            if (out < strength) {
                return 1
            }
        },
        {
            output: [cArray.length, cArray.length],
            precision: 'single',
        },
    )

    console.log('LLAFWsf')
    console.time('test')
    var GPUColleceted = kernel(kernelArray, strength * strength)
    console.timeEnd('test')
    //console.log({GPUColleceted})
    var outList = filterCollect(GPUColleceted, cArray)
    return outList
}

function filterCollect(collected, unfiltered) {
    //console.log(collected[0])
    //console.log(unfiltered[0])
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
    console.log({ finalList })
    unfiltered.forEach((Element, index) => {
        //console.log({name:Element.name, r:unfiltered[index].r, g:unfiltered[index].g, b:unfiltered[index].b})
        var out = Element
        out.nearPixels = finalList[index]
        out.totalNear = finalList[index].length
        outMap.set(Element.name, out)
    })
    return outMap
}

module.exports = { fullSuite }
