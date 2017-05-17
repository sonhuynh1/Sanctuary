// quota system
var Quota = function(game){
	Phaser.Text.call(this,game,
		0,0,'',
		{font:'20px Arial',fill:'#ff0044',align:'center'});

	//  Create our Timer
    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    this.timer.loop(2000, this.showText, this);

    //  Start the timer running - this is important!
    this.timer.start();
};
Quota.prototype = Object.create(Phaser.Text.prototype);
Quota.constructor = Quota;
Quota.prototype.update = function() {
	game.debug.text('Time until event: ' + this.timer.duration.toFixed(0), 32, 32);
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
Quota.prototype.showText = function() {
    //game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
};