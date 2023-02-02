class GameCharacter {
    #sprite;
    BLOCKWIDTH = 256;

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.JUMP_ACC = -1300;
        this.MIN_RUN = 50;
        this.MAX_RUN = 800;
        this.RUN_ACC = 2500;
        this.DEC_SKID = 5000;
        this.DEC_REL = 1500;
        this.FALL_ACC = 2700
        this.MAX_JUMPS = 2;
        this.JUMPS = this.MAX_JUMPS;    
        const TICK = this.game.clockTick;
        this.state = 2;

        this.facing = 0 // 0 = right, 1 == left
        this.state = 0; //0 = idle, 1 = running, 2 = falling 3 = jumping, 4 = attacking
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
        if (this.state === 3) this.BB = new BoundingBox(this.x+100, this.y, 100, 256);
        else {
            this.BB = new BoundingBox(this.x+100, this.y, 100, 256);
        }
    }

    update(){

        const JUMP_ACC = this.JUMP_ACC;
        const MIN_RUN = this.MIN_RUN;
        const MAX_RUN = this.MAX_RUN;
        const RUN_ACC = this.RUN_ACC;
        const DEC_SKID = this.DEC_SKID;
        const DEC_REL = this.DEC_REL;
        const MAX_FALL = this.MAX_FALL;
        const FALL_ACC = this.FALL_ACC;
        const TICK = this.game.clockTick;

        // Call ability update methods at all times
        if (params.INVENTORY.dnaSlot1 != null) params.INVENTORY.dnaSlot1.update();
        if (params.INVENTORY.dnaSlot2 != null) params.INVENTORY.dnaSlot2.update();

        if(keypress("Escape") || this.game.controllerButtonY) {
            this.game.PAUSED = !this.game.PAUSED;
        }
        
        // Ground Physics
        if (this.state < 2) {
            if (this.state == 0 || this.state == 1 && params.STATE == "gameplay") this.JUMPS = this.MAX_JUMPS;
            this.animationXOffset = 0;
            this.animationYOffset = 0;
            if (Math.abs(this.velocity.x) < MIN_RUN) {
                this.velocity.x = 0;
                this.state = 0;
                if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && params.STATE == "gameplay") {
                    this.velocity.x -= MIN_RUN;
                }
                if ((this.game.keys.KeyD || this.game.controllerButtonRight) && params.STATE == "gameplay") {
                    this.velocity.x += MIN_RUN;
                }
            } else if (Math.abs(this.velocity.x) >= MIN_RUN) {
                if (this.facing === 0) {
                    this.animationYOffset = -35;
                    if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || !this.game.controllerButtonLeft) && params.STATE == "gameplay") {
                        this.velocity.x += RUN_ACC * TICK;
                        this.animationXOffset = 0;
                    }
                    else if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight) && params.STATE == "gameplay") {
                        this.velocity.x -= DEC_SKID * TICK;
                    }
                    else {
                        this.velocity.x -= DEC_REL * TICK;
                    }
                }
                if (this.facing === 1) {
                    this.animationYOffset = -35;
                    if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight) && params.STATE == "gameplay") {
                        this.velocity.x -= RUN_ACC * TICK;;
                    }
                    else if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || !this.game.controllerButtonLeft) && params.STATE == "gameplay") {
                        this.velocity.x += DEC_SKID * TICK;
                    }
                    else {
                        this.velocity.x += DEC_REL * TICK;
                    }
                }
            }
            this.velocity.y += FALL_ACC * TICK; 
            
            // Jump Physics
            this.jump()

            
        //Falling
        } else if (this.velocity.y >= 0) {
            if (this.jump() != true) this.state = 2;
            if (this.facing == 0) {
                this.animationXOffset = 257;
                this.animationYOffset = 200;
            } else {
                this.animationXOffset = 0;
                this.animationYOffset = 200;
            }
            if ((this.game.keys.KeyD && !this.game.keys.KeyA) || (this.game.controllerButtonRight && !this.game.controllerButtonLeft)) {
               this.velocity.x += RUN_ACC * TICK;
            } else if ((this.game.keys.KeyA && !this.game.keys.keyD) || (this.game.controllerButtonLeft && !this.game.controllerButtonRight)) {
                this.velocity.x -= RUN_ACC * TICK;
            } 
        }
        
        this.velocity.y += FALL_ACC * TICK;
        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
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
                        if (this.state === 2 || this.state == 3) this.state = 0;
                        this.updateBB();
                    } 
                }  
            }
        })

        // Update State
        if (this.state !== 4 && this.state !== 2 && this.state !== 3){
            if (Math.abs(this.velocity.x) > 0) {
                this.state = 1;
            } else {
                this.state = 0;
                this.animationXOffset = 0;
                this.animationYOffset = 0;
            }
        }

        // Update Facing direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;

        // Call ability update methods at all times
        if (params.INVENTORY.dnaSlot1 != null) params.INVENTORY.dnaSlot1.update();
        if (params.INVENTORY.dnaSlot2 != null) params.INVENTORY.dnaSlot2.update();

    }

    jump() {
        if (!this.game.PAUSED && params.STATE == "gameplay" && (this.game.keys.Space || this.game.controllerButtonA) && this.JUMPS > 0) {
            this.JUMPS--;
            this.velocity.y = this.JUMP_ACC;
            if (this.facing == 0) {
                this.animationXOffset = 257;
                this.animationYOffset = 300;
            }else {
                this.animationYOffset = 300;
            }
            this.state = 3;
            this.animations[this.state][this.facing].elapsedTime = 0;
            return true;
        } else {
            return false;
        }
    }

    loadAnimations() {
        for (let i = 0; i < 4; i++) { // 5 states (Havent implemented attacking)  debug for running rn set back to 4
            this.animations.push([]);
            for (let j = 0; j < 2; j++){ // two directions
                this.animations[i].push([]);
            }
        }

        // idle animation for state = 0
        // facing right = 0
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_idle_right.png"), 0, 0, 256, 256, 8, .2, 0, true);

        // facing left = 1
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_idle_left.png"), 0, 0, 256, 256, 8, .2, 0, true);

        // Walking Animation state = 1
        // facing right = 0
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_running_right.png"), 0, 0, 320, 256, 5, .075, 0, true);

        // facing left = 1
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_running_left.png"), 0, 0, 320, 256, 5, .075, 0, true);


        // Falling animation for state = 2
        // facing right = 0
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_falling_right.png"), 0, 0, 512, 564, 5, .1, 0, true);

        //facing left  = 1
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_falling_left.png"), 0, 0, 512, 564, 5, .1, 0, true);

        // Jumping Animation state = 3
        // facing right = 0
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_jump_right.png"), 0, 0, 512, 564, 8, .075, 0, false);

        // facing left = 1
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_jump_left.png"), 0, 0, 512, 564, 8, .075, 0, false);

    }
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.animationXOffset - this.game.camera.x, this.y-this.animationYOffset - this.game.camera.y, 1);
        if (this.game.PAUSED) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.font = "50px Arial";
            ctx.strokeStyle = 'Red';   
            ctx.textAlign = "center";  
            ctx.fillStyle = "white";
            ctx.fillText("PAUSED", CANVAS_WIDTH/2, CANVAS_HEIGHT/2);


        }



        //DEBUG (I probably should have put it all in one if statement oops lmao)
        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        if (debug) ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
        //put debug on screen text for x, y, velocity, state, facing, and jumps on the right hand side of the screen
        let debugY = 150;
        let debugX = 1400;
        //use math.roudn
        if (debug) ctx.fillText("X: " + Math.round(this.x), debugX, debugY);
        if (debug) ctx.fillText("Y: " + Math.round(this.y), debugX, debugY + 20);
        if (debug) ctx.fillText("Velocity X: " + Math.round(this.velocity.x), debugX, debugY + 40);
        if (debug) ctx.fillText("Velocity Y: " + Math.round(this.velocity.y), debugX, debugY + 60);
        switch (this.state) {
            case 0:
                if (debug) ctx.fillText("State: Idle" , debugX, debugY + 80);
                break;
            case 1:
                if (debug) ctx.fillText("State: Running" , debugX, debugY + 80);
                break;
            case 2:
                if (debug) ctx.fillText("State: Falling" , debugX, debugY + 80);
                break;
            case 3:
                if (debug) ctx.fillText("State: Jumping" , debugX, debugY + 80);
                break;
            default:
                if (debug) ctx.fillText("State: Unknown" , debugX, debugY + 80);
                break;
        }
        switch (this.facing) {
            case 0:
                if (debug) ctx.fillText("Facing: Right" , debugX, debugY + 100);
                break;
            case 1:
                if (debug) ctx.fillText("Facing: Left" , debugX, debugY + 100);
                break;
            default:
                if (debug) ctx.fillText("Facing: Unknown" , debugX, debugY + 100);
                break;
        }
        if (debug) ctx.fillText("Jumps: " + this.JUMPS, debugX, debugY + 120);
        if (debug)ctx.fillText("PAUSED: " + this.game.PAUSED, debugX, debugY + 140);



    };
}
