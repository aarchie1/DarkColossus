class GameCharacter {
    #sprite;
    FLOOR_BOUNDARY = 728;
    CEILING_BOUNDARY = 40;
    LEFT_BOUNDARY = 40;
    RIGHT_BOUNDARY = 984;
    // JUMP_ACC = -400;
    FALL_ACC = 450;
    STOP_FALL = 1575;
    MIN_WALK = 50;
    MAX_WALK = 450;
    RUN_ACC = 800;
    DEC_SKID = 5000;
    DEC_REL = 1500;
    MAX_FALL = 270;


    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
    
        
        // State variables
      
        this.facing = 0 // 0 = right, 1 == left
        this.state = 0; //0 = idle, 1 = running, 2 = falling 3 = jumping, 4 = attacking

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 450
        this.inAir = false;

        // this.velocityX = 0;
        // this.velocityY = 0;
        // this.moveRight = true;
        // this.moveLeft = true;
        // this.moveUp = true;
        // this.moveDown = true;
        // this.jumping = false;

        

        // Animations
        this.animations = [];
        this.loadAnimations();
    };

    update(){
        const TICK = this.game.clockTick;

        // Gravity 
        // if(this.state === 2 && this.moveDown) {
        //     this.velocityY += this.FALL_ACC*TICK;
        // }

        // if(this.y >= this.FLOOR_BOUNDARY) {
        //     this.state = 0;
        //     //this.onGround = true;
        //     //this.moveDown = false;
        //     //this.velocityY = 0;
        // } else {
        //     this.state = 2;
        //     //this.onGround = false;
        //     //this.moveDown = true;
        // }
        

        // Boundaries
        // if(this.y == this.CEILING_BOUNDARY) {
        //     this.moveUp = false;
        // } else {
        //     this.moveUp = true;
        // }

        // if(this.x >= this.RIGHT_BOUNDARY) {
        //     this.moveRight = false;
        // } else {
        //     this.moveRight = true;
        // }

        // if(this.x <= this.LEFT_BOUNDARY) {
        //     this.moveLeft = false;
        // } else {
        //     this.moveLeft = true;
        // }

        

        // Ground Physics
        if(this.state != 2) {
            if(Math.abs(this.velocity.x) < this.MIN_WALK) {
                this.velocity.x = 0;
                this.state = 0;
                // Moving left
                if (this.game.keys.KeyA || this.game.controllerButtonLeft) {
                    this.velocity.x -= this.MIN_WALK;
                }
                //  Moving right
                if(this.game.keys.KeyD || this.game.controllerButtonRight) {
                    this.velocity.x += this.MIN_WALK;
                }
            } else if (
                Math.abs(this.velocity.x) >= this.MIN_WALK
            ) {
                // Facing right
                if (this.facing === 0) {
                    // If facing right and pressing the D key we need to accelerate
                    if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || this.game.controllerButtonLeft)) {
                        this.velocity.x += this.RUN_ACC * TICK;
                    }
                    // Deceleration Logic
                    // If facing right and pressing the A key, we need to slow down our character
                    else if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight)) {
                        this.velocity.x -= this.DEC_SKID * TICK;
                    }
                    // If facing right and not pressing a key, we need to slow down our character
                    else {
                        this.velocity.x -= this.DEC_REL * TICK;
                    }
                }
                // Facing left
                if (this.facing === 1) {
                    // If facing left and pressing the A key we need to accelerate
                    if ((this.game.keys.KeyA || this.game.controllerButtonLeft) && (!this.game.keys.KeyD || !this.game.controllerButtonRight)) {
                        this.velocity.x -= this.RUN_ACC * TICK;;
                    }
                     // Deceleration Logic
                    // If facing left and pressing the D key, we need to slow down our character
                    else if ((this.game.keys.KeyD || this.game.controllerButtonRight) && (!this.game.keys.KeyA || this.game.controllerButtonLeft)) {
                        this.velocity.x += this.DEC_SKID * TICK;
                    }
                    // If facing left and not pressing a key, we need to slow down our character
                    else {
                        this.velocity.x += this.DEC_REL * TICK;
                    }
                }
            }
            
            // Update vertical velocity
            //this.velocity.y += this.FALL_ACC * TICK;

            // Jump Physics
            // if(this.game.keys.Space && !this.inAir) {
            //     this.velocity.y = this.STOP_JUMP;
            //     this.fallAcc = this.STOP_FALL;
            //     this.state = 2;
            //     this.animations[this.state][this.facing].elapsedTime = 0;
            // }
        } else {
            // Air Physics (need to implement horizontal aspect)
            if (this.velocity.y > 0 && !this.game.keys.Space) {
                this.state = 2;
                this.inAir = true;
            }
        }

        // Deceleration
        // if(Math.abs(this.velocityX) > this.MAX_WALK) {
        //     if(this.velocityX < 0) {
        //         this.velocityX = -1 * this.MAX_WALK;
        //     } else {
        //         this.velocityX = this.MAX_WALK;
        //     }
        // }

        // if(Math.abs(this.velocityX) > 0 && this.state == 0) {
        //     if(this.velocityX < 0) {
        //         this.velocityX += 100 * TICK;
        //     } else {
        //         this.velocityX -= 100 * TICK;
        //     }
        // }

        // Update Velocity
        // this.velocity.y += this.FALL_ACC * TICK;

        // if (this.velocity.y >= this.MAX_FALL) this.velocity.y = this.MAX_FALL;
        // if (this.velocity.y <= -this.MAX_FALL) this.velocity.y = -this.MAX_FALL;
        
        
        if (this.velocity.x >= this.MAX_WALK && !this.game.keys.KeyK) this.velocity.x = this.MAX_WALK;
        if (this.velocity.x <= -this.MAX_WALK && !this.game.keys.KeyK) this.velocity.x = -this.MAX_WALK;
        
        // Update Position
        this.x += this.velocity.x * TICK;
        //this.y += this.velocity.y * TICK;   
        
        // Update State
        if (this.state !== 4 && 
            this.state !== 2 && 
            this.state !== 3)
        {
            if (Math.abs(this.velocity.x) >= this.MIN_WALK) {
                this.state = 1;
            } else {
                this.state = 0;
            }
        }
        // Jumping or Falling
        else if (this.velocity.y > 0 || this.velocity.y < 0) {
            this.state = 2;
            this.inAir = true;
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
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_jump_right.png"), 0, 0, 512, 564, 5, .2, 0, true);

        // facing left = 1
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Player/player_jump_left.png"), 0, 0, 512, 564, 5, .2, 0, true);

    }
    draw(ctx) {
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,40,0,2*Math.PI);
        // ctx.stroke();
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1 / 2);

        ctx.font = "50px Arial";
        ctx.fillText("STATE: " + this.state, 10, 50);
        ctx.fillText("XVeloc: " + this.velocity.x, 10, 100);
        ctx.fillText("YVeloc: " + this.velocity.y, 10, 150);
        ctx.fillText("Xpos: " + Math.round(this.x), 10, 200);
        ctx.fillText("Ypos: " + this.y, 10, 250);
    };
}