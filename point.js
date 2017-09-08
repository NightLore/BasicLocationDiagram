"use strict";

// Class Point stores location info
function Point(x, y, radius, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 1;
    this.color = color || "white";
    this.input = document.createElement('div');
};





Point.prototype.draw = function(canvas) {
    var context2D = canvas.getContext('2d');
    
    // body...
};

Point.distance = function(p1, p2) {
    var x = p1.x - p2.x;
    var y = p1.y - p2.y;
    return Math.sqrt(x * x + y * y);
};

Point.prototype.draw = function(canvas) {
    Point.fill(canvas,this,this.fillStyle);
    if ( this.strokeStyle )
    {
        Point.stroke(canvas,this,this.strokeStyle,this.strokeWidth);
    }
};

Point.prototype.getDistance = function(c)
{
    return getDistance(this.x,this.y,c.x,c.y);
};

Point.prototype.getAngle = function(c)
{
    return getAngle(this.x,this.y,c.x,c.y);
};

Point.fill = function(canvas,Point,style)
{
    if ( style ) canvas.fillStyle = style;
    canvas.beginPath();
    canvas.arc(Point.x, Point.y, Point.radius, 0, 2 * Math.PI, false);
    canvas.fill();
};

Point.stroke = function(canvas,Point,style,width)
{
    if ( style ) canvas.strokeStyle = style;
    if ( width ) canvas.lineWidth = width;
    canvas.beginPath();
    canvas.arc(Point.x, Point.y, Point.radius, 0, 2 * Math.PI, false);
    canvas.stroke();
};



function getDistance(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
};

function getAngle(x1,y1,x2,y2)
{
    return toDegrees( Math.atan2(y2 - y1, x2 - x1) ) + 180;
};