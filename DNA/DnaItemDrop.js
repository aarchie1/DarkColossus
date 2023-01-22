class DnaItemDrop {

    //On collision, move the item to the player's inventory
    //and remove it from the level
    constructor() {
        this.dna = getRandomDNA();
    }

    update() {

    }

    draw(ctx) {

    }

    onCollision() {
        player.inventory.addDNA(this.dna);
        this.removeFromWorld = true; //Remove from the level
    }
}