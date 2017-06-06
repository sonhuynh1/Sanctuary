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

		this.redBoxes = 0;
		this.greyBoxes = 0;
		this.monthlyGrade = [];

	    this.status = 'running';
	    this.startLevel(this);
	}
}

Quota.prototype.startLevel = function() {
	console.log('starting level');

    // create boxes
    this.createBox(this);

	// create a quota goal and vetted list
	this.createGoalnTime(this);

    //  start the timer running - this is important!
    if(this.level > 1){
		this.timer.loop(1000 * this.quota, this.endLevel, this);
		this.timer.start();
	}

	this.gate = game.add.sprite(game.world.width * (4/7),0,'gate');
	this.gate.width = 80;
	this.gate.height = game.world.height;
};
Quota.prototype.endLevel = function() {
	console.log('ending level');

	// add empty to list of result
	while(this.result.length < this.quota){
		this.result.push("empty");
		this.redBoxes++;
	}

	// show the results for debugging
	game.debug.text('Result: ' + this.result, game.world.width-550, 128);

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
	this.quota = this.level;
	var vettedQuantity = this.vettedCount;
	this.vetted.length = vettedQuantity;

	// go through the list to pick a list of vetted
	while(vettedQuantity >= 0) {
		var random = game.rnd.between(1,90);

		// if the random number is a box in boxArr
		if(this.boxArr[random]){
			var arr = this.boxArr[random];
			console.log("arr " + arr[0].id);
			// var random1 = game.rnd.between(0, arr.length-1);
			// console.log("random1 "  + random1);
			this.vetted[vettedQuantity] = arr[0].id;
			arr[0].VETTED = true;
			arr.splice(0,1);

			if(arr.length == 0){
				delete this.boxArr[random];
			}

			vettedQuantity--;
		}
	}
	console.log(this.vetted);
};
Quota.prototype.createBox = function() {
	// make boxes and add them into group
	for(var i = 0; i < this.boxCount; i++) {
		var box = new Box(this.game);
		console.log(box.id);
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