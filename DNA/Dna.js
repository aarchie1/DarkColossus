class DNA {
    constructor(sigmaAbility, alphaAbility, betaAbility, epsilonAbility, rarity) {
        this.sigmaAbility = sigmaAbility;
        this.alphaAbility = alphaAbility;
        this.betaAbility = betaAbility;
        this.epsilonAbility = epsilonAbility;
        this.rarity = rarity;
        //set image
        switch (this.rarity) {
            case 1:
                this.image = ASSET_MANAGER.getAsset("./Sprites/DNA/dna_basic.png");
                break;
            case 2:
                this.image = ASSET_MANAGER.getAsset("./Sprites/DNA/dna_uncommon.png");
                break;
            case 3:
                this.image = ASSET_MANAGER.getAsset("./Sprites/DNA/dna_rare.png");
                break;
            case 4:
                this.image = ASSET_MANAGER.getAsset("./Sprites/DNA/dna_godly.png");
                break;
        }
    };

    update() {
        this.sigmaAbility.update();
        this.alphaAbility.update();
        this.betaAbility.update();
        this.epsilonAbility.update();
    }

    drawDna(ctx, x, y, slotSize) {
         let strips = 
            [(this.sigmaAbility == null) ? -1 : this.sigmaAbility.cooldownRarity,
             (this.sigmaAbility == null) ? -1 : this.sigmaAbility.effectRarity,
             (this.alphaAbility == null) ? -1 : this.alphaAbility.cooldownRarity,
             (this.alphaAbility == null) ? -1 : this.alphaAbility.effectRarity,
             (this.betaAbility == null) ? -1 : this.betaAbility.cooldownRarity,
             (this.betaAbility == null) ? -1 : this.betaAbility.effectRarity
            ];
        for (let i = 0; i < 6; i++) {
            let distance = (slotSize/7)*i;
            let offset = 0;
            if (i == 1 || i == 3 || i == 5) {
                offset = -10
            }
            
            if (strips[i] == -1) continue;     
            switch (strips[i]) {
                case 1:
                    ctx.strokeStyle = "#4C4C4C"; //basic gray
                    break;
                case 2:
                    ctx.strokeStyle = "#14663B"; //uncommon green
                    break;
                case 3:
                    ctx.strokeStyle = "#006E99"; //rare blue
                    break;
                case 4:
                    ctx.strokeStyle = "#B24A19"; //godly gold
                    break;
            }

            let c = 0.3;
            ctx.lineWidth = 5;        
            ctx.beginPath();
            ctx.moveTo(x + slotSize/1.6 + offset + distance - slotSize * c, y + slotSize/1.6 - offset - distance + slotSize * c);
            ctx.lineTo(x + slotSize/2.6 + offset + distance - slotSize * c, y + slotSize/2.6 - offset - distance + slotSize * c);
            ctx.stroke();
        }
        ctx.drawImage(this.image, x, y, slotSize, slotSize);
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