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

    toString() {


        let string = `Sigma: ${this.sigmaAbility.name}
                        \n CooldownRarity: ${this.sigmaAbility.cooldownRarity}
                        \n EffectRarity: ${this.sigmaAbility.effectRarity}
                        CooldownSeconds: ${this.sigmaAbility.cooldown}
                        EffectModifer: ${this.sigmaAbility.effect}
                    Alpha: ${this.alphaAbility.name} 
                    ${this.alphaAbility.cooldownRarity} 
                    ${this.alphaAbility.effectRarity} 
                    ${this.alphaAbility.cooldown} 
                    ${this.alphaAbility.effect}
                    Beta: ${this.betaAbility.name} ${this.betaAbility.cooldownRarity} ${this.betaAbility.effectRarity} ${this.betaAbility.cooldown} ${this.betaAbility.effect}`;

        if (this.epsilonAbility != null){
            string += `Epsilon: ${this.epsilonAbility.name} ${this.epsilonAbility.cooldownRarity} ${this.epsilonAbility.effectRarity} ${this.epsilonAbility.cooldown} ${this.epsilonAbility.effect}`;
        }

        string += `Rarity: ${this.rarity}`;

        return string;
    }
}