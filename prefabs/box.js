// base box construct
var Box = function(game){
	Phaser.Sprite.call(this,game,
		game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH),'box');
	this.ptint = game.rnd.between(0,255);
	this.tint = this.ptint;

	// enable to be clicked or hovered over
    this.inputEnabled = true;
    //this.events.onInputDown.add(this.death,this);

	// set the pivot point to be the center and alter size
	this.anchor.setTo(0.5,0.5);
	var real = game.rnd.realInRange(0.5,1.5);
	this.scale.setTo(real,real);

	//looks at the real variable and determines a appropiate random age
	//based on the scale, or the random "real" value
	if (real <= 0.6 && real >= 0.5) {
		this.name = game.rnd.integerInRange(1, 10);
	} else if (real <= 0.7 && real > 0.6){
		this.name = game.rnd.integerInRange(11, 20);
	} else if (real <= 0.8 && real > 0.7){
		this.name = game.rnd.integerInRange(21, 30);
	} else if (real <= 0.9 && real > 0.8){
		this.name = game.rnd.integerInRange(31, 40);
	} else if (real <= 1.0 && real > 0.9){
		this.name = game.rnd.integerInRange(41, 50);
	} else if (real <= 1.1 && real > 1.0){
		this.name = game.rnd.integerInRange(51, 60);
	} else if (real <= 1.2 && real > 1.1){
		this.name = game.rnd.integerInRange(61, 70);
	} else if (real <= 1.3 && real > 1.2){
		this.name = game.rnd.integerInRange(71, 80);
	} else{
		this.name = game.rnd.integerInRange(81, 90);
	}

	// enable physics
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.body.onWorldBounds = new Phaser.Signal();
	this.body.onWorldBounds.add(newDest,this);

	// define constants that affect motion
	this.SPEED = 100; // pixels/second
	this.TURN_RATE = 50; // degrees/frame
	this.GOOD = false;
	this.VETTED = false;
	this.DESTINATION = [game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH)]; // destination

	this.disappearDistance = game.world.width * (4.3/7)-this.width*1.5;
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.constructor = Box;
Box.prototype.update = function(){

	this.events.onInputOver.add(overSprite, this);
	this.events.onInputOut.add(outSprite, this);
	this.events.onInputDown.add(click, this);

	// update next destination
	if(this.DESTINATION[0] - this.x < 5 && this.DESTINATION[1] - this.y < 5){
		this.DESTINATION = [game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH)];
	}

	// calculate angle from box to destination
	var targetAngle = this.game.math.angleBetween(
		this.x,this.y,this.DESTINATION[0],this.DESTINATION[1]);

	// gradually turn towards targetAngle
	if(this.rotation !== targetAngle){
		// calculate difference between current angle and targetAngle
		var delta = targetAngle - this.rotation;

		// keep it in range from -180 to 180 to make most efficient turns
		if(delta > Math.PI) delta -= Math.PI * 2;
		if(delta < -Math.PI) delta += Math.PI * 2;
		if(delta > 0){
			// turn clockwise
			this.angle += this.TURN_RATE;
		} else {
			// turn counter-clockwise
			this.angle -= this.TURN_RATE;
		}

		// set the angle to target angle if they are close
		if(Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)){
			this.rotation = targetAngle;
		}
	}

	// calculate velocity based on this.rotation and this.SPEED
	this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
	this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;

	if (this.body.x >= this.disappearDistance){ // if the sprite is over 800.x width, remove from
        //boxes.remove(this);
       	this.picked(this);
    }
};

// called when objects collide with wall
function newDest(box) {
	if (!box.inputEnabled) {console.log('newDest');}
	box.DESTINATION = [game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH)];
}

function overSprite() {
	this.tint = 0xffffff;
	hoverData.hovering(this.name);
}

function outSprite() {
	this.tint = this.ptint;
}

function click (box) {
	console.log('clicked on ' + this.name);
	//this.tint = 0xff0000;
	this.SPEED*=5;
	this.DESTINATION = [game.world.width+this.width,game.world.height/2];
	this.inputEnabled = false;
	this.body.checkCollision.right = false;
	//this.input.onDown.remove(newDest, this);
	this.body.collideWorldBounds = false;
	//this.outOfBoundsKill = true;
	//this.body.onWorldBounds.remove(newDest);

	quotaSystem.updateVetted(this);
}

// destroy the box
Box.prototype.death = function(){
	console.log('death to ' + this.name);
	boxes.remove(this);
	this.destroy();
};

// retain box elsewhere
Box.prototype.picked = function(){
	this.SPEED = 0;
	this.TURN_RATE = 0;
	// this.x = -this.width;
	this.alpha = 0.5;
	this.angle = 0;
};

// animation of box when trying to enter gate
Box.prototype.enterGate = function(box,gate,bool){
	console.log('moving box ' + box.name);
	if(bool){
		console.log('box is moving right');
		for(var i=0;i<20;i++){
			console.log('right ' + box.x);
			box.x += 5;
		}
	}
	else{
		console.log('box is moving left');
		for(var i=0;i<20;i++){
			console.log('left ' + box.x);
			box.x -= 5;
		}
	}
};
