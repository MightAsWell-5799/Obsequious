module.exports = {
    calcTimeY: function ([
        initialVelocityY = 0,
        change = 0,
        gravity = -10,
    ]) {
        var gravity = parseFloat(gravity)
        //d = time(speed+1/2(acceleration/gravity)(time))
        // 1/time = 1/2(initial and final velocity)/2
        //final velocity = iniitial + time(gravity)
        //0 =1/2 a t^2 + t vi -d
        
        var equation = `0 = ${
            gravity / 2
        }t^2 + ${initialVelocityY}t  + ${-change}`
        var equation2 = equation.split('t')
        var abc = new Array()
        var time
        var equation3 = equation2.forEach((Element) => {
            var parts = Element.split(' ')
            abc.push(parts.pop())
        })

        var a = parseInt(abc[0])
        var b = parseInt(abc[1])
        var c = parseInt(abc[2])
        if (a == 0) {
            time = Math.abs(initialVelocityY / gravity) * 2
        } else {
            var solveQuadraticPos =
                (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
            var solveQuadraticNeg =
                (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
            time = Math.max(solveQuadraticNeg, solveQuadraticPos)
        }

        return time
    },
    calcTimeX: function ([initialVelocityX = 0, distance = 0]) {
        var time = distance / initialVelocityX
        return time
    },
    calcDistanceY: function ([
        time,
        initialVelocityY = 0,
        gravity = -10,
    ]) {
        var gravity = parseFloat(gravity)
        var d =
            initialVelocityY * time + (gravity * time * time) / 2
        return d
    },
    calcDistanceX: function ([time = 0, initialVelocityX = 0]) {
        var d = time * initialVelocityX
        return d
    },
    calcFallTimeAndHorizDistance: function ([
        initialVelocityY = 0,
        initialVelocityX = 0,
        changeInY = 0,
        gravity = -10,
    ]) {
        var gravity = parseFloat(gravity)
        var yTime = calcTimeY([
            initialVelocityY,
            changeInY,
            gravity,
        ])
        var xDistance = calcDistanceX([yTime, initialVelocityX])
        console.log(
            `The object spent ${yTime} before landing, and traveled ${xDistance}`,
        )
    },

    calcPolarDistance: function ([
        theta,
        speed,
        changeInY = 0,
        gravity = -10,
    ]) {
        var gravity = parseFloat(gravity)
        var tempTheta = (theta * Math.PI) / 180
        var speedX = speed * Math.cos(tempTheta)
        var speedY = speed * Math.sin(tempTheta)
        var timeY = calcTimeY([speedY, changeInY, gravity])
        var distanceY = calcDistanceY([timeY, speedY, gravity])
        var distanceX = calcDistanceX([timeY, speedX])
        
        var peakY = calcDistanceY([
            calcTimeY([speedY, 0, gravity]) / 2,
            speedY,
            gravity,
        ])
        var finalSpeedY = calcFinalSpeedY([speedY, timeY, gravity])
        var impactAngle = Math.abs((Math.atan(finalSpeedY/speedX) * 180)/Math.PI)
        return (
                `The object flew ${distanceX} horizontally. \n The object's peak height was at ${calcTimeY([speedY, 0, gravity]) / 2} reaching ${peakY}. \n The object's time in the air was ${timeY}. \n The object's final vertical speed was ${finalSpeedY}. \n The object's impact angle was ${impactAngle}`)
    },
}

function calcTimeY([
    initialVelocityY = 0,
    change = 0,
    gravity = -10,
]) {
    var gravity = parseFloat(gravity)
    //d = time(speed+1/2(acceleration/gravity)(time))
    // 1/time = 1/2(initial and final velocity)/2
    //final velocity = iniitial + time(gravity)
    //0 =1/2 a t^2 + t vi -d
    var equation = `0 = ${
        gravity / 2
    }t^2 + ${initialVelocityY}t  + ${-change}`
    var equation2 = equation.split('t')
    var abc = new Array()
    var time
    var equation3 = equation2.forEach((Element) => {
        var parts = Element.split(' ')
        abc.push(parts.pop())
    })

    var a = parseInt(abc[0])
    var b = parseInt(abc[1])
    var c = parseInt(abc[2])
    if (a == 0) {
        var gravity = parseFloat(gravity)
        time = Math.abs(initialVelocityY / gravity) * 2
    } else {
        var solveQuadraticPos =
            (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
        var solveQuadraticNeg =
            (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
        time = Math.max(solveQuadraticNeg, solveQuadraticPos)
    }

    return time
}

function calcDistanceY([
    time,
    initialVelocityY = 0,
    gravity = -10,
]) {
    var gravity = parseFloat(gravity)
    var d = initialVelocityY * time + (gravity * time * time) / 2
    return d
}
function calcTimeX([initialVelocityX = 0, distance = 0]) {
    var time = distance / initialVelocityX
    return time
}

function calcDistanceX([time = 0, initialVelocityX = 0]) {
    var d = time * initialVelocityX
    return d
}

function calcFallTimeAndHorizDistance([
    initialVelocityY = 0,
    initialVelocityX = 0,
    changeInY = 0,
    gravity = -10,
]) {
    var gravity = parseFloat(gravity)
    var yTime = calcTimeY([initialVelocityY, changeInY, gravity])
    var xDistance = calcDistanceX([yTime, initialVelocityX])
    console.log(
        `The object spent ${yTime} before landing, and traveled ${xDistance}`,
    )
}

function calcFinalSpeedY([initialVelocityY, time, gravity = -10]){
    var gravity = parseFloat(gravity)
    var final = initialVelocityY + gravity * time
    return final
}

function polarDistance([
    theta,
    speed,
    changeInY = 0,
    gravity = -10,
]) {
    var gravity = parseFloat(gravity)
    var tempTheta = (theta * Math.PI) / 180
    var speedX = speed * Math.cos(tempTheta)
    var speedY = speed * Math.sin(tempTheta)
    var timeY = calcTimeY([speedY, changeInY, gravity])
    var distanceY = calcDistanceY([timeY, speedY, gravity])
    var distanceX = calcDistanceX([timeY, speedX])
    return(`The object flew ${distanceX} horizontally`)
    //console.log({ speedX, speedY, timeY, distanceY, distanceX })
}
