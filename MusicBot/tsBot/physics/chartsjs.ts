import * as vectorMath from "./vector";
import QuickChart from "quickchart-js";

var initSpeed = 100;
var totalFall = -200;
var pointsLinked = new Array();
var i2 : number;
var pointsX = [0, timeY];
var pointsX2 = new Array();
var pointsY = new Array();
var i : number;
var timeY = vectorMath.calcTimeY(initSpeed, totalFall, null);

for (i = 0; i < timeY; i++) {
	pointsX2.push(i);
	pointsY.push(vectorMath.calcDistanceY(i, initSpeed, null));
}
pointsY.push(vectorMath.calcDistanceY(timeY, initSpeed, null));

for (i2 = 0; i2 < pointsY.length; i2++) {
	pointsLinked.push([pointsX2[i2], pointsY[i2]]);
}

var data = pointsY;
var options;

var graph = new QuickChart();
graph.setConfig({
	type: "line",
	data: pointsY,
});
var pointsX3 = new Array();
pointsX2.forEach((element) => {
	pointsX3.push(element.toString());
});

const myChart = new QuickChart();
myChart
	.setConfig({
		type: "line",
		labels: pointsX3,
		datasets: [
			{
				fill: false,
				label: "Users",
				data: pointsY,
				borderColor: "ff8f80",
			},
		],
	})
	.setWidth(800)
	.setHeight(400)
	.setBackgroundColor("white");

console.log(myChart.getUrl());
