class InventoryUI {
    constructor(inventory) {
        
        this.inventory = []//inventory;
        for (let i = 0; i < 8; i++) {
            this.inventory.push(getRandomDNA());
        }
        this.numPages = Math.ceil(this.inventory.length / (this.rows * this.columns));
        this.color = "#330000"
        this.rows = 2;
        this.columns = 6;
        this.gridSize = 6;
        this.slotSize = 116;
        this.currentPage = 0;
        this.count = 50;
        this.x = CANVAS_WIDTH/2 - this.columns * this.slotSize/2;
        this.y = CANVAS_HEIGHT - this.rows * this.slotSize;
    }
  
    draw(ctx) {
      ctx.fillStyle = "#DF8652";
      //make the rect transparent
      ctx.globalAlpha = .9;
      ctx.fillRect(this.x, this.y, this.columns*this.slotSize, this.rows*this.slotSize);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
            ctx.strokeRect(
                this.x + j * this.slotSize,
                this.y + i * this.slotSize,
                this.slotSize,
                this.slotSize
            );
        }
      }
      this.drawArrows();
      //ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/DNA/dna_basic.png"), 100, 100, this.slotSize, this.slotSize);

      //iterate over inventory and draw every dna in a slot
      for (let i = this.currentPage*this.rows*this.columns; i < (i+1)*(this.rows*this.columns); i++) {
        let dna = this.inventory[i];
        if (dna == null) break;
        let x = this.x + (i % this.columns) * this.slotSize;
        let y = this.y + Math.floor(i / this.columns) * this.slotSize;
        dna.drawDna(ctx, x, y, this.slotSize);
      }
    }


    update() {


    }


    drawArrows() {
      if (this.numPages <= 1) return;
      //draw left arrow
      if (this.currentPage > 0) {
          // draw left arrow
      }
      //draw right arrow
      if (this.currentPage < this.numPages - 1) {
        // draw right arrow
      }
    }
  
    nextPage() {
      if (this.currentPage < this.numPages - 1) {
        this.currentPage++;
      }
    }
  
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }

    equipDna(dna) {

    }

    unequipDna(dna) {

    }
}
  