class hud {

    constructor(game) {
        this.game = game;
        this.width = 1400;
        this.height = 900;
        this.x = 0;
        this.y = 0;
        this.locationTitleX = 50;
        this.locationTitleY = 80;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {

    }

    draw(ctx) {
        
        //draw current level text on screen top right corner if not level 0
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        if (params.LEVEL == 0) {
            ctx.fillText("Awakening Cross", this.locationTitleX, this.locationTitleY);
        } else {
            ctx.fillText("Collosus Realm " + params.LEVEL, this.locationTitleX, this.locationTitleY);
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(this.locationTitleX - 20, this.locationTitleY*1.2);
        ctx.lineTo(this.locationTitleX*13, this.locationTitleY*1.2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.locationTitleX, this.locationTitleY*1.3);
        ctx.lineTo(this.locationTitleX*10, this.locationTitleY*1.3);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.locationTitleX + 40, this.locationTitleY*1.4);
        ctx.lineTo(this.locationTitleX*6, this.locationTitleY*1.4);
        ctx.stroke();

        //draw health bar rectangle
        ctx.fillStyle = "#FF3232";
        ctx.fillRect(50, 150, 300, 50);
        //draw health bar fill
        ctx.fillStyle = "green";
        ctx.fillRect(50, 150, player.hp, 50);
        //draw health bar border
        ctx.strokeStyle = "white";
        //set line width to 5
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 150, 300, 50);


        this.drawDarkEnergyHud(ctx);
        this.drawAbilityHud(ctx);

        //this.pauseControl(ctx);
    }

    drawDarkEnergyHud(ctx) {
        //draw Dark Energy currency
        ctx.fillStyle = "white";
        //MEASURE TEXT WIDTH
        let textWidth = ctx.measureText("" + params.DARK_ENERGY.currency).width;
        ctx.fillText("" + params.DARK_ENERGY.currency, CANVAS_WIDTH - textWidth - 30, this.locationTitleY*.9);
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/dark_energy.png"), CANVAS_WIDTH - textWidth - 100, this.locationTitleY*.3, 64, 64);
    }

    drawAbilityHud(ctx) {
        //draw the dnaSlot1 and dnaSlot2

        ctx.fillStyle = "#994B50";
        ctx.globalAlpha = 0.7;
        ctx.fillRect(30, CANVAS_HEIGHT - 150, 400, 116);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(30, CANVAS_HEIGHT - 150, 400, 116);
        ctx.globalAlpha = 1;
        if (params.INVENTORY.dnaSlot1) params.INVENTORY.dnaSlot1.drawDna(ctx, 100, 700, 116);
        if (params.INVENTORY.dnaSlot2) params.INVENTORY.dnaSlot2.drawDna(ctx, 300, 700, 116);

    }

    pauseControl(ctx) {
        //display controls for the game in pause menu
        if (this.game.PAUSED) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 1400, 900);
            ctx.fillStyle = "white";
            ctx.font = "50px Arial";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", 700, 100);
            ctx.font = "30px Arial";
            ctx.fillText("Press 'P' to resume", 700, 150);
            ctx.fillText("Press 'R' to restart", 700, 200);
            ctx.fillText("Press 'ESC' to return to main menu", 700, 250);
        }
    }
}