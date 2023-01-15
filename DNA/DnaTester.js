//create a class to test the DNA class
class DnaTester {
    constructor() {
        for (let i = 0; i < 10; i++) {
            console.log('Test ' + i);
            this.createTwoRandomDnaThenCreateAChild();
            this.DnaFactory = new DnaFactory();
        }
    }

    //Create two random DNA objects then create a child DNA object from them
    createTwoRandomDnaThenCreateAChild() {
        let dnaParent1 = this.DnaFactory.getRandomDNA();
        let dnaParent2 = this.DnaFactory.getRandomDNA();
        let childDna = this.DnaFactory.getDNAFromParents(dnaParent1, dnaParent2);
        this.test(dnaParent1);
        this.test(dnaParent2);
        this.test(childDna);
    }

    //This method will be used to test the DNA class
    test(dna) {
        console.log(dna.toString());
    }

}