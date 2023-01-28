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

    drawInInventory(ctx, x, y) {
        
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