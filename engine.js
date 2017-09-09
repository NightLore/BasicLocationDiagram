
var setupVariables = function(c) {
    mouse = {
        x: 0,
        y: 0,
        clicked: [false, false, false],
        down: [false, false, false]
    };
    mouse_coords = document.createTextNode("0,0");
    document.getElementById('mouse_coordinates').appendChild(mouse_coords);
    
    canvas = document.getElementById(c);
    context2D = canvas.getContext('2d');
    var div = document.getElementById('canvas_div');
    canvas.width = div.clientWidth;
    canvas.height = div.clientHeight;
    origin = {
        x: 0,
        y: 0
    }
}

var setupInput = function(element) {

    element.addEventListener('mousemove', function(e) {
//        var pos = getMousePos(canvas,e);
        mouse.x = Math.round(e.clientX - canvas.width/2 + origin.x);
        mouse.y = Math.round(e.clientY - canvas.height/2 + origin.y);
        mouse_coords.nodeValue = mouse.x + "," + mouse.y;
        update();
    });

    element.addEventListener('mousedown', function(e) {
        mouse.clicked[e.which-1] = !mouse.down[e.which-1];
        mouse.down[e.which-1] = true;
        update();
    });

    element.addEventListener('mouseup', function(e) {
        mouse.down[e.which-1] = false;
        mouse.clicked[e.which-1] = false;
        update();
    });

    document.addEventListener('keyup', function(e) {update();});
//    document.addEventListener('keydown', function(e) {update();});
    window.addEventListener('resize', function() {resize_canvas(canvas);});
}

var resize_canvas = function() {
//    var div = document.getElementById('canvas_div');
//    canvas.width = div.clientWidth;
//    canvas.height = div.clientHeight;
//            this.height = newHeight;
//
//            for (var i = 0; i < points.length; i++) {
//                if (points.resize)
//                    points.resize(this.canvas);
//            }
    update();
}

var update = function() {
    var div = document.getElementById('canvas_div');
    canvas.width = div.clientWidth;
    canvas.height = div.clientHeight;
    for (var i = 0; i < points.length; i++) {
        points[i].update(mouse);
    }
    draw();
}

var draw = function() {
    context2D.setTransform(1,0,0,1,0,0); // reset the transform matrix as it is cumulative
    context2D.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

//            this.cam.x = 0;
//            this.cam.y = 0;
//            //Clamp the camera position to the world bounds while centering the camera around the player   
//            if ( this.player )
//            {
//                this.cam.x = -this.player.x + this.canvas.width/2;
//                this.cam.y = -this.player.y + this.canvas.height/2;
//                if ( this.world )
//                {
//                    this.cam.x = clamp(this.cam.x, -this.world.rightSide() + this.canvas.width, -this.world.leftSide());
//                    this.cam.y = clamp(this.cam.y, -this.world.bottomSide() + this.canvas.height, -this.world.topSide());
//                }
//            }
    context2D.translate( canvas.width/2 - origin.x, canvas.height/2 - origin.y );

    if (selected) {
        selected.drawDistances(context2D,points);
    }
    for (var i = 0; i < points.length; i++) {
        points[i].draw(context2D,points);
    }
}