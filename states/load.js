// load in assets and call menu state
var loadState = {
	preload:function(){
		// loading text(s)

		// load in assets
		this.game.load.image('box','assets/imgs/box.jpg');
		this.game.load.image('black','assets/imgs/Black.png');
		this.game.load.image('background','assets/imgs/Background Menu.png');
		this.game.load.spritesheet('buttons','assets/imgs/buttons.png', 256, 64);
		this.game.load.audio('crowdWhiteNoiseLooped','assets/sound/soundfx/CrowdWhiteNoiseLooped.mp3');
		this.game.load.audio('ding','assets/sound/soundfx/Ding.mp3');
		this.game.load.audio('ding2','assets/sound/soundfx/Ding 2.mp3');
		this.game.load.audio('ding3','assets/sound/soundfx/Ding 3.mp3');
		this.game.load.audio('eggCrack','assets/sound/soundfx/EggCrack.mp3');
		this.game.load.audio('eggCrack2','assets/sound/soundfx/EggCrack2.mp3');
		this.game.load.audio('registerDing','assets/sound/soundfx/Register Ding.mp3');
		this.game.load.audio('registerDing2','assets/sound/soundfx/REgister Ding 2.mp3');
		this.game.load.audio('scream1','assets/sound/soundfx/Scream1.mp3');
		this.game.load.audio('scream2','assets/sound/soundfx/Scream2.mp3');
		this.game.load.audio('scream3','assets/sound/soundfx/Scream3.mp3');
		this.game.load.audio('scream4','assets/sound/soundfx/Scream4.mp3');
		this.game.load.audio('scream5','assets/sound/soundfx/Scream5.mp3');
		this.game.load.audio('scream6','assets/sound/soundfx/Scream6.mp3');
		this.game.load.audio('scream7','assets/sound/soundfx/Scream7.mp3');
		this.game.load.audio('scream8','assets/sound/soundfx/Scream8.mp3');
		this.game.load.audio('thud1','assets/sound/soundfx/Thud 1.mp3');
		this.game.load.audio('thud2','assets/sound/soundfx/Thud 2.mp3');
		this.game.load.audio('thud3','assets/sound/soundfx/Thud 3.mp3');
		this.game.load.audio('agniratha','assets/sound/tracks/Agniratha, Mechonis Capital (Night).mp3');
		this.game.load.audio('bolero','assets/sound/tracks/Bolero.m4a');
		this.game.load.audio('conquest','assets/sound/tracks/Conquest.mp3');
		this.game.load.audio('forgottenVale','assets/sound/tracks/Forgotten Vale.mp3');
		this.game.load.audio('gymnopedie','assets/sound/tracks/Gymnopedie No. 1.mp3');
		this.game.load.audio('fallenLand','assets/sound/tracks/The Fallen Land (Night).mp3');


	},
	create:function(){
		console.log('loading');
		// call menu state
		game.state.start('menu');
	}
};