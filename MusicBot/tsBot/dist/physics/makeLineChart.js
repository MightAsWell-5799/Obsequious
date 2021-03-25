"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLineChart = exports.sortPairs = exports.makePairs = exports.download = void 0;
const request_1 = __importDefault(require("request"));
const fs = __importStar(require("fs"));
const quickchart_js_1 = __importDefault(require("quickchart-js"));
function download(url, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(dest.substring(0, dest.length - 23));
        fs.mkdir(dest.substring(0, dest.length - 23), () => { });
        const file = fs.createWriteStream(dest);
        yield new Promise((resolve, reject) => {
            request_1.default({
                uri: url,
                gzip: true,
            })
                .pipe(file)
                .on("finish", () => __awaiter(this, void 0, void 0, function* () {
                console.log(`The file is finished downloading.`);
                resolve();
            }))
                .on("error", (error) => {
                reject(error);
            });
        }).catch((error) => {
            console.log(`Something happened: ${error} \n ${dest.substring(0, dest.length - 23)}`);
        });
    });
}
exports.download = download;
function makePairs(messageArray) {
    return __awaiter(this, void 0, void 0, function* () {
        var iPairsPushIndex = 0;
        var iMessageArrayIndex = 0;
        var pairs = new Array(Array());
        for (iMessageArrayIndex = 0; iMessageArrayIndex < messageArray.length; iMessageArrayIndex++) {
            if (pairs[iPairsPushIndex].length % 2 == 0 && pairs[iPairsPushIndex].length !== 0) {
                pairs.push(Array());
                pairs[iPairsPushIndex + 1].push(parseInt(messageArray[iMessageArrayIndex]));
                iPairsPushIndex++;
            }
            else {
                pairs[iPairsPushIndex].push(parseInt(messageArray[iMessageArrayIndex]));
            }
        }
        return pairs;
    });
}
exports.makePairs = makePairs;
function sortPairs(pairsIn) {
    return __awaiter(this, void 0, void 0, function* () {
        var pairsOut;
        var iPairSort = 0;
        var loopSort = 0;
        for (loopSort = 0; loopSort < pairsIn.length; loopSort++) {
            for (iPairSort = 0; iPairSort < pairsIn.length; iPairSort++) {
                var altSort = iPairSort + 1;
                var first = pairsIn[iPairSort][0];
                try {
                    var second = pairsIn[altSort][1];
                }
                catch (e) {
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
        return pairsOut;
    });
}
exports.sortPairs = sortPairs;
function makeLineChart(messageArray, serverID, messageID) {
    return __awaiter(this, void 0, void 0, function* () {
        var pointsX = new Array();
        var pointsY = new Array();
        var pairsRaw = yield makePairs(messageArray);
        var pairsSorted = yield sortPairs(pairsRaw);
        pairsSorted.forEach((Element) => {
            pointsX.push(Element[0]);
            pointsY.push(Element[1]);
        });
        var myChart = new quickchart_js_1.default();
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
        }
        catch (e) { }
        yield download(myChart.getUrl(), downDest);
        return downDest;
    });
}
exports.makeLineChart = makeLineChart;
//# sourceMappingURL=makeLineChart.js.map