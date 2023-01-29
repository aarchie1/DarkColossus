class DarkEnergyUI {
    constructor(game) {
        this.game = game;
        this.rows = 7;
        this.columns = 2;
        this.x = CANVAS_WIDTH/2;
        this.y = CANVAS_HEIGHT/2;
        this.width = 1050;
        this.height = 675;
        this.color = "#FFFFFF";

    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/UI/DE_UI_Design_No_Text.png"), this.x - this.width / 2, this.y - this.height / 2);
        ctx.font = "50px Papyrus";
        ctx.fillText("Dark Energy: " + this.game.darkEnergy.currency, this.x - this.width / 4, 210);
    }

    update() {

    }
}