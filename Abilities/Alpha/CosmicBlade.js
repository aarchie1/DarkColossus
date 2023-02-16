class CosmicBladeAbility {
  constructor(cooldownRarity, effectRarity) {
    //Necessary properties for all abilities
    this.name = "Cosmic Blade";
    this.icon = ASSET_MANAGER.getAsset(
      "./Sprites/Abilities/Icons/cosmic_blade_icon.png"
    );
    this.inUseIcon = ASSET_MANAGER.getAsset(
      "./Sprites/Abilities/Icons/cosmic_blade_in_use_icon.png"
    );
    this.dominant = false;
    this.effect = this.setEffect(effectRarity);
    this.description =
      "Attack the enemy with a giant sword dealing " + this.effect + " damage";
    this.effectRarity = effectRarity;
    this.cooldownRarity = cooldownRarity;
    this.cooldown = this.setCooldown(this.cooldownRarity);
    this.cooldownTimer = new AbilityCooldown(this.cooldown);
    this.inUse = false;

    //Ability specific properties
    this.updateBB();
    
  }

  updateBB() {
    this.lastBB1 = this.BB1;
    if (player.facing === 0) {
      this.BB1 = new BoundingBox(player.x, player.y - 650, 500, 100);
      this.BB2 = new BoundingBox(player.x+400, player.y - 600, 300, 900);
    } else {
      this.BB1 = new BoundingBox(player.x-200, player.y - 650, 500, 100);
      this.BB2 = new BoundingBox(player.x-400, player.y - 600, 300, 900);
    }
    
  }
  onEquip() {}

  onUnequip() {}

  //This runs when the Character presses the ability button
  onUse() {
    if (this.inUse || this.cooldownTimer.checkCooldown()) return;
    player.animations[4][0] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Abilities/cosmic_blade.png"),
      0,
      0,
      1200,
      1164,
      4,
      0.115,
      0,
      false
    );
    player.animations[4][1] = new Animator(
      ASSET_MANAGER.getAsset("./Sprites/Abilities/cosmic_blade_left.png"),
      0,
      0,
      1200,
      1164,
      4,
      0.115,
      0,
      false
    );

    player.animations[4][0].yOffset = -650;
    player.animations[4][0].xOffset = -450;
    player.animations[4][1].yOffset = -650;
    player.animations[4][1].xOffset = -500;
    this.inUse = true;
    player.usingAbility = true;
    console.log("Cosmic Blade started");
  }

  //The ability will call this itself
  //(useful for cooldowns, reverting player state, etc)
  onEnd() {
    this.cooldownTimer.startCooldown();
    player.usingAbility = false;
    this.inUse = false;
    console.log("Cosmic Blade ended");
  }

  //Edit these to change the cooldown of the ability based on rarity
  setCooldown(cooldownRarity) {
    switch (cooldownRarity) {
      case 1:
      case 2:
      case 3:
      case 4:
        // Basic cooldown 20-30 seconds
        //return Math.floor(Math.random() * 5) + 20;
        return 0;
      // case 2:
      //     // Uncommon cooldown 15-20 seconds
      //     return Math.floor(Math.random() * 5) + 15;
      // case 3:
      //     // Rare cooldown 12-14 seconds
      //     return Math.floor(Math.random() * 2) + 12;
      // case 4:
      //     // Godlike cooldown 7-11 seconds
      //     return Math.floor(Math.random() * 4) + 7;
      default:
        console.log("Cooldown rarity not found");
    }
    return 0;
  }

  //Edit these to change the effect of the ability based on rarity
  setEffect(effectRarity) {
    switch (effectRarity) {
      case 1:
        // Basic damage gets damage between 1 and 3
        return Math.floor(Math.random() * 3) + 1;
      case 2:
        // Uncommon damage gets damage between 3 and 5
        return Math.floor(Math.random() * 3) + 3;
      case 3:
        // Rare damage gets damage between 5 and 7
        return Math.floor(Math.random() * 3) + 5;
      case 4:
        // Godlike damage gets damage between 7 and 10
        return Math.floor(Math.random() * 4) + 7;
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
        if (enemy.hostile && (this.BB1.collide(enemy.BB) || this.BB2.collide(enemy.BB))) {
          if (enemy.currentIFrameTimer === 0) {
            console.log("Cosmic Blade hit a enemy");
            enemy.health -= this.effect + params.DARK_ENERGY.meleeAttack;
            console.log(enemy.health);
            enemy.currentIFrameTimer = enemy.maxIFrameTimer;
            gameEngine.addEntityFirst(
              new DamageIndicator(enemy.x, enemy.y, this.effect + params.DARK_ENERGY.meleeAttack)
            );
          }
          if (enemy instanceof MoleculeProjectile) {
            enemy.removeFromWorld = true;
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
      ctx.strokeRect(this.BB1.x - gameEngine.camera.x, this.BB1.y - gameEngine.camera.y, this.BB1.width, this.BB1.height);
      ctx.strokeRect(this.BB2.x - gameEngine.camera.x, this.BB2.y - gameEngine.camera.y, this.BB2.width, this.BB2.height);
    }
  }
}