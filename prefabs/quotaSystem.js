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
    this.createGoal(this);

    // create boxes
    this.createBox(this);

    //  Start the timer running - this is important!
    this.timer.start();
};
Quota.prototype.endLevel = function() {
	console.log('ending level');
};
Quota.prototype.createGoal = function() {
	console.log('creating goal');
	this.quota = this.level * 5;
};
Quota.prototype.createBox = function() {
	// make boxes and add them into group
	for(var i = 0; i < 50; i++) {
		var box = new Box(this.game);
		box.name = i;
		boxes.add(box);
		this.game.add.existing(box);
	}
};