class Hero extends GameCharacter {

    constructor(theHP, theAttack, theSpeed, theName, theSprite) {
        super(theHP, theAttack, theSpeed, theName, theSprite);
        this.hpCost = 1;
        this.attackCost = 1;
        this.speedCost = 1;

    }

    increaseHP() {
        super.hp++;
        this.hpCost++;
    }

    increaseAttack() {
        super.attack++;
        this.attackCost++;
    }

    increaseSpeed() {
        super.speed++;
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
}