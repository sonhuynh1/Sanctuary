var menuBox = function(game){
    Phaser.Sprite.call(this, game, 
        game.rnd.integerInRange(64, game.width-64), game.rnd.integerInRange(64, game.height-61), 'box');

    this.anchor.set(0.5);// anchor the sprite

    this.ptint = game.rnd.between(0,255);
    this.tint = this.ptint;

    var real = game.rnd.realInRange(0.5,1.5);
    this.scale.setTo(real,real);

    //this.velocity = velocity;// velocity is the velocity in the prefab constructor

    game.physics.enable(this);// enable physics
    this.body.velocity.x = 50 + Math.random() * 200;// the random velocity going horizontal
    this.checkWorldBounds = true; //check the world boundaries
    }

menuBox.prototype = Object.create(Phaser.Sprite.prototype);// explicitly specifying the prefab’s prototype
menuBox.prototype.constructor = menuBox;// explicitly specifying the prefab’s constructor
menuBox.prototype.update = function() {

    //wraping the armada
    if (this.body.x >= 800){ // if the sprite is over 800.x width
        this.body.x = 0; // go back to 0.x position
    }
    if (this.body.x < 0){ // if the sprite is under 0.x width
        this.body.x = 800; // start at 800.x width
    }
}
