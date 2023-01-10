class Hero extends GameCharacter {

    constructor(theHP, theAttack, theSpeed, theName, theSprite) {
        super(theHP, theAttack, theSpeed, theName, theSprite);
        this.hpCost = 1;
        this.attackCost = 1;
        this.speedCost = 1;
        this.currency = 0;
        this.currencySpent = 0;
    }

    increaseHP() {
        super.hp++;
        this.currencySpent += this.hpCost;
        this.hpCost++;
    }

    increaseAttack() {
        super.attack++;
        this.currencySpent += this.attackCost;
        this.attackCost++;
    }

    increaseSpeed() {
        super.speed++;
        this.currencySpent += this.speedCost;
        this.speedCost++;
    }

    getHpCost() {
        return this.hpCost;
    }

    getAttackCost() {
        return this.attackCost;
    }

    getSpeedCost() {
        return this.speedCost;
    }

    setHeroToDefault() {
        this.currency = this.currencySpent;
        this.currencySpent = 0;

    }
}