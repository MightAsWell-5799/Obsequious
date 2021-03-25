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
exports.makePolarLine = exports.download = void 0;
const vectorMath = __importStar(require("./vector"));
const quickchart_js_1 = __importDefault(require("quickchart-js"));
const fs_1 = __importDefault(require("fs"));
const request_1 = __importDefault(require("request"));
function download(url, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        fs_1.default.mkdir(dest.substring(0, dest.length - 23), () => { });
        const file = fs_1.default.createWriteStream(dest);
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
            console.log(`Something happened: ${error}`);
        });
    });
}
exports.download = download;
function makePolarLine(theta, speed, changeInY2, gravityOrAcceleration2, serverID, messageID) {
    return __awaiter(this, void 0, void 0, function* () {
        var changeInY = changeInY2 !== null && changeInY2 !== void 0 ? changeInY2 : 0;
        var gravityOrAcceleration = gravityOrAcceleration2 !== null && gravityOrAcceleration2 !== void 0 ? gravityOrAcceleration2 : -10;
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
        const myChart = new quickchart_js_1.default();
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
        yield download(myChart.getUrl(), downDest);
        return downDest;
    });
}
exports.makePolarLine = makePolarLine;
//# sourceMappingURL=makePolarLine.js.map