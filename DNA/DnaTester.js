//create a class to test the DNA class
class DnaTester {
    constructor() {
        this.testResults = [];
        for (let i = 0; i < 10; i++) {
            console.log('Test ' + i);
            this.createTwoRandomDnaThenCreateAChild();
        }
    }

    //Create two random DNA objects then create a child DNA object from them
    createTwoRandomDnaThenCreateAChild() {
        let dnaParent1 = DnaFactory.getRandomDNA();
        let dnaParent2 = DnaFactory.getRandomDNA();
        let childDna = DnaFactory.getDNAFromParents(dnaParent1, dnaParent2);
        
        this.test(dnaParent1);
        this.test(dnaParent2);
        this.test(childDna);
    }

    //This method will be used to test the DNA class
    test(dna) {
        this.testResults.push(dna.toString());
        console.log(dna.toString());    
    }

    update() {

    }

    draw(ctx) {
        //draw all the test results in testResults
        for (let i = 0; i < this.testResults.length; i++) {
            ctx.font = "18px Arial";
            ctx.fillText(this.testResults[i], 10, 10 + (i * 20));
        }
    }
}