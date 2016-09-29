/**
 * Created by adelayde on 09/10/15.
 */

function differenceBetween(a, b) {
    if (a > b) {
        return a - b
    } else {
        return b - a
    }
}

var Circle = function (centre_x, centre_y, radius) {
    this.centre_x = centre_x
    this.centre_y = centre_y
    this.radius = radius
}

Circle.prototype.name = function(objectName) {
    if (objectName === undefined) {
        return this.myName
    } else {
        this.myName = objectName
    }
}

Circle.prototype.drawIntoContext = function (context) {
    context.beginPath()
    context.arc(this.centre_x, this.centre_y, this.radius, 0, 2 * Math.PI)
    context.stroke()
    context.closePath()
}

Circle.prototype.isPointBounded = function(point_x, point_y) {
    // Pythagoras' Theorum
    var a = differenceBetween(point_x, this.centre_x)
    var b = differenceBetween(point_y, this.centre_y)
    var hypoteneuse = Math.sqrt(Math.pow(a,2) + Math.pow(b,2))
    if (hypoteneuse <= this.radius) {
        return true
    }
}

var circlesApp = {
    render: function () {
        var canvas = document.getElementById("circle-canvas")
        var x = canvas.width / 2
        var y = canvas.height / 2

        this.outerCircle = new Circle(x, y, 200)
        this.innerCircle = new Circle(x, y, 180)

        var context = canvas.getContext("2d")
        this.outerCircle.drawIntoContext(context)
        this.innerCircle.drawIntoContext(context)
    },

    detect: function(event, object) {
        var a = event.clientX - object.offsetLeft;
        var b = event.clientY - object.offsetTop;
        if (this.innerCircle.isPointBounded(a,b)) {
            document.getElementById('message').innerHTML = "I am in the inner circle"
        } else if (this.outerCircle.isPointBounded(a,b)) {
            document.getElementById('message').innerHTML = "I am in the outer circle"
        } else {
            document.getElementById('message').innerHTML = "I am not in any circle"
        }
    }
}