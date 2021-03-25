export {calcDistanceX,calcTimeX,calcDistanceY,calcTimeY,calcFallTimeAndHorizDistance,calcFinalSpeedY, polarDistance}

/*{
	calcTimeY: function (initialVelocityY2 : number, change2 : number, gravity2 : number) {
		var gravity = gravity2 ?? -10;
        var initialVelocityY = initialVelocityY2 ?? 0;
	    var change = change2 ?? 0;
		//d = time(speed+1/2(acceleration/gravity)(time))
		// 1/time = 1/2(initial and final velocity)/2
		//final velocity = iniitial + time(gravity)
		//0 =1/2 a t^2 + t vi -d

		var equation = `0 = ${gravity / 2}t^2 + ${initialVelocityY}t  + ${-change}`;
		var equation2 = equation.split("t");
		var abc = new Array();
		var time : number;
		var equation3 = equation2.forEach((Element) => {
			var parts = Element.split(" ");
			abc.push(parts.pop());
		});

		var a = parseInt(abc[0]);
		var b = parseInt(abc[1]);
		var c = parseInt(abc[2]);
		if (a == 0) {
			time = Math.abs(initialVelocityY / gravity) * 2;
		} else {
			var solveQuadraticPos = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
			var solveQuadraticNeg = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
			time = Math.max(solveQuadraticNeg, solveQuadraticPos);
		}

		return time;
	},
	calcTimeX: function (initialVelocityX : number, distance : number) {
		var time : number = distance / initialVelocityX;
		return time;
	},
	calcDistanceY: function (time2: number, initialVelocityY2: number, gravity2: number) {
		var gravity = gravity2 ?? -10;
	var time = time2 ?? 0;
	var initialVelocityY = initialVelocityY2 ?? 0;
		var d : number = initialVelocityY * time + (gravity * time * time) / 2;
		return d;
	},
	calcDistanceX: function (time2: number, initialVelocityX2: number) {
        var time = time2 ?? 0;
	    var initialVelocityX = initialVelocityX2 ?? 0;
		var d  : number= time * initialVelocityX;
		return d;
	},
	calcFallTimeAndHorizDistance: function (initialVelocityY: number, initialVelocityX: number, changeInY2: number, gravity2: number) {
		var gravity = gravity2 ?? -10;
	    var changeInY = changeInY2 ?? 0;
		var yTime = calcTimeY(initialVelocityY, changeInY, gravity);
		var xDistance = calcDistanceX(yTime, initialVelocityX);
		console.log(`The object spent ${yTime} before landing, and traveled ${xDistance}`);
	},

	calcPolarDistance: function (theta: number, speed: number, changeInY2: number, gravity2: number) {
		var gravity = gravity2 ?? -10;
	var changeInY = changeInY2 ?? 0;
		var tempTheta = (theta * Math.PI) / 180;
		var speedX = speed * Math.cos(tempTheta);
		var speedY = speed * Math.sin(tempTheta);
		var timeY = calcTimeY(speedY, changeInY, gravity);
		//var distanceY = calcDistanceY(timeY, speedY, gravity);
		var distanceX = calcDistanceX(timeY, speedX);

		var peakY = calcDistanceY(calcTimeY(speedY, 0, gravity) / 2, speedY, gravity);
		var finalSpeedY = calcFinalSpeedY(speedY, timeY, gravity);
		var impactAngle = Math.abs((Math.atan(finalSpeedY / speedX) * 180) / Math.PI);
		return `The object flew ${distanceX} horizontally. \n The object's peak height was at ${
			calcTimeY(speedY, 0, gravity) / 2
		} reaching ${peakY}. \n The object's time in the air was ${timeY}. \n The object's final vertical speed was ${finalSpeedY}. \n The object's impact angle was ${impactAngle}`;
	},
};

var age = Math.ceil(Math.random() * 6) + 13;
/**/

function calcTimeY(initialVelocityY2: number, change2: number, gravity2: number) {
	var gravity = gravity2 ?? -10;
	var initialVelocityY = initialVelocityY2 ?? 0;
	var change = change2 ?? 0;
	//d = time(speed+1/2(acceleration/gravity)(time))
	// 1/time = 1/2(initial and final velocity)/2
	//final velocity = iniitial + time(gravity)
	//0 =1/2 a t^2 + t vi -d
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
	} else {
		var solveQuadraticPos = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
		var solveQuadraticNeg = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
		time = Math.max(solveQuadraticNeg, solveQuadraticPos);
	}

	return time;
} 

//! done
function calcDistanceY(time2: number, initialVelocityY2: number, gravity2: number) {
	var gravity = gravity2 ?? -10;
	var time = time2 ?? 0;
	var initialVelocityY = initialVelocityY2 ?? 0;
	var d = initialVelocityY * time + (gravity * time * time) / 2;
	return d;
}
//! done
function calcTimeX(initialVelocityX: number, distance: number) {
	var time = distance / initialVelocityX;
	return time;
}

//! done
function calcDistanceX(time2: number, initialVelocityX2: number) {
	var time = time2 ?? 0;
	var initialVelocityX = initialVelocityX2 ?? 0;
	var d = time * initialVelocityX;
	return d;
}

//! done
function calcFallTimeAndHorizDistance(initialVelocityY: number, initialVelocityX: number, changeInY2: number, gravity2: number) {
	var gravity = gravity2 ?? -10;
	var changeInY = changeInY2 ?? 0;
	var yTime = calcTimeY(initialVelocityY, changeInY, gravity);
	var xDistance = calcDistanceX(yTime, initialVelocityX);
	console.log(`The object spent ${yTime} before landing, and traveled ${xDistance}`);
}

//!done
function calcFinalSpeedY(initialVelocityY: number, time: number, gravity2: number) {
	var gravity = gravity2 ?? -10;
	var final = initialVelocityY + gravity * time;
	return final;
}

//!done
function polarDistance(theta: number, speed: number, changeInY2: number, gravity2: number) {
	var gravity = gravity2 ?? -10;
	var changeInY = changeInY2 ?? 0;
	var tempTheta = (theta * Math.PI) / 180;
	var speedX = speed * Math.cos(tempTheta);
	var speedY = speed * Math.sin(tempTheta);
	var timeY = calcTimeY(speedY, changeInY, gravity);
	var distanceY = calcDistanceY(timeY, speedY, gravity);
	var distanceX = calcDistanceX(timeY, speedX);
	return `The object flew ${distanceX} horizontally`;
	//console.log({ speedX, speedY, timeY, distanceY, distanceX })
}
