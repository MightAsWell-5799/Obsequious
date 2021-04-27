"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polarDistance = exports.calcFinalSpeedY = exports.calcFallTimeAndHorizDistance = exports.calcTimeY = exports.calcDistanceY = exports.calcTimeX = exports.calcDistanceX = void 0;
function calcTimeY(initialVelocityY2, change2, gravity2) {
    var gravity = gravity2 !== null && gravity2 !== void 0 ? gravity2 : -10;
    var initialVelocityY = initialVelocityY2 !== null && initialVelocityY2 !== void 0 ? initialVelocityY2 : 0;
    var change = change2 !== null && change2 !== void 0 ? change2 : 0;
    var equation = `0 = ${gravity / 2}t^2 + ${initialVelocityY}t  + ${-change}`;
    var equation2 = equation.split("t");
    var abc = new Array();
    var time;
    var equation3 = equation2.forEach((Element) => {
        var parts = Element.split(" ");
        abc.push(parts.pop());
    });
    var a = parseInt(abc[0]);
    var b = parseInt(abc[1]);
    var c = parseInt(abc[2]);
    if (a == 0) {
        time = Math.abs(initialVelocityY / gravity) * 2;
    }
    else {
        var solveQuadraticPos = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        var solveQuadraticNeg = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        time = Math.max(solveQuadraticNeg, solveQuadraticPos);
    }
    return time;
}
exports.calcTimeY = calcTimeY;
function calcDistanceY(time2, initialVelocityY2, gravity2) {
    var gravity = gravity2 !== null && gravity2 !== void 0 ? gravity2 : -10;
    var time = time2 !== null && time2 !== void 0 ? time2 : 0;
    var initialVelocityY = initialVelocityY2 !== null && initialVelocityY2 !== void 0 ? initialVelocityY2 : 0;
    var d = initialVelocityY * time + (gravity * time * time) / 2;
    return d;
}
exports.calcDistanceY = calcDistanceY;
function calcTimeX(initialVelocityX, distance) {
    var time = distance / initialVelocityX;
    return time;
}
exports.calcTimeX = calcTimeX;
function calcDistanceX(time2, initialVelocityX2) {
    var time = time2 !== null && time2 !== void 0 ? time2 : 0;
    var initialVelocityX = initialVelocityX2 !== null && initialVelocityX2 !== void 0 ? initialVelocityX2 : 0;
    var d = time * initialVelocityX;
    return d;
}
exports.calcDistanceX = calcDistanceX;
function calcFallTimeAndHorizDistance(initialVelocityY, initialVelocityX, changeInY2, gravity2) {
    var gravity = gravity2 !== null && gravity2 !== void 0 ? gravity2 : -10;
    var changeInY = changeInY2 !== null && changeInY2 !== void 0 ? changeInY2 : 0;
    var yTime = calcTimeY(initialVelocityY, changeInY, gravity);
    var xDistance = calcDistanceX(yTime, initialVelocityX);
    console.log(`The object spent ${yTime} before landing, and traveled ${xDistance}`);
}
exports.calcFallTimeAndHorizDistance = calcFallTimeAndHorizDistance;
function calcFinalSpeedY(initialVelocityY, time, gravity2) {
    var gravity = gravity2 !== null && gravity2 !== void 0 ? gravity2 : -10;
    var final = initialVelocityY + gravity * time;
    return final;
}
exports.calcFinalSpeedY = calcFinalSpeedY;
function polarDistance(theta, speed, changeInY2, gravity2) {
    var gravity = gravity2 !== null && gravity2 !== void 0 ? gravity2 : -10;
    var changeInY = changeInY2 !== null && changeInY2 !== void 0 ? changeInY2 : 0;
    var tempTheta = (theta * Math.PI) / 180;
    var speedX = speed * Math.cos(tempTheta);
    var speedY = speed * Math.sin(tempTheta);
    var timeY = calcTimeY(speedY, changeInY, gravity);
    var distanceY = calcDistanceY(timeY, speedY, gravity);
    var distanceX = calcDistanceX(timeY, speedX);
    return `The object flew ${distanceX} horizontally`;
}
exports.polarDistance = polarDistance;
//# sourceMappingURL=vector.js.map