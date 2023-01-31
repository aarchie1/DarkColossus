class hud {

    constructor(game) {
        this.game = game;
        this.width = 1400;
        this.height = 900;
        this.x = 0;
        this.y = 0;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {

    }

    draw(ctx) {
        let locationTitleX = 50;
        let locationTitleY = 80;
        //draw current level text on screen top right corner if not level 0
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        if (params.LEVEL == 0) {
            ctx.fillText("Awakening Cross", locationTitleX, locationTitleY);
        } else {
            ctx.fillText("Collosus Realm " + params.LEVEL, locationTitleX, locationTitleY);
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(locationTitleX - 20, locationTitleY*1.2);
        ctx.lineTo(locationTitleX*13, locationTitleY*1.2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(locationTitleX, locationTitleY*1.3);
        ctx.lineTo(locationTitleX*10, locationTitleY*1.3);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(locationTitleX + 40, locationTitleY*1.4);
        ctx.lineTo(locationTitleX*6, locationTitleY*1.4);
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

        //draw Dark Energy currency
        ctx.fillStyle = "white";
        ctx.fillText("" + 690, locationTitleX*2.6, locationTitleY*3.6);
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/dark_energy.png"), locationTitleX, locationTitleY*3, 64, 64);

    }
}