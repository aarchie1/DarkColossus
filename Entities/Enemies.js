class Reaper {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        
        const TICK = this.game.clockTick;
        this.fallAcc = 400;
        this.reaper = this;
        this.player = this.game.camera.player;
        this.facing = 0 // 0 = right, 1 == left
        this.state = 1; //0 = weak 1 = normal 2 = strong 3 = attacking
        this.velocity = { x: 0, y: 0 };
        this.dead = false;
        this.updateBB();
        this.animationXOffset = 0;
        this.animationYOffset = 0;
        this.animations = [];
        this.loadAnimations();
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.state === 3) this.BB = new BoundingBox(this.x, this.y, 320, 256);
        else {
            this.BB = new BoundingBox(this.x, this.y, 256, 256);
        }
    }

    update(){
        
        const TICK = this.game.clockTick;

        this.velocity.y += this.fallAcc * TICK;
        if (this.x > this.player.x) this.velocity.x = 10 * TICK;
        if (this.x < this.player.x) this.velocity.x = -10 * TICK;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;   
        this.updateBB();

        //Collision
        this.game.entities.forEach((entity) => {
            // Collisions with players bounding box
            if (entity.BB && this.BB.collide(entity.BB)) {
                //falling
                if (this.velocity.y > 0) { 
                    if ((entity instanceof SmallPlatform) || (entity instanceof Platform) 
                        && (this.lastBB.bottom) <= entity.BB.top) {
                        this.y = entity.BB.top - this.BB.height; 
                        this.velocity.y = 0;
                        this.animationXOffset = 0;
                        this.animationYOffset = 0;
                        this.updateBB();
                    } 
                }
                // Collision with player
                if (getDistance(this.player, this.reaper) < 10) { 
                    if ((entity instanceof GameCharacter) && (this.lastBB.right) <= entity.BB.left) {
                        this.state == 3;
                        this.updateBB();
                    } 
                }  
            }
        })

        // Update Facing direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;
    }

    loadAnimations() {
        for (let i = 0; i < 4; i++) { // 5 states (Havent implemented attacking)  debug for running rn set back to 4
            this.animations.push([]);
            for (let j = 0; j < 2; j++){ // two directions
                this.animations[i].push([]);
            }
        }

        // weak animation for state = 0
        // facing right = 0
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_weak.png"), 0, 0, 256, 256, 6, .2, 0, true);

        // facing left = 1
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_weak.png"), 0, 0, 256, 256, 6, .2, 0, true);

        // normal Animation state = 1
        // facing right = 0
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_normal.png"), 0, 0, 256, 256, 6, .2, 0, true);

        // facing left = 1
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_normal.png"), 0, 0, 256, 256, 6, .2, 0, true);


        // strong animation for state = 2
        // facing right = 0
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_strong.png"), 0, 0, 256, 256, 6, .2, 0, true);

        //facing left  = 1
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_strong.png"), 0, 0, 256, 256, 6, .2, 0, true);

        // Attacking Animation state = 3
        // facing right = 0
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_attack.png"), 0, 0, 320, 256, 6, .2, 0, false);

        // facing left = 1
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Reaper/reaper_attack.png"), 0, 0, 320, 256, 6, .2, 0, false);

    }
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.animationXOffset - this.game.camera.x, this.y-this.animationYOffset - this.game.camera.y, 1);
        if (debug) ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}
