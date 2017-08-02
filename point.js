
// Class Point stores location info
function Point(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}





Point.prototype.draw = function(canvas) {
    // body...
};

Point.distance = function(p1, p2) {
    var x = p1.x - p2.x;
    var y = p1.y - p2.y;
    var z = p1.z - p2.z;
    return Math.sqrt(x*x + y*y + z*z);
}