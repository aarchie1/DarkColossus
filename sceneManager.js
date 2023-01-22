class SceneManager {

    constructor(game) {

        this.game = game;
        this.game.camera = this;
        this.x = 0;

        this.loadLevelOne();

    }

    loadLevelOne() {


        LoadLevel.SectionStart(-50, 800, 256);
        //LoadLevel.Section2Test(1500, 800, 256);
        gameEngine.addEntity(new GameCharacter(gameEngine, 0, 0));

/*        let level = getLevel(1);


        level.platformGround.forEach((platform) => {
            game.addEntity(new Platform(platform.x, platform.y, 256, 700, ASSET_MANAGER.getAsset("./Sprites/LevelAssets/platform_ground.png"),
                new BoundingBox(platform.x, platform.y, 256, 700)));
        });*/

    }

    update() {

        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = 1400 / 2;

        this.x = GameCharacter.x - midpoint;
    }



}