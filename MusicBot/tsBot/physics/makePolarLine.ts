export { download, makePolarLine };

import * as vectorMath from "./vector";
import QuickChart from "quickchart-js";
import fs from "fs";
import request from "request";

async function download(url, dest) {
	fs.mkdir(dest.substring(0, dest.length - 23), () => {});
	// Create an empty file where we can save data
	const file = fs.createWriteStream(dest);
	// Using Promises so that we can use the ASYNC AWAIT syntax
	await new Promise<void>((resolve, reject) => {
		request({
			// Here you should specify the exact link to the file you are trying to download
			uri: url,
			gzip: true,
		})
			.pipe(file)
			.on("finish", async () => {
				console.log(`The file is finished downloading.`);
				resolve();
			})
			.on("error", (error) => {
				reject(error);
			});
	}).catch((error) => {
		console.log(`Something happened: ${error}`);
	});
}

async function makePolarLine(theta: number, speed: number, changeInY2: number, gravityOrAcceleration2: number, serverID: string, messageID: string) {
	var changeInY = changeInY2 ?? 0;
	var gravityOrAcceleration = gravityOrAcceleration2 ?? -10;
	var tempTheta = (theta * Math.PI) / 180;
	var speedX = speed * Math.cos(tempTheta);
	var speedY = speed * Math.sin(tempTheta);
	var timeY = vectorMath.calcTimeY(speedY, changeInY, gravityOrAcceleration);
	var distanceX = vectorMath.calcDistanceX(timeY, speedX);
	var initSpeed = speedY;
	var totalFall = changeInY;
	var pointsX2 = new Array();
	var pointsY = new Array();
	var i;

	var timeY = vectorMath.calcTimeY(initSpeed, totalFall, gravityOrAcceleration);
	for (i = 0; i < timeY; i++) {
		pointsX2.push(Math.round(i * speedX));
		pointsY.push(Math.round(vectorMath.calcDistanceY(i, initSpeed, null)));
	}
	pointsY.push(Math.round(vectorMath.calcDistanceY(timeY, initSpeed, null)));
	pointsX2.push(Math.ceil(distanceX));

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

	var downDest = `./images/${serverID}/${messageID}.png`;
	var downDestOut = `     images/${serverID}/${messageID}.png`;
	await download(myChart.getUrl(), downDest);
	return downDest;
}
