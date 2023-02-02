class InventoryUI {
    constructor(game) {
        params.STATE = "menu";
        this.font = "20px Arial",
        this.fontColor = "#FFFFFF"
        this.BROWSE = 1;
        this.SPLICE = 2;
        this.state = this.BROWSE;
        this.game = game;
        //find inventory in entities
        this.inventory = params.INVENTORY.inventory;
        this.rows = 2;
        this.columns = 6;
        this.numPages = Math.ceil(this.inventory.length / (this.rows * this.columns));
        this.color = "#330000";
        this.gridSize = 6;
        this.slotSize = 116;
        this.currentPage = 0;
        this.currentSlot = 0;
        this.currentDna = 0;
        this.count = 50;
        this.x = CANVAS_WIDTH/2 - this.columns * this.slotSize/2;
        this.y = CANVAS_HEIGHT - this.rows * this.slotSize;
        this.pressed = false;
    }
  
    draw(ctx) {
      ctx.fillStyle = "#994B50";
      //make the rect transparent
      ctx.globalAlpha = .8;
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
        let x = this.x + (i % this.columns) * this.slotSize;
        let row = Math.floor(i / this.columns);
        let y = this.y + row * this.slotSize - (this.currentPage * this.rows * this.slotSize);
      
      
        if (dna != null) dna.drawDna(ctx, x, y, this.slotSize);
      }

      this.drawControls(ctx);
    //   console.log("current page: " + this.currentPage);
    //   console.log("dna range: " + (this.rows*this.columns*this.currentPage) + " to " + end);
     }


    update() {

      //Controls
      this.equipSlot1();
      this.equipSlot2();
      this.sellDna();
      this.toggleMode();
      this.closeInventory();

      //Move Cursor Left
      if (!this.pressed && (this.game.keys.KeyA || this.game.controllerButtonLeft)) {
        if (this.currentSlot == 0 || this.currentSlot % this.columns == 0) {
          if (this.currentPage > 0) {
            this.prevPage();
            //this.currentSlot = this.columns * this.rows - 1;
          } else {
            //this.currentSlot = this.columns * this.rows - 1;
          }
        } else {
          this.currentSlot = (this.currentSlot - 1) % (this.columns * this.rows);
        }

      //Move Cursor Right
      } else if (!this.pressed && (this.game.keys.KeyD || this.game.controllerButtonRight)) {
        if ((this.currentSlot+1) % (this.columns) == 0) {
          if (this.currentPage < this.inventory.length / (this.columns * this.rows) - 1) {
            this.nextPage();
            this.currentSlot = 0;
            //this.currentSlot = 0;
          } else {
            this.currentSlot = 0;
          }
        } else {
          this.currentSlot = (this.currentSlot + 1) % (this.columns * this.rows);
        }

      //Move Cursor Down
      } else if (keypress("KeyS") || this.game.controllerButtonDown) {
        this.currentSlot = (this.currentSlot + this.columns) % (this.columns * this.rows);
        //this.nextPage();
       //this.currentPage++;

      //Move cursor up or wrap to bottom
      } else if (keypress("KeyW") || this.game.controllerButtonUp) {
        this.currentSlot = (this.currentSlot - this.columns + this.rows * this.columns) % (this.columns * this.rows);
        //this.prevPage();
      } 

      if (this.game.keys.KeyA == true || this.game.keys.KeyD == true || this.game.keys.KeyS == true || this.game.keys.KeyW == true) {
        this.pressed = true;
      } else {
        this.pressed = false;
      }
      this.currentDna = this.currentSlot + (this.currentPage * this.rows * this.columns);
    }

    drawControls(ctx) {
      //draw controls right above the inventory in a horizontal line
      ctx.fillStyle = this.fontColor;
      ctx.textAlign = "center";
      ctx.font = this.font;
      if(this.state == this.BROWSE){
        ctx.fillText("1: Equip slot 1   2: Equip slot 2   3: Sell   4:Splice", CANVAS_WIDTH/2, this.y - 20);
      } else if (this.state == this.SPLICE) {
        ctx.fillText("1: Select slot 1   2: Select slot 2   3: Splice   4:Browse", CANVAS_WIDTH/2, this.y - 20);
      }

      //draw on the left and right side of the inventory to indicate that there are more pages
      ctx.font = "50px Arial";
      if (this.currentPage > 0) {
        ctx.fillText("<", this.x - 40, this.y + this.slotSize * this.rows/2);
      }
      
      if (this.currentPage < this.inventory.length / (this.rows * this.columns) - 1) {
        ctx.fillText(">", this.x + this.slotSize * this.columns + 40, this.y + this.slotSize * this.rows/2);
      }

      
    }

    toggleMode() {
      if (keypress("Digit4") && !this.game.PAUSED) {
        if (this.state == this.BROWSE) {
          this.state = this.SPLICE;
        } else if (this.state == this.SPLICE) {
          this.state = this.BROWSE;
        }
      }
    }

    equipSlot1() {
      if (keypress("Digit1") && this.state == this.BROWSE && !this.game.PAUSED){
        unequipAbilities(params.INVENTORY.dnaSlot1);

        params.INVENTORY.dnaSlot1 = this.inventory[this.currentDna];
        if (params.INVENTORY.dnaSlot2 == params.INVENTORY.dnaSlot1) {
          params.INVENTORY.dnaSlot2 = null;
        }
        //onUnequip();
        equipAbilities();
      }
    }

    equipSlot2() {
      if (keypress("Digit2") && this.state == this.BROWSE && !this.game.PAUSED){
        //unequip the abiliities in the current slot
        unequipAbilities(params.INVENTORY.dnaSlot2);

        params.INVENTORY.dnaSlot2 = this.inventory[this.currentDna];
        if (params.INVENTORY.dnaSlot2 == params.INVENTORY.dnaSlot1) {

          params.INVENTORY.dnaSlot1 = null;
        }
        //onUnequip();
        equipAbilities();
      }
    }

    sellDna() {
      if (keypress("Digit3") && this.state == this.BROWSE && !this.game.PAUSED){
        if(this.inventory[this.currentDna] == null) return;
        //check if current dna is equipped
        if (this.inventory[this.currentDna] == params.INVENTORY.dnaSlot1) {
          unequipAbilities(this.inventory[this.currentDna]);
          params.INVENTORY.dnaSlot1 = null;

        } else if (this.inventory[this.currentDna] == params.INVENTORY.dnaSlot2) {
          unequipAbilities(this.inventory[this.currentDna]);
          params.INVENTORY.dnaSlot2 = null;
        }

        params.DARK_ENERGY.currency += this.inventory[this.currentDna].value;
        //remove only the current slot
        this.inventory.splice(this.currentDna, 1);
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

    closeInventory() {
      if (this.game.keys.KeyE) {
        params.STATE = "gameplay";
        this.removeFromWorld = true;
        gameEngine.keys.KeyE = false;
      }
    }
}
  