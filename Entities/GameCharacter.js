class GameCharacter {
    #sprite;
    BLOCKWIDTH = 256;

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.JUMP_ACC = -1000;
        this.MIN_RUN = 50;
        this.MAX_RUN = 1000;
        this.RUN_ACC = 2500;
        this.DEC_SKID = 5000;
        this.DEC_REL = 1500;
        this.FALL_ACC = 2500
        this.MAX_JUMPS = 1000;
        this.JUMPS = 2;        
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

        if(!this.game.PAUSED && this.game.keys.Escape) {
            this.game.PAUSED = true;
        }

        if(this.game.PAUSED && this.game.keys.KeyM) {
            this.game.PAUSED = false;
        }
        
        // Ground Physics
        if (this.state < 2) {
            if (this.state == 0 || this.state == 1) this.JUMPS = this.MAX_JUMPS;
            this.animationXOffset = 0;
            this.animationYOffset = 0;
            if (Math.abs(this.velocity.x) < MIN_RUN) {
                this.velocity.x = 0;
                this.state = 0;
                if (this.game.keys.KeyA || this.game.controllerButtonLeft) {
                    this.velocity.x -= MIN_RUN;
                }
                if (this.game.keys.KeyD || this.game.controllerButtonRight) {
                    this.velocity.x += MIN_RUN;
                }
            } else if (Math.abs(this.velocity.x) >= MIN_RUN) {
                if (this.facing === 0) {
                    this.animationYOffset = -35;
                    if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || this.game.controllerButtonLeft)) {
                        this.velocity.x += RUN_ACC * TICK;
                        this.animationXOffset = 0;
                    }
                    else if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight)) {
                        this.velocity.x -= DEC_SKID * TICK;
                    }
                    else {
                        this.velocity.x -= DEC_REL * TICK;
                    }
                }
                if (this.facing === 1) {
                    this.animationYOffset = -35;
                    if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight)) {
                        this.velocity.x -= RUN_ACC * TICK;;
                    }
                    else if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || this.game.controllerButtonLeft)) {
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
            if (this.game.keys.KeyD && !this.game.keys.KeyA) {
               this.velocity.x += RUN_ACC * TICK;
            } else if (this.game.keys.KeyA && !this.game.keys.keyD) {
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
    }

    jump() {
        if (!this.game.PAUSED && this.game.keys.Space && this.JUMPS > 0) {
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
        ctx.font = "50px Arial";
        ctx.strokeStyle = 'Red';      
        ctx.fillText("PAUSED: " + this.game.PAUSED, 100, 100);
        if (debug) ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width, this.BB.height);
    };
}
