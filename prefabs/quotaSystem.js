// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  Create our Timer
    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    this.timer.loop(99000, this.endLevel, this);

    // custom variables for construct
    this.quota = 0;
    this.level = 1;
    this.result = []; // grey, red, empty
    this.vetted = [];
    this.boxArr = {};

    console.log('end of quota create');
    this.startLevel(this);
};
Quota.prototype = Object.create(Phaser.Text.prototype);
Quota.constructor = Quota;
Quota.prototype.update = function() {
	// debugging text to show timer and quota
	game.debug.text('Time until event: ' + Math.ceil(this.timer.duration.toFixed(0)/1000), 32, 32);
	game.debug.text('Quota: ' + this.quota, 32, 64);
};
Quota.prototype.startLevel = function() {
	console.log('starting level');

    // create a quota goal
    this.createGoalnTime(this);

    // create boxes
    this.createBox(this);

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

	this.timer.stop();
};
Quota.prototype.createGoalnTime = function() {
	console.log('creating goal');
	this.quota = this.level * game.rnd.between(2,5);

	var vettedQuantity = this.quota / game.rnd.between(.1,.5);
	//while(vettedQuantity != 0) {
		/*
		create a random number while the age range of 1-100
		check if there exists a box with that age
		if there exists then add it to the vetted array and decrement vettedQuantity
		if not then generate another number
		*/

	//}
};
Quota.prototype.createBox = function() {
	// make boxes and add them into group
	for(var i = 0; i < 50; i++) {
		var box = new Box(this.game);
		boxes.add(box);
		console.log(box.name);
		if(this.boxArr[box.name]) {
			this.boxArr[box.name].push(box);
		} else {
			this.boxArr[box.name] = [];
			this.boxArr[box.name].push(box);
		}
		this.game.add.existing(box);
	}
};