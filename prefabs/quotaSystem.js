// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  Create our Timer
    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    this.timer.loop(15000, this.endLevel, this);

    // custom variables for construct
    this.quota = 0;
    this.level = 1;
    this.result = []; // grey, red, empty
	this.pickedBoxes = [];
    this.vetted = [];
    this.boxArr = {};

	this.redBoxes = 0;
	this.greyBoxes = 0;
	this.monthlyGrade = [];
    console.log('end of quota create');

	game.input.mouse.mouseWheelCallback = mouseWheel;
    this.status = 'running';
    this.startLevel(this);
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
		this.monthlyGrade[0] = (this.redBoxes - this.greyBoxes) / this.quota;
		game.debug.text('Quota: ' + this.quota, game.world.width-450, 32);
		game.debug.text('Total amount of picked squared: ' + this.pickedBoxes.length, game.world.width-450, 64);
		game.debug.text('Bad squares: ' + this.redBoxes, game.world.width-450, 96);
		game.debug.text('Neutral squares: ' + this.greyBoxes, game.world.width-450, 128);
		if(this.monthlyGrade > .75){
			game.debug.text('Monthly Grade: Failed', game.world.width-450, 160);
		}else{
			game.debug.text('Monthly Grade: Pass', game.world.width-450, 160);
		}

	}


};

function mouseWheel(event) {
	//quotaSystem.pickedBoxes[0]
	//quotaSystem.pickedBoxes[quotaSystem.pickedBoxes.length-1] < (game.world.height - this.pickedBoxes[quotaSystem.pickedBoxes.length-1.height)
	if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP &&
		((quotaSystem.pickedBoxes[quotaSystem.pickedBoxes.length-1].y) > (game.world.height - quotaSystem.pickedBoxes[quotaSystem.pickedBoxes.length-1].height))) {
		for(var i = 1; i <= quotaSystem.pickedBoxes.length; i++){
			quotaSystem.pickedBoxes[i-1].y -= 5
		}
	} else if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN &&
		((quotaSystem.pickedBoxes[0].y) < (quotaSystem.pickedBoxes[0].height))) {
		for(var i = 1; i <= quotaSystem.pickedBoxes.length; i++){
			quotaSystem.pickedBoxes[i-1].y += 5
		}
	}
}

Quota.prototype.startLevel = function() {
	console.log('starting level');

	this.gate = game.add.sprite(game.world.width * (4.3/7),0,'box');
	this.gate.tint = 0x000000;
	this.gate.width = 80;
	this.gate.height = game.world.height;
	
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
		this.redBoxes++;
	}

	/*
	this.report = game.add.sprite(0,0,'box');
	this.report.tint = (128,128,128);
	this.report.width = game.world.width;
	this.report.height = game.world.height;
	*/

	game.debug.text('Result: ' + this.result, game.world.width-550, 128);
	console.log(this.pickedBoxes);

	for(var key in this.boxArr){
		var arr = this.boxArr[key];
		console.log(arr[0].name);
		for(var i = 0; i < arr.length; i++){
			if(arr[i].inputEnabled){
				arr[i].death(arr[i]);
			} else {
				arr[i].SPEED = 0;
				arr[i].TURN_RATE = 0;
				arr[i].angle = 0;
			}
		}
	}

	this.status = 'end';
	this.timer.stop();

	for(var i = 1; i <= this.pickedBoxes.length; i++){
		var x;
		var y;

		if(i == 1){
			if(this.result[i-1] == 'red'){
				this.pickedBoxes[i-1].tint = 0xff0000;
			}else if(this.result[i-1] == 'grey'){
				this.pickedBoxes[i-1].tint = 0x9C9C9C;
			}
			x = game.world.width * (4.3/7)+40;
			y = this.pickedBoxes[i-1].height*2;

			this.pickedBoxes[i-1].x = x;
			this.pickedBoxes[i-1].y = y;
		}else{
			if(this.result[i-1] == 'red'){
				this.pickedBoxes[i-1].tint = 0xff0000;
			}else if(this.result[i-1] == 'grey'){
				this.pickedBoxes[i-1].tint = 0x9C9C9C;
			}
			x = game.world.width * (4.3/7)+40;
			y = this.pickedBoxes[i-2].y + this.pickedBoxes[i-2].height + this.pickedBoxes[i-1].height;

			this.pickedBoxes[i-1].x = x;
			this.pickedBoxes[i-1].y = y;
		}
		this.pickedBoxes[i-1].newDest = [x,y];
		console.log(this.pickedBoxes[i-1].name + ' ' + this.pickedBoxes[i-1].x + ' ' + this.pickedBoxes[i-1].y);
	}
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
			this.greyBoxes++;
			console.log(true);
		}
	}
	if(box.GOOD == false){
		this.result.push("red");
		this.redBoxes++;
	}else if(box.GOOD == true && box.VETTED == false){
		this.result.push("grey");
		this.greyBoxes++;
	}
	this.pickedBoxes.push(box);
};
