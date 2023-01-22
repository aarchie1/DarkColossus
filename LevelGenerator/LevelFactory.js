function getLevel(levelNumber) {
    //PUT SECTIONS HERE
    let sections = [steppingStonesSection, hordeFightSection, uSection, sSection, verticalSection, dnaPickupSection, bossSection, checkpointSection];
    let view = {x: 1400, y: 900};

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

    for(let i = 0; i < numberOfSections; i++) {
        //Generate a section
        //pick a random section from the list of sections
        let section = sections[Math.floor(Math.random() * sections.length)];
        //call the section function
        section();
    }

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


    //Filter level based off level modifier
    return level;
}



