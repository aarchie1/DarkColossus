class DarkEnergyUI {
    constructor(game) {
        this.game = game;
        this.rows = 7;
        this.columns = 2;
        this.x = CANVAS_WIDTH/2;
        this.y = CANVAS_HEIGHT/2;
        this.width = 1050;
        this.height = 675;
        this.color = "#000000";
        this.slotHorizontal = 468;
        this.slotVertical = 69;
        this.gridStartX = 331;
        this.gridStartY = 240;
        this.firstColXOffset = 5;
        this.secondColXOffset = 500;
        this.initialRowOffset = 45;
        this.followingRowOffset = 69;
        this.darkEnergyDisplayX = 610;
        this.darkEnergyDisplayY = 218;
        this.deInfo = [
            `Melee Attack: ${100 + 10 * this.game.darkEnergy.meleeAttack}%`,
            `Ranged Attack: ${100 + 10 * this.game.darkEnergy.rangedAttack}%`,
            `Attack Speed: ${100 + 10 * this.game.darkEnergy.attackSpeed}%`,
            `Movement Speed: ${100 + 10 * this.game.darkEnergy.movementSpeed}%`,
            `Jump Height: ${100 + 10 * this.game.darkEnergy.jumpHeight}%`,
            `Melee Defense: ${100 + 10 * this.game.darkEnergy.meleeDefense}%`,
            `Ranged Defense: ${100 + 10 * this.game.darkEnergy.rangedDefense}%`,
            `HP: ${100 + 10 * this.game.darkEnergy.hp}`,
            `DNA Drop Rate: ${100 + 10 * this.game.darkEnergy.dnaDropRate}%`,
            `Sigma Chance: ${100 + 10 * this.game.darkEnergy.sigmaChance}%`,
            `Alpha Chance: ${100 + 10 * this.game.darkEnergy.alphaChance}%`,
            `Beta Chance: ${100 + 10 * this.game.darkEnergy.betaChance}%`,
            `Epsilon Chance: ${100 + 10 * this.game.darkEnergy.epsilonChance}%`,
            `Dark Energy Gather: ${100 + 10 * this.game.darkEnergy.darkEnergyChance}%`,
        ];
    }



    draw(ctx) {
        let m = 0;
       // ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/UI/DE_UI_Design_No_Text.png"), this.x - this.width / 2, this.y - this.height / 2);
        ctx.font = "50px Papyrus";
        ctx.fillText("Dark Energy: " + this.game.darkEnergy.currency, this.darkEnergyDisplayX, this.darkEnergyDisplayY);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                ctx.strokeRect(
                    this.gridStartX + j * this.slotHorizontal,
                    this.gridStartY + i * this.slotVertical,
                    this.slotHorizontal,
                    this.slotVertical
                );
            }
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.strokeRect(
            this.x + (this.currentSlot % this.columns) * this.slotHorizontal,
            this.y + Math.floor(this.currentSlot / this.columns) * this.slotVertical,
            this.slotHorizontal,
            this.slotVertical
        );
        
        ctx.font = "25px Arial";
        for(let i = 0; i < 7; i++) {
            for(let j = 0; j < 2; j++) {
                if(j % 2 == 0) {
                    ctx.fillText(this.deInfo[m++], this.gridStartX + this.firstColXOffset, this.gridStartY + this.initialRowOffset + (this.followingRowOffset * i));
                } else {
                    ctx.fillText(this.deInfo[m++], this.gridStartX + this.secondColXOffset, this.gridStartY + this.initialRowOffset + (this.followingRowOffset * i));
                }
            }
        }
    }

    update() {

        this.closeDarkEnergyUI();
        
    }

    closeDarkEnergyUI() {
        if (this.game.keys.KeyE) {
            params.STATE = "gameplay";
            this.removeFromWorld = true;
            gameEngine.keys.KeyE = false;
        }
    }

}