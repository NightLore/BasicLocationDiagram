'use strict';

//var points = []; // stores all points and locations
// var active; // stores all the active points 
// var drawDistances; // boolean of whether or not to draw the distances
// var 



/**
 * Constructs a basic game engine, based on my previously made game engine
 */
var GameEngine = function(canvas, FPS) {
    this.FPS = 1000 / FPS;
    this.canvas = canvas;
    this.context2D = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.cam = { x: 0, y: 0 };
    this.uiObjects = [];
    this.gameObjects = [];
}

GameEngine.prototype.setUIObjects = function(canvas) {
    var engine = this;
    var canvasW = canvas.width;
    var canvasH = canvas.height;
}

GameEngine.prototype.updateGameObjects = function(objects) {
    
}

GameEngine.prototype.add = function(obj,index) {
    
}

GameEngine.prototype.remove = function(index) {
}
 
/**
 * Sets up the game engine with event listeners for the given canvas
 */
GameEngine.prototype.setupInput = function() {
    this.mouse = {
        x: 0,
        y: 0,
        clicked: [false, false, false],
        down: [false, false, false]
    };
 
    var engine = this;
 
    this.canvas.addEventListener("mousemove", function(e) {
        var pos = getMousePos(engine.canvas,e);
        engine.mouse.x = pos.x;
        engine.mouse.y = pos.y;
    });
 
    this.canvas.addEventListener("mousedown", function(e) {
        engine.mouse.clicked[e.which-1] = !engine.mouse.down[e.which-1];
        engine.mouse.down[e.which-1] = true;
    });
 
    this.canvas.addEventListener("mouseup", function(e) {
        engine.mouse.down[e.which-1] = false;
        engine.mouse.clicked[e.which-1] = false;
    });

//    document.addEventListener('keyup', function(e) {});
//    document.addEventListener('keydown', function(e) {});
    window.addEventListener('resize', function() {engine.resize_canvas();});
}

GameEngine.prototype.resize_canvas = function() {
    var aspectRatio = window.innerWidth / window.innerHeight;
    var newHeight = this.width / aspectRatio;
    this.canvas.height = newHeight;
    this.height = newHeight;

    for (var i = 0; i < this.uiObjects.length; i++) {
        if (this.uiObjects[i].resize)
            this.uiObjects[i].resize(this.canvas);
    }
    this.draw();
}
 
/**
 * Runs the game loop
 */
GameEngine.prototype.run = function() {
    var desiredTime = Date.now() + this.FPS;
 
    this.update();
    this.draw();

    var engine = this;
 
    var interval = Math.max(0, desiredTime-Date.now());
    setTimeout( function() { engine.run() }, interval); // basic infinite loop
}
 
/**
 * Updates the logic of the game with all the game objects
 */
GameEngine.prototype.update = function() {
    for (var i = 0; i < this.uiObjects.length; i++) {
        this.uiObjects[i].update(this.mouse);
    }
    for (var i = 0; i < this.gameObjects.length; i++) {
        this.gameObjects[i].update(this.mouse);
    }
}
 
/**
 * Draws the game with all the game objects
 */
GameEngine.prototype.draw = function() {
    this.context2D.setTransform(1,0,0,1,0,0); // reset the transform matrix as it is cumulative
    this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);//clear the viewport AFTER the matrix is reset

//    this.cam.x = 0;
//    this.cam.y = 0;
//    //Clamp the camera position to the world bounds while centering the camera around the player   
//    if ( this.player )
//    {
//        this.cam.x = -this.player.x + this.canvas.width/2;
//        this.cam.y = -this.player.y + this.canvas.height/2;
//        if ( this.world )
//        {
//            this.cam.x = clamp(this.cam.x, -this.world.rightSide() + this.canvas.width, -this.world.leftSide());
//            this.cam.y = clamp(this.cam.y, -this.world.bottomSide() + this.canvas.height, -this.world.topSide());
//        }
//    }
//    this.context2D.translate( this.cam.x, this.cam.y );
//    this.world.draw(this.context2D);
    
    for (var i = 0; i < this.gameObjects.length; i++) {
        this.gameObjects[i].draw(this.context2D);
    }

    this.context2D.setTransform(1,0,0,1,0,0); // reset the transform matrix before drawing ui elements
    // this.context2D.translate( -this.cam.x, -this.cam.y );
    for (var i = 0; i < this.uiObjects.length; i++) {
        this.uiObjects[i].draw(this.context2D);
    }
}