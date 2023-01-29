class DnaItemDrop {

    //On collision, move the DNA to the player's inventory
    //and remove it from the level
    //DnaItemDrop.js is an entity
    //DNA.js is not an entity
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.t = Math.random();
        this.amplitude = 2;
        this.dna = getRandomDNA(); //this is what goes into the player's inventory
    }

    update() {
        this.t += 0.06;
        this.y += Math.sin(this.t) * this.amplitude;
        
    }

    draw(ctx) {
        // let w = Math.max(136 + Math.sin(this.t) * 100, 150); // minimum size it can become
        // let x = this.x - this.game.camera.x + 50 - Math.sin(this.t) * 100 - 20; // move the circle to the left
        // let y = this.y + this.game.camera.y + 100;
        // this.drawEllipse(ctx, x, y, w, 40, 0.5);
        this.dna.drawDna(ctx, this.x - this.game.camera.x , this.y - this.game.camera.y, 116);
    }
    
    // drawEllipse(ctx, x, y, w, h, alpha) {
    //     ctx.globalAlpha = 0;;
    //     ctx.fillStyle = "#330000"
    //     ctx.beginPath();
    
    //     for (let i = 0; i < 2 * Math.PI; i += 0.01) {
    //         let xPos = x + w * Math.cos(i);
    //         let yPos = y + h * Math.sin(i);
    //         if (i === 0) {
    //             ctx.moveTo(xPos, yPos);
    //         } else {
    //             ctx.lineTo(xPos, yPos);
    //         }
    //     }
    //     ctx.stroke();
    //     ctx.globalAlpha = alpha;
    //     ctx.fill();
    //     ctx.globalAlpha = 1;
    
    // }
}