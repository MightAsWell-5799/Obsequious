export { makeTTGLine };

import * as vectorMath from "./vector";
import QuickChart from "quickchart-js";

function makeTTGLine(initialVelocityY: number, change: number, gravityOrAcceleration2: number) {
	var initSpeed = initialVelocityY ?? 0;
	var totalFall = change ?? 0;
	var gravityOrAcceleration = -10 ?? gravityOrAcceleration2;

	var pointsX2 = new Array();
	var pointsY = new Array();
	var i: number;
	var timeY = vectorMath.calcTimeY(initSpeed, totalFall, gravityOrAcceleration);
	for (i = 0; i < timeY; i++) {
		pointsX2.push(i);
		pointsY.push(vectorMath.calcDistanceY(i, initSpeed, null));
	}
	pointsY.push(vectorMath.calcDistanceY(timeY, initSpeed, null));
	pointsX2.push(Math.ceil(timeY));

	const myChart = new QuickChart();
	myChart
		.setConfig({
			type: "line",
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
					text: "Height vs Time",
				},
			},
		})
		.setWidth(800)
		.setHeight(400)
		.setBackgroundColor("white");

	return myChart.getUrl();
}
