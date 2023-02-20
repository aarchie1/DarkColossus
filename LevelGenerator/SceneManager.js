
class SceneManager {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.game = game;
        this.game.camera = this;
        this.gameOver = false;
        this.transition = false;
        this.player = new GameCharacter(this.game, 0, 0);
        player = this.player;
        this.restoreDarkEnergy(); //restores DE


        // splits the X axis into 5 sections [  |  |  |  |  ] <-- map, playable area --> [  |xx|xx|xx|  ]
        this.quadX = 1650 / 5;
        this.rightBoundX = this.quadX * 3;
        this.midX = (this.quadX * 2.5) + (400 * player.velocity.x/player.MAX_RUN);
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

        this.xCameraOffset = 0;
        this.yCameraOffset = 0;
        this.loadTitleScreen(); //This will replace this.loadHub() when we have a title screen

    };

    loadLevel() {
        this.clearLevel();

        params.LEVEL += 1;
        let level = getLevel(params.LEVEL);
        console.log("Loading Level: " + params.LEVEL);
        let xBoundMin = 1300;
        let xBoundMax = 13000;
        let yBoundMin = 600;
        let yBoundMax = -800;
        this.rightXLimit = 160000;
    

        for (let i = 0; i < level.dnaPickup.length; i++) {
            let dna = level.dnaPickup[i];
            this.game.addEntity(new DnaItemDrop(this.game, dna.x, dna.y));
        }

        for (let i = 0; i < level.reaper.length; i++) {
            let enemy = level.reaper[i];
            this.game.addEntity(new Reaper(this.game, enemy.x, enemy.y, 2));
        }

        for (let i = 0; i < level.molecule.length; i++) {
            let enemy = level.molecule[i];
            this.game.addEntity(new Molecule(this.game, enemy.x, enemy.y, 2));
        }

        //Hazard Growth Tall
        for (let i = 0; i < level.hazardGrowthTall.length; i++) {
            let hazard = level.hazardGrowthTall[i];
            this.game.addEntity(new GrowthHazard(hazard.x, hazard.y, GROWTH_HAZARD_TALL));
        }

        //Hazard Growth Short
        for (let i = 0; i < level.hazardGrowthShort.length; i++) {
            let hazard = level.hazardGrowthShort[i];
            this.game.addEntity(new GrowthHazard(hazard.x, hazard.y, GROWTH_HAZARD_SHORT));
        }

        //Hazard Growth Tall Static
        for (let i = 0; i < level.hazardGrowthTallStatic.length; i++) {
            let hazard = level.hazardGrowthTallStatic[i];
            this.game.addEntity(new GrowthHazardStatic(hazard.x, hazard.y));
        }



        //Portals
        for (let i = 0; i < level.portal.length; i++) {
            let portal = level.portal[i];
            console.log("Portal: " + portal.x + ", " + portal.y);
            let newPortal = new Portal(this.game, portal.x, portal.y, this);
            if (i == level.portal.length-1) {
                newPortal.levelModifier = -1;
                newPortal.levelModifierText = getLevelModifierText(-1);
            }
            this.game.addEntity(newPortal);
        }

        // random ground platforms
        for (let i = 0; i < level.platformGround.length; i++) {
            let platform = level.platformGround[i];
            this.game.addEntity(new Platform(this.game, platform.x, platform.y, 1600, 400,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(platform.x, platform.y + 300, 1600, 400)));
        }

        // random small platforms
        for (let i = 0; i < level.platformSmall.length; i++) {
            let x = level.platformSmall[i].x;
            let y = level.platformSmall[i].y;
            //let x = Math.random() * (xBoundMax - xBoundMin) + xBoundMin;
            //let y = Math.random() * (yBoundMax - yBoundMin) + yBoundMin;

            this.game.addEntity(new Platform(this.game, x, y, 256, 256,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png"), new BoundingBox(x+30, y + 120, 200, 100)));
        }

        // random large platforms
        for (let i = 0; i < level.platformLarge.length; i++) {
            let x = level.platformLarge[i].x;
            let y = level.platformLarge[i].y;
            this.game.addEntity(new Platform(this.game, x, y, 884, 496,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_large.png"), new BoundingBox(x+55, y + 140, 740, 100)));
        }

        // random tiny platforms
        for (let i = 0; i < level.platformTiny.length; i++) {
            let x = level.platformTiny[i].x;
            let y = level.platformTiny[i].y;
            // let x = Math.random() * (xBoundMax - xBoundMin) + xBoundMin;
            // let y = Math.random() * (yBoundMax - yBoundMin) + yBoundMin;

            this.game.addEntity(new Platform(this.game, x, y, 184, 184,
                ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_tiny.png"), new BoundingBox(x+7, y + 90, 160, 100)));
        }

        //invisible walls
        for (let i = 0; i < level.invisibleWall.length; i++) {
            let wall = level.invisibleWall[i];      
            this.game.addEntity(new InvisibleWall(this.game, wall.x, wall.y));
        }

        //HordeFightManager
        for (let i = 0; i < level.hordeFightManager.length; i++) {
            let hordeFightManager = level.hordeFightManager[i];
            this.game.addEntity(new HordeFightManager(hordeFightManager.enemies, hordeFightManager.leftBound, hordeFightManager.rightBound));
        }

        //Growth Chase Manager
        for (let i = 0; i < level.growthChaseManager.length; i++) {
            this.game.addEntity(new GrowthChaseManager());
        }





        
        //add background
        gameEngine.addEntity(new Background(this.game));
        
    
        
    };

    restoreDarkEnergy() {
        player.health = player.health + params.DARK_ENERGY.hp;
        player.JUMP_ACC = player.JUMP_ACC - (this.game.darkEnergy.jumpHeight * 10);
        player.MAX_RUN = player.MAX_RUN + (this.game.darkEnergy.movementSpeed * 10);
    }

    randomizeLevel() {


    }

    loadBoss(){

    }


    loadHub() {
        this.clearLevel();
        params.LEVEL = 0;
        this.rightXLimit = 2000//4400;
        this.leftXLimit = 0//-1800;
        //Create Inventory UI
        let inventoryBB = new BoundingBox(1200, 835, 248, 200);
        this.game.addEntity(new FloatingObject(1320, 835, 242, 194, 5, 0, "Press E for Inventory"));
        this.game.addEntity(new Interactable(this.game, 1200, 835, 242, 194, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/workbench.png"), inventoryBB, () => {
            //check if inventory is already open
            if (params.STATE != "menu") {
                this.game.addEntityFirst(new InventoryUI(this.game));
                params.STATE = "menu";
            }
        }));

        //Create DE UI
        this.game.addEntity(new FloatingObject(520, 835, 242, 194, 5, 0, "Press E for Dark Energy"));

        this.game.addEntity(new Interactable(this.game, 400, 835, 242, 194, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/workbench.png"), new BoundingBox(400, 835, 248, 200), () => {
            if (params.STATE != "menu") {
                this.game.addEntityFirst(new DarkEnergyUI(this.game));
                params.STATE = "menu";
            }
        }));

        //Create Portal Interactable
        let startingPortal = new Portal(this.game, 1800, 750, this)
        startingPortal.levelModifier = 0;
        startingPortal.levelTextModifier = "";

        this.game.addEntity(startingPortal);

        //this.game.addEntity(new Platform(this.game, 1, 500, 1600, 400, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(0, 830, 1600, 400)));
        ///spawn three of those platforms next to each other but spawn one of them in the middle of the screen and the other two on the sides
        this.game.addEntity(new Platform(this.game, CANVAS_WIDTH/2, 810, 1600, 400, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(CANVAS_WIDTH/2, 1130, 1600, 400)));
        this.game.addEntity(new Platform(this.game, CANVAS_WIDTH/2 - CANVAS_WIDTH/2, 810, 1600, 400, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_hub.png"), new BoundingBox(CANVAS_WIDTH/2 - CANVAS_WIDTH/2, 1130, 1600, 400)));

        this.game.addEntity(new Cross_Background(this.game, 250, 200));
        this.game.addEntity(new Background(this.game));
    
    }

    loadTitleScreen() {

        this.game.addEntity(new Title_Screen_Background(this.game));

        addEventListener('click', (event) => { });

        onclick = (event) => {
            onclick = null
            params.HUD = new hud(gameEngine);
            gameEngine.addEntity(params.HUD);
            //add dna to inventory
            for (let i = 0; i < 3; i++)
                params.INVENTORY.inventory.push(getRandomDNA());

            params.INVENTORY.inventory[0].epsilonAbility = null;
            params.INVENTORY.inventory[0].betaAbility = null;
            params.INVENTORY.inventory[0].alphaAbility = new CosmicBladeAbility(3, 3);
            params.INVENTORY.inventory[0].sigmaAbility = null;
            params.INVENTORY.dnaSlot1 = params.INVENTORY.inventory[0];
            equipAbilities(params.INVENTORY.dnaSlot1);
            //gameEngine.camera.loadHub();
            gameEngine.camera.loadOpening();
        };
    }

    loadDeathScreen() {
        this.clearLevel();
        this.game.addEntityFirst(new Death_Screen_Background(this.game));
        gameEngine.camera.gameOver = false;
        let timer = 100;
        // addEventListener('click', (event) => { });

        // onclick = (event) => {
        //     onclick = null
        //     gameEngine.camera.gameOver = false;
        //     gameEngine.camera.loadDeathCutscene();
        //     //gameEngine.camera.loadHub();


        // };

        // while (timer > 0) {
        //     timer = timer - 0.0000001
        // }

        gameEngine.camera.gameOver = false;
        gameEngine.camera.loadDeathCutscene();
    }


    update() {
        //Make the camera move based off this bounding box
/*      // Keeps player in rightBoundX
        if (this.player.x > rightBoundX && !(this.player.x + rightBoundX >= rightXLimit)) this.x = this.player.x - rightBoundX;
        if (this.player.x < leftBoundX && !(this.player.x - leftBoundX <= leftXLimit)) this.x = this.player.x - leftBoundX;
*/     

        this.xCameraSmoothing();
        //this.yCameraSmoothing(); Y camera smoothing was harder to implement so I just left it out for now
        this.midX = (this.quadX * 2.5) - this.xCameraOffset;
        this.midY = (this.quadY * 2.5);


        // Keeps player centered on X
        if (this.player.x > this.midX && !(this.player.x + this.midX >= this.rightXLimit)) this.x = this.player.x - this.midX;
        if (this.player.x < this.midX && !(this.player.x - this.midX <= this.leftXLimit)) this.x = this.player.x - this.midX;


        if (this.player.y < this.upperBoundY && !(this.player.y + this.upperBoundY <= this.upperYLimit)) this.y = this.player.y - this.upperBoundY;
        if (this.player.y > this.lowerBoundY && !(this.player.y - this.lowerBoundY >= this.lowerYLimit)) this.y = this.player.y - this.lowerBoundY;


        //if (this.player.y < upperBoundY && !(this.player.y <= upperYLimit)) this.y = this.player.y - upperBoundY;
        //if (this.player.y > lowerBoundY && !(this.player.y - lowerBoundY != lowerYLimit)) this.y = this.player.y - lowerBoundY;

        if (this.gameOver) {
           this.loadDeathScreen();
           player.removeFromWorld = true;
        }

    };

    draw(ctx) {

    };

    //This function adds a slight smoothing to the camera movement
    xCameraSmoothing() {
        const SMOOTHING = 0.006;
        let max = 300; 
        let min = -300;
        let target = 0;
        let velocity = player.velocity.x/player.MAX_RUN + 0.01;
        if (velocity === 0) {
            target = 0;
        } else {
            target = max * velocity;
        }
        this.xCameraOffset += (target - this.xCameraOffset) * SMOOTHING;
        this.xCameraOffset = this.xCameraOffset <= min ? min : this.xCameraOffset >= max ? max : this.xCameraOffset;
    }

    yCameraSmoothing() {
        const SMOOTHING = 0.05;
        let max = 500;
        let min = -500;
        let target = 0;
        let velocity = player.velocity.y/player.MAX_RUN + 0.01;
        if (velocity === 0) {
            target = 0;
        } else {
            target = max * velocity;
        }
        this.yCameraOffset += (target - this.yCameraOffset) * SMOOTHING;
        this.yCameraOffset = this.yCameraOffset <= min ? min : this.yCameraOffset >= max ? max : this.yCameraOffset;
    }
    
    

    clearLevel() {
        //IF THINGS GO BAD UNCOMMENT THIS
        //remove everything from this.game.entities except Inventory, DarkEnergy, SceneManager, etc.
        // this.game.entities = this.game.entities.filter(function (entity) {
        //     return entity instanceof Inventory || entity instanceof DarkEnergy || entity instanceof SceneManager || entity instanceof hud;
        // });

        //set removeFromWorld to true for everything in this.game.entities except Inventory, DarkEnergy, SceneManager, etc.
        this.game.entities.forEach(function (entity) {
            if (!(entity instanceof Inventory || entity instanceof DarkEnergy || entity instanceof SceneManager || entity instanceof hud || entity instanceof ParticleEffectSystem)) {
                entity.removeFromWorld = true;
            }
        });
 
        //SET ALL ABILITIES TO NOT IN USE TO PREVENT BUG
        if (params.INVENTORY.dnaSlot1 != null) {
            let dna = params.INVENTORY.dnaSlot1;
            if (dna.sigmaAbility != null) dna.sigmaAbility.inUse = false;
            if (dna.epsilonAbility != null) dna.epsilonAbility.inUse = false;
            if (dna.alphaAbility != null) dna.alphaAbility.inUse = false;
            if (dna.betaAbility != null) dna.betaAbility.inUse = false;
        }
        this.game.camera.x = 0;
        this.game.camera.y = 0;
        this.player = new GameCharacter(this.game, CANVAS_WIDTH/3, 0);
        player = this.player; //update global player reference
        player.health = player.health + params.DARK_ENERGY.hp;
        equipAbilities(params.INVENTORY.dnaSlot1); //equip abilities
        equipAbilities(params.INVENTORY.dnaSlot2);
        this.restoreDarkEnergy();
        this.game.addEntity(this.player);
    }

    loadOpening() {
        let openingText = [
            "The universe has ended",
            "Consumed by the infinite void",
            "All that remains is a battle of reprisal",
            "Between the Dark Colossus and the last soul to resist it"
        ];
        gameEngine.addEntityFirst(new TextCutscene(openingText, 0.01));
    }

    loadDeathCutscene() {
        //random int between 1 and 18
        let deathCount = Math.floor(Math.random() * 18) + 1;
        let deathText = [];
        switch (deathCount) {
            case 1:
                deathText = [
                    "Your soul fades away into the void",
                    "The Dark Colossus grows stronger with every death"
                ];
                break;
            case 2:
                deathText = [
                    "You have failed to save the universe once",
                    "But you can still take revenge"
                ];
                break;
            case 3:
                deathText = [
                    "You die again...",
                    "The Cosmic Blade fails you",
                    "But you can't give up now"
                ];
                break;
            case 4:
                deathText = [
                    "The Reapers laugh at your defeat",
                    "Your efforts were valiant, but not enough"
                ];
                break;
            case 5:
                deathText = [
                    "The Reapers feast on your soul",
                    "The Molecules tear you apart"
                ];
                break;
            case 6:
                deathText = [
                    "The end is near",
                    "The Dark Colossus cackles in triumph",
                    "Your fate is sealed"
                ];
                break;
            case 7:
                deathText = [
                    "The Molecules continue their onslaught",
                    "Your sacrifice was in vain"
                ];
                break;

            case 8:
                deathText = [
                    "The Astral Beam fizzles out",
                    "What will you do now?"
                ];
                break;
            case 9:
                deathText = [
                    "The Solar Flare engulfs you",
                    "You are consumed by the flames",
                ];
                break;
            case 10:
                deathText = [
                    "The Dark Colossus looms over you",
                    "You are powerless to stop it",
                ];
                break;
            case 11:
                deathText = [
                    "Tell me, lost soul...",
                    "Why do you fight when the universe is already lost?"
                ];
                break;
            case 12:
                deathText = [
                    "You are consumed by the infinite void",
                    "How dissapointing"
                ];
                break;
            case 13:
                deathText = [
                    "Even with the power of Dark Energy...",
                    "You are still no match for the Dark Colossus"
                ];
                break;
            case 14:
                deathText = [
                    "Tell me, lost soul...",
                    "What was your family like?"
                ];
                break;
            case 15:
                deathText = [
                    "Tell me, lost soul...",
                    "Did you ever love anyone?"
                ];
                break;
            case 16:
                deathText = [
                    "Tell me, lost soul...",
                    "How heavy is the weight of life?"
                ];
                break;
            case 17:
                deathText = [
                    "Your insides are torn apart",
                    "Ripped apart atom by atom",
                    "You become among the Molecules"
                ];
                break;
            case 18:
                deathText = [
                    "Your consciousness is lost to the void",
                    "Frozen in a moment of time",
                    "No death, no peace"
                ];
                break;
        }
        
        gameEngine.addEntityFirst(new TextCutscene(deathText, 0.01));
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
    constructor(game, x, y) {
        this.game = game;
        this.width = CANVAS_WIDTH;
        this.height = CANVAS_HEIGHT;
        this.x = x;
        this.y = y;
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


        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './Fonts/fontface.css';
        document.getElementsByTagName('head')[0].appendChild(link);

        // Single option to begin game
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = "80px Angel";
        ctx.fillText("Click to Begin", CANVAS_WIDTH / 2 - 2, 600 - 2);
        ctx.fillStyle = "white";
        ctx.font = "80px Angel";
        ctx.fillText("Click to Begin", CANVAS_WIDTH / 2, 600);

        ctx.fillStyle = "black";
        ctx.font = "20px Ariel";
        ctx.fillText("ESC to Pause", CANVAS_WIDTH / 2 - 2, 700 - 2);
        ctx.fillStyle = "white";
        ctx.font = "20px Ariel";
        ctx.fillText("ESC to Pause", CANVAS_WIDTH / 2, 700);


    }

    update() {
        //check if any controls are pressed in game controller
        if (isAnyControllerButtonPressed()){
            params.HUD = new hud(gameEngine);
            gameEngine.addEntity(params.HUD);
            //add dna to inventory
            for (let i = 0; i < 3; i++)
                params.INVENTORY.inventory.push(getRandomDNA());

            
            params.INVENTORY.inventory[0].epsilonAbility = null;
            params.INVENTORY.inventory[0].betaAbility = null;
            params.INVENTORY.inventory[0].alphaAbility = new CosmicBlade(3, 3);
            params.INVENTORY.inventory[0].sigmaAbility = null;
            params.INVENTORY.dnaSlot1 = params.INVENTORY.inventory[0];
            equipAbilities(params.INVENTORY.dnaSlot1);
            this.game.camera.loadHub();
        }
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


        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './Fonts/fontface.css';
        document.getElementsByTagName('head')[0].appendChild(link);

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

        //check if any controls are pressed in game controller
        if (isAnyControllerButtonPressed()){
            this.game.camera.gameOver = false;
           // this.game.camera.loadHub();
        }

    }

    
}

