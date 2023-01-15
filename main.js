const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Sprites
ASSET_MANAGER.queueDownload("./Sprites/Player/player_idle_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_idle_left.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_running_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_running_left.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_jump_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_jump_left.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_falling_right.png");
ASSET_MANAGER.queueDownload("./Sprites/Player/player_falling_left.png");

// music
ASSET_MANAGER.queueDownload("./Music/testmusic.mp3");

// sound effect

ASSET_MANAGER.downloadAll(() => {
	

	ASSET_MANAGER.autoRepeat("./Music/testmusic.mp3");
	
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	gameEngine.init(ctx);
	gameEngine.addEntity(new GameCharacter(gameEngine, 100, 100));
	
	// Janky way of getting music to start, you have to interact with the volume bar first
	var l = document.getElementById('volume');
	l.addEventListener('click', handleClick, true);
	function handleClick() {
		ASSET_MANAGER.playAssest("./Music/testmusic.mp3");
	};
	

	gameEngine.start();
});
