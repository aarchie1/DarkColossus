class InventoryUI {
    constructor(game) {
        this.game = game;
        this.inventory = []//inventory;
        for (let i = 0; i < 16; i++) {
            this.inventory.push(getRandomDNA());
        }
        let testDna = getRandomDNA();
        testDna.sigmaAbility = null;
        testDna.betaAbility = null;
        this.inventory.push(testDna);
        this.rows = 2;
        this.columns = 6;
        this.numPages = Math.ceil(this.inventory.length / (this.rows * this.columns));
        this.color = "#330000"
        this.gridSize = 6;
        this.slotSize = 116;
        this.currentPage = 0;
        this.currentSlot = 0;
        this.count = 50;
        this.x = CANVAS_WIDTH/2 - this.columns * this.slotSize/2;
        this.y = CANVAS_HEIGHT - this.rows * this.slotSize;
        this.pressed = false;
    }
  
    draw(ctx) {
      ctx.fillStyle = "#995B38";
      //make the rect transparent
      ctx.globalAlpha = .6;
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
      //athis.drawArrows();

      //draw the current slot
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 5;
      ctx.strokeRect(
        this.x + (this.currentSlot % this.columns) * this.slotSize,
        this.y + Math.floor(this.currentSlot / this.columns) * this.slotSize,
        this.slotSize,
        this.slotSize
      );
      ctx.fillStyle = "#FFFFFF";
      ctx.globalAlpha = .3;
      ctx.fillRect(
        this.x + (this.currentSlot % this.columns) * this.slotSize,
        this.y + Math.floor(this.currentSlot / this.columns) * this.slotSize,
        this.slotSize,
        this.slotSize
      );
      ctx.globalAlpha = 1;

      let end = (this.rows*this.columns*this.currentPage) + (this.rows*this.columns);
      //iterate over inventory and draw every dna in a slot
      for (let i = this.currentPage*this.rows*this.columns; i < end; i++) {
        let dna = this.inventory[i];
        if (dna == null) break;
        let x = this.x + (i % this.columns) * this.slotSize;
        let y = this.y + Math.floor(i / this.columns) * this.slotSize;
        dna.drawDna(ctx, x, y, this.slotSize);
      }
    //   console.log("current page: " + this.currentPage);
    //   console.log("dna range: " + (this.rows*this.columns*this.currentPage) + " to " + end);
     }


    update() {

      //I NEED HELP WITH CONTROLS 
      //Move Cursor Left
      if (!this.pressed &&(this.game.keys.KeyA || this.game.controllerButtonLeft)) {
        this.currentSlot = (this.currentSlot == 0) ? this.columns*this.rows-1 : (this.currentSlot - 1) % (this.columns * this.rows);
      
      //Move Cursor Right
      } else if(!this.pressed && (this.game.keys.KeyD || this.game.controllerButtonRight)) {
        this.currentSlot = (this.currentSlot + 1) % (this.columns * this.rows);

      //Go to next inventory page
      } else if (this.game.keys.KeyS || this.game.controllerButtonDown) {
        this.nextPage();
       //this.currentPage++;

      //Go to previous inventory page
      } else if (this.game.keys.KeyW || this.game.controllerButtonUp) {
        this.prevPage();
      }

      if (this.game.keys.KeyA == true || this.game.keys.KeyD == true || this.game.keys.KeyS == true || this.game.keys.KeyW == true) {
        this.pressed = true;
      } else {
        this.pressed = false;
      }
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
  