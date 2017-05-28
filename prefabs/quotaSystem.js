// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  Create our Timer
    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    this.timer.loop(5000, this.endLevel, this);

    // custom variables for construct
    this.quota = 0;
    this.level = 1;
    this.result = []; // grey, red, empty
		this.pickedBoxes = [];
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
		game.debug.text('Time until event: ' + Math.ceil(this.timer.duration.toFixed(0)/1000), game.world.width-250, 32);
		game.debug.text('Quota: ' + this.quota, game.world.width-250, 64);
		game.debug.text('Vetted: ' + this.vetted, game.world.width-250, 96);
	} else {
		game.debug.text('', 32, 32); // removes debugging text
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

    //this.endLevel(this);
};
Quota.prototype.endLevel = function() {
	console.log('ending level');
	while(this.result.length < this.quota){
			this.result.push("empty");
	}
	this.report = game.add.sprite(0,0,'box');
	this.report.tint = (128,128,128);
	this.report.width = game.world.width;
	this.report.height = game.world.height;
	game.debug.text('Result: ' + this.result, game.world.width-550, 128);
	console.log(this.pickedBoxes)
	this.status = 'end';
	this.timer.stop();
};

Quota.prototype.createGoalnTime = function() {
	console.log('creating goal');
	this.quota = (this.level * game.rnd.between(2,5));
	// this.result.length = this.quota;
	var vettedQuantity = Math.ceil(this.quota * game.rnd.realInRange(.3,.5));
	this.vetted.length = vettedQuantity;
	console.log("length" + this.vetted.length);
	while(vettedQuantity >= 0) {
			var random = game.rnd.between(1,90);
 			if(this.boxArr[random]){
					this.vetted[vettedQuantity] = random;
					var test = this.boxArr[random];
					console.log(test[0].VETTED);
					test[0].VETTED = true;
					console.log(test[0].VETTED);
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
	for(var i = 0; i < 25; i++) {
		var box = new Box(this.game);
		var ran = game.rnd.between(0,3);
		if(ran == 0){
			box.GOOD = true;
		}
		boxes.add(box);
		if(this.boxArr[box.name]) {
			this.boxArr[box.name].push(box);
		} else {
			this.boxArr[box.name] = [];
			this.boxArr[box.name].push(box);
		}
		this.game.add.existing(box);
	}
	console.log("CreateBox")
};
Quota.prototype.updateVetted = function(box) {
	// checks box against vetted
	console.log('updating vetted ' + box.VETTED);
	for(i = 0; i <= this.vetted.length; i++){
		if(this.vetted[i] == box.name && box.VETTED == true){
			box.GOOD = true;
			this.result.push("grey");
			console.log(true);
		}
	}
	if(box.GOOD == false){
		this.result.push("red");
	}else if(box.GOOD == true && box.VETTED == false){
		this.result.push("grey");
	}
	this.pickedBoxes.push(box);
};
