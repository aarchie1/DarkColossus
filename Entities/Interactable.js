class Interactable {

    constructor(game, x, y, width, height, sprite, boundingBox, action) {
        Object.assign(this);
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.action = action;
        this.BB = boundingBox
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x-this.game.camera.x, this.y-this.game.camera.y, this.width, this.height);
        if (debug) ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
    }

    update() {
        if (keypress("KeyE")) {
            console.log("E pressed");
            //Why tf we iterating through all entities skill diff
            for (let i = 0; i < gameEngine.entities.length; i++) {
                let entity = gameEngine.entities[i];
                if (entity instanceof GameCharacter && this.BB.collide(entity.BB)) {
                    console.log("found player");
                    this.action();
                    break;
                } 
            }
        }
    }
}