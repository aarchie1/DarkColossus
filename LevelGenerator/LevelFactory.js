function getLevel(levelNumber) {
    //PUT SECTIONS HERE
    let sections = [steppingStonesSection, hordeFightSection, uSection, sSection, verticalSection, dnaPickupSection, bossSection, checkpointSection];
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

    const platformSmall = {w: 256, h: 256};
    const platformTiny = {w: 184, h: 284};
    const platformLarge = {w: 884, h: 496};
    const hazardGrowthShort = {w: 256, h: 256};
    const hazardGrowthTall = {w: 256, h: 512};
    const portal = {w: 364, h: 364};
    const reaper = {w: 256, h: 256};
    const molecule = {w: 256, h: 256};
    const player = {w: 256, h: 256};

    let level = {
        levelNumber: levelNumber,
        platformGround: [{x:0, y:view.y}, {x:view.x, y:view.y}],
        platformTiny: [],
        platformSmall: [],
        platformLarge: [],
        hazardGrowthShort: [],
        hazardGrowthTall: [],
        portal: [],
        reaper: [],
        molecule: [],
        background: [{x:0, y:0}],
        player: [{x: view.x/2, y: view.y - 256}],
    }

    let startX = view.x;
    let startY = view.y;

    //Generate the level environment

    //Number of sections per level increases as the level number increases
    let numberOfSections = 3 + levelNumber;

    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    //BUILD LEVEL
    for(let i = 0; i < numberOfSections; i++) {
        let buildSection = sections[Math.floor(Math.random() * sections.length)];
        buildSection();
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
    return level;

    //create a function to choose which type of platform to generate
    function choosePlatformType(tinyOnly = false) {
        let platform = Math.floor(Math.random() * 3);
        if (tinyOnly) return platformTiny;
        switch(platform) {
            case 0:
                return platformSmall;
            case 1:
                return platformTiny;
            case 2:
                return platformLarge;
        }
    }


    //Authored sections below

    //Creates ascending stairs of platforms with 
    //va
    function steppingStonesSection() {
        let numberOfReapers = randomNumber(1, 5 + levelNumber);
        let numberOfMolecules = randomNumber(1, 5 + levelNumber);

        for (let i = 0; i < randomNumber(1, 5); i++) {
            let platformType = choosePlatformType();

            if (platformType === platformSmall)
                level.platformSmall.push({x: startX, y: startY - platformType.h, moving: (Math.random() < 0.5) ? true : false});

            if (numberOfReapers > 0) {   
                level.reaper.push({x: startX + platformType.w/2 - reaper.w/2, y: startY - platformType.h - reaper.h});
                numberOfReapers--;
            }

            if (numberOfMolecules > 0) {
                level.molecule.push({x: startX + platformType.w - molecule.w/2, y: startY - platformType.h - molecule.h});
                numberOfMolecules--;
            }

            startX += platformplatformType.w;        
        }
    }

    function hordeFightSection() {

    }

    function uSection() {

    }

    function sSection() {

    }

    function verticalSection() {

    }

    function dnaPickupSection() {

    }

    function bossSection() {

    }

    function checkpointSection() {

    }
}



