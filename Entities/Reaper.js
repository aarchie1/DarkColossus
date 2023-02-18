class Reaper {
  constructor(game, x, y, size) {
    Object.assign(this, { game, x, y, size });
    const TICK = this.game.clockTick;
    this.fallAcc = 400;
    this.reaper = this;
    this.player = this.game.camera.player;
    this.facing = 1; // 0 = right, 1 == left
    this.state = size; //0 = weak 1 = normal 2 = strong 3 = attacking
    this.velocity = { x: 0, y: 0 };
    this.hostile = true;
    this.damage = 1;
    
    this.attackRate = 2;
    this.elapsedTime = 0;
    this.attackDistance = 0;
    this.health = 10;
    this.currentIFrameTimer = 0;
    this.maxIFrameTimer = 50;
    this.dead = false;
    this.paused = true;
    this.updateBB();
    this.animationXOffset = 0;
    this.animationYOffset = 0;
    this.animations = [];
    this.loadAnimations();
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x + 50, this.y, 150, 250);
    
  }

  update() {
    const TICK = this.game.clockTick;
    this.elapsedTime += this.game.clockTick;

    if (this.paused && this.game.camera.player.x > this.x - 1000) {
      this.paused = false;
    }

    if (!this.paused && !this.dead) {
      // If not paused, activate reapers AI
      this.velocity.y += this.fallAcc * TICK;
      if (this.x > this.player.x) this.velocity.x += -100 * TICK;
      if (this.x < this.player.x && this.velocity.x < 0) {
        this.velocity.x = 0;
      }

      //Stop moving Condition

      //if the reaper is to the right of the player
      if (this.x > this.player.x) {
        // if the player is facing right
        if (
          this.player.facing === 0 &&
          this.BB.left - this.player.BB.right <= this.attackDistance
        ) {
          this.velocity.x = 0;
        } else if (
          this.player.facing === 1 &&
          this.BB.left - this.player.BB.right <= this.attackDistance
        ) {
          this.velocity.x = 0;
        }
      }

      //if the reaper is to the left of the player
      if (this.x < this.player.x) {
        // if the player is facing left
        if (
          this.player.facing === 1 &&
          this.BB.right - this.player.BB.left >= this.attackDistance
        ) {
          this.velocity.x = 0;
        } else if (
          this.player.facing === 0 &&
          this.BB.right - this.player.BB.left >= this.attackDistance
        ) {
          this.velocity.x = 0;
        }
      }

      if (this.x < this.player.x) this.velocity.x += 100 * TICK;
      if (this.x > this.player.x && this.velocity.x > 0) {
        this.velocity.x = 0;
      }

      this.x += this.velocity.x * TICK;
      this.y += this.velocity.y * TICK;
      this.updateBB();

      //Collision
      this.game.entities.forEach((entity) => {
        // Collisions with Reaper bounding box
        if (entity.BB && this.BB.collide(entity.BB)) {
          //falling
          if (this.velocity.y > 0) {
            if (
              entity instanceof SmallPlatform ||
              (entity instanceof Platform &&
                this.lastBB.bottom <= entity.BB.top)
            ) {
              this.y = entity.BB.top - this.BB.height;
              this.velocity.y = 0;
              this.updateBB();
            }
          }
        } //check if reaper is colliding with invisible wall
        if (entity instanceof InvisibleWall) {
          if (this.BB.collide(entity.BB)) {
            // if reapers moving left reverse x velocity
            if (this.velocity.x < 0) {
              // this.velocity.x = -this.velocity.x;
              this.velocity.x = 0;
              
            }
            //if reaper is moving right reverse x velocity
            if (this.velocity.x > 0) {
              this.velocity.x = -this.velocity.x;
            }
          }
        }
      });

      if (
        Math.abs(this.x - this.player.x) < 300 &&
        Math.abs(this.y - this.player.y) < 300
      ) {
        if (this.elapsedTime > this.attackRate) {
          this.state = 3;
          if (this.animations[this.state][this.facing].isDone()) {
            this.animations[this.state][this.facing].elapsedTime = 0;
            this.state = this.size;
            this.elapsedTime = 0;
            this.animations[this.state][this.facing].elapsedTime = 0;
          }
        }
      } else {
        this.state = this.size;
      }

      // Update Facing direction
      if (this.velocity.x < 0) this.facing = 1;
      if (this.velocity.x > 0) this.facing = 0;
    }
    if (this.health <= 0) {
      this.removeFromWorld = true;
    }
    if (this.currentIFrameTimer > 0) {
      this.currentIFrameTimer -= 1;
      // console.log(this.currentIFrameTimer);
    }
  }

  loadAnimations() {
    for (let i = 0; i < 4; i++) {
      this.animations.push([]);
      for (let j = 0; j < 2; j++) {
        // two directions
        this.animations[i].push([]);
      }
    }

    // weak animation for state = 0
    // facing right = 0
    this.animations[0][0] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_weak.png"),
      0,
      0,
      256,
      256,
      6,
      0.2,
      0,
      true
    );

    // facing left = 1
    this.animations[0][1] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_weak.png"),
      0,
      0,
      256,
      256,
      6,
      0.2,
      0,
      true
    );

    // normal Animation state = 1
    // facing right = 0
    this.animations[1][0] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_normal.png"),
      0,
      0,
      256,
      256,
      6,
      0.2,
      0,
      true
    );

    // facing left = 1
    this.animations[1][1] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_normal.png"),
      0,
      0,
      256,
      256,
      6,
      0.2,
      0,
      true
    );

    // strong animation for state = 2
    // facing right = 0
    this.animations[2][0] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_strong_right.png"),
      0,
      0,
      256,
      256,
      6,
      0.2,
      0,
      true
    );

    //facing left  = 1
    this.animations[2][1] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_strong.png"),
      0,
      0,
      256,
      256,
      6,
      0.2,
      0,
      true
    );

    // Attacking Animation state = 3
    // facing right = 0
    this.animations[3][0] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_attack_right.png"),
      0,
      0,
      320,
      256,
      6,
      0.1,
      0,
      false
    );

    // facing left = 1
    this.animations[3][1] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_attack.png"),
      0,
      0,
      320,
      256,
      6,
      0.1,
      0,
      false
    );
  }
  draw(ctx) {
    this.animations[this.state][this.facing].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y - this.game.camera.y,
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
