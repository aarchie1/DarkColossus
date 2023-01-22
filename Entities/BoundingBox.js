class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;

        // finds center of sprite so fall begins whens feet no longer collide with platforms
        /* 
        this.center = (this.width / 2); // -40 is for character idle animation -- change as needed
        this.rightCol = this.center - 40;
        this.leftCol = this.center - 30;
        */
    };

    collide(oth) {
       if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
       // if (this.rightCol > oth.left && this.leftCol < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;


        return false;
    };
};