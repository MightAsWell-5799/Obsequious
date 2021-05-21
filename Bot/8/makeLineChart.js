const vectorMath = require('./vector')
const chart = require('quickchart-js')
const { createWriteStream } = require('fs')
const fs = require('fs')
const got = require('got')

async function download(url, dest) {
    //fs.mkdir(dest.substring(0, dest.length - 23), () => {})
    // Create an empty file where we can save data
    await got.stream(url).pipe(createWriteStream(dest))
}

async function makePairs(messageArray) {
    var iPairsPushIndex = 0
    var iMessageArrayIndex = 0
    var pairs = new Array(Array())

    for (iMessageArrayIndex = 0; iMessageArrayIndex < messageArray.length; iMessageArrayIndex++) {
        if (pairs[iPairsPushIndex].length % 2 == 0 && pairs[iPairsPushIndex].length !== 0) {
            pairs.push(Array())
            pairs[iPairsPushIndex + 1].push(parseInt(messageArray[iMessageArrayIndex]))
            iPairsPushIndex++
        } else {
            pairs[iPairsPushIndex].push(parseInt(messageArray[iMessageArrayIndex]))
        }
    }
    return pairs
}

async function sortPairs(pairsIn) {
    var pairsOut
    var iPairSort = 0
    var loopSort = 0
    for (loopSort = 0; loopSort < pairsIn.length; loopSort++) {
        for (iPairSort = 0; iPairSort < pairsIn.length; iPairSort++) {
            var altSort = iPairSort + 1
            var first = pairsIn[iPairSort][0]
            try {
                var second = pairsIn[altSort][1]
            } catch (e) {
                break
            }
            console.log({ iPairSort, first, second, pairsIn })
            var temp1
            var temp2

            if (pairsIn[altSort][0] < pairsIn[iPairSort][0]) {
                temp1 = pairsIn[iPairSort]
                temp2 = pairsIn[altSort]
                pairsIn[iPairSort] = temp2
                pairsIn[altSort] = temp1
                console.log('swapped')
            }
        }
    }
    pairsOut = pairsIn
    return pairsOut
}
module.exports = {
    makeLineChart: async function ([messageArray = Array(), serverID, messageID]) {
        var pointsX = new Array()
        var pointsY = new Array()

        var pairsRaw = await makePairs(messageArray)
        var pairsSorted = await sortPairs(pairsRaw)
        pairsSorted.forEach((Element) => {
            pointsX.push(Element[0])
            pointsY.push(Element[1])
        })

        //console.log(pairs)
        //console.log({ pointsX, pointsY, i })

        var myChart = new chart()
        myChart
            .setConfig({
                type: 'line',
                data: {
                    labels: pointsX,
                    datasets: [
                        {
                            fill: false,
                            data: pointsY,
                        },
                    ],
                },
                options: {
                    legend: false,
                    title: {
                        display: true,
                        text: 'Point Chart',
                    },
                },
            })
            .setWidth(800)
            .setHeight(400)
            .setBackgroundColor('white')
        var downDest = `./images/${messageID}.png`
        await download(myChart.getUrl(), downDest)

        return downDest
    },
}
