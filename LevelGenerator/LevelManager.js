class LevelManager {


	SectionStart(x, y, width) {

		let level = getLevel(1);

		
/*		for (let i = 0; i < 7; i++) {

			gameEngine.addEntity(new Platform(x, 750, 256, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png"),
				new BoundingBox(x + 50, 800 + 57, 256, 256 / 2)));
		//	gameEngine.addEntity(new SmallPlatform(gameEngine, x, y, width));
			x += 420;
		}*/

/*		level.platformSmall.forEach( (platform) => {

			gameEngine.addEntity(new Platform(platform.x, platform.y, 256, 256, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_small.png"),
				new BoundingBox(platform.x, platform.y, 256, 256 / 2))) ;

	});*/

		level.platformGround.forEach((platform) => {
			gameEngine.addEntity(new Platform(platform.x, platform.y, 256, 700, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_ground.png"),
				new BoundingBox(platform.x, platform.y, 256, 700)));
		});




		

	}
/*
	Section2Test(x, y, width) {
		for (let i = 0; i < 3; i++) {

			gameEngine.addEntity(new SmallPlatform(gameEngine, x, y, width));
			x += 500;
		}
	}*/

}