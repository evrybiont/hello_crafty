Game = {
  map_grid: {
    width:  24,
    height: 16,
    tile: {
      width:  16,
      height: 16
    }
  },

  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height
  },

  start: function() {
    Crafty.init(Game.width(), Game.height());
    Crafty.background("rgb(87, 109, 20)");
    Crafty.scene("Loading");
  }
}
$text_css = {
  'size': '24px',
  'family': 'Arial',
  'color': 'red',
  'text-align': 'center' }
