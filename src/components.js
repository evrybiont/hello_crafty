Crafty.c("Grid", {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  at: function(x, y) {
    if( x === undefined && y === undefined ) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

Crafty.c("Actor", {
  init: function() {
    this.requires("2D, Canvas, Grid");
  }
});

Crafty.c("Tree", {
  init: function() {
    this.requires("Actor, Solid, spr_tree");
  }
});

Crafty.c("Bush", {
  init: function() {
    this.requires("Actor, Solid, spr_bush");
  }
});

Crafty.c("PlayerCharacter", {
  init: function(){
    this.requires("Actor, Fourway, Collision, spr_player, SpriteAnimation")
      .fourway(4)
      .stopOnSolid()
      .onHit("Village", this.visitVillage)
      .animate("PlayerMovingUp",    0, 0, 2)
      .animate("PlayerMovingRight", 0, 1, 2)
      .animate("PlayerMovingDown",  0, 2, 2)
      .animate("PlayerMovingLeft",  0, 3, 2);

    var animation_speed = 8;
    this.bind("NewDirection", function(data){
      if (data.x > 0){
        this.animate("PlayerMovingRight", animation_speed, -1);
      } else if (data.x < 0){
        this.animate("PlayerMovingLeft", animation_speed, -1);
      } else if (data.y > 0){
        this.animate("PlayerMovingDown", animation_speed, -1);
      } else if (data.y < 0){
        this.animate("PlayerMovingUp", animation_speed, -1);
      } else {
        this.stop();
      }
    })
  },

  stopOnSolid: function() {
    this.onHit("Solid", this.stopMovement);
    return this;
  },

  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  visitVillage: function(data) {
    village = data[0].obj;
    village.visit();
  }
});

Crafty.c("Village", {
  init: function() {
    this.requires("Actor, spr_village");
  },

  visit: function() {
    this.destroy();
    Crafty.trigger("VillageVisited", this);
  }
});
