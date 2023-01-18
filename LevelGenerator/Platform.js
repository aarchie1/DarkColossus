class Platform {
    constructor(startX, startY, endX, endY, spritsheet) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.sprite = spritsheet;

        //Might not be needed but its here
        this.width = endX - startX;
        this.height = endY - startY;
    }

    draw() {
        //draw the spritesheet
    }

    update() {
        //collision
    }

    //Feel free to delete this
    // collision(player) {
    //     if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.y + player.height > this.y) {
    //         player.stopmovingforwardorwhateverthebehavioris()
    //     }
    // }
}