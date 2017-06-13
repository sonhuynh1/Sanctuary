// base box construct
var HoverData = function(game){
	Phaser.Text.call(this,game,
		game.world.width*0.8,game.world.height/2,'');

		//establishing hover text
		this.hoverText = game.add.text(game.world.width-250, 128, "ID: " + "\n" + "Age: " );
		this.hoverText.font = 'Patrick Hand SC';
};
HoverData.prototype = Object.create(Phaser.Text.prototype);
HoverData.constructor = HoverData;
HoverData.prototype.hovering = function(name,id) {

	// update text with ids
	this.hoverText.text = "ID: " + id + "\n" + "Age: " + name;
},
HoverData.prototype.removeText = function() {
	// update text to hide it
	this.hoverText.text = "";
};
