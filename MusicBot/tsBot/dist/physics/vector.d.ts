export { calcDistanceX, calcTimeX, calcDistanceY, calcTimeY, calcFallTimeAndHorizDistance, calcFinalSpeedY, polarDistance };
declare function calcTimeY(initialVelocityY2: number, change2: number, gravity2: number): any;
declare function calcDistanceY(time2: number, initialVelocityY2: number, gravity2: number): number;
declare function calcTimeX(initialVelocityX: number, distance: number): number;
declare function calcDistanceX(time2: number, initialVelocityX2: number): number;
declare function calcFallTimeAndHorizDistance(initialVelocityY: number, initialVelocityX: number, changeInY2: number, gravity2: number): void;
declare function calcFinalSpeedY(initialVelocityY: number, time: number, gravity2: number): number;
declare function polarDistance(theta: number, speed: number, changeInY2: number, gravity2: number): string;
