
//DNA Factory creates random DNA or DNA based on parents' DNA
//DNA Factory follows the singleton and factory pattern
class DnaFactory {
    
    //This method will be used to create a new random DNA 
    static getRandomDNA() {
        const sigmaAbility = AbilityFactory.getAbility('sigma');
        const alphaAbility = AbilityFactory.getAbility('alpha');
        const betaAbility = AbilityFactory.getAbility('beta');
        const epsilonAbility = AbilityFactory.getAbility('epsilon');

        let epsilonAbilityCooldownRarity = (epsilonAbility == null) ? 0 : epsilonAbility.cooldownRarity;
        let epsilonAbilityEffectRarity = (epsilonAbility == null) ? 0 : epsilonAbility.effectRarity;
    
        const rarity = this.calculateDnaRarity(
                sigmaAbility.cooldownRarity,
                alphaAbility.cooldownRarity,
                betaAbility.cooldownRarity,
                epsilonAbilityCooldownRarity,
                sigmaAbility.effectRarity,
                alphaAbility.effectRarity,
                betaAbility.effectRarity,
                epsilonAbilityEffectRarity
            );
                
        return new DNA(
                sigmaAbility,
                alphaAbility,
                betaAbility,
                epsilonAbility,
                rarity
            );
    };

    //This method will be used to create a new DNA based on the parents' DNA
    //We don't use the AbilityFactory because we are not getting random abilities
    //Pass in two DNA objects
    static getDNAFromParents(parent1, parent2) {
        //Step 1: Inherit abilities from Parent DNA
        let childSigmaAbility = this.getAbilityFromParents(parent1.sigmaAbility, parent2.sigmaAbility);
        let childAlphaAbility = this.getAbilityFromParents(parent1.alphaAbility, parent2.alphaAbility);
        let childBetaAbility = this.getAbilityFromParents(parent1.betaAbility, parent2.betaAbility);
        let childEpsilonAbility = AbilityFactory.getAbility('epsilon');
        
        //Step 2: Inherit cooldown and effect rarity from Parent DNA
        childSigmaAbility.cooldownRarity = this.getRarityFromParents(parent1.sigmaAbility.cooldownRarity,parent2.sigmaAbility.cooldownRarity);
        childAlphaAbility.cooldownRarity = this.getRarityFromParents(parent1.alphaAbility.cooldownRarity,parent2.alphaAbility.cooldownRarity);
        childBetaAbility.cooldownRarity = this.getRarityFromParents(parent1.betaAbility.cooldownRarity,parent2.betaAbility.cooldownRarity);
        childSigmaAbility.effectRarity = this.getRarityFromParents(parent1.sigmaAbility.effectRarity,parent2.sigmaAbility.effectRarity);
        childAlphaAbility.effectRarity = this.getRarityFromParents(parent1.alphaAbility.effectRarity,parent2.alphaAbility.effectRarity);
        childBetaAbility.effectRarity = this.getRarityFromParents(parent1.betaAbility.effectRarity,parent2.betaAbility.effectRarity);

        //Step 3: Update the cooldown and effect of the inherited abilities 
        //        from the inherited rarities
        childSigmaAbility.setCooldown();
        childSigmaAbility.setEffect();
        childAlphaAbility.setCooldown();
        childAlphaAbility.setEffect();
        childBetaAbility.setCooldown();
        childBetaAbility.setEffect();

        //Step 4: Calculate the rarity of the child DNA
        let epsilonAbilityCooldownRarity = (childEpsilonAbility == null) ? 0 : childEpsilonAbility.cooldownRarity;
        let epsilonAbilityEffectRarity = (childEpsilonAbility == null) ? 0 : childEpsilonAbility.effectRarity;
    
        const rarity = this.calculateDnaRarity(
                childSigmaAbility.cooldownRarity,
                childAlphaAbility.cooldownRarity,
                childBetaAbility.cooldownRarity,
                epsilonAbilityCooldownRarity,
                childSigmaAbility.effectRarity,
                childAlphaAbility.effectRarity,
                childBetaAbility.effectRarity,
                epsilonAbilityEffectRarity
            );

        //Step 5: Return the child DNA
        return new DNA(
                childSigmaAbility,
                childAlphaAbility,
                childBetaAbility,
                childEpsilonAbility,
                rarity
            );
    }

    static getAbilityFromParents(parent1, parent2) {
        let childAblity = parent1.dominant ? parent1 : parent2;

        if ( (parent1.dominant && parent2.dominant) || 
            (!parent1.dominant && !parent2.dominant) ) {
            let random = Math.round(Math.random());
            childAblity = random ? parent1 : parent2;
        } 

        return childAblity;
    }

    static getRarityFromParents(parent1Rarity, parent2Rarity) {
        let rarityRange = Math.abs(parent1Rarity - parent2Rarity);
        let rarity = Math.round(Math.random() * rarityRange) + 
                     Math.min(parent1Rarity, parent2Rarity);
        return rarity;
    }

    static calculateDnaRarity(sigmaCooldownRarity, 
                        alphaCooldownRarity, 
                        betaCooldownRarity, 
                        epsilonCooldownRarity, 
                        sigmaEffectRarity, 
                        alphaEffectRarity, 
                        betaEffectRarity, 
                        epsilonEffectRarity) {
        let numberOfAttributes = (epsilonCooldownRarity == 0) ? 6 : 8;
        let rarity = 0;
        rarity += sigmaCooldownRarity;
        rarity += alphaCooldownRarity;
        rarity += betaCooldownRarity;
        rarity += sigmaEffectRarity;
        rarity += alphaEffectRarity;
        rarity += betaEffectRarity;
        rarity += epsilonCooldownRarity;
        rarity += epsilonEffectRarity;
        rarity = Math.round(rarity / numberOfAttributes);
        return rarity;
    }
}