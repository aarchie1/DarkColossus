
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
        this.quadX = 1650 / 5;
        this.rightBoundX = this.quadX * 3;
        this.midX = this.quadX * 2.5;
        this.leftBoundX = this.quadX * 1;

        // splits the Y axis into 4 sectionsd
        this.quadY = 1000 / 4;
        this.lowerBoundY = this.quadY * 3;
        this.midY = this.quadY * 2;
        this.upperBoundY = this.quadY * 1.5;

        // sets left, right, lower, and upper, map border so player cannot leave the area.
        this.leftXLimit = 0;      // do not change -- does not traverse left of starting point
        this.rightXLimit = 16000; // 16k to stay within background image (right)
        this.lowerYLimit = 700;   // 700 is reasonable to keep starting platform visible
        this.upperYLimit = -8500; // -8500 to stay within background image (top)

        player = this.player;

        this.loadTitleScreen();
        //this.loadHub();
    };

    loadLevel() {
        this.clearLevel();

        params.LEVEL += 1;
        let level = getLevel(params.LEVEL);
        let xBoundMin = 1300;
        let xBoundMax = 13000;
        let yBoundMin = 600;
        let yBoundMax = -800;
        this.rightXLimit = 16000;

        // spawn in dna pickups
        for (let i = 0; i < level.dnaPickup.length; i++) {
            let dna = level.dnaPickup[i];
            this.game.addEntity(new DnaItemDrop(this.game, dna.x, dna.y));
        }

        //spawn in enemies
        for (let i = 0; i < level.reaper.length; i++) {
            let enemy = level.reaper[i];
            this.game.addEntity(new Reaper(this.game, enemy.x, enemy.y, 2));
        }

        //spawn Molecules
        for (let i = 0; i < level.molecule.length; i++) {
            let enemy = level.molecule[i];
            this.game.addEntity(new Molecule(this.game, enemy.x, enemy.y, 2));
        }

        //Enemy Testing Lines
        //this.game.addEntity(new Reaper(this.game, 1000, 520, 2));
        //this.game.addEntity(new Molecule(this.game, 1000, 520, 2));

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
        
        //add background
        gameEngine.addEntity(new Background(this.game));
        
    
        
    };

    randomizeLevel() {



    }

    loadBoss(){

    }


    loadHub() {
        params.LEVEL = 0;
        
        //On Death stuff
        // If game over reset HUD, Dark Energy, and Inventory
        if (this.gameOver) {
            //this.loadDeathScreen();       // Death screen is not loading on top of other assets. Functionality works. Click to continue/
            this.gameOver = false;
        }
        this.clearLevel();
        
        
        this.rightXLimit = 1400;
        //Create Inventory UI
        let inventoryBB = new BoundingBox(1200, 525, 248, 200);
        this.game.addEntity(new FloatingObject(1320, 525, 242, 194, 5, 0, "Press E for Inventory"));
        this.game.addEntity(new Interactable(this.game, 1200, 525, 242, 194, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/workbench.png"), inventoryBB, () => {
            //check if inventory is already open
            if (params.STATE != "menu") {
                this.game.addEntityFirst(new InventoryUI(this.game));
                params.STATE = "menu";
            }
        }));

        //Create DE UI
        this.game.addEntity(new FloatingObject(520, 525, 242, 194, 5, 0, "Press E for Dark Energy"));

        this.game.addEntity(new Interactable(this.game, 400, 525, 242, 194, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/workbench.png"), new BoundingBox(400, 525, 248, 200), () => {
            if (params.STATE != "menu") {
                this.game.addEntityFirst(new DarkEnergyUI(this.game));
                params.STATE = "menu";
            }
        }));

        //Create Portal Interactable
        this.game.addEntity(new Portal(this.game, 1550, 450, this));
        //this.game.addEntity(new Platform(this.game, 1, 500, 1600, 400, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(0, 830, 1600, 400)));
        ///spawn three of those platforms next to each other but spawn one of them in the middle of the screen and the other two on the sides
        this.game.addEntity(new Platform(this.game, CANVAS_WIDTH/2, 500, 1600, 400, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(CANVAS_WIDTH/2, 830, 1600, 400)));
        this.game.addEntity(new Platform(this.game, CANVAS_WIDTH/2 - CANVAS_WIDTH/2, 500, 1600, 400, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(CANVAS_WIDTH/2 - CANVAS_WIDTH/2, 830, 1600, 400)));

        this.game.addEntity(new Cross_Background(this.game));
        this.game.addEntity(new Background(this.game));
    


    }

    loadTitleScreen() {

        this.game.addEntity(new Title_Screen_Background(this.game));

        addEventListener('click', (event) => { });

        onclick = (event) => {
            onclick = null
            this.loadHub()
    
        };
    }

    loadDeathScreen() {

        //this.game.addEntity(new Death_Screen_Background(this.game));
        //this.game.addEntityFirst(new Death_Screen_Background(this.game));

        addEventListener('click', (event) => { });

        onclick = (event) => {
            onclick = null
            this.gameOver = false;
            this.loadTitleScreen();
            //this.loadHub();

        };
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

        if (this.gameOver) {
            this.loadHub();
        }

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
        this.player = new GameCharacter(this.game, CANVAS_WIDTH/2-150, 0);
        player = this.player; //update global player reference
        equipAbilities(params.INVENTORY.dnaSlot1); //equip abilities
        equipAbilities(params.INVENTORY.dnaSlot2);
        this.game.addEntity(this.player);
    }

    // For death condition
    // clearEntities() {
    //     this.game.entities = this.game.entities.filter(function (entity) {
    //         return entity instanceof Inventory || entity instanceof DarkEnergy || entity instanceof SceneManager || entity instanceof hud;
    //     });
    //     this.game.camera.x = 0;
    //     this.game.camera.y = 0;
    //     this.player = new GameCharacter(this.game, CANVAS_WIDTH/2-150, 0);
    //     player = this.player; //update global player reference
    //     equipAbilities(params.INVENTORY.dnaSlot1); //equip abilities
    //     equipAbilities(params.INVENTORY.dnaSlot2);
    //     this.game.addEntity(this.player);
    // };
    
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
        ctx.drawImage(this.image, this.x-(this.game.camera.x*this.scrollSpeed)+this.width, this.y-(this.game.camera.y*this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x-(this.game.camera.x*this.scrollSpeed)-this.width, this.y-(this.game.camera.y*this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x-(this.game.camera.x*this.scrollSpeed)+this.width*2, this.y-(this.game.camera.y*this.scrollSpeed)+this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x-(this.game.camera.x*this.scrollSpeed)-this.width*2, this.y-(this.game.camera.y*this.scrollSpeed)+this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x-(this.game.camera.x*this.scrollSpeed)+this.width*3, this.y-(this.game.camera.y*this.scrollSpeed)+this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x-(this.game.camera.x*this.scrollSpeed)-this.width*3, this.y-(this.game.camera.y*this.scrollSpeed)+this.height, this.width, this.height);
    }
	update() {

	}
}

class Cross_Background {
    constructor(game) {
        this.game = game;
        this.width = CANVAS_WIDTH;
        this.height = CANVAS_HEIGHT;
        this.x = 250;
        this.y = -40;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./Sprites/LevelAssets/cross_background.png"), 0, 0, 1400, 900, 1, 1, true, true);
        this.t = 0;
        this.amplitude = 20;
    }

    draw(ctx) {
        this.t += 0.025;
        // ctx.drawImage(this.image, this.x-(this.game.camera.x), this.y-(this.game.camera.y), this.width, this.height);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y + Math.sin(this.t) * this.amplitude, 1);
    }

    update() {

    }
}

class Title_Screen_Background {
    constructor(game) {
        this.game = game;
        this.width = 1920;
        this.height = 1080;
        this.x = 0;
        this.y = 0
        this.scrollSpeed = 0.02;
        this.image = ASSET_MANAGER.getAsset("./Sprites/UI/title_screen.png");

    }

    draw(ctx) {

        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed), this.y - (this.game.camera.y * this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) + this.width, this.y - (this.game.camera.y * this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) - this.width, this.y - (this.game.camera.y * this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) + this.width * 2, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) - this.width * 2, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) + this.width * 3, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) - this.width * 3, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);

/*
        ctx.textAlign = "center";

        ctx.fillStyle = "black";
        ctx.font = "60px Angel";
        ctx.fillText("New Game", CANVAS_WIDTH / 2 - 2, 500 - 2);
        ctx.fillStyle = "white";
        ctx.font = "60px Angel";
        ctx.fillText("New Game", CANVAS_WIDTH / 2, 500);


        ctx.fillStyle = "black";
        ctx.font = "40px Angel";
        ctx.fillText("Continue", CANVAS_WIDTH / 2 - 2, 600 - 2);
        ctx.fillStyle = "white";
        ctx.font = "40px Angel";
        ctx.fillText("Continue", CANVAS_WIDTH / 2, 600);

        this.game.addEntity(new Cross_Background(this.game));
*/


        // Single option to begin game
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "60px Angel";
        ctx.fillText("Click to Begin", CANVAS_WIDTH / 2 - 2, 600 - 2);
        ctx.fillStyle = "white";
        ctx.font = "60px Angel";
        ctx.fillText("Click to Begin", CANVAS_WIDTH / 2, 600);



    }
    update() {

            

    }
}

class Death_Screen_Background {
    constructor(game) {
        this.game = game;
        this.width = 1920;
        this.height = 1080;
        this.x = 0;
        this.y = 0
        this.scrollSpeed = 0.02;
        this.image = ASSET_MANAGER.getAsset("./Sprites/UI/title_screen.png");

    }

    draw(ctx) {


        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed), this.y - (this.game.camera.y * this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) + this.width, this.y - (this.game.camera.y * this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) - this.width, this.y - (this.game.camera.y * this.scrollSpeed), this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) + this.width * 2, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) - this.width * 2, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) + this.width * 3, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);
        ctx.drawImage(this.image, this.x - (this.game.camera.x * this.scrollSpeed) - this.width * 3, this.y - (this.game.camera.y * this.scrollSpeed) + this.height, this.width, this.height);

        // Single option to begin game
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "100px Angel";
        ctx.fillText("YOU DIED", CANVAS_WIDTH / 2 - 2, 600 - 2);
        ctx.fillStyle = "white";
        ctx.font = "100px Angel";
        ctx.fillText("YOU DIED", CANVAS_WIDTH / 2, 600);



    }
    update() {



    }
}