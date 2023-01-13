class GameCharacter {
    #sprite;
    FLOOR_BOUNDARY = 728;
    CEILING_BOUNDARY = 40;
    LEFT_BOUNDARY = 40;
    RIGHT_BOUNDARY = 984;
    JUMP_ACC = -600;
    FALL_ACC = 450;
    STOP_FALL = 1575;
    MIN_WALK = 100;
    MAX_WALK = 1000;
    RUN_ACC = 100;


    constructor(theHP, theAttack, theSpeed, theName, theSprite, theCoins, theGame) {
        this.game = theGame;
        this.hp = theHP;
        this.attack = theAttack;
        this.speed = theSpeed;
        this.name = theName;
        this.sprite = theSprite;
        this.coins = theCoins;
        this.x = 100;
        this.y = 500;
        this.velocityX = 0;
        this.velocityY = 0;
        this.moveRight = true;
        this.moveLeft = true;
        this.moveUp = true;
        this.moveDown = true;
        this.jumping = false;
        // this.left = true;
        // this.right = true;
        this.state = 0; //0 = idle, 1 = running, 2 = jumping, etc
    };

    update(){
        const TICK = this.game.clockTick;

        if(!this.onGround) {
            this.y += this.FALL_ACC*TICK;
        }

        if(this.y >= this.FLOOR_BOUNDARY) {
            this.state = 0;
            this.onGround = true;
            this.moveDown = false;
        } else {
            this.state = 2;
            this.onGround = false;
            this.moveDown = true;
        }
        
        if(this.y == this.CEILING_BOUNDARY) {
            this.moveUp = false;
        } else {
            this.moveUp = true;
        }

        if(this.x >= this.RIGHT_BOUNDARY) {
            this.moveRight = false;
        } else {
            this.moveRight = true;
        }

        if(this.x <= this.LEFT_BOUNDARY) {
            this.moveLeft = false;
        } else {
            this.moveLeft = true;
        }

        if(gameEngine.keys[' '] && this.onGround) {
            this.velocityY = this.JUMP_ACC;
        }

        if(this.state < 2) {
            if(Math.abs(this.velocityX) < this.MIN_WALK) {
                this.velocityX = 0;
                this.state = 0;
                if(gameEngine.keys['a'] && !gameEngine.keys['d'] && this.moveLeft) {
                    this.state = 1;
                    this.left = true;
                    this.right = false;
                    this.velocityX -= this.MIN_WALK;
                }
                if(gameEngine.keys['d'] && !gameEngine.keys['a'] && this.moveRight) {
                    this.state = 1;
                    this.right = true;
                    this.left = false;
                    this.velocityX += this.MIN_WALK;
                }
            } else if(Math.abs(this.velocityX) >= this.MIN_WALK) {
                if(gameEngine.keys['a'] && !gameEngine.keys['d'] && this.moveLeft) {
                    this.state = 1;
                    this.left = true;
                    this.right = false;
                    this.velocityX -= this.RUN_ACC * TICK;;
                }
                if(gameEngine.keys['d'] && !gameEngine.keys['a'] && this.moveRight) {
                    this.state = 1;
                    this.right = true;
                    this.left = false;
                    this.velocityX += this.RUN_ACC * TICK;
                }
            }
        }

        if(this.velocityX > this.MAX_WALK) {this.velocityX = this.MAX_WALK};

        this.x += this.velocityX * TICK;
        this.y += this.velocityY * TICK;

        // if(gameEngine.keys[' '] && this.onGround) {
            
        // }        
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,40,0,2*Math.PI);
        ctx.stroke();

        ctx.font = "50px Arial";
        ctx.fillText("STATE: " + this.state, 10, 50);
    };
}