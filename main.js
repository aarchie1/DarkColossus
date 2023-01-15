const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	gameEngine.addEntity(new GameCharacter(10,10,10,"Hero",null,0,gameEngine));
	gameEngine.addEntity(new DnaTester());

	gameEngine.start();
});
