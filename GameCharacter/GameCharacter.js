class GameCharacter {
    #sprite;
    FLOOR_BOUNDARY = 728;
    CEILING_BOUNDARY = 40;
    LEFT_BOUNDARY = 40;
    RIGHT_BOUNDARY = 984;
    JUMP_SPEED = 600;
    FALL_ACC = 450;
    STOP_FALL = 1575;
    MIN_WALK = 10;
    MAX_WALK = 20;
    RUN_ACC = 10;


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

        if(this.state < 2) {
            if(Math.abs(this.velocityX) < this.MIN_WALK) {
                this.velocityX = 0;
                this.state = 0;
                if(gameEngine.keys['a'] && !gameEngine.keys['d']) {
                    this.left = true;
                    this.right = false;
                    this.velocityX -= this.MIN_WALK;
                }
                if(gameEngine.keys['d'] && !gameEngine.keys['a']) {
                    this.right = true;
                    this.left = false;
                    this.velocityX += this.MIN_WALK;
                }
            } else if(Math.abs(this.velocityX) >= this.MIN_WALK) {
                if(gameEngine.keys['a'] && !gameEngine.keys['d']) {
                    this.left = true;
                    this.right = false;
                    this.velocityX -= this.RUN_ACC * TICK;;
                }
                if(gameEngine.keys['d'] && !gameEngine.keys['a']) {
                    this.right = true;
                    this.left = false;
                    this.velocityX += this.RUN_ACC * TICK;
                }
            }
        }

        this.x += this.velocityX * TICK;
        this.y += this.velocityY * TICK;

        // if(gameEngine.keys[' '] && this.onGround) {
            
        // }

        if(!this.onGround) {
            this.y += this.FALL_ACC*TICK;
        }

        if(this.y >= this.FLOOR_BOUNDARY) {
            this.onGround = true;
            this.moveDown = false;
        } else {
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

        if(this.x == this.LEFT_BOUNDARY) {
            this.moveLeft = false;
        } else {
            this.moveLeft = true;
        }
        
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,40,0,2*Math.PI);
        ctx.stroke();
    };
}