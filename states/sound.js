var soundState = {
	create:function(){
		// menu text(s)
		var background = game.add.sprite(0, 0, 'background');// background for title state
    	background.height = game.height;
    	background.width = game.width;

		var instruction = game.add.text(game.world.centerX - 150, game.world.centerY - 400,'Sound Options',
			{font:"30pt",fill:"#000000",stroke:"#ffffff",strokeThickness:2});
		instruction.font = 'Days One';

		this.createButton(game, "Mute Sound", game.world.centerX, game.world.centerY -100, 450, 100, 
			function(){
				this.game.sound.mute = true;
			});

		this.createButton(game, "Un-Mute Sound", game.world.centerX, game.world.centerY , 450, 100, 
			function(){
				this.game.sound.mute = false;
			});

		this.createButton(game, "Back to Main Menu", game.world.centerX, game.world.centerY +100, 450, 100, 
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
		{font:"30pt",fill:"#19cb65", align:"center"});
		txt.font = 'Days One';
		txt.anchor.setTo(0.5, 0.5);
	},

};