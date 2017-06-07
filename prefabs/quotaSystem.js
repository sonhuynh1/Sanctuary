// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  create our Timer
    this.timer = game.time.create(false);

    // custom variables for construct
    this.quota = 0;
    this.level = 1;

    // total boxes
    this.boxCount = 5;
    this.boxArr = {};

    // boxes chosen
	this.pickedBoxes = [];

	// the array of guaranteed safe boxes
    this.vettedCount = 5;
    this.vetted = [];

    this.result = []; // grey, red, empty
    this.scaleBy = 0;
    this.scaleResultIncrement = [0,0,0,0];
    this.scaledResult = [0,0,0,0]; // grey, red, empty, quota

    // tracker variables for end report
	this.redBoxes = 0;
	this.greyBoxes = 0;
	this.monthlyGrade = [];

	// add custom inputs for mouse
	game.input.mouse.mouseWheelCallback = mouseWheel;
	game.input.onDown.add(reset, this);

	// set up quotaSystem to start game
    this.status = 'running';
    this.startLevel(this);
};
Quota.prototype = Object.create(Phaser.Text.prototype);
Quota.constructor = Quota;
Quota.prototype.update = function(){
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

		// show the results for debugging

		game.debug.text('Result: ' + this.result, game.world.width-450, game.world.height - 100);
		
		if(this.scaleResultIncrement[0] < this.scaledResult[0]){
			this.scaleResultIncrement[0] += Math.ceil(this.game.rnd.frac()*this.scaledResult[0]/200);
		} else if(this.scaleResultIncrement[1] < this.scaledResult[1]){
			this.scaleResultIncrement[1] += Math.ceil(this.game.rnd.frac()*this.scaledResult[1]/200);
		} else if(this.scaleResultIncrement[2] < this.scaledResult[2]){
			this.scaleResultIncrement[2] += Math.ceil(this.game.rnd.frac()*this.scaledResult[2]/200);
		} else if(this.scaleResultIncrement[3] < this.scaledResult[3]){
			this.scaleResultIncrement[3] += Math.ceil(this.game.rnd.frac()*this.scaledResult[3]/200);
		}

		game.debug.text('Result: ' + this.scaleResultIncrement, game.world.width-450, game.world.height - 50);

		if(this.monthlyGrade > .75){
			game.debug.text('Monthly Grade: Failed', game.world.width-450, 160);
		}else{
			game.debug.text('Monthly Grade: Pass', game.world.width-450, 160);
		}
	}

	// end game if all boxes are selected
	if(this.boxCount == this.pickedBoxes.length && this.status != 'end'){
		this.endLevel(this);
	}
};

// function to scroll the list of boxes at the end of a level
function mouseWheel(event) {
	if(quotaSystem.status == 'end'){
		// scroll down
		if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP &&
			((quotaSystem.pickedBoxes[quotaSystem.pickedBoxes.length-1].y) > (game.world.height - quotaSystem.pickedBoxes[quotaSystem.pickedBoxes.length-1].height))) {
			for(var i = 1; i <= quotaSystem.pickedBoxes.length; i++){
				quotaSystem.pickedBoxes[i-1].y -= 15
			}
		}
		// scroll up
		else if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN &&
			((quotaSystem.pickedBoxes[0].y) < (quotaSystem.pickedBoxes[0].height))) {
			for(var i = 1; i <= quotaSystem.pickedBoxes.length; i++){
				quotaSystem.pickedBoxes[i-1].y += 15
			}
		}
	}
}
// function to reset all the variables and boxes from one level to another
function reset() {
	console.log('click');
	if(this.status == 'end') {
		for(var i = 0; i < this.pickedBoxes.length; i++){
			this.pickedBoxes[i].death(this.pickedBoxes[i]);
		}

	    // this.quota = 0;
		this.level++;
		this.result = []; // grey, red, empty
		this.pickedBoxes = [];
		this.vetted = [];
		this.boxArr = {};
		this.scaleResultIncrement = [0,0,0,0];
    	this.scaledResult = [0,0,0]; // grey, red, empty

		this.redBoxes = 0;
		this.greyBoxes = 0;
		this.monthlyGrade = [];

	    this.status = 'running';
	    this.startLevel(this);
	}
}

Quota.prototype.startLevel = function() {
	console.log('starting level');

	// scale increase by factor;
	this.scaleBy = Math.ceil(1000000 / this.boxCount);
	console.log('scaleBy ' + this.scaleBy);

    // create boxes
    this.createBox(this);

	// create a quota goal and vetted list
	this.createGoalnTime(this);

    //  start the timer running - this is important!
    if(this.level > 1){
		this.timer.loop(1000 * this.quota, this.endLevel, this);
		this.timer.start();
	}

	// add gate to the side
	this.gate = game.add.sprite(game.world.width * (4/7),0,'gate');
	this.gate.width = 80;
	this.gate.height = game.world.height;
	this.gate.anchor.setTo(0.5,0.5);
	this.gate.y = game.world.height/2;
};
Quota.prototype.endLevel = function() {
	console.log('ending level');

	// add empty to list of result
	while(this.result.length < this.quota){
		this.result.push("empty");
		this.redBoxes++;
	}

	// scale report
	for(var i = 0; i < this.result.length; i++){
		if(this.result[i] == 'grey') this.scaleResultIncrement[0]++;
		else if(this.result[i] == 'red') this.scaleResultIncrement[1]++;
		else if(this.result[i] == 'empty') this.scaleResultIncrement[2]++;
	}
	this.scaleResultIncrement[3] = this.quota;
	this.result = this.scaleResultIncrement;
	for(var i = 0; i < this.scaledResult.length; i++){
		this.scaledResult[i] = this.scaleResultIncrement[i] * this.scaleBy;
	}
	console.log('scaleResultIncrement ' + this.scaleResultIncrement);
	console.log('scaledResult ' + this.scaledResult);

	// go through boxes and stop all clicked boxes and remove all else
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

	// stop time and set level to end
	this.status = 'end';
	this.timer.stop();

	// align pickedBoxes together for display
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
	}
};

Quota.prototype.createGoalnTime = function() {
	console.log('creating goal');

	// set quota and length of vetted array
	if(this.level < 3){
		this.quota = this.boxCount;

	}
	var vettedQuantity = this.vettedCount;

	// for loop to keep track of boxArr keys
	var keys = [];
	for(var key in this.boxArr){
		keys.push(key);
	}
	console.log("keys " + keys);

	// go through the list to pick a list of vetted
	while(vettedQuantity > 0) {
		var key = keys[game.rnd.between(0,keys.length)];

		// if the random number is a box in boxArr
		if(this.boxArr[key]){
			var arr = this.boxArr[key];
			var random1 = game.rnd.between(0, arr.length-1);
			if(!arr[random1].VETTED){
				arr[random1].VETTED = true;
				this.vetted.push(arr[random1].id);
				vettedQuantity--;
			}
		}
	}
	console.log(this.vetted);
};
Quota.prototype.createBox = function() {
	// make boxes and add them into group
	for(var i = 0; i < this.boxCount; i++) {
		var box = new Box(this.game);
		console.log(box.id);
		console.log(box.name);
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
	// console.log("CreateBox")
};
Quota.prototype.updateVetted = function(box) {
	// checks box against vetted
	for(i = 0; i <= this.vetted.length; i++){
		if(this.vetted[i] == box.id && box.VETTED == true){
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