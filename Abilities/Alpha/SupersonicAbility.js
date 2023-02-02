class SupersonicAbility{

    constructor(cooldownRarity, effectRarity) {
        //Necessary properties for all abilities
        this.name = 'Supersonic';
        this.description = 'Passive ability that increases speed and deals' + this.effect + ' damage to enemies hit while moving at max speed';
        this.icon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/supersonic_icon.png");
        this.inUseIcon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/supersonic_in_use_icon.png");
        this.dominant = false;
        this.cooldownRarity = cooldownRarity;
        this.effectRarity = effectRarity;
        this.cooldown = this.setCooldown(cooldownRarity);
        this.effect = this.setEffect(effectRarity);
        this.currentCooldown = 0;
        this.inUse = false;

        //Supersonic specific properties
        this.originalAnimationRight = player.animations[1][0];
        this.originalAnimationLeft = player.animations[1][1];
        this.speedIncrease = 500;
        this.enemiesHit = [];
    }

    onEquip() {
        //equipped supersonic ability
        console.log("Equipped Supersonic Ability");
        player.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Abilities/supersonic.png"), 0, 0, 320, 256, 9, .06, 0, true);
        player.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Abilities/supersonic_left.png"), 0, 0, 320, 256, 9, .06, 0, true);
        player.MAX_RUN += this.speedIncrease;

        // facing left = 1
        //this.animations[1][1] 
    }

    onUnequip() {
        player.animations[1][0] = this.originalAnimationRight;
        player.animations[1][1] = this.originalAnimationLeft;
        player.MAX_RUN -= this.speedIncrease;
    }

    //GAME CHARACTER CALLS THIS
    onUse() {

    }

    //Ability itself
    onEnd() {

    }

    checkForDuplicateAbilities() {
        //check how many abilities is an instance of this ability in dnaslot1 and dnaslot2
        //if more than 1, return true
        //else return false
        

    }

    setCooldown(cooldownRarity) { 
        return 0;
    }

    setEffect(effectRarity) {
        switch (effectRarity) {
            case 1:
                // +1-2 dmg per hit
                return Math.floor(Math.random() * 2) + 1;
            case 2:
                // +3-4 dmg per hit
                return Math.floor(Math.random() * 2) + 3;
            case 3:
                // +5-6 dmg per hit
                return Math.floor(Math.random() * 2) + 5;
            case 4:
                // +7-8 dmg per hit
                return Math.floor(Math.random() * 2) + 7;
            default:
                console.log('Effect rarity not found');
                return -1;
        }
    }

    update() {
        if (Math.abs(player.velocity.x) == player.MAX_RUN && player.state == 1) {
            this.inUse = true;

           gameEngine.entities.forEach((enemy) => {
                //Collisions with players bounding box
                if (enemy.hostile && player.BB.collide(enemy.BB)) {
                    if (!this.enemiesHit.includes(enemy)) {
                        this.enemiesHit.push(enemy);
                        enemy.health -= this.effect;
                        gameEngine.addEntityFirst(new DamageIndicator(enemy.x+30, enemy.y, this.effect));
                     }
                }
           })
        } else {
            this.enemiesHit = [];
            this.inUse = false;
        }

    }

    draw(ctx) {
        //draw image slightly behind player
        if (Math.abs(player.velocity.x) == player.MAX_RUN && player.state == 1) {
            //ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/Abilities/supersonic.png"), player.x - 300 - gameEngine.camera.x, player.y - 100 - gameEngine.camera.y, 320, 256);
        }
    }
}