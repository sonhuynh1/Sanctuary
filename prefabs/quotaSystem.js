// quota system
var Quota = function(game){
	//  Create our Timer
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(2000, updateCounter, this);

    //  Start the timer running - this is important!
    timer.start();
};
Quota.constructor = Quota;
Quota.prototype.pause = function() {
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
Quota.prototype.render = function() {
    game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
};