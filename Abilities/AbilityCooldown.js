class AbilityCooldown {

    constructor(cooldown) {
        this.cooldown = cooldown;
        this.currentCooldown = 0;
    }

    checkCooldown() {
        this.currentCooldown -= params.TIMER.tick()*30;
        return this.currentCooldown > 0;
    }

    startCooldown() {
        this.currentCooldown = this.cooldown;
    }

    getRemainingSeconds() {
        this.checkCooldown();
        return Math.max(Math.ceil(this.currentCooldown), 0);
    }
}
