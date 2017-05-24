// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  Create our Timer
    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    this.timer.loop(33000, this.endLevel, this);

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
	
	this.report = game.add.sprite(0,0,'box');
	this.report.tint = (128,128,128);
	this.report.width = game.world.width;
	this.report.height = game.world.height;

	this.status = 'end';
	this.timer.stop();
};
Quota.prototype.createGoalnTime = function() {
	console.log('creating goal');
	this.quota = this.level * game.rnd.between(5,10);

	var ran = game.rnd.realInRange(.5,1);
	var vettedQuantity = Math.ceil(this.quota * ran);

	console.log('Vetted Quant: ' + vettedQuantity + ': ' + this.quota + '*' + ran);
	while(vettedQuantity >= 0) {
		/*
		create a random number while the age range of 1-100
		check if there exists a box with that age
		if there exists then add it to the vetted array and decrement vettedQuantity
		if not then generate another number
		*/
		var random = game.rnd.between(1,100);
		if(this.boxArr[random]){
			console.log(random + ' exists');
			this.vetted.push(random);
			vettedQuantity--;
		}
		console.log(vettedQuantity);
	}
	console.log(this.vetted);
};
Quota.prototype.createBox = function() {
	// make boxes and add them into group
	for(var i = 0; i < 50; i++) {
		var box = new Box(this.game);
		boxes.add(box);
		if(this.boxArr[box.name]) {
			this.boxArr[box.name].push(box);
		} else {
			this.boxArr[box.name] = [];
			this.boxArr[box.name].push(box);
		}
		this.game.add.existing(box);
	}
	console.log(this.boxArr);
};
Quota.prototype.updateVetted = function(name) {
	// checks box against vetted
	console.log('updating vetted ' + name);
};