class Portal {

    constructor(game, x, y, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.width = 364;
        this.height = 364;
        this.x = x;
        this.y = y;
        this.levelModifier = Math.floor(Math.random() * 10);
        this.levelModifierText = getLevelModifierText(this.levelModifier);

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.animation = new Animator(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/portal.png"), 0, 0, 364, 364, 4, 0.2, false, true);
    }

    draw(ctx) {

        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        //draw the bounding box
        ctx.strokeStyle = 'Red';
       // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        //draw above the portal the name of the modifed level i.e. "No Reapers"
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        //measure text width
        if (params.LEVEL != 0 && this.levelModifier >= 0) ctx.fillText(this.levelModifierText, this.x + this.width/5 - this.game.camera.x, this.y - this.game.camera.y - 50);
        if (this.levelModifier == -1) ctx.fillText(this.levelModifierText, this.x - this.game.camera.x, this.y - this.game.camera.y - 50);

    }

    update() {

        if ((this.game.keys.KeyE || this.game.controllerButtonX) && this.BB.collide(player.BB)) {
            currentLevelModifier = this.levelModifier;

            if (this.levelModifier >= 0) {
                this.game.camera.loadLevel();
            } else {
                this.game.camera.loadHub();
            }
        }
    }
}