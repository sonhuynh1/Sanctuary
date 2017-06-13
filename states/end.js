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

		var LawAbiding = game.add.text(game.world.centerX -700, game.world.centerY - 350,'Total Law Abiding: '+ tempB,
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		LawAbiding.font = 'Black Ops One';

		var NonLawAbiding = game.add.text(game.world.centerX -700, game.world.centerY - 300,'Total Non-law Abiding: '+ tempR,
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		NonLawAbiding.font = 'Black Ops One';

		var gameOver = game.add.text(game.world.centerX -500, game.world.centerY -200,'                                        Game Over\n\n\n\nWe live in the age of the refugee, the age of the exile.\n-Ariel Dorfman',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		gameOver.font = 'Black Ops One';

		this.createButton(game, "Credits", game.world.centerX +200, game.world.centerY +300, 200, 100,
			function(){
				this.game.state.start('credits');
			});

		this.createButton(game, "Restart", game.world.centerX -100, game.world.centerY +300, 200, 100, 
			function(){
				tempB = 0;
				tempR = 0;
				this.game.state.start('menu');
			});
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
