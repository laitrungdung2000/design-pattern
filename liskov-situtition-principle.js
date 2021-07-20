class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value
    }

    get result() {
        return this._width*this._height;
    }

    toString() {
        return `${this._width}x${this._height}`
    }
}

class Square extends Rectangle {
    constructor(size) {
        super(size, size);
    }

    set width(value) {
        this._width = this._height = value
    }

    set height(value) {
        this._width = this._height = value
    }
}

let useIt = function(rc) {
    let width = rc._width;
    rc.height = 10;
    console.log(
        `Expected result of ${10*width}, ` +
        `got ${rc.result}`
    )
}

let rc = new Rectangle(10, 5);
useIt(rc);
let sq = new Square(5);
useIt(sq);