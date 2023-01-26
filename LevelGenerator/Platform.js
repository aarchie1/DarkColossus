//Generic Platform class
//boundingBox takes in a object like i.e.:
//            new BoundingBox(this.x, this.y+37, this.w, this.BLOCKWIDTH /2);
class Platform {

    constructor(x, y, width, height, sprite, boundingBox) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.BB = boundingBox;
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'Green';
        if (debug)ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }

    update() {
        
    }
}