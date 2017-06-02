// end game
var soundState = {
	create:function(){
		// menu text(s)
		var instruction = game.add.text(game.world.centerX - 150, 0,'Sound Options',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});

		this.createButton(game, "Mute Sound", game.world.centerX, game.world.centerY -100, 430, 100, 
			function(){
				this.game.sound.mute = true;
			});

		this.createButton(game, "Un-Mute Sound", game.world.centerX, game.world.centerY , 430, 100, 
			function(){
				this.game.sound.mute = false;
			});

		this.createButton(game, "Back to Main Menu", game.world.centerX, game.world.centerY +100, 430, 100, 
			function(){
				menuSong.stop();
				this.game.state.start('menu');
			});
	},

	update:function(){
		
	},

	createButton:function(game, string, x, y, w, h, callback){
		var button = game.add.button(x, y, 'buttons', callback, this, 2, 1, 0)
		button.anchor.setTo(0.5, 0.5);
		button.width = w;
		button.height = h;

		var txt = game.add.text(button.x, button.y, string,
		{font:"30pt Courier",fill:"#19cb65", align:"center"});
		txt.anchor.setTo(0.5, 0.5);
	},

};