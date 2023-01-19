class GameCharacter {
    #sprite;
    BLOCKWIDTH = 256;
    


    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
    
        
        // State variables
        
        this.facing = 0 // 0 = right, 1 == left
        this.state = 0; //0 = idle, 1 = running, 2 = falling 3 = jumping, 4 = attacking

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 450
        this.dead = false;
        this.updateBB();


        this.animationXOffset = 0;
        this.animationYOffset = 0;
        // Animations
        this.animations = [];
        this.loadAnimations();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 256, 256);
    }

    update(){
        const JUMP_ACC = -10000;
        const MIN_RUN = 50;
        const MAX_RUN = 450;
        const RUN_ACC = 800;
        const DEC_SKID = 5000;
        const DEC_REL = 1500;
        const STOP_FALL = 200;
        const MAX_FALL = 270;
        const TICK = this.game.clockTick;
        
        // Ground Physics
        if (this.state < 2) {
            this.animationXOffset = 0;
            this.animationYOffset = 0;
            if (Math.abs(this.velocity.x) < MIN_RUN) {
                this.velocity.x = 0;
                this.state = 0;
                // Moving left
                if (this.game.keys.KeyA || this.game.controllerButtonLeft) {
                    this.velocity.x -= MIN_RUN;
                }
                //  Moving right
                if (this.game.keys.KeyD || this.game.controllerButtonRight) {
                    this.velocity.x += MIN_RUN;
                }
            } else if (
                Math.abs(this.velocity.x) >= MIN_RUN
            ) {
                // Facing right
                if (this.facing === 0) {
                    this.animationYOffset = -35;
                    // If facing right and pressing the D key we need to accelerate
                    if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || this.game.controllerButtonLeft)) {
                        this.velocity.x += RUN_ACC * TICK;
                        this.animationXOffset = 0;
                        
                    }
                    // Deceleration Logic
                    // If facing right and pressing the A key, we need to slow down our character
                    else if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight)) {
                        this.velocity.x -= DEC_SKID * TICK;
                    }
                    // If facing right and not pressing a key, we need to slow down our character
                    else {
                        this.velocity.x -= DEC_REL * TICK;
                    }
                }
                // Facing left
                if (this.facing === 1) {
                    this.animationYOffset = -35;
                    // If facing left and pressing the A key we need to accelerate
                    if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight)) {
                        this.velocity.x -= RUN_ACC * TICK;;
                    }
                    // Deceleration Logic
                    // If facing left and pressing the D key, we need to slow down our character
                    else if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || this.game.controllerButtonLeft)) {
                        this.velocity.x += DEC_SKID * TICK;
                    }
                    // If facing left and not pressing a key, we need to slow down our character
                    else {
                        this.velocity.x += DEC_REL * TICK;
                    }
                }
            }
            this.velocity.y += this.fallAcc * TICK;
            
            // Jump Physics
            if (this.game.keys.Space) {
                this.velocity.y = JUMP_ACC;
                this.fallAcc = STOP_FALL;
                this.state = 3;
                this.animations[this.state][this.facing].elapsedTime = 0;
                this.animationXOffset = 257;
                this.animationYOffset = 300;
            }
        } else { 
            // Air Physics (need to implement horizontal aspect)
            this.state = 2;
            this.velocity.y += this.fallAcc * TICK;
            if (this.game.keys.KeyD && !this.game.keys.KeyA) {
               this.velocity.x += RUN_ACC * TICK;
            } else if (this.game.keys.KeyA && !this.game.keys.keyD) {
                this.velocity.x -= RUN_ACC * TICK;
            } else {
                //do nothing.
            }
        }
        

        // Update Velocity/ Max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
        
        // Update Position
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;   
        

        //Collision
        this.game.entities.forEach((entity) => {
            // Collisions with players bounding box
            if (entity.BB && this.BB.collide(entity.BB)) {
                //falling
                if (this.velocity.y > 0) { 
                    if ((entity instanceof SmallPlatform) //landing
                        && (this.lastBB.bottom) <= entity.BB.top) { // was above last tick
                        this.y = entity.BB.top - this.BB.height; 
                        this.velocity.y = 0
                    }
                    this.velocity.y === 0;
                    if (this.state === 2 || this.state === 3) this.state = 0;
                    this.updateBB();
                }  
            }
        })


        // Update State
        if (this.state !== 4 && 
            this.state !== 2 && 
            this.state !== 3)
        {
            if (Math.abs(this.velocity.x) >= MIN_RUN) {
                this.state = 1;
            } else {
                this.state = 0;
            }
        }
        // Falling
        else if (this.velocity.y > 0) {
            this.state = 2;
        } else if (this.velocity.y < 0) {
            this.state = 3;
        }

        // Update Facing direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;

    }

    loadAnimations() {
        for (let i = 0; i < 4; i++) { // 5 states (Havent implemented attacking) debug for running rn set back to 4
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
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_running_right.png"), 0, 0, 320, 256, 5, .2, 0, true);

        // facing left = 1
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_running_left.png"), 0, 0, 320, 256, 5, .2, 0, true);


        // Falling animation for state = 2
        // facing right = 0
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_falling_right.png"), 0, 0, 512, 564, 5, .2, 0, true);

        //facing left  = 1
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_falling_left.png"), 0, 0, 512, 564, 5, .2, 0, true);

        // Jumping Animation state = 3
        // facing right = 0
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_jump_right.png"), 0, 0, 512, 564, 3, .25, 0, false);

        // facing left = 1
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_jump_left.png"), 0, 0, 512, 564, 3, .25, 0, false);

    }
    draw(ctx) {
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,40,0,2*Math.PI);
        // ctx.stroke();
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-this.animationXOffset, this.y-this.animationYOffset, 1);

        ctx.font = "50px Arial";
        ctx.fillText("STATE: " + this.state, 10, 50);
        ctx.fillText("XVeloc: " + Math.round(this.velocity.x), 10, 100);
        ctx.fillText("YVeloc: " + Math.round(this.velocity.y), 10, 150);
        ctx.fillText("Xpos: " + Math.round(this.x), 10, 200);
        ctx.fillText("Ypos: " + Math.round(this.y), 10, 250);

        ctx.strokeStyle = 'Red';
         ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}