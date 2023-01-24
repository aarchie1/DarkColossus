function getLevel(levelNumber) {
    let sections = [steppingStonesSection, hordeFightSection, verticalSection, dnaPickupSection, flatSection];
    let view = {x: 1400, y: 900};

    //ENUMS
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
    const levelModifier = Math.floor(Math.random() * 11); //num between 0 and 10

    const PLATFORM_SMALL = {w: 256, h: 256};
    const PLATFORM_TINY = {w: 184, h: 284};
    const PLATFORM_LARGE = {w: 884, h: 496};
    const HAZARD_GROWTH_SHORT = {w: 256, h: 256};
    const HAZARD_GROWTH_TALL = {w: 256, h: 512};
    const PORTAL = {w: 364, h: 364};
    const REAPER = {w: 256, h: 256};
    const MOLECULE = {w: 256, h: 256};
    const PLAYER = {w: 256, h: 256};

    const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const vertical = () => (Math.random() < 0.5) ? -1 : 1;


    let level = {
        levelNumber: levelNumber,
        platformGround: [{x:0, y:view.y}, {x:view.x, y:view.y}],
        platformTiny: [],
        platformSmall: [],
        platformLarge: [],
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
    let startY = view.y;

    let numberOfSections = randomNumberInRange(3, 6 + levelNumber);

    //BUILD LEVEL
    for(let i = 0; i < numberOfSections; i++) {
        let buildSection = sections[Math.floor(Math.random() * sections.length)];
        buildSection();
    }
    checkpointSection(); //build this last no matter what to go to next level

    //iterate through all platforms and have a chance to spawn a reaper or molecule
    level.platformGround.forEach(platform => { addEnemiesNearPlatform(platform); addHazardOnPlatform(platform);});
    level.platformTiny.forEach(platform => { addEnemiesNearPlatform(platform); addHazardOnPlatform(platform);});
    level.platformSmall.forEach(platform => { addEnemiesNearPlatform(platform); addHazardOnPlatform(platform);});
    level.platformLarge.forEach(platform => { addEnemiesNearPlatform(platform); addHazardOnPlatform(platform);});

    function addEnemiesNearPlatform(platform) {
        if (Math.random() < 0.15 + (levelNumber/100)*2) { 
            level.reaper.push({x: platform.x + randomNumberInRange(-500, 500), y: platform.y + randomNumberInRange(-500, 500)});
        }
        if (Math.random() < 0.15 + (levelNumber/100)*2) {
            level.molecule.push({x: platform.x + randomNumberInRange(-500, 500), y: platform.y + randomNumberInRange(-500, 500)});
        }
    }

    function addHazardOnPlatform(platform) {
        if (Math.random() < 0.15 + (levelNumber/100)*2) {
            level.hazardGrowthShort.push({x: platform.x + randomNumberInRange(-500, 500), y: platform.y + randomNumberInRange(-500, 500)});
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
                break;
        }
    }

    function steppingStonesSection() {
        let numberOfPlatforms = randomNumberInRange(1, 5);
        for (let i = 0; i < numberOfPlatforms; i++) {
            addPlatform(choosePlatformType(), startX, startY, (Math.random() < 0.5) ? true : false);
            startX += randomNumberInRange(PLAYER.w, PLAYER.w * 2);
            startY += randomNumberInRange(PLAYER.h, PLAYER.h * 2) * vertical();     
        }
    }

    function flatSection() {
        for (let i = 0; i < randomNumberInRange(1, 5); i++) {
            let platformType = choosePlatformType();
            addPlatform(platformType, startX, startY, false);
            startX += randomNumberInRange(200, 600);
        }
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
        let flightsOfPlatforms = randomNumberInRange(1, 4);
        for (let i = 0; i < flightsOfPlatforms; i++) {
            let numberOfPlatforms = randomNumberInRange(1, 2);
            for (let j = 0; j < numberOfPlatforms; j++) {
                addPlatform(choosePlatformType(), randomNumberInRange(tempStartX, 1400), startY, false);
            }
            startY -= randomNumberInRange(PLAYER.h*1.5, PLAYER.h * 2.5);
        }
        startX += 2000;
    }

    function dnaPickupSection() {
        //add a large platform with a dna pickup in the middle
        addPlatform(PLATFORM_LARGE, startX, startY, false);
        level.dnaPickup.push({x: startX + 350, y: startY - 50});
        startX += PLATFORM_LARGE.w + 200;
        //add some reapers and molecules
        let numberOfEnemies = randomNumberInRange(2, 10 + levelNumber);
        for (let i = 0; i < numberOfEnemies; i++) {
            let enemyType = Math.floor(Math.random() * 2);
            let x = randomNumberInRange(startX, startX + 200);
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

    function checkpointSection() {
        //create three large platforms with a checkpoint in the middle of each
        for (let i = 0; i < 3; i++) {
            addPlatform(PLATFORM_LARGE, startX, startY, false);
            level.portal.push({x: startX + 350, y: startY - 50});
            startX += PLATFORM_LARGE.w + 200;
        }
    }

    return level;
}