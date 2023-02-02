
class SceneManager {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.game.camera = this;
        this.gameOver = false;
        this.transition = false;
        this.player = new GameCharacter(this.game, 0, 0);

        // splits the X axis into 5 sections [  |  |  |  |  ] <-- map, playable area --> [  |xx|xx|xx|  ]
        this.quadX = 1400 / 5;
        this.rightBoundX = this.quadX * 3;
        this.midX = this.quadX * 2.5;
        this.leftBoundX = this.quadX * 1;

        // splits the Y axis into 4 sectionsd
        this.quadY = 900 / 4;
        this.lowerBoundY = this.quadY * 3;
        this.midY = this.quadY * 2;
        this.upperBoundY = this.quadY * 1;

        // sets left, right, lower, and upper, map border so player cannot leave the area.
        this.leftXLimit = 0;      // do not change -- does not traverse left of starting point
        this.rightXLimit = 16000; // 16k to stay within background image (right)
        this.lowerYLimit = 700;   // 700 is reasonable to keep starting platform visible
        this.upperYLimit = -8500; // -8500 to stay within background image (top)

        player = this.player;
        this.loadHub(); 
        //this.loadLevel(); 
    };

    loadLevel() {
        this.clearLevel();
       // gameEngine.addEntity(new Reaper(this.game, 1000, 520, 2));

        params.LEVEL += 1;
        let level = getLevel(params.LEVEL);
        let xBoundMin = 1300;
        let xBoundMax = 13000;
        let yBoundMin = 600;
        let yBoundMax = -800;

        this.rightXLimit = 16000;

        //Enemy Testing Lines
        //this.game.addEntity(new Reaper(this.game, 1000, 520, 2));
        this.game.addEntity(new Molecule(this.game, 1000, 520, 2));

        // initial platform final platform
        let origX = -700;
        for (let i = 0; i < 26; i++) {

            let platform = level.platformGround[0];
            this.game.addEntity(new Platform(this.game, origX, platform.y, 700, 256,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_ground.png"), new BoundingBox(platform.x, platform.y + 200, origX, 100)));
            origX += 700;
        }

        // random ground platforms
        for (let i = 0; i < level.platformGround.length; i++) {
            let platform = level.platformGround[i];
            let x = Math.random() * (xBoundMax - xBoundMin) + xBoundMin;
            // original x values : 700 
            this.game.addEntity(new Platform(this.game, x, platform.y, 700, 256,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_ground.png"), new BoundingBox(x, platform.y + 200, 700, 100)));
            //constructor(game, x, y, width, height, sprite, boundingBox    
        }

        // random small platforms
        for (let i = 0; i < level.platformSmall.length; i++) {
            //let platform = level.platformSmall[i];
            let x = Math.random() * (xBoundMax - xBoundMin) + xBoundMin;
            let y = Math.random() * (yBoundMax - yBoundMin) + yBoundMin;

            this.game.addEntity(new Platform(this.game, x, y, 256, 256,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png"), new BoundingBox(x, y + 150, 256, 100)));
        }

        // random large platforms
        for (let i = 0; i < level.platformLarge.length; i++) {
            //let platform = level.platformLarge[i];
            let x = Math.random() * (xBoundMax - xBoundMin) + xBoundMin;
            let y = Math.random() * (yBoundMax - yBoundMin) + yBoundMin;

            this.game.addEntity(new Platform(this.game, x, y, 884, 496,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_large.png"), new BoundingBox(x, y + 150, 884, 100)));
        }

        // random tiny platforms
        for (let i = 0; i < level.platformTiny.length; i++) {
            //let platform = level.platformTiny[i];
            let x = Math.random() * (xBoundMax - xBoundMin) + xBoundMin;
            let y = Math.random() * (yBoundMax - yBoundMin) + yBoundMin;

            this.game.addEntity(new Platform(this.game, x, y, 184, 184,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_tiny.png"), new BoundingBox(x, y + 150, 184, 100)));
        }

        //spawn in enemies
        for (let i = 0; i < level.reaper.length; i++) {
            let enemy = level.reaper[i];
            this.game.addEntityFirst(new Reaper(this.game, enemy.x, enemy.y, 2));
        }

        //add background
        gameEngine.addEntity(new Background(this.game));
        
    
        
    };

    randomizeLevel() {



    }

    loadBoss(){

    }

    loadHub() {
        params.LEVEL = 0;
        this.clearLevel();

        this.rightXLimit = 1400;
        //Create Inventory UI
        let inventoryBB = new BoundingBox(900, 525, 248, 200);
        this.game.addEntity(new Interactable(this.game, 900, 525, 242, 194, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/workbench.png"), inventoryBB, () => {
            //check if inventory is already open
            if (params.STATE != "menu") {
                this.game.addEntityFirst(new InventoryUI(this.game));
                params.STATE = "menu";
            }
        }));

        //Create DE UI
        this.game.addEntity(new Interactable(this.game, 400, 525, 242, 194, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/workbench.png"), new BoundingBox(400, 525, 248, 200), () => {
            if (params.STATE != "menu") {
                this.game.addEntityFirst(new DarkEnergyUI(this.game));
                params.STATE = "menu";
            }
        }));

        //Create Portal Interactable
        this.game.addEntity(new Portal(this.game, this));
        this.game.addEntity(new Platform(this.game, 1, 500, 1600, 400, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(0, 830, 1600, 400)));
        this.game.addEntity(new Cross_Background(this.game, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/cross_background.png")));
        this.game.addEntity(new Background(this.game));

    }

    loadTitleScreen(){

    }

    update() {


        //Make the camera move based off this bounding box
/*      // Keeps player in rightBoundX
        if (this.player.x > rightBoundX && !(this.player.x + rightBoundX >= rightXLimit)) this.x = this.player.x - rightBoundX;
        if (this.player.x < leftBoundX && !(this.player.x - leftBoundX <= leftXLimit)) this.x = this.player.x - leftBoundX;
*/
        // Keeps player centered on X
        if (this.player.x > this.midX && !(this.player.x + this.midX >= this.rightXLimit)) this.x = this.player.x - this.midX;
        if (this.player.x < this.midX && !(this.player.x - this.midX <= this.leftXLimit)) this.x = this.player.x - this.midX;


        if (this.player.y < this.upperBoundY && !(this.player.y + this.upperBoundY <= this.upperYLimit)) this.y = this.player.y - this.upperBoundY;
        if (this.player.y > this.lowerBoundY && !(this.player.y - this.lowerBoundY >= this.lowerYLimit)) this.y = this.player.y - this.lowerBoundY;


        //if (this.player.y < upperBoundY && !(this.player.y <= upperYLimit)) this.y = this.player.y - upperBoundY;
        //if (this.player.y > lowerBoundY && !(this.player.y - lowerBoundY != lowerYLimit)) this.y = this.player.y - lowerBoundY;

    };

    draw(ctx) {

    };

    clearLevel() {
        //remove everything from this.game.entities except Inventory, DarkEnergy, SceneManager, etc.
        this.game.entities = this.game.entities.filter(function (entity) {
            return entity instanceof Inventory || entity instanceof DarkEnergy || entity instanceof SceneManager || entity instanceof hud;
        });

        this.game.camera.x = 0;
        this.game.camera.y = 0;
        this.player.x = 0;
        this.player.y = 580;
        this.game.addEntity(this.player);


    }
    
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

    class Cross_Background {
        constructor(game) {
            this.game = game;
            this.width = 1400;
            this.height = 900;
            this.x = 90;
            this.y = -40;
            this.animation = new Animator(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/cross_background.png"), 0, 0, 1400, 900, 1, 1, true, true);
            this.t = 0;
            this.amplitude = 20;
        }

        draw(ctx) {
            this.t += 0.025;
           // ctx.drawImage(this.image, this.x-(this.game.camera.x), this.y-(this.game.camera.y), this.width, this.height);
            this.animation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y-this.game.camera.y + Math.sin(this.t) * this.amplitude, 1);
        }

        update() {

        }
    }


