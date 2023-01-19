class Platform {
    constructor(startX, startY, endX, endY, sprite) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.sprite = sprite;
        this.width = endX - startX;
        this.height = endY - startY;
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.startX, this.startY, this.width, this.height);
    }

    update() {
        
    }
}