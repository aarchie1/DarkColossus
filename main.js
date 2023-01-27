const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//Player
ASSET_MANAGER.queueDownload("./Sprites/Player/player_idle_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_idle_left.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_running_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_running_left.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_jump_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_jump_left.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_falling_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_falling_left.png");

//Abilities
ASSET_MANAGER.queueDownload("./Sprites/Abilities/cosmic_blade.png");
ASSET_MANAGER.queueDownload("./Sprites/Abilities/soul_grab.png");
ASSET_MANAGER.queueDownload("./Sprites/Abilities/slippery.png");

//Enemies
ASSET_MANAGER.queueDownload("./Sprites/Molecule/molecule_full.png");
ASSET_MANAGER.queueDownload("./Sprites/Molecule/molecule_half.png");
ASSET_MANAGER.queueDownload("./Sprites/Molecule/molecule_low.png");
ASSET_MANAGER.queueDownload("./Sprites/Reaper/reaper_attack.png");
ASSET_MANAGER.queueDownload("./Sprites/Reaper/reaper_normal.png");
ASSET_MANAGER.queueDownload("./Sprites/Reaper/reaper_weak.png");
ASSET_MANAGER.queueDownload("./Sprites/Reaper/reaper_strong.png");

//Level/Platforms
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/platform_small.png");
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/platform_ground.png");
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/platform_tiny.png");
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/platform_large.png");
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/background.png");
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/portal.png");
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/Hazards/hazard_growth_short.png");
ASSET_MANAGER.queueDownload("./Sprites/LevelAssets/Hazards/hazard_growth_tall.png");

// music
ASSET_MANAGER.queueDownload("./Music/testmusic.mp3");

// sound effect

ASSET_MANAGER.downloadAll(() => {
	

	ASSET_MANAGER.autoRepeat("./Music/testmusic.mp3");
	
	const canvas = document.getElementById("gameWorld"); 
	const ctx = canvas.getContext("2d");
	
	gameEngine.init(ctx);

	let player = new GameCharacter(gameEngine, 0, 0);
	gameEngine.addEntity(player);
	gameEngine.addEntity(new SmallPlatform(gameEngine, 130, 500, 256));
	gameEngine.addEntity(new SmallPlatform(gameEngine, 500, 200, 256));

	gameEngine.addEntity(new SmallPlatform(gameEngine, 700, 600, 256));
	gameEngine.addEntity(new SmallPlatform(gameEngine, 910, 400, 256));
	//gameEngine.addEntity(new Platform(400, 300, 884, 496, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_large.png"), new BoundingBox(450, 440, 740, 200)));
	
	// Janky way of getting music to start, you have to interact with the volume bar first
	var l = document.getElementById('volume');
	l.addEventListener('click', handleClick, true);
	function handleClick() {
		ASSET_MANAGER.playAssest("./Music/testmusic.mp3");
	};
	
	//PROOF OF CONCEPT TESTS / PROTOYPE TEST
	//I think SceneManager should control this
	// class Background {
	// 	constructor() {
	// 		this.width = 2100;
	// 		this.height = 1350;
	// 		this.x = 0
	// 		this.y = -200
	// 		this.scrollSpeed = 0.008;
	// 		this.image = ASSET_MANAGER.getAsset("./Sprites/LevelAssets/background.png");
	// 	}

	// 	draw(ctx) {
	// 		ctx.drawImage(this.image, this.x-(player.x*this.scrollSpeed), this.y-(player.y*this.scrollSpeed), this.width, this.height);
	// 	}
	// 	update() {

	// 	}
	// }
	//TEST ENTITIES
	gameEngine.addEntity(new DnaTester());
	gameEngine.addEntity(new LevelFactoryTester());
	//gameEngine.addEntity(new Background);
	

	gameEngine.start();
	
});
