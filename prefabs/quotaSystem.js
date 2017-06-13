// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  create our Timer
    this.timer = game.time.create(false);

    // custom variables for construct
    this.quota = 0;
		this.quotaQuotient = .5;
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
	this.paper.alpha = 0;

	//music variables
	this.idealMusic = this.game.add.audio('gymnopedie');
	this.idealMusic.loop = true;
	this.talking = this.game.add.audio('crowdWhiteNoiseLooped');
	this.talking.loop = true;
	this.reportDing = this.game.add.audio('ding3');
	this.terrorMusic = this.game.add.audio('terror');
	this.tick = this.game.add.audio('tick');
	this.tick.loop = true;

	//check if faded out
	this.faded = false;

	//End game counter
	this.endCounter = 0;

	//picked indexes
	this.indexes = [];

	// set up quotaSystem to start game
    this.status = 'b4begin';
    this.endFade(this);
};
Quota.prototype = Object.create(Phaser.Text.prototype);
Quota.constructor = Quota;
Quota.prototype.update = function(){
	// debugging text to show timer and quota
	if(this.status == 'running') {
		if(this.level <= 2) {
			this.timerText.text = 'Time: ∞';
		} else {
			this.timerText.text = 'Time: ' + Math.ceil(this.timer.duration.toFixed(0)/1000);
			if(Math.ceil(this.timer.duration.toFixed(0)/1000) == 10){
				this.tick.play();
				this.talking.volume = .1;
				this.tick.volume = 1;
			}
		}
	} else {
		if(this.scaleResultIncrement[0] < this.scaledResult[0]){
			this.scaleResultIncrement[0] += Math.ceil(this.game.rnd.frac()*this.scaledResult[0]/200);
			this.scaleNeutralText.text = this.scaleResultIncrement[0] + " Law abiding";
			if(this.scaleResultIncrement[0] >= this.scaledResult[0]){
				this.scaleBadText.x = this.scaleNeutralText.x + this.scaleNeutralText.width + 32;
			}
		} else if(this.scaleResultIncrement[1] < this.scaledResult[1]){
			this.scaleResultIncrement[1] += Math.ceil(this.game.rnd.frac()*this.scaledResult[1]/200);
			this.scaleBadText.text = this.scaleResultIncrement[1] + " Unsustainable";
		} else if(this.scaleResultIncrement[2] < this.scaledResult[2]){
			this.scaleResultIncrement[2] += Math.ceil(this.game.rnd.frac()*this.scaledResult[2]/200);
		} else if(this.scaleResultIncrement[3] < this.scaledResult[3]){
			this.scaleResultIncrement[3] += Math.ceil(this.game.rnd.frac()*this.scaledResult[3]/200);
		}
	}
	// end game if all boxes are selected
	if(this.boxCount == this.pickedBoxes.length && this.status != 'end'){
		this.endLevel(this);
	}

	if(this.pickedBoxes.length > 0 && this.pickedBoxes[this.pickedBoxes.length-1].VETTED == true){
		var vet = "Vetted: "
		var size = 0;
		if(this.vetted.length > 10){
			size = 10;
		}else{
			size = this.vetted.length;
		}
		for (var i = 0; i < size; i++) {
				if(this.pickedBoxes[this.pickedBoxes.length-1].id == this.vetted[i]){
					vet +="";
					this.indexes.push(i);
				}
				if(this.indexes.indexOf(i) == -1){
					vet += this.vetted[i] + "\n";
				}
		}
		this.vettedText.text = vet;
	}
};

// function to reset all the variables and boxes from one level to another
function reset() {
	console.log('click');
	if(this.status == 'end' && this.faded) {
		for(var i = 0; i < this.pickedBoxes.length; i++){
			this.pickedBoxes[i].death(this.pickedBoxes[i]);
		}

		this.level++;

		// reset all relevant variables
		if(this.level > 1) {
			// clear top portion of report
			this.quotaText2.destroy();
			this.totalText.destroy();
			this.neutralText.destroy();
			this.badText.destroy();

			// clear bottom portion of report
			this.scaleQuotaText.destroy();
			this.scaleNeutralText.destroy();
			this.scaleBadText.destroy();
		}

		if(this.level == 3){
			this.talking.mute = true;
			this.terrorMusic.volume = 0.5;
			this.terrorMusic.play();
			// this.terrorMusic.stop();
			if(this.level == 2) {
				this.boxCount = 10;
				this.vettedCount = this.boxCount;
			} else if (this.level > 2) {
				this.boxCount *= 2;
				this.vettedCount = this.boxCount * this.quotaQuotient;
			}
			this.indexes = [];
			this.result = []; // grey, red, empty
			this.pickedBoxes = [];
			this.vetted = [];
			this.boxArr = {};
			this.scaleResultIncrement = [0,0,0,0];
	    	this.scaledResult = [0,0,0]; // grey, red, empty

			this.redBoxes = 0;
			this.greyBoxes = 0;
			this.monthlyGrade = [];
			// if(this.faded == true){
  			this.status = 'b4begin';
  			this.endFade(this);
			// }
		}else{
			if(this.level == 2) {
				this.boxCount = 10;
				this.vettedCount = this.boxCount;
			}else if(this.level >= 9){
				this.boxCount *= 1.25;//40, 80, 160, 320, 640, 1280, 2560,
				this.vettedCount = this.quota * .4;
			}else if (this.level > 2) {
				this.boxCount *= 2;//40, 80, 160, 320, 640, 1280, 2560,
				this.vettedCount = this.quota * .4;
			}
			this.indexes = [];
			this.result = []; // grey, red, empty
			this.pickedBoxes = [];
			this.vetted = [];
			this.boxArr = {};
			this.scaleResultIncrement = [0,0,0,0];
	    	this.scaledResult = [0,0,0]; // grey, red, empty

			this.redBoxes = 0;
			this.greyBoxes = 0;
			this.monthlyGrade = [];

		    this.status = 'b4begin';
  			this.endFade(this);
		}
	}else if(this.status == 'begin') {
		if(this.level == 3 && !this.terrorMusic.isPlaying){
			console.log('TerrorMusic isPlaying: ' + this.terrorMusic.isPlaying);
			this.quote.destroy();
			this.status = 'running';
			this.startLevel(this);
		} else if (this.level != 3) {
			this.quote.destroy();
			this.status = 'running';
			this.startLevel(this);
		}
	}
}

Quota.prototype.startLevel = function() {
	console.log('starting level ' + this.level + ' and boxCount is ' + this.boxCount);

	// scale increase by factor;
	this.scaleBy = Math.ceil(1000000 / this.boxCount);
	console.log('scaleBy ' + this.scaleBy);

    // create boxes
    this.createBox(this);

	// create a quota goal and vetted list
	this.createGoalnTime(this);

	this.paper.alpha = 1;

	if(this.level == 1){
		this.idealMusic.play();
		this.talking.play();
		this.talking.volume = .1;
	}else if(this.level >= 3){
		game.stage.backgroundColor = 0x8C7B6C;
		this.talking.mute = false;
		this.talking.volume = .4;
	}

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
	var size = 0;
	if(this.vetted.length > 10){
		size = 10;
	}else{
		size = this.vetted.length;
	}
	for (var i = 0; i < size; i++) {
			if(i == 0){
				vet +=  this.vetted[i] + "\n";
			}else{
				vet += this.vetted[i] + "\n";
			}
	}
	this.vettedText.text = vet;

    //  start the timer running - this is important!
    if(this.level > 2 && this.level <= 5){
			this.timer.loop((8000 * this.boxCount)/this.level, this.endLevel, this);
			this.timer.start();
		}else if(this.level > 5 && this.level <= 8){
			this.timer.loop((2250 * this.boxCount)/this.level, this.endLevel, this);
			this.timer.start();
		}else if(this.level > 8 && this.level < 12){
			this.timer.loop((1050 * this.boxCount)/this.level, this.endLevel, this);
			this.timer.start();
		}

	this.gate = game.add.sprite(game.world.width * (5/7),0,'gate');
	this.gate.width = 80;
	this.gate.height = game.world.height;
};
Quota.prototype.endLevel = function() {
	console.log('ending level');

	if(this.status != 'end'){
		if(this.level == 2){
			// this.idealMusic.stop();
		}else{
			this.reportDing.play();
		}
		this.timer.destroy();

		this.tick.stop();
		this.endFade(this);
		this.gate.destroy();
		this.paper.alpha = 0;
		this.monthText.destroy();
		this.timerText.destroy();
		this.quotaText.destroy();
		this.vettedText.destroy();
		hoverData.removeText();


		// top portion of report
		this.quotaText2 = game.add.text(32, 32, "Asylym Seekers: " + this.boxCount + "   Quota: " + this.quota);
		this.totalText = game.add.text(32, this.quotaText2.y + 32, "Persons picked: " + this.pickedBoxes.length);
		this.neutralText = game.add.text(32, this.totalText.y + 32, this.greyBoxes + " Law abiding");
		this.badText = game.add.text(this.neutralText.x + this.neutralText.width + 32, this.neutralText.y, this.redBoxes + " Unsustainable");

		// bottom portion of report
		this.scaleQuotaText = game.add.text(this.quotaText2.x, this.badText.y + 64, "Asylym Seekers: 1 million+");
		this.scaleNeutralText = game.add.text(this.scaleQuotaText.x, this.scaleQuotaText.y + 32, "");
		this.scaleBadText = game.add.text(this.scaleNeutralText.x + this.scaleNeutralText.width + 32, this.scaleNeutralText.y, "");

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
				this.endCounter++;

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
	}
	// if(this.endCounter > 10){
	// 	this.game.state.start('end');
	// }
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
		var ran = game.rnd.between(0,5);
		if(ran == 0){
			box.GOOD = true;
		}else{
			box.GOOD = false;
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
	this.faded = false;
	this.fadeScreen = game.time.create(false);

	this.fade = game.add.sprite(0, 0, 'black');
	this.fade.anchor.setTo(0.5, 0.5);
	this.fade.alpha = 1;
	this.fade.scale.setTo(10, 10);

	// var quote = game.add.text(game.world.centerX, game.world.centerY, '\"People are blind to reality and\nonly see what they want to see\"\n-Anonymous',
	// 	{font:"20pt",fill:"#AAAEAE",stroke:"#000000",strokeThickness:0});
	// quote.font = 'Black Ops One';
	// quote.anchor.setTo(0.5);

	if(this.level == 3){
		console.log('fade in level 2');
		this.idealMusic.stop();
		game.add.tween(this.fade).to( { alpha: 0 }, 1000, "Linear", true, 1000);
		this.fadeScreen.add(Phaser.Timer.SECOND *2, this.removeFade, this);
	}else if(this.status == 'b4begin'){
		console.log('fade in begin');
		if(this.level == 1){
			// opening images for level 1
			if(!this.opCount){
				this.opCount = 1;
			}else{
				this.opCount++;
			}
			this.fade.destroy();
			switch(this.opCount){
				case 1:
					this.fade = game.add.sprite(0, 0, 'op1');
					break;
				case 2:
					this.fade = game.add.sprite(0, 0, 'op11');
					break;
				case 3:
					this.fade = game.add.sprite(0, 0, 'op111');
					break;
			}
			this.fade.anchor.setTo(0, 0);
			this.fade.alpha = 1;
			this.fade.width = game.world.width;
			this.fade.height = game.world.height;
			game.add.tween(this.fade).to({alpha:0},250, "Linear", true, 3000);

			this.fadeScreen.add(Phaser.Timer.SECOND *3.25, this.removeFade, this);
		}else if(this.level == 3){
			// opening images for level 3
			this.opCount++;

			this.fade.destroy();
			this.fade = game.add.sprite(0, 0, 'op3');
			this.fade.anchor.setTo(0, 0);
			this.fade.alpha = 1;
			this.fade.width = game.world.width;
			this.fade.height = game.world.height;
			game.add.tween(this.fade).to({alpha:0},250, "Linear", true, 3000);

			this.fadeScreen.add(Phaser.Timer.SECOND *3.25, this.removeFade, this);
		}else if(this.level == 4){
			// opening images for level 4
			this.opCount++;

			this.fade.destroy();
			this.fade = game.add.sprite(0, 0, 'op4');
			this.fade.anchor.setTo(0, 0);
			this.fade.alpha = 1;
			this.fade.width = game.world.width;
			this.fade.height = game.world.height;
			game.add.tween(this.fade).to({alpha:0},250, "Linear", true, 3000);

			this.fadeScreen.add(Phaser.Timer.SECOND *3.25, this.removeFade, this);
		}else{
			game.add.tween(this.fade).to( { alpha: 0 }, 1000, "Linear", true, 1000);
			this.fadeScreen.add(Phaser.Timer.SECOND *2, this.removeFade, this);
		}
	}else{
		console.log('fade regular');
		game.add.tween(this.fade).to( { alpha: 0 }, 1000, "Linear", true, 1000);
		this.fadeScreen.add(Phaser.Timer.SECOND *2, this.removeFade, this);
	}
	this.fadeScreen.start();
};
Quota.prototype.removeFade = function() {
	this.faded = true;
	// game.time.events.remove(this.fadeScreen);
	this.fadeScreen.remove();
	console.log('level: ' + this.level);
	console.log(this.fadeScreen);
	// this.reportDing.stop();

	this.fade.destroy();

	if(this.status == 'b4begin'){
		if(this.level == 1){
			if(this.opCount != 3){
				this.endFade(this);
			}else{
				this.opCount = 0;
				this.status = 'begin';
			}
		}else{
			this.opCount = 0;
			this.status = 'begin';
		}

		if(this.opCount == 0){
			if(this.level == 1) {
				this.quote = game.add.text(game.world.centerX, game.world.centerY, '\nIn a utopia, we will have all the time in the world\nto help.\n\nClick the screen to continue.',
				{font:"20pt",fill:"#333013",stroke:"#000000",strokeThickness:0});
			}else if(this.level == 2) {
				this.quote = game.add.text(game.world.centerX, game.world.centerY, '\nIn a utopia, there\'s room for everyone.\n\nClick the screen to continue.',
				{font:"20pt",fill:"#333013",stroke:"#000000",strokeThickness:0});
			}else if(this.level == 3) {
				this.quote = game.add.text(game.world.centerX, game.world.centerY, '\nBut reality is different.\n\nClick the screen to continue.',
				{font:"20pt",fill:"#591f0b",stroke:"#000000",strokeThickness:0});
			}else{
				this.quote = game.add.text(game.world.centerX, game.world.centerY, 'Click the screen to continue.',
				{font:"20pt",fill:"#591f0b",stroke:"#000000",strokeThickness:0});
			}
			this.quote.font = 'Black Ops One';
			this.quote.anchor.setTo(0.5);
		}
	}

	console.log('removing fade');
};
