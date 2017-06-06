// base box construct
var HoverData = function(game){
	Phaser.Text.call(this,game,
		game.world.width*0.8,game.world.height/2,'Bada Bing',
		{font:'20pqqx Arial',fill:'#ff0044',align:'center'});

};
HoverData.prototype = Object.create(Phaser.Text.prototype);
HoverData.constructor = HoverData;
HoverData.prototype.hovering = function(name,id) {
	// update text
	this.setText(id + "\n" + name);
};
