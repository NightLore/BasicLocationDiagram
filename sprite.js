/**
  * Basic Sprite that can move, extends the Button for mouse and keyboard implementations
  * Can be contained within a rectangle by: Sprite.bounds = new Rectangle()
  * Can collide with
  */
var Sprite = function(x, y, radius, velocity, dir) {
	Button.call(this, x, y, radius);
	this.type = "SPRITE";
	this.textBaseline = "bottom";
	this.setStats();
}

Sprite.prototype = Object.create(Button.prototype);
Sprite.prototype.constructor = Sprite;
Sprite._super = Object.getPrototypeOf(Sprite.prototype);

Sprite.prototype.draw = function(canvas) {
	this._textX = this.x;
	this._textY = this.topSide();
	Sprite._super.draw.call(this,canvas);
	this.drawHp(canvas);
}

Sprite.prototype.drawHp = function(canvas) {
	if (!this.damagable || this.hp === this.maxHp || this.hp <= 0) return;
	var x = this.leftSide();
	var y = this.bottomSide();
	var w = this.radius * 2;
	var h = 7;
	var offset = 1;
	canvas.fillStyle = "rgb(100,100,100)";
	canvas.fillRect(x-offset,y-offset,w+offset*2,h+offset*2);
	canvas.fillStyle = "rgb(0,200,0)";
	canvas.fillRect(x,y,Math.floor(this.hp*w/this.maxHp),h);
}

Sprite.prototype.setStats = function(maxHp,atk) {
	this.maxHp = maxHp || 10;
	this.hp = this.maxHp;
	this.atk = atk || 2;
}

Sprite.prototype.getStats = function(maxHp,atk) {
	return {maxHp: this.maxHp, 
			hp: this.hp, 
			atk: this.atk};
}

Sprite.prototype.copySpriteInfo = function(info) {
	this.type = info.type;
	this.text = info.text;
    this.x = info.x || this.x;
    this.y = info.y || this.y;
    this.radius = info.radius || this.radius
    
	this.copySpriteStats(info);
}

Sprite.prototype.copySpriteStats = function(stats) {
	this.setStats(stats.maxHp,stats.atk);
	this.hp = stats.hp || this.hp;
}

Sprite.copy = function(s) {
	var sprite = new Sprite(s.x,s.y,s.radius,s.velocity,s.dir);
	sprite.copySpriteInfo(s);
    return sprite;
}
