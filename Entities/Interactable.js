
class Interactable {

    constructor(game, x, y, width, height, sprite, action) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.action = action;
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x-this.game.camera.x, this.y-this.game.camera.y, this.width, this.height);
    }

    update() {
        if (this.game.keys.KeyE) {
            this.action();
        }
        
    }
}