class GameCharacter {
    #sprite;

    constructor(theHP, theAttack, theSpeed, theName, theSprite, theCoins) {
        this.hp = theHP;
        this.attack = theAttack;
        this.speed = theSpeed;
        this.name = theName;
        this.sprite = theSprite;
        this.coins = theCoins;
    }

    getHP() {
        return this.hp;
    }

    getAttack() {
        return this.attack;
    }

    getSpeed() {
        return this.speed;
    }

    getName() {
        return this.name;
    }

    getSprite() {
        return this.#sprite;
    }

    getCoins() {
        return this.coins;
    }


}