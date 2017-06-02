var creditsState = {
	create:function(){
		// menu text(s)
		var name1 = game.add.text(game.world.centerX -250, game.world.centerY - 50,'Son huynh - Programmer',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});

		var name2 = game.add.text(game.world.centerX -300, game.world.centerY,'Rahil Bhatnagar - Programmer',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});

		var name3 = game.add.text(game.world.centerX -350, game.world.centerY + 50,'Ian Seebach - Researcher, Art/Sound Designer',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});

		var name4 = game.add.text(game.world.centerX -350, game.world.centerY + 100,'Joseph Boudeman - Researcher, Programmer',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		
		this.createButton(game, "Return to Menu", game.world.centerX, game.world.centerY - 150, 360, 100, 
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