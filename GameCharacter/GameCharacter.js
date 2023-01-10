class GameCharacter {
    #sprite;
    FLOOR_BOUNDARY = 728;
    CEILING_BOUNDARY = 40;
    LEFT_BOUNDARY = 40;
    RIGHT_BOUNDARY = 984;


    constructor(theHP, theAttack, theSpeed, theName, theSprite, theCoins, theGame) {
        this.game = theGame;
        this.hp = theHP;
        this.attack = theAttack;
        this.speed = theSpeed;
        this.name = theName;
        this.sprite = theSprite;
        this.coins = theCoins;
        this.x = 100;
        this.y = 100;
        this.moveRight = true;
        this.moveLeft = true;
        this.moveUp = true;
        this.moveDown = true;
    };

    update(){
        if(gameEngine.keys['a'] && !gameEngine.keys['d'] && this.moveLeft) {
            this.x -= 2;
        } else if(gameEngine.keys['d'] && !gameEngine.keys['a'] && this.moveRight) {
            this.x += 2;
        }

        if(gameEngine.keys[' '] && !this.moveDown) {
            this.y = 628;
        }

        if(this.y < this.FLOOR_BOUNDARY) {
            this.y += 1;
        }

        if(this.y == this.FLOOR_BOUNDARY) {
            this.moveDown = false;
        } else {
            this.moveDown = true;
        }
        
        if(this.y == this.CEILING_BOUNDARY) {
            this.moveUp = false;
        } else {
            this.moveUp = true;
        }

        if(this.x == this.RIGHT_BOUNDARY) {
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