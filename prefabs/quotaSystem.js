// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  create our Timer
    this.timer = game.time.create(false);

    // custom variables for construct
    this.quota = 0;
		this.quotaQuotient = 0.5;
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
		// game.input.mouse.mouseWheelCallback = mouseWheel;
		game.input.onDown.add(reset, this);

		//paper
		this.paper = game.add.sprite(game.world.width * (5.35/7), 0, 'paper');// background for title state
		this.paper.height = game.world.height;
		this.paper.width = game.world.width - (game.world.width * (4.35/7));

		// set up quotaSystem to start game
    this.status = 'running';
    this.startLevel(this);
};
Quota.prototype = Object.create(Phaser.Text.prototype);
Quota.constructor = Quota;
Quota.prototype.update = function(){
	// debugging text to show timer and quota
	if(this.level < 3) {
		this.timerText.text = 'Time: ∞';
	} else {
		this.timerText.text = 'Time: ' + Math.ceil(this.timer.duration.toFixed(0)/1000);
	}
	// end game if all boxes are selected
	if(this.boxCount == this.pickedBoxes.length && this.status != 'end'){
		this.endLevel(this);
	}
};

// function to scroll the list of boxes at the end of a level
// function mouseWheel(event) {
// 	if(quotaSystem.status == 'end'){
// 		// scroll down
// 		if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP &&
// 			((quotaSystem.pickedBoxes[quotaSystem.pickedBoxes.length-1].y) > (game.world.height - quotaSystem.pickedBoxes[quotaSystem.pickedBoxes.length-1].height))) {
// 			for(var i = 1; i <= quotaSystem.pickedBoxes.length; i++){
// 				quotaSystem.pickedBoxes[i-1].y -= 15;
// 			}
// 		}
// 		// scroll up
// 		else if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN &&
// 			((quotaSystem.pickedBoxes[0].y) < (quotaSystem.pickedBoxes[0].height))) {
// 			for(var i = 1; i <= quotaSystem.pickedBoxes.length; i++){
// 				quotaSystem.pickedBoxes[i-1].y += 15;
// 			}
// 		}
// 	}
// }
// function to reset all the variables and boxes from one level to another
function reset() {
	console.log('click');
	if(this.status == 'end') {
		for(var i = 0; i < this.pickedBoxes.length; i++){
			this.pickedBoxes[i].death(this.pickedBoxes[i]);
		}

		this.level++;
		if(this.level == 2) {
			this.boxCount = 25;
			this.vettedCount = this.boxCount;
		} else if (this.level > 3) {
			this.boxCount *= 2;
			this.vettedCount = this.boxCount * this.quotaQuotient;
		}
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

		this.paper.alpha = 1;

		//month text
		this.monthText = game.add.text(game.world.width-250, 32,'Month: ' + this.level);
		this.monthText.font = 'Patrick Hand SC';

		//timer text
		this.timerText = game.add.text(game.world.width-250, 64,'Time: ' + Math.ceil(this.timer.duration.toFixed(0)/1000));
		this.timerText.font = 'Patrick Hand SC';

		//Quota text
		this.quotaText = game.add.text(game.world.width-250, 96, 'Quota: ' + this.quota);
		this.quotaText.font = 'Patrick Hand SC';

		//Vetted text
		this.vettedText = game.add.text(game.world.width-250, 192, 'Vetted: ');
		this.vettedText.font = 'Patrick Hand SC';

		var vet = "Vetted: "
		for (var i = 0; i < this.vetted.length; i++) {
				if(i == 0){
					vet +=  this.vetted[i] + "\n";
				}else{
					vet += "														" + this.vetted[i] + "\n";
				}
		}
		this.vettedText.text = vet;
    //  start the timer running - this is important!
    if(this.level > 2){
			this.timer.loop(2250 * this.boxCount, this.endLevel, this);
			this.timer.start();
		}

		this.gate = game.add.sprite(game.world.width * (5/7),0,'gate');
		this.gate.width = 80;
		this.gate.height = game.world.height;
};
Quota.prototype.endLevel = function() {
	console.log('ending level');

	this.endFade(this);
	this.gate.destroy();
	this.paper.alpha = 0;
	this.monthText.destroy();
	this.timerText.destroy();
	this.quotaText.destroy();
	this.vettedText.destroy();
	hoverData.removeText();

	// this.monthlyGrade[0] = (this.redBoxes - this.greyBoxes) / this.quota;
	this.quotaText2 = game.add.text(game.world.centerX, game.world.centerY+150, "Quota: " + this.quota);
	this.totalSquaresText = game.add.text(game.world.centerX, game.world.centerY-150, "Total amount of picked squared: " + this.pickedBoxes.length);
	this.badSquaresText = game.add.text(game.world.centerX+150, game.world.centerY, "Bad squares: " + this.redBoxes);
	this.neutralSquaresText = game.add.text(game.world.centerX-150, game.world.centerY, "Neutral squares: " + this.greyBoxes);


	// add empty to list of result
	while(this.result.length < this.quota){
		this.result.push("empty");
		this.redBoxes++;
	}

	// move pickedBoxes into place
	for(var i = 0; i < this.pickedBoxes.length; i++){
		var x;
		var y;

		var xMargin = game.world.width/8;
		var yMargin = game.world.height/8;
		if(this.result[i] == 'red'){
			this.pickedBoxes[i].tint = 0xff0000;

			// keep red squares at lower right corner
			x = game.rnd.between(game.world.width/2 + xMargin, game.world.width - xMargin);
			y = game.rnd.between(game.world.height/2 + yMargin, game.world.height - yMargin);
		} else if(this.result[i] == 'grey'){
			this.pickedBoxes[i].tint = 0x9C9C9C;

			// keep grey squares at upper right corner
			x = game.rnd.between(game.world.width/2 + xMargin, game.world.width - xMargin);
			y = game.rnd.between(yMargin, game.world.height/2 - yMargin);
		}
		this.pickedBoxes[i].x = x;
		this.pickedBoxes[i].y = y;
		this.pickedBoxes[i].newDest = [x,y];

		// if(i == 1){
		// 	if(this.result[i-1] == 'red'){
		// 		this.pickedBoxes[i-1].tint = 0xff0000;
		// 	}else if(this.result[i-1] == 'grey'){
		// 		this.pickedBoxes[i-1].tint = 0x9C9C9C;
		// 	}
		// 	x = game.world.width * (4.3/7)+40;
		// 	y = this.pickedBoxes[i-1].height*2;

		// 	this.pickedBoxes[i-1].x = x;
		// 	this.pickedBoxes[i-1].y = y;
		// }else{
		// 	if(this.result[i-1] == 'red'){
		// 		this.pickedBoxes[i-1].tint = 0xff0000;
		// 	}else if(this.result[i-1] == 'grey'){
		// 		this.pickedBoxes[i-1].tint = 0x9C9C9C;
		// 	}
		// 	x = game.world.width * (4.3/7)+40;
		// 	y = this.pickedBoxes[i-2].y + this.pickedBoxes[i-2].height + this.pickedBoxes[i-1].height;

		// 	this.pickedBoxes[i-1].x = x;
		// 	this.pickedBoxes[i-1].y = y;
		// }
		// this.pickedBoxes[i-1].newDest = [x,y];
	}

	// scale report
	for(var i = 0; i < this.result.length; i++){
		if(this.result[i] == 'grey') this.scaleResultIncrement[0]++;
		else if(this.result[i] == 'red') this.scaleResultIncrement[1]++;
		else if(this.result[i] == 'empty') this.scaleResultIncrement[2]++;
	}
	this.scaleResultIncrement[3] = this.quota;
	this.result = [];
	for(var i = 0; i < this.scaledResult.length; i++){
		this.result[i] = this.scaleResultIncrement[i];
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
};

Quota.prototype.createGoalnTime = function() {
	console.log('creating goal');

	// set quota and length of vetted array
	if(this.level < 3){
		this.quota = this.boxCount;
	} else {
		this.quota = Math.floor(this.boxCount * this.quotaQuotient);
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
Quota.prototype.endFade = function() {
	this.fadeScreen = game.time.create(false);

	this.fade = game.add.sprite(0, 0, 'black');
	this.fade.anchor.setTo(0.5, 0.5);
	this.fade.alpha = 1;
	this.fade.scale.setTo(10, 10);

	game.add.tween(this.fade).to( { alpha: 0 }, 4000, "Linear", true, 2000);
	this.fadeScreen.loop(Phaser.Timer.SECOND *6, this.removeFade, this);
	this.fadeScreen.start();
};
Quota.prototype.removeFade = function() {
	game.time.events.remove(this.fadeScreen);
	this.fade.destroy();

	console.log('removing fade');
};
