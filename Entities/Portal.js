class Portal {

    constructor(game, x, y, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.width = 1400;
        this.height = 900;
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.animation = new Animator(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/portal.png"), 0, 0, 364, 364, 4, 0.2, false, true);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }

    update() {

        if (this.game.keys.KeyE && this.BB.collide(player.BB)) {
            this.sceneManager.loadLevel();
        }
    }
}