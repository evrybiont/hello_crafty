Crafty.scene("Game", function(){
  this.occupied = new Array(Game.map_grid.width);

  for(var x=0; x < Game.map_grid.width; x++){
    this.occupied[x] = new Array(Game.map_grid.height);
    for(var y=0; y < Game.map_grid.height; y++){
      this.occupied[x][y] = false;
    }
  }

  this.player = Crafty.e("PlayerCharacter").at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  var max_villages = 5;

  for(var x = 0; x < Game.map_grid.width; x++) {
    for(var y = 0; y < Game.map_grid.height; y++) {
      var at_adge = (x == 0 || x == Game.map_grid.width-1 || y == 0 || y == Game.map_grid.height - 1);

      if (at_adge) {
        Crafty.e("Tree").at(x, y);
        this.occupied[x][y] = true;
      } else {
        if (Math.random() < 0.06 && !this.occupied[x][y]) {
          Crafty.e("Bush").at(x, y);
          this.occupied[x][y] = true;
        }

        if (Math.random() < 0.04 && !this.occupied[x][y]) {
          if (Crafty("Village").length < max_villages) {
            Crafty.e("Village").at(x, y);
            this.occupied[x][y] = true;
          }
        }
      }
    }
  }

  this.showVictory = this.bind("VillageVisited", function(){
    if (!Crafty("Village").length){
      Crafty.scene("Victory");
    }
  });
}, function(){
  this.unbind("VillageVisited", this.showVictory);
});

Crafty.scene("Victory", function(){
  Crafty.e("2D, DOM, Text")
    .attr({x: 0, y: 0})
    .text("Victory");

  this.restartGame = this.bind("KeyDown", function(){
    Crafty.scene("Game");
  });
}, function(){
  this.unbind("KeyDown", this.restartGame);
});
