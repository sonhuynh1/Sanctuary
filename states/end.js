// end game
var endSong;

var endState = {
	create:function(){
		// end text(s)

    	game.stage.backgroundColor = 0x0000FF;

		var LawAbiding = game.add.text(game.world.centerX -250, game.world.centerY - 50,'Total Law Abiding: '+ quotaSystem.goodCounter,
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});

		LawAbiding.font = 'Black Ops One';

		var NonLawAbiding = game.add.text(game.world.centerX -250, game.world.centerY - 80,'Total Non-law Abiding: '+ quotaSystem.endCounter,
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		NonLawAbiding.font = 'Black Ops One';

		var gameOver = game.add.text(game.world.centerX-250, game.world.centerY,'Game Over\n\nWe live in the age of the refugee,\n the age of the exile.\n-Ariel Dorfman',
			{font:"20pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		gameOver.font = 'Black Ops One';

		this.createButton(game, "Credits", game.world.centerX+300, game.world.centerY - 150, 360, 100,
			function(){
				this.game.state.start('credits');
			});

		this.createButton(game, "Restart", game.world.centerX-150, game.world.centerY - 150, 360, 100,
			function(){
				this.game.state.start('menu');
			});
	},

	update:function(){
	},

	//creates buttons 
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
