class Dna {
    constructor() {
        this.sigmaAbility = AbilityFactory.getAbility('sigma');
        this.alphaAbility = AbilityFactory.getAbility('alpha');
        this.betaAbility = AbilityFactory.getAbility('beta');
        this.epsilonAbility = AbilityFactory.getAbility('epsilon');
    };

    update(){
        this.sigmaAbility.update();
        this.alphaAbility.update();
        this.betaAbility.update();
        this.epsilonAbility.update();
    }

    update(){
   
    }

    draw(ctx) {
        
    };
}