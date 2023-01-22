//Generic Platform class
//boundingBox takes in a object like i.e.:
//            new BoundingBox(this.x, this.y+37, this.w, this.BLOCKWIDTH /2);
class Platform {

    //BLOCKWIDTH = 256; unsure if this is needed, just took it from Anthony's SmallPlatform.js

    constructor(x, y, width, height, sprite, boundingBox) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.BB = boundingBox;
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.startX, this.startY, this.width, this.height);
    }

    update() {
        
    }
}