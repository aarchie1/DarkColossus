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

        //add background
        for (let i = 0; i < level.platformGround.length; i++) {
            let platform = level.platformGround[i];
            // original x values : 700 
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, 16000, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_ground.png"), new BoundingBox(platform.x, platform.y+200, 15800, 100)));
            //constructor(game, x, y, width, height, sprite, boundingBox    
        }

        for (let i = 0; i < level.platformSmall.length; i++) {
            let platform = level.platformSmall[i];
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, 256, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png"), new BoundingBox(platform.x, platform.y+150, 256, 100)));
        }

	    gameEngine.addEntity(new Background(this.game));

        
        
    };

    randomizeLevel() {



    }

    loadBoss(){

    }

    loadTitleScreen(){

    }

    loadHub(){

    }

    update() {

        // splits the X axis into 5 sections [  |  |  |  |  ] <-- map, playable area --> [  |xx|xx|xx|  ]
        let quadX = 1400 / 5;
        let rightBoundX = quadX * 3;
        let midX = quadX * 2.5;
        let leftBoundX = quadX * 1;

        // splits the Y axis into 4 sectionsd
        let quadY = 900 / 4;
        let lowerBoundY = quadY * 3;
        let midY = quadY * 2;
        let upperBoundY = quadY * 1;

        // sets left, right, lower, and upper, map border so player cannot leave the area.
        let leftXLimit = 0;      // do not change -- does not traverse left of starting point
        let rightXLimit = 16000; // 16k to stay within background image (right)
        let lowerYLimit = 700;   // 700 is reasonable to keep starting platform visible
        let upperYLimit = -8500; // -8500 to stay within background image (top)

        //Make the camera move based off this bounding box
/*      // Keeps player in rightBoundX
        if (this.player.x > rightBoundX && !(this.player.x + rightBoundX >= rightXLimit)) this.x = this.player.x - rightBoundX;
        if (this.player.x < leftBoundX && !(this.player.x - leftBoundX <= leftXLimit)) this.x = this.player.x - leftBoundX;
*/
        // Keeps player centered on X
        if (this.player.x > midX && !(this.player.x + midX >= rightXLimit)) this.x = this.player.x - midX;
        if (this.player.x < midX && !(this.player.x - midX <= leftXLimit)) this.x = this.player.x - midX;


        if (this.player.y < upperBoundY && !(this.player.y + upperBoundY <= upperYLimit)) this.y = this.player.y - upperBoundY;
        if (this.player.y > lowerBoundY && !(this.player.y - lowerBoundY >= lowerYLimit)) this.y = this.player.y - lowerBoundY;


        //if (this.player.y < upperBoundY && !(this.player.y <= upperYLimit)) this.y = this.player.y - upperBoundY;
        //if (this.player.y > lowerBoundY && !(this.player.y - lowerBoundY != lowerYLimit)) this.y = this.player.y - lowerBoundY;

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