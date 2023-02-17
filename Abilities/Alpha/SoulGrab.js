class SoulGrabAbility {
  constructor(cooldownRarity, effectRarity) {
    //Necessary properties for all abilities
    this.name = "Soul Grab";
    this.icon = ASSET_MANAGER.getAsset(
      "./Sprites/Abilities/Icons/cosmic_blade_icon.png"
    );
    this.inUseIcon = ASSET_MANAGER.getAsset(
      "./Sprites/Abilities/Icons/cosmic_blade_in_use_icon.png"
    );
    this.dominant = true;
    this.effect = this.setEffect(effectRarity);
    this.description =
      "Snatch the soul of a reaper sending him to the grave " +
      this.effect +
      " damage";
    this.effectRarity = effectRarity;
    this.cooldownRarity = cooldownRarity;
    this.cooldown = this.setCooldown(this.cooldownRarity);
    this.cooldownTimer = new AbilityCooldown(this.cooldown);
    this.inUse = false;

    //Ability specific properties
    this.updateBB();
    this.animationflag = false;
    this.hitCount = 0;
  }

  updateBB() {
    this.lastBB1 = this.BB1;
    if (player.facing === 0) {
      this.BB = new BoundingBox(player.x + 200, player.y - 100, 600, 400);
    } else {
      this.BB = new BoundingBox(player.x, player.y, 500, 100);
    }
  }
  onEquip() {}

  onUnequip() {}

  //This runs when the Character presses the ability button
  onUse() {
    if (this.inUse || this.cooldownTimer.checkCooldown()) return;
    this.animationflag = false;
    //check if there is a reaper within range
    gameEngine.entities.forEach((enemy) => {
      if (enemy.hostile && this.BB.collide(enemy.BB)) {
        if (enemy instanceof Reaper) {
          this.animationflag = true;
        }
      }
    });

    if (this.animationflag) {
      gameEngine.addEntityFirst(new AbilityIndicatorEffect(this.icon));
      player.animations[4][0] = new Animator(
        ASSET_MANAGER.getAsset("./Sprites/Abilities/soul_grab_right.png"),
        0,
        0,
        1024,
        512,
        4,
        0.115,
        0,
        false
      );
      player.animations[4][1] = new Animator(
        ASSET_MANAGER.getAsset("./Sprites/Abilities/soul_grab_right.png"),
        0,
        0,
        1024,
        512,
        4,
        0.115,
        0,
        false
      );
      player.animations[4][0].yOffset = -25;
      player.animations[4][0].xOffset = 200;
      player.animations[4][1].yOffset = 0;
      player.animations[4][1].xOffset = 0;
      this.inUse = true;
      player.usingAbility = true;
      console.log("Soul Grab started");
      this.hitCount = 0;
    } else {
      this.animationflag = false;
      this.onEnd();
    }
  }

  //The ability will call this itself
  //(useful for cooldowns, reverting player state, etc)
  onEnd() {
    this.cooldownTimer.startCooldown();
    player.usingAbility = false;
    this.inUse = false;
    console.log("Soul Grab ended");
  }

  //Edit these to change the cooldown of the ability based on rarity
  setCooldown(cooldownRarity) {
    switch (cooldownRarity) {
      case 1:
      case 2:
      case 3:
      case 4:
        return 0;
      default:
        console.log("Cooldown rarity not found");
    }
    return 0;
  }

  //Edit these to change the effect of the ability based on rarity
  setEffect(effectRarity) {
    switch (effectRarity) {
      case 1:
      case 2:
      case 3:
      case 4:
        //damge between 1 and 3
        return 5;
      default:
        console.log("Effect rarity not found");
        return -1;
    }
  }

  //Required
  update() {
    this.cooldownTimer.checkCooldown();
    if (this.inUse) {
      gameEngine.entities.forEach((enemy) => {
        if (enemy.hostile && this.BB.collide(enemy.BB)) {
          if (enemy instanceof Reaper && this.hitCount < 1) {
            console.log("Sould Grab hit a enemy");
            enemy.removeFromWorld = true;
            enemy.currentIFrameTimer = enemy.maxIFrameTimer;
            this.hitCount++;
          } 
        }
      });
    }
    // if game camera.gameOver is true, then end the ability
    if (this.inUse && gameEngine.camera.gameOver) {
      this.onEnd();
    } else {
      if (
        this.inUse &&
        (player.animations[4][0].isDone() || player.animations[4][1].isDone())
      ) {
        player.usingAbility = false;
      }
      //if player is not using ability, end the ability
      if (this.inUse && !player.usingAbility) {
        this.onEnd();
      }
    }

    this.updateBB();
    //update x and y to follow player
    this.x = player.x;
    this.y = player.y;
  }

  //Required - draw collision BB here
  draw(ctx) {
    if (debug && this.inUse) {
      ctx.strokeRect(
        this.BB.x - gameEngine.camera.x,
        this.BB.y - gameEngine.camera.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}