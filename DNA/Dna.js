class DNA {
    constructor(sigmaAbility, alphaAbility, betaAbility, epsilonAbility, rarity) {
        this.sigmaAbility = sigmaAbility;
        this.alphaAbility = alphaAbility;
        this.betaAbility = betaAbility;
        this.epsilonAbility = epsilonAbility;
        this.rarity = rarity;
    };

    update() {
        this.sigmaAbility.update();
        this.alphaAbility.update();
        this.betaAbility.update();
        this.epsilonAbility.update();
    }

    drawDna(ctx, x, y, slotSize) {
        //draw 6 diagonal lines over the dna image to represent the rarity and cooldown rarity of each ability   
        //draw sigma ability    
        ctx.strokeStyle = this.sigmaAbility.cooldownRarity;
        ctx.lineWidth = 5;
        let length = slotSize/4;

        for (let i = 0; i < 6; i++) {
            let distance = (slotSize/6.5)*i;
            let offset = 0;
            if (i == 1 || i == 3 || i == 5) {
                offset = -10
            }

            ctx.beginPath();
            ctx.moveTo(x + slotSize/1.7 + offset + distance - slotSize * 0.4, y + slotSize/1.7 - offset - distance + slotSize * 0.4);
            ctx.lineTo(x + slotSize/2.7 + offset + distance - slotSize * 0.4, y + slotSize/2.7 - offset - distance + slotSize * 0.4);
            ctx.stroke();
        }
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/DNA/dna_basic.png"), x, y, slotSize, slotSize);

        // ctx.beginPath();
        // ctx.moveTo(x + slotSize/2, y + slotSize/2);
        // ctx.lineTo(x + slotSize/4, y + slotSize/4);
        // ctx.stroke();
        

        

        // ctx.strokeStyle = this.sigmaAbility.effectRarity;
        // ctx.beginPath();
        // ctx.moveTo(x + slotSize, y);
        // ctx.lineTo(x, y + slotSize);
        
        // ctx.stroke();
        // //draw alpha ability
        // ctx.strokeStyle = this.alphaAbility.cooldownRarity;
        // ctx.beginPath();
        // ctx.moveTo(x + slotSize / 2, y);
        // ctx.lineTo(x + slotSize / 2, y + slotSize);
        // ctx.stroke();
        // ctx.strokeStyle = this.alphaAbility.effectRarity;
        // ctx.beginPath();
        // ctx.moveTo(x, y + slotSize / 2);
        // ctx.lineTo(x + slotSize, y + slotSize / 2);
        // ctx.stroke();
        // //draw beta ability
        // ctx.strokeStyle = this.betaAbility.cooldownRarity;
        // ctx.beginPath();
        // ctx.moveTo(x, y);
        // ctx.lineTo(x + slotSize / 2, y + slotSize / 2);
        // ctx.stroke();
        // ctx.strokeStyle = this.betaAbility.effectRarity;
        // ctx.beginPath();
        // ctx.moveTo(x + slotSize, y);
        // ctx.lineTo(x + slotSize / 2, y + slotSize / 2);
        // ctx.stroke();

    }

    toString() {


        let string = `DNA Overall rarity: ${this.rarity}
                        \nSigma:` +
                              `\n   Name: ${this.sigmaAbility.name}` +
                                `\n   CooldownRarity: ${this.sigmaAbility.cooldownRarity}` +
                                `\n   EffectRarity: ${this.sigmaAbility.effectRarity}` +
                                `\n   CooldownSeconds: ${this.sigmaAbility.cooldown}` +
                                `\n   EffectModifer: ${this.sigmaAbility.effect}` +
                        `\nAlpha:` +
                                `\n   Name: ${this.alphaAbility.name}` +
                                `\n   CooldownRarity: ${this.alphaAbility.cooldownRarity}` +
                                `\n   EffectRarity: ${this.alphaAbility.effectRarity}` +
                                `\n   CooldownSeconds: ${this.alphaAbility.cooldown}` +
                                `\n   EffectModifer: ${this.alphaAbility.effect}` +
                        `\nBeta:` +
                                `\n   Name: ${this.betaAbility.name}` +
                                `\n   CooldownRarity: ${this.betaAbility.cooldownRarity}` +
                                `\n   EffectRarity: ${this.betaAbility.effectRarity}` +
                                `\n   CooldownSeconds: ${this.betaAbility.cooldown}` +
                                `\n   EffectModifer: ${this.betaAbility.effect}`;

        if (this.epsilonAbility != null){
            string += `\nEpsilon:` +
                                `\n   Name: ${this.epsilonAbility.name}` +
                                `\n   CooldownRarity: ${this.epsilonAbility.cooldownRarity}` +
                                `\n   EffectRarity: ${this.epsilonAbility.effectRarity}` +
                                `\n   CooldownSeconds: ${this.epsilonAbility.cooldown}` +
                                `\n   EffectModifer: ${this.epsilonAbility.effect}`;
        } else {
            string += `\nEpsilon: null`;
        }

        return string;
    }
}