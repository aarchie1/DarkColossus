/** Global Parameters Object */
const params = { 
    BLOCKWIDTH: 256,
    STATE : "gameplay",
    LEVEL: 0, 
    INVENTORY : null,
    HUD : null,
    DARK_ENERGY : null
};


let CANVAS_HEIGHT = 0;
let CANVAS_WIDTH = 0;
let player = null;

let debug = true;
function toggleDebug() {
    debug = !debug;
}

function keypress(key) {
    if (gameEngine.keys[key] && !gameEngine.keysPressed[key]) {
        gameEngine.keysPressed[key] = true;
        return true;
    } else {
        return false;
    }
};

function keyhold(key) {
    if (gameEngine.keys[key]) {
        return true;
    } else {
        return false;
    }
};

function equipAbilities(){
    if (params.INVENTORY.dnaSlot1 != null) {
        let dna = params.INVENTORY.dnaSlot1;
        if (dna.sigmaAbility != null) dna.sigmaAbility.onEquip();
        if (dna.alphaAbility != null) dna.alphaAbility.onEquip();
        if (dna.betaAbility != null) dna.betaAbility.onEquip();
        if (dna.epsilonAbility != null) dna.epsilonAbility.onEquip();
    } 

    if (params.INVENTORY.dnaSlot2 != null) {
        let dna = params.INVENTORY.dnaSlot2;
        if (dna.sigmaAbility != null) dna.sigmaAbility.onEquip();
        if (dna.alphaAbility != null) dna.alphaAbility.onEquip();
        if (dna.betaAbility != null) dna.betaAbility.onEquip();
        if (dna.epsilonAbility != null) dna.epsilonAbility.onEquip();
    }
}

function unequipAbilities(dna){
    // if (dna == null) return;
    // if (dna.sigmaAbility != null) dna.sigmaAbility.onUnequip();
    // if (dna.alphaAbility != null) dna.alphaAbility.onUnequip();
    // if (dna.betaAbility != null) dna.betaAbility.onUnequip();
    // if (dna.epsilonAbility != null) dna.epsilonAbility.onUnequip();

    // if (params.INVENTORY.dnaSlot1 != null && params.INVENTORY.dnaSlot2 != null){
    //     if (dna == params.INVENTORY.dnaSlot1) {
    //         let tempDna2 = params.INVENTORY.dnaSlot2;
    //         if (tempDna2.sigmaAbility != null) tempDna2.sigmaAbility.onUnequip();
    //         if (tempDna2.alphaAbility != null) tempDna2.alphaAbility.onUnequip();
    //         if (tempDna2.betaAbility != null) tempDna2.betaAbility.onUnequip();
    //         if (tempDna2.epsilonAbility != null) tempDna2.epsilonAbility.onUnequip();

    //         if (tempDna2.sigmaAbility != null) tempDna2.sigmaAbility.onEquip();
    //         if (tempDna2.alphaAbility != null) tempDna2.alphaAbility.onEquip();
    //         if (tempDna2.betaAbility != null) tempDna2.betaAbility.onEquip();
    //         if (tempDna2.epsilonAbility != null) tempDna2.epsilonAbility.onEquip();

    //     } else {
    //         let tempDna1 = params.INVENTORY.dnaSlot1;
    //         if (tempDna1.sigmaAbility != null) tempDna1.sigmaAbility.onUnequip();
    //         if (tempDna1.alphaAbility != null) tempDna1.alphaAbility.onUnequip();
    //         if (tempDna1.betaAbility != null) tempDna1.betaAbility.onUnequip();
    //         if (tempDna1.epsilonAbility != null) tempDna1.epsilonAbility.onUnequip();

    //         if (tempDna1.sigmaAbility != null) tempDna1.sigmaAbility.onEquip();
    //         if (tempDna1.alphaAbility != null) tempDna1.alphaAbility.onEquip();
    //         if (tempDna1.betaAbility != null) tempDna1.betaAbility.onEquip();
    //         if (tempDna1.epsilonAbility != null) tempDna1.epsilonAbility.onEquip();
    //     }
    // }
}    



/**
 * @param {Number} n
 * @returns Random Integer Between 0 and n-1
 */
const randomInt = n => Math.floor(Math.random() * n);

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @returns String that can be used as a rgb web color
 */
const rgb = (r, g, b) => `rgba(${r}, ${g}, ${b})`;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @param {Number} a Alpha Value
 * @returns String that can be used as a rgba web color
 */
const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * @param {Number} h Hue
 * @param {Number} s Saturation
 * @param {Number} l Lightness
 * @returns String that can be used as a hsl web color
 */
const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

/** Creates an alias for requestAnimationFrame for backwards compatibility */
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        /**
         * Compatibility for requesting animation frames in older browsers
         * @param {Function} callback Function
         * @param {DOM} element DOM ELEMENT
         */
        ((callback, element) => {
            window.setTimeout(callback, 1000 / 60);
        });
})();

function getFacing(velocity) {
    if (velocity.x === 0 && velocity.y === 0) return 4;
    let angle = Math.atan2(velocity.y, velocity.x) / Math.PI;

    if (-0.625 < angle && angle < -0.375) return 0;
    if (-0.375 < angle && angle < -0.125) return 1;
    if (-0.125 < angle && angle < 0.125) return 2;
    if (0.125 < angle && angle < 0.375) return 3;
    if (0.375 < angle && angle < 0.625) return 4;
    if (0.625 < angle && angle < 0.875) return 5;
    if (-0.875 > angle || angle > 0.875) return 6;
    if (-0.875 < angle && angle < -0.625) return 7;
};

/**
 * Returns distance from two points
 * @param {Number} p1, p2 Two objects with x and y coordinates
 * @returns Distance between the two points
 */
const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};