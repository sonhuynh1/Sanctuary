// custom variables for game
var boxes, hoverData, quotaSystem;
var lBRW, lBBH, lBLW, lBTH; // left box: right width, bottom height, left width, top height
var playSong;

// game on
var playState = {
	preload:function(){
		// menu text(s)
		/*
		var instruction = game.add.text(0,0,'Game On',
			{font:"30pt Courier",fill:"#19cb65",stroke:"#119f4e",strokeThickness:2});
		*/

		// set left box dimensions
		lBLW = 0; // left box left width coordinate
		lBTH = 0; // left box top height coordinate
		lBRW = game.world.width/2.5; // left box right width coordinate
		lBBH = game.world.height; // left box bottom height coordinate
	},
	create:function(){
		console.log('playing');

		// allow for mouse input
		game.input.mouse.capture = true;

		// set background color
		this.game.stage.backgroundColor = 0x8C7B6C;

		playSong = this.game.add.audio('forgottenVale');
		playSong.play('', 0, 1, true);

		// make boxes and add them into group
		boxes = game.add.group();
		boxes.enableBody = true; // sweggmonies

		quotaSystem = new Quota(this.game);
		game.add.existing(quotaSystem);
		//==============================================
		// Create hoverData
		hoverData = new HoverData(this.game);
		game.add.existing(hoverData);

	},
	update:function(){
		// check for collision
		//game.physics.arcade.collide(boxes);// swag monies
	}
};
