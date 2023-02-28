class AtomicProjectile {
  constructor(game, x, y, facing) {
    Object.assign(this, {
      game,
      x,
      y,
      facing,
    });
    const TICK = this.game.clockTick;
    
    this.damage = 2;
    this.maxSpeed = 1000;

  
    if (this.facing === 0) {
      this.velocity = {
        x: this.maxSpeed,
      };
    } else {
      this.velocity = {
        x: -(this.maxSpeed),
      };
    }
    
    this.updateBB();

    this.animations = [];

    this.animations[0] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Abilities/atomic_projectile.png"),
      0,
      0,
      64,
      64,
      1,
      0.1,
      0,
      true
    );
    this.animations[0].yOffset = 75;
    this.animations[0].xOffset = 250;

    this.animations[1] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Abilities/atomic_projectile.png"),
      0,
      0,
      64,
      64,
      1,
      0.1,
      0,
      true
    );

    this.animations[1].yOffset = 75;
    this.animations[1].xOffset = -20;
  }


  updateBB() {
    this.lastBB = this.BB;
    if (this.facing === 0) {
      this.BB = new BoundingBox(this.x+250, this.y+75, 40, 40);
    } else {
      this.BB = new BoundingBox(this.x-20, this.y+75, 40, 40);
    }
    
  }
  update() {
    this.x += this.velocity.x * this.game.clockTick;

    this.updateBB();

    // add check to see if projectile collides with enemy
    for (let i = 0; i < this.game.entities.length; i++) {
      if (this.game.entities[i].BB && this.game.entities[i].BB.collide(this.BB)) {
        if (this.game.entities[i].hostile) {
          if (this.game.entities[i].currentIFrameTimer == 0) {
            this.game.entities[i].health -= this.damage;
            this.game.entities[i].currentIFrameTimer = this.game.entities[i].maxIFrameTimer;
          }
          this.removeFromWorld = true;
          // this.game.addEntityFirst(
          //   new DamageIndicator(this.game.entities[i].x, this.game.entities[i].y, this.damage)
          // );
        }
      }
    }
    // add check to see if projectile is off screen
    if (this.x < this.game.camera.x - 2000 || this.x > this.game.camera.x + 2000 || this.y < this.game.camera.y - 2000 || this.y > this.game.camera.y + 2000) {
      this.removeFromWorld = true;
      console.log("Projectile off screen and removed");
    }
  }

  draw(ctx) {
  
    this.animations[this.facing].drawFrame(
      this.game.clockTick,
      ctx,
      this.x  - this.game.camera.x,
      this.y  - this.game.camera.y,
      1
    );
    if (debug)
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y - this.game.camera.y,
        this.BB.width,
        this.BB.height
      );
  }
}
