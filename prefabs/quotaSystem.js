// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  Create our Timer
    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    this.timer.loop(3000, this.endLevel, this);

    // custom variables for construct
    this.quota = 0;
    this.level = 1;
    this.result = []; // grey, red, empty
    this.vetted = [];
    this.boxArr = {};

    console.log('end of quota create');
    this.startLevel(this);
    this.status = 'running';
};
Quota.prototype = Object.create(Phaser.Text.prototype);
Quota.constructor = Quota;
Quota.prototype.update = function() {
	// debugging text to show timer and quota
	if(this.status != 'end'){
		game.debug.text('Time until event: ' + Math.ceil(this.timer.duration.toFixed(0)/1000), 32, 32);
		game.debug.text('Quota: ' + this.quota, 32, 64);
		game.debug.text('Vetted: ' + this.vetted, 32, 96);
		game.debug.text('Result: ' + this.result, 32, 128);
	} else {
		game.debug.text('', 32, 32); // removes debugging text
		if(game.input.onDown){
			console.log('Resetting');
			//this.report.destroy();
			//this.startLevel(this);
			this.status = 'running';
		}
	}


};
Quota.prototype.startLevel = function() {
	console.log('starting level');
    // create boxes
    this.createBox(this);

		// create a quota goal
		this.createGoalnTime(this);

    //  Start the timer running - this is important!
    this.timer.start();
};
Quota.prototype.endLevel = function() {
	console.log('ending level');
<<<<<<< HEAD
	
	/*
=======

>>>>>>> origin/QuotaSystem-end&update
	this.report = game.add.sprite(0,0,'box');
	this.report.tint = (128,128,128);
	this.report.width = game.world.width;
	this.report.height = game.world.height;
	*/
	this.status = 'end';
	console.log('ending');
	console.log(this.boxArr);
	console.log('Total boxes: ' + boxes.RETURN_TOTAL);
	boxes.removeAll(true);
	console.log('Total boxes: ' + boxes.RETURN_TOTAL);
	this.timer.stop();
	console.log(boxes);
	console.log(this.boxArr);
};

Quota.prototype.createGoalnTime = function() {
	console.log('creating goal');
	this.quota = (this.level * game.rnd.between(2,5));
	this.result.length = this.quota;
	var vettedQuantity = Math.ceil(this.quota * game.rnd.realInRange(.3,.5));
	this.vetted.length = vettedQuantity;
	console.log("length" + this.vetted.length);
	while(vettedQuantity >= 0) {
			var random = game.rnd.between(1,90);
 			if(this.boxArr[random]){
					this.vetted[vettedQuantity] = random;
					// console.log("random" + random)
					// console.log("vetted" + this.vetted[vettedQuantity]);
					vettedQuantity--;
			}
	}
	console.log(this.vetted);
	console.log(this.vetted[1]);

};
Quota.prototype.createBox = function() {
	// make boxes and add them into group
<<<<<<< HEAD
	for(var i = 0; i < 10; i++) {
		var box = new Box(game);
=======
	for(var i = 0; i < 25; i++) {
		var box = new Box(this.game);
		var ran = game.rnd.between(0,1);
		if(ran == 0){
			box.GOOD = true;
		}
>>>>>>> origin/QuotaSystem-end&update
		boxes.add(box);
		if(this.boxArr[box.name]) {
			this.boxArr[box.name].push(box);
		} else {
			this.boxArr[box.name] = [];
			this.boxArr[box.name].push(box);
		}
		this.game.add.existing(box);
	}
<<<<<<< HEAD
	console.log('Total boxes: ' + boxes.RETURN_TOTAL);

	console.log('boxes: ');
	console.log(boxes);
	console.log('this.boxArr: ');
	console.log(this.boxArr);
=======
	console.log("CreateBox")
>>>>>>> origin/QuotaSystem-end&update
};
Quota.prototype.updateVetted = function(box) {
	// checks box against vetted
	console.log('updating vetted ' + box.name);
	for(i = 0; i <= this.vetted.length; i++){
		if(this.vetted[i] == box.name){
			box.GOOD = true;
			this.result.push("grey");
			console.log(true);
		}
	}
	if(box.GOOD == false){
		this.result.push("red");
	}

};
