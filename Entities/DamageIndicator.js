class DamageIndicator {
    constructor(x, y, damage) {
        Object.assign(this, { x, y, damage });
        this.timerStart = 120;
        this.timer = this.timerStart;
        this.alpha = 1;
        this.randomX = Math.random() * 40 - 80;
        this.randomY = Math.random() * 40 - 80;

        //have font size be 1.5 times the damage
        this.fontSize = 30 + (damage+1) * 3;

    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        ctx.font = this.fontSize + " Arial";
        ctx.fillStyle = "white";
        ctx.globalAlpha = this.timer / this.timerStart;

        ctx.fillText(this.damage, this.x - gameEngine.camera.x - 4 + this.randomX, this.y - gameEngine.camera.y - 4 - (50 - this.timer/2) * 2 + this.randomY);
        ctx.globalAlpha = 1;

    }
}