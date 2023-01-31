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
        this.amplitude = 0.1;
        this.t = 0;

    }

    draw(ctx) {
        this.t += 0.02;
        ctx.drawImage(this.sprite, this.x-this.game.camera.x, this.y-this.game.camera.y, this.width, this.height);
        if (debug) ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
    }

    update() {
        if (this.game.keys.KeyE == true) {
            if (this.BB.collide(player.BB)) {
                this.action();
            } 
        }
    }
}