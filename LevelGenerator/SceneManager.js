class SceneManager {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.game.camera = this;
        this.gameOver = false;
        this.transition = false;
        this.player = new GameCharacter(this.game, 0, 0);
        gameEngine.addEntity(this.player);

        this.loadLevel();
    };

    loadLevel() {
        let level = getLevel(1);

        for (let i = 0; i < level.platformGround.length; i++) {
            let platform = level.platformGround[i];
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, 700, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_ground.png"), new BoundingBox(platform.x, platform.y+200, 700, 100)));
            //constructor(game, x, y, width, height, sprite, boundingBox    
        }

        for (let i = 0; i < level.platformSmall.length; i++) {
            let platform = level.platformSmall[i];
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, 256, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png"), new BoundingBox(platform.x, platform.y+150, 256, 100)));
        }
        
        
    };

    loadBoss(){

    }

    loadTitleScreen(){

    }

    loadHub(){

    }

    update() {
        let midpointRightX = 700;
        let midpointLeftX = 700;
        let midpointUpY = 450;
        let midpointDownY = 450;

        //Make the camera move based off this bounding box
        if (this.player.x > midpointRightX) {
            this.x = this.player.x - midpointRightX;
        }
        if (this.player.x < midpointLeftX) this.x = this.player.x - midpointLeftX;
        if (this.player.y > midpointDownY) this.y = this.player.y - midpointDownY;
        if (this.player.y < midpointUpY) this.y = this.player.y - midpointUpY;
    };

    draw(ctx) {

    };
}