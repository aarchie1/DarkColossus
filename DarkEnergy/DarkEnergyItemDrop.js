class DarkEnergyItemDrop {

    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.t = Math.random();
        this.amplitude = 2;
        this.width = (Math.random() > 0.5) ? 32 : 64;
        this.height = (Math.random() > 0.5) ? 32 : 64;
        }

    update() {
        this.t += 0.06;
        this.y += Math.sin(this.t) * this.amplitude;
    }

    draw(ctx) {
        // dark energy asset
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/dark_energy.png"), this.x - this.game.camera.x + Math.sin(t) * this.amplitude, this.y - this.game.camera.y + Math.sin(this.t) * this.amplitude, this.width, this.height);
     }
    

}