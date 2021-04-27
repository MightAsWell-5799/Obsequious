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
exports.makeTTGLine = void 0;
const vectorMath = __importStar(require("./vector"));
const quickchart_js_1 = __importDefault(require("quickchart-js"));
function makeTTGLine(initialVelocityY, change, gravityOrAcceleration2) {
    var _a;
    var initSpeed = initialVelocityY !== null && initialVelocityY !== void 0 ? initialVelocityY : 0;
    var totalFall = change !== null && change !== void 0 ? change : 0;
    var gravityOrAcceleration = (_a = -10) !== null && _a !== void 0 ? _a : gravityOrAcceleration2;
    var pointsX2 = new Array();
    var pointsY = new Array();
    var i;
    var timeY = vectorMath.calcTimeY(initSpeed, totalFall, gravityOrAcceleration);
    for (i = 0; i < timeY; i++) {
        pointsX2.push(i);
        pointsY.push(vectorMath.calcDistanceY(i, initSpeed, null));
    }
    pointsY.push(vectorMath.calcDistanceY(timeY, initSpeed, null));
    pointsX2.push(Math.ceil(timeY));
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
    return myChart.getUrl();
}
exports.makeTTGLine = makeTTGLine;
//# sourceMappingURL=makettgline.js.map