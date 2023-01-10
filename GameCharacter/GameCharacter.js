class GameCharacter {
    #sprite;

    constructor(theHP, theAttack, theSpeed, theName, theSprite, theCoins, theGame) {
        this.game = theGame;
        this.hp = theHP;
        this.attack = theAttack;
        this.speed = theSpeed;
        this.name = theName;
        this.sprite = theSprite;
        this.coins = theCoins;
        this.x = 0;
        this.y = 0;
    };

    update(){
        if(gameEngine.keys['s'] && !gameEngine.keys['w']) {
            this.y += 2;
        } else if(gameEngine.keys['s'] && gameEngine.keys['d'] && !gameEngine.keys['w']) {
            this.y += 2;
            this.x += 2;
        } else if(gameEngine.keys['w'] && !gameEngine.keys['s']) {
            this.y -= 2;
        } else if(gameEngine.keys['a'] && !gameEngine.keys['d']) {
            this.x -= 2;
        } else if(gameEngine.keys['d'] && !gameEngine.keys['a']) {
            this.x += 2;
        }
        
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,40,0,2*Math.PI);
        ctx.stroke();
    };
}