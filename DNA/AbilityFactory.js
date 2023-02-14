//AbilityFactory produces random abilities

function getAbility(abilityType) {
    switch (abilityType) {
        case 'sigma':
            return this.searchAbilityPool('sigma');
        case 'alpha':
            return this.searchAbilityPool('alpha');
        case 'beta':
            return this.searchAbilityPool('beta');
        case 'epsilon':
            //The Episilon ability is a random ability from the other three OR nothing
            let random = Math.round(Math.random() * 3) + 1;
            switch (random) {
                case 1:
                    return this.searchAbilityPool('sigma');
                case 2:
                    return this.searchAbilityPool('alpha');
                case 3:
                    return this.searchAbilityPool('beta');
                case 4:
                    return null;
            }
        default:
            console.log('Ability type not found');
            return null;
    }
}

function searchAbilityPool(abilityPool) {
    //PUT ALL ABILITIES HERE
    let sigmaAbilityPool = [EMPAbility];
    let alphaAbilityPool = [SupersonicAbility];
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

    let abilityIndex = Math.max(Math.round(Math.random() * abilityPool.length) - 1, 0);
    //console.log("abilityIndex: " + abilityIndex);
    return new abilityPool[abilityIndex](this.getRarity(), this.getRarity());
}

function getRarity() {
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
