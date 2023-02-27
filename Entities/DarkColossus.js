const PHASE_ONE = 1;
const PHASE_TWO = 2;
const PHASE_THREE = 3;

const BODY = 4;
const UPPER_LEFT_ARM = 5;
const UPPER_RIGHT_ARM = 6;
const LOWER_LEFT_ARM = 7;
const LOWER_RIGHT_ARM = 8;
const RING = 9;

class DarkColossus {
    constructor(x, y) {
        // this.width = 256;
        // this.height = 256;
        

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

        this.x = x;
        this.y = y;
        this.state = PHASE_ONE;
        const MAX_HEALTH = 1000;
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
        //this.updateBB();
        this.animations = [];
        this.frameSpeed = 0.2;
        this.loadAnimations();
        //this.moves = [this.CrossLaser()];
        this.maxMoveTimeInterval = 1;
        this.currentMoveTimeInterval = 0;


        this.upperLeftArm = null;
        this.upperRightArm = null;
        this.lowerRightArm = null;
        this.lowerLeftArm = null;

        this.partList = [this.upperLeftArm, this.upperRightArm, this.lowerRightArm, this.lowerLeftArm];
  }

  update() {
    //Chance
     
  }

  draw(ctx) {
    //draw body
    console.log("drawing body, X: " + this.x + " Y: " + this.y + "");
    this.animations[BODY].drawFrame(gameEngine.clockTick, ctx, this.x - gameEngine.camera.x, this.y - gameEngine.cameraY, 1);
  
}

  loadAnimations() {
    this.animations[BODY] = new Animator(ASSET_MANAGER.getAsset("./Sprites/Boss/boss_body.png"), 0, 0, 512, 512, 8, this.frameSpeed, 0, true);
    // this.solarFlareHitBoxAnimation.yOffset = -730;
    // this.solarFlareHitBoxAnimation.xOffset = -790;
  }

}

// class DarkColossusArm {
//     constructor() {
//         this.hostile = true;
//         this.damage = 1;
//         this.attackRate = 2;
//         this.elapsedTime = 0;
//         this.attackDistance = 0;
//         this.health = 100;
//         this.currentIFrameTimer = 0;
//         this.maxIFrameTimer = 42;
//         this.dead = false;
//         this.paused = true;
//         this.updateBB();
//         this.animationXOffset = 0;
//         this.animationYOffset = 0;
//         this.animations = [];
//         this.loadAnimations();
//         this.moves = [this.CrossLaser()];
//         this.maxMoveTimeInterval = 1;
//         this.currentMoveTimeInterval = 0;
//     }

//     update() {

//     }

//     draw(ctx) {

//     }

//     CrossLaser() {

//     }

        
//}