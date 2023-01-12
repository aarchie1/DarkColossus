class GameCharacter {
    #sprite;
    FLOOR_BOUNDARY = 728;
    CEILING_BOUNDARY = 40;
    LEFT_BOUNDARY = 40;
    RIGHT_BOUNDARY = 984;
    JUMP_HEIGHT = 100;
    JUMP_SPEED = 500;
    FALL_SPEED = 100;
    RUN_SPEED = 5;


    constructor(theHP, theAttack, theSpeed, theName, theSprite, theCoins, theGame) {
        this.game = theGame;
        this.hp = theHP;
        this.attack = theAttack;
        this.speed = theSpeed;
        this.name = theName;
        this.sprite = theSprite;
        this.coins = theCoins;
        this.x = 40;
        this.y = 728;
        this.moveRight = true;
        this.moveLeft = true;
        this.moveUp = true;
        this.moveDown = true;
        this.jumping = false;
        this.jumpCharge = 1;
    };

    update(){
        const TICK = this.game.clockTick;

        if(gameEngine.keys['a'] && !gameEngine.keys['d'] && this.moveLeft) {
            this.x -= this.RUN_SPEED;
        } else if(gameEngine.keys['d'] && !gameEngine.keys['a'] && this.moveRight) {
            this.x += this.RUN_SPEED;
        }

        if(gameEngine.keys[' '] && this.onGround) {
            let time = TICK;
            let timeDone = time - 60;
            for(let i = time; i > timeDone; i--) {
                this.y -= this.JUMP_SPEED*TICK;
            }
        }

        if(!this.jumping && this.y < this.FLOOR_BOUNDARY) {
            this.y += this.FALL_SPEED*TICK;
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