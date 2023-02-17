class TemplateAbility {

    constructor(cooldownRarity, effectRarity) {
        //Necessary properties for all abilities
        this.name = '';
        this.description = '' + this.effect + '';
        this.icon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/INSERT_ICON_HERE.png");
        this.inUseIcon = ASSET_MANAGER.getAsset("./Sprites/Abilities/Icons/INSERT_ICON_HERE.png");
        this.dominant = false;
        this.cooldownRarity = cooldownRarity;
        this.effectRarity = effectRarity;
        this.cooldown = this.setCooldown(cooldownRarity);
        this.effect = this.setEffect(effectRarity);
        this.currentCooldown = 0;
        this.inUse = false;

        //Ability specific properties
        //insert properties here
    }

    onEquip() {
        player.MAX_JUMPS = 3;
    }

    onUnequip() {
        player.MAX_JUMPS = 2;
    }

    //This runs when the Character presses the ability button
    onUse() {

    }

    //The ability will call this itself 
    //(useful for cooldowns, reverting player state, etc)
    onEnd() {

    }

    //Edit these to change the cooldown of the ability based on rarity
    setCooldown(cooldownRarity) { 

    }


    //Edit these to change the power of the ability based on rarity
    setEffect(effectRarity) {

    }

    //Required
    update() {
        
    }

    //Required
    draw(ctx) {
        
    }
}