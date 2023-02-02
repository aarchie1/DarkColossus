class MoleculeProjectile {
  constructor(game, x, y, target, owner, maxSpeed, damage, spritesheet) {
    Object.assign(this, {
      game,
      x,
      y,
      target,
      owner,
      maxSpeed,
      damage,
      spritesheet,
    });
    const TICK = this.game.clockTick;
    console.log("molecule projectile spawn");

    this.hostile = true;
    this.health = 1;
    this.maxSpeed = 500; // pixels per second

    let dist = getDistance(this, this.target);

    this.velocity = {
      x: ((this.target.x - this.x) / dist) * this.maxSpeed,
      y: ((this.target.y - this.y) / dist) * this.maxSpeed,
    };
    this.updateBB();

    this.animations = [];

    this.animations[0] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Molecule/molecule_projectile.png"),
      0,
      0,
      42,
      42,
      6,
      0.1,
      0,
      true
    );

    this.elapsedTime = 0;
    this.facing = 0;
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x - 20, this.y + 75, 40, 40);
  }
  update() {
    this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * this.game.clockTick;

    this.updateBB();

    //check for collision with target

    if (this.health <= 0) {
      this.removeFromWorld = true;
    }
  }

  draw(ctx) {
    let XOffset = 16;
    let YOffset = -75;

    this.animations[this.facing].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - XOffset - this.game.camera.x,
      this.y - YOffset - this.game.camera.y,
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
