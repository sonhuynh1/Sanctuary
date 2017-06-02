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
		// menu text(s)
		//var menuBackground = game.add.tileSprite(0, 0, 800, 400, 'background');// background for title state
		// title for game
		this.game.stage.backgroundColor = 0x3D3325;
		var instruction = game.add.text(game.world.centerX -110, game.world.centerY-200, 'Sanctuary',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#000000",strokeThickness:6});
	},

	create:function(){
		console.log('menu');
		// allow for mouse input
		this.game.input.mouse.capture = true;

		//add song
		menuSong = this.game.add.audio('gymnopedie');
		menuSong.play('', 0, 0.5, true);

		//animation for square on screen
		for (var i = 0; i < 20; i++) {
		box = new menuBox(game);
		game.add.existing(box);// adding to Phaser display list
		}

		//if "Play Game" button is pressed
		this.createButton(game, "Play Game", game.world.centerX -230, game.world.centerY -70, 220, 100, 
			function(){

				menuSong.stop();
				//menuSong.onDecoded.add(this.songOut, this);

				talking = this.game.add.audio('crowdWhiteNoiseLooped');
				talking.onDecoded.add(this.songIn, this);
				
				timer = this.game.time.create(false);
				timer.add(Phaser.Timer.SECOND *14 , this.afterIntro, this);
				timer.start();

				timer2 = this.game.time.create(false);
				timer2.loop(Phaser.Timer.SECOND *5 , this.endTalk, this);
				timer2.start();

				ding3 = this.game.add.audio('ding3');
				fadeScreen = this.game.time.create(false);
				var fade = game.add.sprite(0, 0, 'black');
				fade.anchor.setTo(0.5, 0.5);
				fade.alpha = 0;
				fade.scale.setTo(10, 10);
				this.game.add.tween(fade).to( { alpha: 1 }, 3000, "Linear", true);
				fadeScreen.loop(Phaser.Timer.SECOND *6, this.blackScreen, this);
				fadeScreen.start();

				//frantic, this animation on screen for square
				//game fades to black and a quote from someone fades in
				//timer stops and play state is called

			});

		//if "Sound" button is pressed
		this.createButton(game, "Sound", game.world.centerX, game.world.centerY -70, 220, 100, 
			function(){
				this.game.state.start('sound')
			});

		//if "Credits" button is pressed
		this.createButton(game, "Credits", game.world.centerX +230, game.world.centerY -70, 220, 100, 
			function(){
				this.game.state.start('credits')
			});

		//for (var i = 0; i < 50; i++) {
		//box = new menuBox(game, 'box', 1, 1);
		//this.game.add.existing(box);// adding to Phaser display list
		//}
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
		talking.fadeOut(4000);
	},

	blackScreen:function(){
		var quote = game.add.text(game.world.centerX - 50, game.world.centerY - 100, 'Quote',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#000000",strokeThickness:6});
		ding3.play('', 0, 1, false);
		this.time.events.remove(this.fadeScreen);
	},

	createButton:function(game, string, x, y, w, h, callback){
		var button = game.add.button(x, y, 'buttons', callback, this)
		button.anchor.setTo(0.5, 0.5);
		button.width = w;
		button.height = h;

		var txt = game.add.text(button.x, button.y, string,
		{font:"30pt Courier",fill:"#19cb65", align:"center"});
		txt.anchor.setTo(0.5, 0.5);
	},
};