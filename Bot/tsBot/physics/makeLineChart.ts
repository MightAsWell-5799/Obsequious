export {download, makePairs, sortPairs, makeLineChart}

import request from "request";
import * as fs from "fs";
import QuickChart from "quickchart-js";








async function download(url : string, dest : string) {
	console.log(dest.substring(0, dest.length - 23));
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
		console.log(`Something happened: ${error} \n ${dest.substring(0, dest.length - 23)}`);
	});
}

async function makePairs(messageArray) {
	var iPairsPushIndex = 0;
	var iMessageArrayIndex = 0;
	var pairs = new Array(Array());

	for (iMessageArrayIndex = 0; iMessageArrayIndex < messageArray.length; iMessageArrayIndex++) {
		if (pairs[iPairsPushIndex].length % 2 == 0 && pairs[iPairsPushIndex].length !== 0) {
			pairs.push(Array());
			pairs[iPairsPushIndex + 1].push(parseInt(messageArray[iMessageArrayIndex]));
			iPairsPushIndex++;
		} else {
			pairs[iPairsPushIndex].push(parseInt(messageArray[iMessageArrayIndex]));
		}
	}
	return pairs;
}

async function sortPairs(pairsIn) {
	var pairsOut;
	var iPairSort = 0;
	var loopSort = 0;
	for (loopSort = 0; loopSort < pairsIn.length; loopSort++) {
		for (iPairSort = 0; iPairSort < pairsIn.length; iPairSort++) {
			var altSort = iPairSort + 1;
			var first = pairsIn[iPairSort][0];
			try {
				var second = pairsIn[altSort][1];
			} catch (e) {
				break;
			}
			console.log({ iPairSort, first, second, pairsIn });
			var temp1;
			var temp2;

			if (pairsIn[altSort][0] < pairsIn[iPairSort][0]) {
				temp1 = pairsIn[iPairSort];
				temp2 = pairsIn[altSort];
				pairsIn[iPairSort] = temp2;
				pairsIn[altSort] = temp1;
				console.log("swapped");
			}
		}
	}
	pairsOut = pairsIn;
	return pairsOut ;
}
async function makeLineChart( messageArray , serverID : string, messageID : string) {
    var pointsX = new Array();
    var pointsY = new Array();

    var pairsRaw = await makePairs(messageArray);
    var pairsSorted = await sortPairs(pairsRaw);
    pairsSorted.forEach((Element) => {
        pointsX.push(Element[0]);
        pointsY.push(Element[1]);
    });

    //console.log(pairs)
    //console.log({ pointsX, pointsY, i })
    var myChart = new QuickChart()
    myChart
        .setConfig({
            type: "line",
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
                    text: "Point Chart",
                },
            },
        })
        .setWidth(800)
        .setHeight(400)
        .setBackgroundColor("white");
    var downDest = `./images/${serverID}/${messageID}.png`;
    try {
        fs.mkdirSync(`./images/${serverID}`);
    } catch (e) {}
    await download(myChart.getUrl(), downDest);
    return downDest;
}
