class SupersonicAbility{

    constructor(cooldownRarity, effectRarity) {
        //Necessary properties for all abilities
        this.name = 'Supersonic';
        this.description = 'This is a mock ability';
        this.icon = 'mockAbilityIcon';
        this.dominant = false;
        this.cooldownRarity = cooldownRarity;
        this.effectRarity = effectRarity;
        this.cooldown = this.setCooldown(cooldownRarity);
        this.effect = this.setEffect(effectRarity);
        this.currentCooldown = 0;

        //Supersonic specific properties
        console.log("player: " + player);
        this.originalAnimation = player.animations[1][0];
        this.speedIncrease = 2000;
    
        //Debug
        console.log('Supersonic Ability created');
        console.log('Cooldown Rarity: ' + cooldownRarity);
        console.log('Effect Rarity: ' + effectRarity);
    }

    onEquip() {

        player.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Abilities/supersonic.png"), 0, 0, 320, 256, 9, .075, 0, true);
        player.MAX_RUN += this.speedIncrease;

        // facing left = 1
        //this.animations[1][1] 
    }

    onUnequip() {
        player.animations[1][0] = this.originalAnimation;
        player.MAX_RUN -= this.speedIncrease;
    }

    //GAME CHARACTER CALLS THIS
    onUse() {

    }

    //Ability itself
    onEnd() {
        

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
        //This will be called through the DNA's update method.
        console.log('Mock Ability updated');
        if (Math.abs(player.velocity.x) == player.MAX_RUN && player.state == 1) {
            gameEngine.entities.forEach((enemy) => {
                // Collisions with players bounding box
                if (enemy != null && enemy instanceof Reaper && player.BB.collide(enemy.BB)) {
                    enemy.hp -= this.effect;
                }
            })
        }
    }
}