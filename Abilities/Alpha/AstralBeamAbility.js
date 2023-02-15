class AstralBeamAbility {

    constructor(cooldownRarity, effectRarity) {
        //Necessary properties for all abilities
        this.name = 'Astral Beam';
        this.icon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/astral_beam_icon.png");
        this.inUseIcon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/astral_beam_in_use_icon.png");
        this.dominant = false;
        this.effect = this.setEffect(effectRarity);
        this.description = 'Eviscerate enemies in a line of sight dealing' + this.effect + 'dmg';
        this.effectRarity = effectRarity;
        this.cooldownRarity = cooldownRarity;
        this.cooldown = this.setCooldown(this.cooldownRarity);
        this.cooldownTimer = new AbilityCooldown(this.cooldown);
        this.inUse = false;

        //Ability specific properties
        this.BB1_TAIL = new BoundingBox(100, 100, CANVAS_WIDTH-100, CANVAS_HEIGHT-100);
        this.BB2_UPPER_ARM = new BoundingBox(100, 100, CANVAS_WIDTH-100, CANVAS_HEIGHT-100);
        this.BB3_LOWER_ARM = new BoundingBox(100, 100, CANVAS_WIDTH-100, CANVAS_HEIGHT-100);
        this.enemiesHit = [];
    }

    onEquip() {

    }

    onUnequip() {
        
    }

    //This runs when the Character presses the ability button
    onUse() {
        if (this.inUse || (this.cooldownTimer.checkCooldown()) ) return;
        player.animations[4][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Abilities/astral_beam_right.png"), 0, 0, 320, 320, 10, 0.09, 0, false);
        player.animations[4][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Abilities/astral_beam_left.png"), 0, 0, 320, 320, 10, 0.09, 0, false);
        player.animations[4][0].yOffset = -50;
        player.animations[4][0].xOffset = -20;
        player.animations[4][1].yOffset = -50;
        player.animations[4][1].xOffset = -50;
        this.inUse = true;
        player.usingAbility = true;
        console.log('Astral Beam started');
    }

    //The ability will call this itself 
    //(useful for cooldowns, reverting player state, etc)
    onEnd() {
        this.cooldownTimer.startCooldown();
        player.usingAbility = false;  
        this.inUse = false;
    }

    //Edit these to change the cooldown of the ability based on rarity
    setCooldown(cooldownRarity) { 
        switch (cooldownRarity) {
            case 1:
                // Basic cooldown 8-15 seconds
                return Math.floor(Math.random() * 7) + 8;
            case 2:
                // Uncommon cooldown 5-8 seconds
                return Math.floor(Math.random() * 3) + 5;
            case 3:
                // Rare cooldown 2-5 seconds
                return Math.floor(Math.random() * 3) + 2;
            case 4:
                // Godlike cooldown 1-2 seconds
                return Math.floor(Math.random() * 2) + 1;
        }
    }


    //Strength of laser per hit
    setEffect(effectRarity) {
        switch (effectRarity) {
            case 1:
                // Basic effect 0.2-0.5 per hit
                return (Math.random() * 0.3) + 0.2;
            case 2:
                // Uncommon effect 0.5-1 per hit
                return (Math.random() * 0.5) + 0.5;
            case 3:
                // Rare effect 1-2 per hit
                return (Math.random() + 1);
            case 4:
                // Godlike effect 2-5 per hit
                return (Math.random() * 3) + 2;
        }
    }

    //Required
    update() {
        //round to the nearest tenth
        this.damage = Math.round(this.effect * params.DARK_ENERGY.rangedAttack * 10) / 10;
        this.cooldownTimer.checkCooldown();

        if (player.facing == 0) { //RIGHT FACING
            this.BB1_TAIL = new BoundingBox(player.x+175 - gameEngine.camera.x, player.y - gameEngine.camera.y -2, CANVAS_WIDTH, 15);
            this.BB2_UPPER_ARM = new BoundingBox(player.x + 270 - gameEngine.camera.x, player.y + 132 - gameEngine.camera.y, CANVAS_WIDTH, 15);
            this.BB3_LOWER_ARM = new BoundingBox(player.x + 230 - gameEngine.camera.x, player.y + 172 - gameEngine.camera.y, CANVAS_WIDTH, 15);
        } else {
            this.BB1_TAIL = new BoundingBox(-100, player.y - gameEngine.camera.y, player.x + 180 - gameEngine.camera.x, 15);
            this.BB2_UPPER_ARM = new BoundingBox(-100, player.y - gameEngine.camera.y + 132, player.x + 82 - gameEngine.camera.x, 15);
            this.BB3_LOWER_ARM = new BoundingBox(-100, player.y + 172 - gameEngine.camera.y, player.x + 128 - gameEngine.camera.x, 15);
        }

        if (this.inUse) {
            gameEngine.entities.forEach((enemy) => {
                if ( (enemy.hostile) && !this.enemiesHit.includes(enemy) 
                    && (this.BB1_TAIL.collide(enemy.BB) || this.BB2_UPPER_ARM
                    .collide(enemy.BB) || this.BB3_LOWER_ARM.collide(enemy.BB))) {
                    console.log('Astral Beam HIT');
                    this.enemiesHit.push(enemy);
                    enemy.health -= this.damage;
                    if ( !(enemy instanceof MoleculeProjectile))
                        gameEngine.addEntityFirst(new DamageIndicator(enemy.x+30, enemy.y, this.damage));
                }
           })
        } 

        if (this.inUse && (player.animations[4][0].isDone() || player.animations[4][1].isDone() )) {
            this.onEnd();
        }
    }

    //Required - draw collision BB here
    draw(ctx) {
        if(this.inUse && 
            ( (player.animations[4][0].currentFrame() >= 5 && player.animations[4][0].currentFrame() < 10)
             || (player.animations[4][1].currentFrame() >= 5 && player.animations[4][1].currentFrame() < 10)
             )
            ) { //draw the bounding box for each laser
            ctx.fillStyle = '#DF8652';
            ctx.fillRect(this.BB1_TAIL.x, this.BB1_TAIL.y, this.BB1_TAIL.width, this.BB1_TAIL.height);
            ctx.fillRect(this.BB2_UPPER_ARM.x, this.BB2_UPPER_ARM.y, this.BB2_UPPER_ARM.width, this.BB2_UPPER_ARM.height);
            ctx.fillRect(this.BB3_LOWER_ARM.x, this.BB3_LOWER_ARM.y, this.BB3_LOWER_ARM.width, this.BB3_LOWER_ARM.height);
        }
        
    }
}