var creditsState = {
	create:function(){
		// menu text(s)
		var background = game.add.sprite(0, 0, 'background');// background for title state
    	background.height = game.height;
    	background.width = game.width;

		var name1 = game.add.text(game.world.centerX -350, game.world.centerY - 50,'Son huynh - Programmer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name1.font = 'Days One';

		var name2 = game.add.text(game.world.centerX -350, game.world.centerY,'Rahil Bhatnagar - Programmer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name2.font = 'Days One';

		var name3 = game.add.text(game.world.centerX -350, game.world.centerY + 50,'Ian Seebach - Researcher, Art/Sound Designer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name3.font = 'Days One';

		var name4 = game.add.text(game.world.centerX -350, game.world.centerY + 100,'Joseph Boudeman - Researcher, Programmer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name4.font = 'Days One';
		
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
		{font:"30pt",fill:"#19cb65", align:"center"});
		txt.font = 'Black Ops One';
		txt.anchor.setTo(0.5, 0.5);
	},
};