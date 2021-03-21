const Discord = require('discord.js')
const client = new Discord.Client()
const keys = require('./../../auth.json')
const vectorMath = require('./vector')
const QuickChart = require('quickchart-js');



 
var initSpeed = 100
var totalFall = -200
var pointsLinked = new Array()
var i2
var pointsX = [0, timeY]
var pointsX2 = new Array()
var pointsY = new Array()
var i
var timeY = vectorMath.calcTimeY([
    initSpeed,
    totalFall,
])

for (i = 0; i < timeY; i++) {
    pointsX2.push(i)
    pointsY.push(vectorMath.calcDistanceY([i, initSpeed]))
}
pointsY.push(vectorMath.calcDistanceY([timeY, initSpeed]))


for (i2 = 0; i2 < pointsY.length; i2++) {
    pointsLinked.push([pointsX2[i2], pointsY[i2]])
}


var data = pointsY;
var options;

var graph = new chart()
graph
    .setConfig({
        type: "line",
        data: pointsY,
    }
    )
var pointsX3 = new Array() 
pointsX2.forEach(element => { 
    
    pointsX3.push(element.toString())
})

    const myChart = new chart();
myChart
  .setConfig({
    type: 'line',
    labels: pointsX3,
    datasets: [{
        fill: false,
        label: 'Users',
        data: pointsY,
        color
      }]})
  .setWidth(800)
  .setHeight(400)
  .setBackgroundColor('white')
  

  console.log(myChart.getUrl())