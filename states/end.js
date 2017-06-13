// end game
var endSong;

var endState = {
	create:function(){
		// menu text(s)
		//endSong = this.game.add.audio('agniratha');
		//endSong.play('', 0, 0.5, true);

		//var background = game.add.sprite(0, 0, 'background');// background for title state
    	//background.height = game.height;
    	//background.width = game.width;

    	game.stage.backgroundColor = 0x0000FF;

		var LawAbiding = game.add.text(game.world.centerX -250, game.world.centerY - 50,'Total Law Abiding: '+ this.blueBoxTotal,
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
<<<<<<< HEAD
		endGameStats.font = 'Black Ops One';

		var endGameStats2 = game.add.text(game.world.centerX -250, game.world.centerY - 80,'Total Non-law Abiding: '+ this.redBoxTotal,
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		endGameStats2.font = 'Black Ops One';
=======
		LawAbiding.font = 'Black Ops One';

		var NonLawAbiding = game.add.text(game.world.centerX -250, game.world.centerY - 80,'Total Non-law Abiding: '+ this.redBoxTotal,
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		NonLawAbiding.font = 'Black Ops One';
>>>>>>> origin/Ending

		var gameOver = game.add.text(game.world.centerX, game.world.centerY,'Game Over\n\nWe live in the age of the refugee, the age of the exile.\n-Ariel Dorfman\n\nClick screen to restart game.',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		gameOver.font = 'Black Ops One';

		this.createButton(game, "Credits", game.world.centerX, game.world.centerY - 150, 360, 100,
			function(){
				this.game.state.start('credits');
			});

<<<<<<< HEAD
		this.createButton(game, "Restart", game.world.centerX -100, game.world.centerY - 130, 360, 100, 
			function(){
				this.game.state.start('menu');
			});
=======
		game.input.onDown.add(this.restart, this);
>>>>>>> origin/Ending
	},

	update:function(){
		// if LMB is clicked, then start game
		//if(game.input.activePointer.leftButton.isDown){
		//	game.state.start('play');
		//}
	},

	createButton:function(game, string, x, y, w, h, callback){
		var button = game.add.button(x, y, 'buttons', callback, this, 2, 1, 0)
		button.anchor.setTo(0.5, 0.5);
		button.width = w;
		button.height = h;

		var txt = game.add.text(button.x, button.y, string,
		{font:"30pt",fill:"#19cb65", align:"center"});
		txt.font = 'Black Ops One';
		txt.anchor.setTo(0.5, 0.5);
	},

	restart:function(){
	this.game.state.start('menu');
	},
};
