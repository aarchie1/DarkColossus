class AbilityFactory {
    constructor() {
        //Put all the abilities here as we make em
        this.sigmaAbilityPool = [MockAbility];
        this.alphaAbilityPool = [MockAbility];
        this.betaAbilityPool = [MockAbility];
    }

    getAbility(abilityType) {
        switch (abilityType) {
            case 'sigma':
                return this.searchAbilityPool(this.sigmaAbilityPool);
            case 'alpha':
                return this.searchAbilityPool(this.alphaAbilityPool);
            case 'beta':
                return this.searchAbilityPool(this.betaAbilityPool);
            case 'epsilon':
                //The Episilon ability is a random ability from the other three OR nothing
                let random = Math.round(Math.random() * 3) + 1;
                switch (random) {
                    case 1:
                        return this.searchAbilityPool(this.sigmaAbilityPool);
                    case 2:
                        return this.searchAbilityPool(this.alphaAbilityPool);
                    case 3:
                        return this.searchAbilityPool(this.betaAbilityPool);
                    case 4:
                        return null;
                }
            default:
                console.log('Ability type not found');
                return null;
        }
    }

    searchAbilityPool(abilityPool) {
        let abilityIndex = Math.round(Math.random() * abilityPool.length);
        return new abilityPool[abilityIndex](this.getRarity(), this.getRarity());
    }


    getRarity() {
        let random = Math.random();
        if (random < 0.5) {
            return 1; //basic
        } else if (random < 0.8) {
            return 2; //uncommon
        } else if (random < 0.95) {
            return 3; //rare
        } else {
            return 4; //godly
        }
    }
}