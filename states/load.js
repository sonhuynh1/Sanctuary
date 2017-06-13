//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

	//  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Black Ops One', 'Courier new', 'Patrick Hand SC']
    }

};

// load in assets and call menu state
var loadState = {

	preload:function(){
		// loading text(s)

		// load in assets
		this.game.load.image('box','assets/imgs/box.jpg');
		this.game.load.image('black','assets/imgs/Grey.png');
		this.game.load.image('background','assets/imgs/Sanctuary_Dirt.png');
		this.game.load.image('paper','assets/imgs/paper.jpg');
		this.game.load.image('logo','assets/imgs/Sanctuary_Logo.png');
		this.game.load.image('gate','assets/imgs/Sanctuary_Gate.png');
		this.game.load.image('op1','assets/imgs/CG1_filter.png');
		this.game.load.image('op11','assets/imgs/CG2_filter.png');
		this.game.load.image('op111','assets/imgs/CG4_filter.png');
		this.game.load.image('op3','assets/imgs/CG3_filter.png');
		this.game.load.image('op4','assets/imgs/CG5_filter.png');

		this.game.load.spritesheet('buttons','assets/imgs/buttons.png', 256, 64);

		this.game.load.audio('crowdWhiteNoiseLooped','assets/sound/soundfx/CrowdWhiteNoiseLooped.mp3');
		this.game.load.audio('ding3','assets/sound/soundfx/Ding 3.mp3');
		this.game.load.audio('gymnopedie','assets/sound/tracks/Gymnopedie No. 1.mp3');
		this.game.load.audio('jeux','assets/sound/tracks/Jeux D Enfants.m4a');
<<<<<<< HEAD
    	this.game.load.audio('terror','assets/sound/tracks/Terror.m4a');
    	this.game.load.audio('tick','assets/sound/soundfx/clock-1.wav');

=======
		this.game.load.audio('terror','assets/sound/tracks/Terror.m4a');
		this.game.load.audio('tick','assets/sound/soundfx/clock-1.wav');
>>>>>>> refs/remotes/origin/Polish
		//  Load the Google WebFont Loader script
		this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},

	create:function(){
		console.log('loading');
	   //calling menu state
		game.state.start('menu');
	}
};
