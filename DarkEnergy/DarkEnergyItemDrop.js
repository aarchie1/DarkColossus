class DarkEnergyItemDrop {

    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.t = Math.random();
        this.amplitude = 2;
        this.width = 64;
        this.height = 64;
        this.BB = new BoundingBox(this.x, this.y, 64, 64);
        }

    update() {
        this.t += 0.06;
        this.y += Math.sin(this.t) * this.amplitude;
        if (this.BB.collide(player.BB)) {
            this.removeFromWorld = true;
            this.game.darkEnergy.currency += 2;
        }

    }

    draw(ctx) {
        // dark energy asset
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/dark_energy.png"), this.x - this.game.camera.x + Math.sin(this.t) * this.amplitude, this.y - this.game.camera.y + Math.sin(this.t) * this.amplitude, this.width, this.height);
     }
    

}