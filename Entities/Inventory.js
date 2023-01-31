class Inventory {

    constructor(game) {
        this.inventory = [];

        //test data
        for (let i = 0; i < 15; i++) {
            this.inventory.push(getRandomDNA());
        }
        this.game = game;
        this.dnaSlot1 = null;
        this.dnaSlot2 = null;
    }

    draw(ctx) {
        
    }

    update() {

    }
}