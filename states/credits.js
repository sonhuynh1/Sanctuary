var creditsState = {
	create:function(){
		// menu text(s)
		//var background = game.add.sprite(0, 0, 'background');// background for title state
    	//background.height = game.height;
    	//background.width = game.width;

    	game.stage.backgroundColor = 0x0000FF;

		var name1 = game.add.text(game.world.centerX -400, game.world.centerY - 50,'Son huynh - Main Programmer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name1.font = 'Black Ops One';

		var name2 = game.add.text(game.world.centerX -400, game.world.centerY,'Rahil Bhatnagar - Programmer, Level Designer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name2.font = 'Black Ops One';

		var name3 = game.add.text(game.world.centerX -400, game.world.centerY + 50,'Ian Seebach - Researcher, Art/Sound Designer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name3.font = 'Black Ops One';

		var name4 = game.add.text(game.world.centerX -400, game.world.centerY + 100,'Joseph Boudeman - Researcher, Programmer',
			{font:"30pt",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		name4.font = 'Black Ops One';
		
		this.createButton(game, "Go Back", game.world.centerX, game.world.centerY - 150, 360, 100, 
			function(){
				this.game.state.start('end');
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