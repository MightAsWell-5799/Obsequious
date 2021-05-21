const vectorMath = require('./vector')
const chart = require('quickchart-js')
const { createWriteStream } = require('fs')
const fs = require('fs')

const got = require('got')

async function download(url, dest) {
    //fs.mkdir(dest.substring(0, dest.length - 23), () => {})
    // Create an empty file where we can save data
    var stream = createWriteStream(dest)
    await got.stream(url).pipe(stream)
    return dest
}

module.exports = {
    makePolarLine: async function ([theta, speed, changeInY = 0, gravityOrAcceleration = -10, serverID, messageID]) {
        var tempTheta = (theta * Math.PI) / 180
        var speedX = speed * Math.cos(tempTheta)
        var speedY = speed * Math.sin(tempTheta)
        var timeY = vectorMath.calcTimeY([speedY, changeInY, parseFloat(gravityOrAcceleration)])
        var distanceX = vectorMath.calcDistanceX([timeY, speedX])
        var initSpeed = speedY
        var totalFall = changeInY
        var pointsX2 = new Array()
        var pointsY = new Array()
        var i

        var timeY = vectorMath.calcTimeY([initSpeed, totalFall, parseFloat(gravityOrAcceleration)])
        for (i = 0; i < timeY; i++) {
            pointsX2.push(Math.round(i * speedX))
            pointsY.push(Math.round(vectorMath.calcDistanceY([i, initSpeed])))
        }
        pointsY.push(Math.round(vectorMath.calcDistanceY([timeY, initSpeed])))
        pointsX2.push(Math.ceil(distanceX))

        const myChart = new chart()
        myChart
            .setConfig({
                type: 'line',
                data: {
                    labels: pointsX2,
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
                        text: 'Height vs Time',
                    },
                },
            })
            .setWidth(800)
            .setHeight(400)
            .setBackgroundColor('white')

        
        return myChart.getShortUrl()
    },
}
