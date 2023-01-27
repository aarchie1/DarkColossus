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
        gameEngine.addEntity(new Reaper(this.game, 1000, 30));
        this.loadLevel();
    };

    loadLevel() {
        let level = getLevel(1);
        
        //add background
        for (let i = 0; i < level.platformGround.length; i++) {
            let platform = level.platformGround[i];
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, 700, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_ground.png"), new BoundingBox(platform.x, platform.y+200, 700, 100)));
            //constructor(game, x, y, width, height, sprite, boundingBox    
        }

        for (let i = 0; i < level.platformSmall.length; i++) {
            let platform = level.platformSmall[i];
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, 256, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png"), new BoundingBox(platform.x, platform.y+150, 256, 100)));
        }

        
	    gameEngine.addEntity(new Background(this.game));

        
        
    };

    loadBoss(){

    }

    loadTitleScreen(){

    }

    loadHub(){

    }

    update() {

        // splits the X axis into 4 sections [  |  |  |  ] <-- map, playable area --> [  |xx|xx|  ]
        let quadX = 1400 / 4;
        let rightBoundX = quadX * 3;
        let midX = quadX * 2;
        let leftBoundX = quadX * 1;

        // splits the Y axis into 4 sections -- check how X works and turn it sideways for Y
        let quadY = 900 / 4;
        let lowerBoundY = quadY * 3;
        let midY = quadY * 2;
        let upperBoundY = quadY * 1;

        // sets left, right, lower, and upper, map border so player cannot leave the area.
        let leftXLimit = 0;
        let rightXLimit = 10000;
        let lowerYLimit = 700;
        let upperYLimit = -10000;

        //Make the camera move based off this bounding box
        if (this.player.x > rightBoundX && !(this.player.x >= rightXLimit)) this.x = this.player.x - rightBoundX;
        if (this.player.x < leftBoundX && !(this.player.x - leftBoundX <= leftXLimit)) this.x = this.player.x - leftBoundX;

        if (this.player.y < upperBoundY && !(this.player.y <= upperYLimit)) this.y = this.player.y - upperBoundY;
        if (this.player.y > lowerBoundY && !(this.player.y - lowerBoundY != lowerYLimit)) this.y = this.player.y - lowerBoundY;

    };

    draw(ctx) {

    };

    
}

	class Background {
		constructor(game) {
            this.game = game;
			this.width = 2100;
			this.height = 1350;
			this.x = -200;
			this.y = -200
			this.scrollSpeed = 0.02;
			this.image = ASSET_MANAGER.getAsset("./Sprites/LevelAssets/background.png");
		}

		draw(ctx) {
			ctx.drawImage(this.image, this.x-(this.game.camera.x*this.scrollSpeed), this.y-(this.game.camera.y*this.scrollSpeed), this.width, this.height);
		}
		update() {

		}
	}
	//TEST ENTITIES
	//gameEngine.addEntity(new DnaTester());
	//gameEngine.addEntity(new LevelFactoryTester());