class DarkColossusHud {

    constructor(boss) {
        this.boss = boss;
        this.bossMaxHealth = MAX_HEALTH;
        //create a timer to time the boss fight
        this.bossTimer = new Timer();
        this.bossTimer.gameTime = 0;
        this.bossTimer.totalTime = 0;

        // update the timer display every second
        setInterval(() => {
            this.bossTimer.gameTime += 1;
            //this.updateTimerDisplay();
        }, 1000);

    }

    draw(ctx) {
        //draw a big health bar at the top center of the screen
        let xCenter = CANVAS_WIDTH / 2;
        ctx.fillStyle = "red";
        ctx.fillRect(460, CANVAS_HEIGHT - 100, 1000, 20);
        ctx.fillStyle = "green";
        ctx.fillRect(460, CANVAS_HEIGHT - 100, (this.boss.health / this.bossMaxHealth) * 1000, 20);

        //Draw the boss name at the top center of the screen
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        let textWidth = ctx.measureText("Dark Colossus").width/2;
        ctx.fillText("Dark Colossus", xCenter - textWidth, CANVAS_HEIGHT - 120);

        //Draw the boss timer at the top center of the screen
        const minutes = Math.floor(this.bossTimer.gameTime / 60);
        const seconds = this.bossTimer.gameTime % 60;
        const timerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        ctx.font = "30px Arial";
        textWidth = ctx.measureText(timerText).width/2;
        ctx.fillText(timerText, xCenter - textWidth, CANVAS_HEIGHT - 30);
    }

    update() {

    }
}