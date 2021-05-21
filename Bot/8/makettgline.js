const vectorMath = require('./vector')
const chart = require('quickchart-js')

module.exports = {
    makeTTGLine: function ([initialVelocityY = 0, change = 0, gravityOrAcceleration = -10]) {
        var initSpeed = initialVelocityY
        var totalFall = change
        var pointsX2 = new Array()
        var pointsY = new Array()
        var i
        var timeY = vectorMath.calcTimeY([initSpeed, totalFall, gravityOrAcceleration])
        for (i = 0; i < timeY; i++) {
            pointsX2.push(i)
            pointsY.push(vectorMath.calcDistanceY([i, initSpeed]))
        }
        pointsY.push(vectorMath.calcDistanceY([timeY, initSpeed]))
        pointsX2.push(Math.ceil(timeY))

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

        return myChart.getUrl()
    },
}
