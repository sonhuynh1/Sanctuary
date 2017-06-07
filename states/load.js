//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

	//  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Black Ops One']
    }

};

// load in assets and call menu state
var talking;
var loadState = {

	preload:function(){
		// loading text(s)

		// load in assets
		this.game.load.image('box','assets/imgs/box.jpg');
		this.game.load.image('black','assets/imgs/Black.png');
		this.game.load.image('background','assets/imgs/Sanctuary_Dirt.png');
		//this.game.load.image('playBackground','assets/imgs/Sanctuary_Background.png');
		this.game.load.image('logo','assets/imgs/Sanctuary_Logo.png');
    	this.game.load.image('gate','assets/imgs/Sanctuary_Gate.png');
		this.game.load.spritesheet('buttons','assets/imgs/buttons.png', 256, 64);
		this.game.load.audio('crowdWhiteNoiseLooped','assets/sound/soundfx/CrowdWhiteNoiseLooped.mp3');
		this.game.load.audio('ding3','assets/sound/soundfx/Ding 3.mp3');
		this.game.load.audio('gymnopedie','assets/sound/tracks/Gymnopedie No. 1.mp3');
		this.game.load.audio('jeux','assets/sound/tracks/Jeux D Enfants.m4a');

		//  Load the Google WebFont Loader script
		this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		/*Sounds*/
		//this.game.load.audio('ding','assets/sound/soundfx/Ding.mp3');
		//this.game.load.audio('ding2','assets/sound/soundfx/Ding 2.mp3');
		//this.game.load.audio('eggCrack','assets/sound/soundfx/EggCrack.mp3');
		//this.game.load.audio('eggCrack2','assets/sound/soundfx/EggCrack2.mp3');
		//this.game.load.audio('registerDing','assets/sound/soundfx/Register Ding.mp3');
		//this.game.load.audio('registerDing2','assets/sound/soundfx/REgister Ding 2.mp3');
		//this.game.load.audio('scream1','assets/sound/soundfx/Scream1.mp3');
		//this.game.load.audio('scream2','assets/sound/soundfx/Scream2.mp3');
		//this.game.load.audio('scream3','assets/sound/soundfx/Scream3.mp3');
		//this.game.load.audio('scream4','assets/sound/soundfx/Scream4.mp3');
		//this.game.load.audio('scream5','assets/sound/soundfx/Scream5.mp3');
		//this.game.load.audio('scream6','assets/sound/soundfx/Scream6.mp3');
		//this.game.load.audio('scream7','assets/sound/soundfx/Scream7.mp3');
		//this.game.load.audio('scream8','assets/sound/soundfx/Scream8.mp3');
		//this.game.load.audio('thud1','assets/sound/soundfx/Thud 1.mp3');
		//this.game.load.audio('thud2','assets/sound/soundfx/Thud 2.mp3');
		//this.game.load.audio('thud3','assets/sound/soundfx/Thud 3.mp3');
	},

	create:function(){
		console.log('loading');
	    talking = this.game.add.audio('crowdWhiteNoiseLooped');
	    talking.play();
	    talking.mute = true;
		// call menu state
		game.state.start('menu');
	}
};
