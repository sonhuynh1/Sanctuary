// interactive menu for players to start the game
var menuSong;
var ding3;
var fadeScreen;
var timer;
var timer2;
var boxSpawn;
var box;
var talking;

var menuState = {
	preload:function(){

	},

	create:function(){
		console.log('menu');
		// allow for mouse input
		//menuSong.onDecoded.add(this.songOut, this);
		timer = this.game.time.create(false);
		timer.add(Phaser.Timer.SECOND *5 , this.afterIntro, this);
		timer.start();

		timer2 = this.game.time.create(false);
		timer2.loop(Phaser.Timer.SECOND *5 , this.endTalk, this);
		timer2.start();

		fadeScreen = this.game.time.create(false);
		var fade = game.add.sprite(0, 0, 'black');
		fade.anchor.setTo(0.5, 0.5);
		fade.alpha = 0;
		fade.scale.setTo(10, 10);
		this.game.add.tween(fade).to( { alpha: 1 }, 2000, "Linear", true);
		fadeScreen.loop(Phaser.Timer.SECOND *2, this.blackScreen, this);
		fadeScreen.start();

		talking = this.game.add.audio('crowdWhiteNoiseLooped');
		talking.play();
		talking.mute = false;
	// call menu state
	},

	update:function(){
		// if LMB is clicked, then start game
		//if(game.input.activePointer.leftButton.isDown){
		//	game.state.start('play');
		//}
	},

	songOut:function(){

	},

	songIn:function(){

	},

	afterIntro:function(){
		this.time.events.remove(this.timer);
		this.game.state.start('play');
	},

	endTalk:function(){
		talking.stop();
		this.time.events.remove(this.timer2);
	},

	blackScreen:function(){
		var title = game.add.text(game.world.centerX, 150, 'Sanctuary',
			{font:"130pt",fill:"#A08978",stroke:"#000000"});
			title.font = 'Black Ops One';
			title.anchor.setTo(0.5);
		var quote = game.add.text(game.world.centerX, game.world.centerY, '\"People are blind to reality and\nonly see what they want to see\"\n-Anonymous',
			{font:"20pt",fill:"#AAAEAE"});
		quote.font = 'Black Ops One';
		quote.anchor.setTo(0.5);
		this.time.events.remove(this.fadeScreen);
	},

};
