class DarkColossus {
    constructor() {
        const TICK = this.game.clockTick;
        // this.width = 256;
        // this.height = 256;
        const PHASE_ONE = 1;
        const PHASE_TWO = 2;
        const PHASE_THREE = 3;

        //PHASE 1/PHASE 2 LOOP
            //1) Every 30 seconds, enter PHASE 2
            //2) Spawn enemies/ads/mobs
            //3) Boss heals until all ads/mobs are dead or full health
                //3.5) Make sure boss ceases healing if ads/mobs are dead
            //4) Then Boss enters PHASE 1

        //PHASE 3 LOOP
            //1) At 30% health, enter PHASE 3
            //2) Boss stats all increase by 50%
            //3) Cross from Sky move is added to move pool
            //4) Phase 3 ends when boss is dead
            
        //Move List:
            //Arm Grab
            //Cross Laser
            //Arm Laser

        this.state = PHASE_ONE;
        const MAX_HEALTH = 10000;
        this.hostile = true;
        this.damage = 1;
        this.attackRate = 2;
        this.elapsedTime = 0;
        this.attackDistance = 0;
        this.health = MAX_HEALTH;
        this.currentIFrameTimer = 0;
        this.maxIFrameTimer = 42;
        this.dead = false;
        this.paused = true;
        this.updateBB();
        this.animationXOffset = 0;
        this.animationYOffset = 0;
        this.animations = [];
        this.loadAnimations();
        this.moves = [this.CrossLaser()];
        this.maxMoveTimeInterval = 1;
        this.currentMoveTimeInterval = 0;

        this.upperLeftArm = null;
        this.upperRightArm = null;
        this.lowerRightArm = null;
        this.lowerLeftArm = null;

        this.armList = [this.upperLeftArm, this.upperRightArm, this.lowerRightArm, this.lowerLeftArm];
  }

  update() {
    //Chance
     
  }

  draw(ctx) {

  }

  CrossLaser() {

  }
}

class DarkColossusArm {
    constructor() {
        this.hostile = true;
        this.damage = 1;
        this.attackRate = 2;
        this.elapsedTime = 0;
        this.attackDistance = 0;
        this.health = 100;
        this.currentIFrameTimer = 0;
        this.maxIFrameTimer = 42;
        this.dead = false;
        this.paused = true;
        this.updateBB();
        this.animationXOffset = 0;
        this.animationYOffset = 0;
        this.animations = [];
        this.loadAnimations();
        this.moves = [this.CrossLaser()];
        this.maxMoveTimeInterval = 1;
        this.currentMoveTimeInterval = 0;
    }

    update() {

    }

    draw(ctx) {

    }

    CrossLaser() {

    }
}