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

    update() {
        
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(95,50,40,0,2*Math.PI);
        ctx.stroke();
    };

    getHP() {
        return this.hp;
    };

    getAttack() {
        return this.attack;
    };

    getSpeed() {
        return this.speed;
    };

    getName() {
        return this.name;
    };

    getSprite() {
        return this.#sprite;
    };

    getCoins() {
        return this.coins;
    };


}