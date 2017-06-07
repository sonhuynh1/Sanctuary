// interactive menu for players to start the game
var menuSong;
var talking;
var ding3;
var fadeScreen;
var timer;
var timer2;
var boxSpawn;
var box;

var menuState = {
	preload:function(){

	},

	create:function(){
		console.log('menu');
		// allow for mouse input
		//menuSong.onDecoded.add(this.songOut, this);
		timer = this.game.time.create(false);
		timer.add(Phaser.Timer.SECOND *1 , this.afterIntro, this);
		timer.start();

		timer2 = this.game.time.create(false);
		timer2.loop(Phaser.Timer.SECOND *1 , this.endTalk, this);
		timer2.start();

		fadeScreen = this.game.time.create(false);
		var fade = game.add.sprite(0, 0, 'black');
		fade.anchor.setTo(0.5, 0.5);
		fade.alpha = 0;
		fade.scale.setTo(10, 10);
		this.game.add.tween(fade).to( { alpha: 1 }, 3000, "Linear", true);
		fadeScreen.loop(Phaser.Timer.SECOND *6, this.blackScreen, this);
		fadeScreen.start();
	},

	update:function(){
		// if LMB is clicked, then start game
		//if(game.input.activePointer.leftButton.isDown){
		//	game.state.start('play');
		//}
	},

	songOut:function(){
		menuSong.fadeOut(5000);
	},

	songIn:function(){
		talking.fadeIn(5000);
		talking.volume = 0.5;
	},

	afterIntro:function(){
		this.time.events.remove(this.timer);
		this.game.state.start('play');
	},

	endTalk:function(){
		this.time.events.remove(this.timer2);
	},

	blackScreen:function(){
		var quote = game.add.text(game.world.centerX-450, game.world.centerY-100, '\"People are blind to reality and\nonly see what they want to see\"-Anonymous',
			{font:"30pt",fill:"#19cb65",stroke:"#000000",strokeThickness:6});
		quote.font = 'Black Ops One';
		this.time.events.remove(this.fadeScreen);
	},

};
