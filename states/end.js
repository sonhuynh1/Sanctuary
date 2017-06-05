// end game
var endSong;

var endState = {
	create:function(){
		// menu text(s)
		endSong = this.game.add.audio('agniratha');
		endSong.play('', 0, 0.5, true);

		var background = game.add.sprite(0, 0, 'background');// background for title state
    	background.height = game.height;
    	background.width = game.width;

		var gameOver = game.add.text(game.world.centerX -250, game.world.centerY - 50,'Game Over',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		gameOver.font = 'Days One';

		this.createButton(game, "Play Again?", game.world.centerX, game.world.centerY - 150, 360, 100, 
			function(){
				endSong.stop();
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
		txt.font = 'Days One';
		txt.anchor.setTo(0.5, 0.5);
	},

};