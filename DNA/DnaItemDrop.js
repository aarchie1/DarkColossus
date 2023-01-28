class DnaItemDrop {

    //On collision, move the item to the player's inventory
    //and remove it from the level
    constructor() {
        this.dna = getRandomDNA(); //this is what goes into the player's inventory
    }

    update() {

    }

    draw(ctx) {
        
    }

    onCollision() {
        player.inventory.push(this.dna);
        this.removeFromWorld = true; //Remove from the level
    }
}