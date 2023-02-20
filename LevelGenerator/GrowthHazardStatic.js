class GrowthHazardStatic {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = ASSET_MANAGER.getAsset("./Sprites/LevelAssets/Hazards/hazard_growth_tall_static.png")     
        this.width = 256;
        this.height = 512;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.BB.collide(player.BB)) {
            player.velocity.x *= -1;
            if (player.currentIFrameTimer <= 0){
                player.health--;
                player.currentIFrameTimer = player.maxIFrameTimer;
            }
        }
    }




    draw(ctx) {
        ctx.drawImage(this.image, this.x - gameEngine.camera.x, this.y - gameEngine.camera.y, this.width, this.height);
        if (debug){
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - gameEngine.camera.x, this.BB.y - gameEngine.camera.y, this.BB.width, this.BB.height);
        }
    }
}