// base box construct
var Box = function(game){
	Phaser.Sprite.call(this,game,
		game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH),'box');
	this.tint = game.rnd.between(0,255);

	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.bounce.x = 10;
	this.body.bounce.y = 10;


	// enable to be clicked or hovered over
    this.inputEnabled = true;
    //this.events.onInputDown.add(this.death,this);

	// set the pivot point to be the center and alter size
	this.anchor.setTo(0.5,0.5);
	var real = game.rnd.realInRange(0.5,1.5);
	this.scale.setTo(real,real);

	//call back
	this.body.onWorldBounds = new Phaser.Signal();
	this.body.onWorldBounds.add(newDest, this);

	// this.body.onCollide = new Phaser.Signal();
	// this.body.onCollide.add(newDest, this);

	// define constants that affect motion
	this.SPEED = 100; // pixels/second
	this.TURN_RATE = 50; // degrees/frame
	this.DESTINATION = [game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH)]; // destination
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.constructor = Box;


Box.prototype.update = function(){
	// when pointer is over object
	if(this.input.pointerOver()){
		hoverData.hovering(this.name);
	}
	//===========================================================================
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
	//===========================================================================
};
// called when objects collide with wall
function newDest(box) {
	box.DESTINATION = [game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH)];
}
// destroy the box
Box.prototype.death = function(){
	console.log(this.name);
	//boxes.remove(this); // remove box from box group
	gate.checkBox(this,gate,this.enterGate);
	//this.destroy(); // delete box from game
};

function newDest(box){
	console.log(box.name + "Hit");
	// if(box.x >= game.world.centerX){
	// 	box.DESTINATION /= 2; //[game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH)];
	// }else{
		box.DESTINATION = [game.rnd.between(lBLW,lBRW),game.rnd.between(lBTH,lBBH)];
	//}
}
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
