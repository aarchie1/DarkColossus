class EMPAbility {

    constructor(cooldownRarity, effectRarity) {
        //Necessary properties for all abilities
        this.name = 'EMP';
        this.description = 'Nearby Molecules are disabled for ' + this.effect + 's';
        this.icon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/emp_icon.png");
        this.inUseIcon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/emp_icon.png");
        this.dominant = false;
        this.cooldownRarity = cooldownRarity;
        this.effectRarity = effectRarity;
        this.cooldown = this.setCooldown(cooldownRarity);
        this.effect = this.setEffect(effectRarity);
        this.currentCooldown = this.cooldown;
        this.inUse = false;


        //Ability specific properties
        this.previousPlayerState = null;
        this.previousAnimationXOffset = null;
        this.previousAnimationYOffset = null;
        this.jump = false;
        this.BB = new BoundingBox(100, 100, CANVAS_WIDTH-200, CANVAS_HEIGHT-200);
        this.moleculesHit = [];

    }

    onEquip() {

    }

    onUnequip() {
        
    }

    //This runs when the Character presses the ability button
    onUse() {
        if (this.inUse || this.currentCooldown != this.cooldown) return;
        this.inUse = true;
        player.usingAbility = true;
        player.animations[4][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Abilities/emp.png"), 0, 0, 1200, 1164, 7, 0.1, 0, false);
        player.animationXOffset = 450;
        player.animationYOffset = 1000;
        
        this.previousAnimationXOffset = player.animationXOffset;
        this.previousAnimationYOffset = player.animationYOffset;
        
    }

    //The ability will call this itself 
    //(useful for cooldowns, reverting player state, etc)
    onEnd() {
        this.inUse = false;
        player.animationXOffset = this.previousAnimationXOffset;
        player.animationYOffset = this.previousAnimationYOffset;
        player.state = 1;
        player.y -= 600;
        //this.currentCooldown = callTimer(this.cooldown);
        this.jump = false;
        
    }

    //Edit these to change the cooldown of the ability based on rarity
    setCooldown(cooldownRarity) { 
        switch (cooldownRarity) {
            case 1:
                // Basic cooldown 20-30 seconds
                return Math.floor(Math.random() * 5) + 20;
            case 2:
                // Uncommon cooldown 15-20 seconds
                return Math.floor(Math.random() * 5) + 15;
            case 3:
                // Rare cooldown 12-14 seconds
                return Math.floor(Math.random() * 2) + 12;
            case 4:
                // Godlike cooldown 7-11 seconds
                return Math.floor(Math.random() * 4) + 7;
            default:
                console.log('Cooldown rarity not found');
        }
        return 0;
    }


    //Length of disable effect
    setEffect(effectRarity) {
        switch (effectRarity) {
            case 1:
                // Basic effect 0.5-1.5 seconds 
                return (Math.floor(Math.random() * 10) + 5) / 10;
            case 2:
                // Uncommon effect 1.5-2.5 seconds
                return (Math.floor(Math.random() * 10) + 15) / 10;
            case 3:
                // Rare effect 2.5-3.5 seconds
                return (Math.floor(Math.random() * 10) + 25) / 10;
            case 4:
                // Godlike effect 3.5-5 seconds
                return (Math.floor(Math.random() * 15) + 35) / 10;
            default:
                console.log('Effect rarity not found');
                return -1;
        }
    }

    //Required
    update() {

        this.BB.x = player.x - CANVAS_WIDTH/2 + 100;
        this.BB.y = player.y - CANVAS_HEIGHT/2 + 100;


        //console.log(this.currentCooldown);
        if (this.inUse && (player.animations[4][0].isDone() || player.animations[4][1].isDone())) {
            this.onEnd();
            console.log('EMP ended');
        } else if (this.inUse) {
           // player.velocity.y -= 20;
            //jump on frame 2
            if (( player.animations[4][1].currentFrame() ==2 || player.animations[4][0].currentFrame() == 2) && !this.jump) {
                player.y -= 30 ;
                this.jump = true;
            }
            let molecules = gameEngine.entities.filter(e => e instanceof Molecule);

            if (player.animations[4][0].currentFrame() >= 4) {
                for (let i = 0; i < molecules.length; i++) {
                    //check if molecule collides with ability
                    if (this.BB.collide(molecules[i].BB)) {
                        //check if molecule has already been hit
                        if (this.moleculesHit.includes(molecules[i])) continue;
                        molecules[i].frameDuration = 10000;
                        molecules[i].loadAnimations();
                        molecules[i].disabled = true;
                        this.moleculesHit.push(molecules[i]);
                        
                    }
                }
            }
        } 

        for (let i = 0; i < this.moleculesHit.length; i++) {
            this.moleculesHit[i].y += 1;
        }
    }

    //Required - draw collision BB here
    draw(ctx) {
        if(debug && this.inUse) {
            ctx.strokeRect(
            this.BB.x - gameEngine.camera.x,
            this.BB.y - gameEngine.camera.y,
            this.BB.width,
            this.BB.height
            );
        }
        
    }
}