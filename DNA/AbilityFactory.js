
//AbilityFactory produces random abilities
//AbilityFactory follows the singleton and factory pattern
class AbilityFactory {

    getAbility(abilityType) {
        switch (abilityType) {
            case 'sigma':
                return searchAbilityPool('sigma');
            case 'alpha':
                return searchAbilityPool('alpha');
            case 'beta':
                return searchAbilityPool('beta');
            case 'epsilon':
                //The Episilon ability is a random ability from the other three OR nothing
                let random = Math.round(Math.random() * 3) + 1;
                switch (random) {
                    case 1:
                        return searchAbilityPool('sigma');
                    case 2:
                        return searchAbilityPool('alpha');
                    case 3:
                        return searchAbilityPool('beta');
                    case 4:
                        return null;
                }
            default:
                console.log('Ability type not found');
                return null;
        }
    }

    searchAbilityPool(abilityPool) {
        //PUT ALL ABILITIES HERE
        let sigmaAbilityPool = [MockAbility];
        let alphaAbilityPool = [MockAbility];
        let betaAbilityPool = [MockAbility];
        switch (abilityPool) {
            case 'sigma':
                abilityPool = sigmaAbilityPool;
                break;
            case 'alpha':
                abilityPool = alphaAbilityPool;
                break;
            case 'beta':
                abilityPool = betaAbilityPool;
                break;
            default:
                console.log('Ability pool not found');
                return null;
        }

        let abilityIndex = Math.round(Math.random() * abilityPool.length);
        return new abilityPool[abilityIndex](getRarity(), getRarity());
    }

    getRarity() {
        let random = Math.random();
        if (random < 0.5) {
            return 1; //basic 50%
        } else if (random < 0.8) {
            return 2; //uncommon 30%
        } else if (random < 0.95) {
            return 3; //rare 15%
        } else {
            return 4; //godly 5%
        }
    }
}