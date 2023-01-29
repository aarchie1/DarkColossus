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
ASSET_MANAGER.queueDownload("./Sprites/Abilities/emp.png");

//Enemies
ASSET_MANAGER.queueDownload("./Sprites/Molecule/molecule_full.png");
ASSET_MANAGER.queueDownload("./Sprites/Molecule/molecule_half.png");
ASSET_MANAGER.queueDownload("./Sprites/Molecule/molecule_low.png");
ASSET_MANAGER.queueDownload("./Sprites/Molecule/molecule_projectile.png");
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

//DNA
ASSET_MANAGER.queueDownload("./Sprites/DNA/dna_basic.png");
ASSET_MANAGER.queueDownload("./Sprites/DNA/dna_uncommon.png");
ASSET_MANAGER.queueDownload("./Sprites/DNA/dna_rare.png");
ASSET_MANAGER.queueDownload("./Sprites/DNA/dna_godly.png");

//UI
ASSET_MANAGER.queueDownload("./Sprites/UI/DE_UI_Design_No_Text.png");

// music
ASSET_MANAGER.queueDownload("./Music/testmusic.mp3");

// sound effect
ASSET_MANAGER.downloadAll(() => {
	ASSET_MANAGER.autoRepeat("./Music/testmusic.mp3");
	
	const canvas = document.getElementById("gameWorld"); 
	CANVAS_HEIGHT = canvas.height;
	CANVAS_WIDTH = canvas.width;
	const ctx = canvas.getContext("2d");
	gameEngine.init(ctx);
	//gameEngine.addEntity(new InventoryUI(gameEngine));
	gameEngine.addEntity(new DarkEnergyUI(gameEngine));
	gameEngine.addEntity(new SceneManager(gameEngine));

	// Janky way of getting music to start, you have to interact with the volume bar first
	var l = document.getElementById('volume');
	l.addEventListener('click', handleClick, true);
	function handleClick() {
		ASSET_MANAGER.playAssest("./Music/testmusic.mp3");
	};
	
	//TEST ENTITIES
	// gameEngine.addEntity(new DnaTester());
	// gameEngine.addEntity(new LevelFactoryTester());
	
	gameEngine.start();
});
