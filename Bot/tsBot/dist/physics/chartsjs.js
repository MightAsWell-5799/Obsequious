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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vectorMath = __importStar(require("./vector"));
const quickchart_js_1 = __importDefault(require("quickchart-js"));
var initSpeed = 100;
var totalFall = -200;
var pointsLinked = new Array();
var i2;
var pointsX = [0, timeY];
var pointsX2 = new Array();
var pointsY = new Array();
var i;
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
var graph = new quickchart_js_1.default();
graph.setConfig({
    type: "line",
    data: pointsY,
});
var pointsX3 = new Array();
pointsX2.forEach((element) => {
    pointsX3.push(element.toString());
});
const myChart = new quickchart_js_1.default();
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
//# sourceMappingURL=chartsjs.js.map