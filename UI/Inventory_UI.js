class InventoryUI {
    constructor(inventory) {
        this.inventory = inventory;
        this.x = 300;
        this.y = 300;
        this.color = "#330000"
        this.rows = 3;
        this.columns = 8;
        this.gridSize = 6;
        this.slotSize = 116;
        this.currentPage = 0;
        this.numPages = 1;
        this.count = 50;
    }
  
    draw(ctx) {
      this.drawCooldownIcons(ctx, 1400, 400, 100, 200, 7);
      ctx.fillStyle = this.color;
      //make the rect transparent
      ctx.globalAlpha = 0.5;
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
    }


    update() {
    }

    drawCooldownIcons(context, x, y, width, height, cooldown) {
      let startCooldown = cooldown;
      let count = 0;
      while(cooldown > 0) {
        context.fillStyle = "rgba(255, 0, 0, " + (1 - cooldown/startCooldown) + ")";
        context.fillRect(x, y, width, height);
        setTimeout(10);
        count++;
        cooldown--;
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
}
  