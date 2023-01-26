class SmallPlatform {
    BLOCKWIDTH = 256;
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w}); 
        this.spritesheet = ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png");
        this.BB = new BoundingBox(this.x, this.y+120, this.w, this.BLOCKWIDTH /2);
    };

    update() { 
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.BLOCKWIDTH);
        ctx.strokeStyle = 'Red';
        if (debug) ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
};
