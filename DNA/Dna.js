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
        let string = `Sigma: ${this.sigmaAbility.cooldownRarity} ${this.sigmaAbility.effectRarity} ${this.sigmaAbility.cooldown} ${this.sigmaAbility.effect}
                    Alpha: ${this.alphaAbility.cooldownRarity} ${this.alphaAbility.effectRarity} ${this.alphaAbility.cooldown} ${this.alphaAbility.effect}
                    Beta: ${this.betaAbility.cooldownRarity} ${this.betaAbility.effectRarity} ${this.betaAbility.cooldown} ${this.betaAbility.effect}
                    Epsilon: ${this.epsilonAbility.cooldownRarity} ${this.epsilonAbility.effectRarity} ${this.epsilonAbility.cooldown} ${this.epsilonAbility.effect}
                    Rarity: ${this.rarity}`;

        return string;
    }
}