let currentLevelModifier = 0;
const BACK_TO_HUB = -1;
const NO_MODIFER = 0;
const REAPERS_ONLY = 1;
const MOLECULES_ONLY = 2;
const NO_ENEMIES = 3;
const HALF_HP = 4;
const DOUBLE_REWARDS = 5;
const NO_FIGHTS = 6;
const ENEMIES_FASTER = 7;
const REAPERS_DOUBLE_HP = 8;
const PROJECTILES_DOUBLE_DAMAGE = 9;
const PHYSICAL_DOUBLE_DAMAGE = 10;

const BASE_ENEMY_SPAWN_RATE = 0.3;

//make a function to get modifer text from the modifer number
function getLevelModifierText(modifierNumber) {
    switch(modifierNumber) {
        case BACK_TO_HUB:
            return "Return to Awakening Cross";
        case NO_MODIFER:
            return "Shadow Realm";
        case REAPERS_ONLY:
            return "Reaper Dimension";
        case MOLECULES_ONLY:
            return "Molecule Dimension";
        case NO_ENEMIES:
            return "Empty Abyss";
        case HALF_HP:
            return "Half Health Reality";
        case DOUBLE_REWARDS:
            return "Double Rewards Realm";
        case NO_FIGHTS:
            return "Pacifist Reality";
        case ENEMIES_FASTER:
            return "Fast Enemies Hell";
        case REAPERS_DOUBLE_HP:
            return "Strong Enemies Hell";
        case PROJECTILES_DOUBLE_DAMAGE:
            return "Projectile Power Space";
        case PHYSICAL_DOUBLE_DAMAGE:
            return "Physical Power Space";
    }
}




function getLevel(levelNumber) {
    let sections = [flatSection, ascendingSteppingStonesSection, descendingSteppingStonesSection, dnaPickupSection];//hordeFightSection, , dnaPickupSection, flatSection];verticalSection
    let view = {x: CANVAS_WIDTH, y: CANVAS_HEIGHT};

    const levelModifier = currentLevelModifier;//Math.floor(Math.random() * 11); //num between 0 and 10

    const PLATFORM_SMALL = {w: 256, h: 256};
    const PLATFORM_TINY = {w: 184, h: 284};
    const PLATFORM_LARGE = {w: 884, h: 496};
    const PLATFORM_GROUND = {w: 1600, h: 400};
    const HAZARD_GROWTH_SHORT = {w: 256, h: 256};
    const HAZARD_GROWTH_TALL = {w: 256, h: 512};
    const PORTAL = {w: 364, h: 364};
    const REAPER = {w: 256, h: 256};
    const MOLECULE = {w: 256, h: 256};
    const PLAYER = {w: 256, h: 256};

    const GROUND_HEIGHT = 700;

    const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const vertical = () => (Math.random() < 0.5) ? -1 : 1;


    let level = {
        levelNumber: levelNumber,
        platformGround: [],
        platformTiny: [],
        platformSmall: [],
        platformLarge: [],
        platformHub: [],
        invisibleWall: [],
        hazardGrowthShort: [],
        hazardGrowthTall: [],
        dnaPickup: [],
        portal: [],
        reaper: [],
        molecule: [],
        background: [{x:0, y:0}],
        player: [{x: view.x/2, y: view.y - 256}],
    }

    level.toString = function() {
        let levelString = "Level " + this.levelNumber + ":\n"
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                if (key != "toString") {
                    levelString += key + ": ";
                    for (let i = 0; i < this[key].length; i++) {
                        levelString += "(" + this[key][i].x + ", " + this[key][i].y + ") ";
                    }
                    levelString += "\n";
                }
            }
        }
        return levelString;
    }

    let startX = view.x;
    let startY = GROUND_HEIGHT;

    let numberOfSections = 2 + params.LEVEL; //randomNumberInRange(3, 7 + levelNumber);

    //BUILD LEVEL
    for(let i = 0; i < numberOfSections; i++) {
        let buildSection = sections[Math.floor(Math.random() * sections.length)];
        buildSection();
    }

    //iterate through all platforms and have a chance to spawn a reaper or molecule
    level.platformGround.forEach(platform => { addMoleculeNearPlatform(platform); addReaperNearPlatform(platform, 600, 30); addHazardOnPlatform(platform);});
    level.platformTiny.forEach(platform => { addMoleculeNearPlatform(platform); addHazardOnPlatform(platform);});
    level.platformSmall.forEach(platform => { addMoleculeNearPlatform(platform); addHazardOnPlatform(platform);});
    level.platformLarge.forEach(platform => { addReaperNearPlatform(platform, 600, 200); addMoleculeNearPlatform(platform); addHazardOnPlatform(platform);});

    level.platformGround.push({x: 0, y: 800});
    checkpointSection(); //build this last no matter what to go to next level

    function addReaperNearPlatform(platform, x, y) {
        if (Math.random() < BASE_ENEMY_SPAWN_RATE + (levelNumber)) {
            level.reaper.push({x: platform.x + randomNumberInRange(50, x), y: platform.y - y});
        }
    }

    function addMoleculeNearPlatform(platform) {
        if (Math.random() < BASE_ENEMY_SPAWN_RATE + (levelNumber)) {
            level.molecule.push({x: platform.x + randomNumberInRange(-500, 500), y: platform.y - randomNumberInRange(0, 500)});
        }
    }



    function addHazardOnPlatform(platform) {
        if (Math.random() < 0.15 + (levelNumber/100)*2) {
            level.hazardGrowthShort.push({x: platform.x + randomNumberInRange(0, 500), y: platform.y + randomNumberInRange(0, 500)});
        }
        if (Math.random() < 0.15 + (levelNumber/100)*2) {
            level.hazardGrowthTall.push({x: platform.x + randomNumberInRange(-500, 500), y: platform.y + randomNumberInRange(-500, 500)});
        }
    }

    //Filter level after its been built based off level modifier
    switch(levelModifier) {
        case NO_MODIFER:
            break;
        case REAPERS_ONLY:
            level.molecule = [];
            break;
        case MOLECULES_ONLY:
            level.reaper = [];
            break;
        case NO_ENEMIES:
            level.molecule = [];
            level.reaper = [];
            break;
        case NO_FIGHTS:
            level.reaper = [];
            level.molecule = [];
            break;
        case ENEMIES_FASTER:
            level.reaper.forEach(reaper => reaper.speed = reaper.speed * 2);
            level.molecule.forEach(molecule => molecule.speed = molecule.speed * 2);
            break;
        case REAPERS_DOUBLE_HP:
            level.reaper.forEach(reaper => reaper.hp = reaper.hp * 2);
            break;
        case PROJECTILES_DOUBLE_DAMAGE:
            level.reaper.forEach(reaper => reaper.projectileDamage = reaper.projectileDamage * 2);
            level.molecule.forEach(molecule => molecule.projectileDamage = molecule.projectileDamage * 2);
            break;
        case PHYSICAL_DOUBLE_DAMAGE:
            level.reaper.forEach(reaper => reaper.physicalDamage = reaper.physicalDamage * 2);
            level.molecule.forEach(molecule => molecule.physicalDamage = molecule.physicalDamage * 2);
            break;
        case HALF_HP:
            level.reaper.forEach(reaper => reaper.hp = reaper.hp / 2);
            break;
        case DOUBLE_REWARDS:
            level.reaper.forEach(reaper => reaper.reward = reaper.reward * 2);
            level.molecule.forEach(molecule => molecule.reward = molecule.reward * 2);
            break;
    }

    function choosePlatformType(tinyOnly = false) {
        let platform = Math.floor(Math.random() * 3);
        if (tinyOnly) return PLATFORM_TINY;
        switch(platform) {
            case 0:
                return PLATFORM_SMALL;
            case 1:
                return PLATFORM_TINY;
            case 2:
                return PLATFORM_LARGE;
        }
    }

    function addPlatform(platformType, x, y, moving) {
        switch(platformType) {
            case PLATFORM_SMALL:
                level.platformSmall.push({x: x, y: y, moving: moving});
                break;
            case PLATFORM_TINY:
                level.platformTiny.push({x: x, y: y, moving: moving});
                break;
            case PLATFORM_LARGE:
                level.platformLarge.push({x: x, y: y, moving: moving});
                level.invisibleWall.push({x: x+40, y: y});
                level.invisibleWall.push({x: x + PLATFORM_LARGE.w-60, y: y});
                break;
            case PLATFORM_GROUND:
                level.platformGround.push({x: x, y: y, moving: moving});
                break;


        }
    }

    function ascendingSteppingStonesSection() {
        let numberOfPlatforms = randomNumberInRange(1, 5);
        for (let i = 0; i < numberOfPlatforms; i++) {
            let platformType = choosePlatformType();
            addPlatform(platformType, startX, startY, (Math.random() < 0.5) ? true : false);
            startX += randomNumberInRange(platformType.w, platformType.w + 400);
            startY -= Math.min(randomNumberInRange(platformType.h, PLAYER.h * 2), PLAYER.h);  
        }
    }

    function descendingSteppingStonesSection() {
        let numberOfPlatforms = randomNumberInRange(1, 5);
        for (let i = 0; i < numberOfPlatforms; i++) {
            let platformType = choosePlatformType();
            addPlatform(platformType, startX, startY, (Math.random() < 0.5) ? true : false);
            startX += randomNumberInRange(platformType.w, platformType.w +400);
            startY = Math.min(startY + randomNumberInRange(platformType.h, PLAYER.h), GROUND_HEIGHT);  
            if (startY == GROUND_HEIGHT) break;
        }
    }

    function flatSection() {
        while (startY < GROUND_HEIGHT) descendingSteppingStonesSection();
        level.invisibleWall.push({x: startX+10, y: startY});
        for (let i = 0; i < randomNumberInRange(1, 4); i++) {
            let platformType = PLATFORM_GROUND;
            addPlatform(platformType, startX, startY, false);
            startX += platformType.w;
        }
        level.invisibleWall.push({x: startX, y: startY});
        
    }
        
    function hordeFightSection() {
        //add two platforms side by side and a tall growth on the ends
        let tempStartX = startX;
        addPlatform(PLATFORM_LARGE, startX, startY, false);
        startX += 256;
        addPlatform(PLATFORM_LARGE, startX + 256, startY, false);
        startX += 256;
        level.hazardGrowthTall.push({x: startX, y: startY - 256});
        level.hazardGrowthTall.push({x: startX, y: startY - 512});

        //add reapers and molecules between tempStartX and startX
        let numberOfEnemies = randomNumberInRange(5, 20 +levelNumber);
        for (let i = 0; i < numberOfEnemies; i++) {
            let enemyType = Math.floor(Math.random() * 2);
            let x = randomNumberInRange(tempStartX, startX);
            let y = randomNumberInRange(startY - 256, startY - 512);
            switch(enemyType) {
                case 0:
                    level.reaper.push({x: x, y: y});
                    break;
                case 1:
                    level.molecule.push({x: x, y: y});
                    break;
            }
        }
    }

    function verticalSection() {
        //create platforms that go straight up
        let tempStartX = startX;
        let flightsOfPlatforms = randomNumberInRange(1, 3);
        for (let i = 0; i < flightsOfPlatforms; i++) {
            let numberOfPlatforms = 1;
            let prevPlatformType = null;
            for (let j = 0; j < numberOfPlatforms; j++) {
                let platformType = (Math.random() < 0.5) ? PLATFORM_SMALL : PLATFORM_TINY;
                addPlatform(platformType, randomNumberInRange(tempStartX, 1000), startY, false);
                prevPlatformType = platformType;
            }
            //startY -= randomNumberInRange(PLAYER.h*1.5, PLAYER.h * 2.5);
            startY -= Math.max(randomNumberInRange(prevPlatformType.h, PLAYER.h * 1.5), PLAYER.h);  

        }
        startX += PLAYER.w;
    }

    function dnaPickupSection() {
        //add a large platform with a dna pickup in the middle

        addPlatform(PLATFORM_LARGE, startX, startY, false);
        level.dnaPickup.push({x: startX + PLATFORM_LARGE.w/2, y: startY - 170});
        startX += PLATFORM_LARGE.w + PLAYER.w;
    }

    function checkpointSection() {
        //create three large platforms with a checkpoint in the middle of each
        
        for (let i = 0; i < 3; i++) {
            addPlatform(PLATFORM_LARGE, startX, startY, false);
            
            level.portal.push({x: startX + PLATFORM_LARGE.w/3.5, y: startY - PLATFORM_LARGE.h/2});
            startX += PLATFORM_LARGE.w + 25;

        }


    }         
    return level;

}

