class Portal {

    constructor(game) {
        this.game = game;
        this.width = 1400;
        this.height = 900;
        this.x = 1250;
        this.y = 450;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/portal.png"), 0, 0, 364, 364, 4, 0.2, false, true);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }

    update() {

    }
}