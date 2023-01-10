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
        
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(0,0,40,0,2*Math.PI);
        ctx.stroke();
    };
}