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

        ctx.fillStyle = "#995B38";
        //make the rect transparent
        ctx.globalAlpha = .6;
        ctx.fillRect(this.x, this.y, this.columns*this.slotSize, this.rows*this.slotSize);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                ctx.strokeRect(
                    this.x + j * this.slotSize,
                    this.y + i * this.slotSize,
                    this.slotSize,
                    this.slotSize
                );
            }
        }
        //athis.drawArrows();

        //draw the current slot
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.strokeRect(
            this.x + (this.currentSlot % this.columns) * this.slotSize,
            this.y + Math.floor(this.currentSlot / this.columns) * this.slotSize,
            this.slotSize,
            this.slotSize
        );
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = .3;
        ctx.fillRect(
            this.x + (this.currentSlot % this.columns) * this.slotSize,
            this.y + Math.floor(this.currentSlot / this.columns) * this.slotSize,
            this.slotSize,
            this.slotSize
        );
        ctx.globalAlpha = 1;
    }

    update() {

    }
}