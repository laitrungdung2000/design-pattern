class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    toString() {
        return `${this.start.toString()}->${this.end.toString()}`;
    }
}

class VectorObject extends Array {}
class VectorRectangle extends VectorObject {
    constructor(x, y, width, height) {
        super();
        this.push(new Line(new Point(x, y), new Point(x+width, y)));
        this.push(new Line(new Point(x+width, y), new Point(x+width, y+height)));
        this.push(new Line(new Point(x+width, y+height), new Point(x, y+height)));
        this.push(new Line(new Point(x, y+height), new Point(x, y)));
    }
}

// have to work with this
let drawPoint = function(point) {
    process.stdout.write('.');
};


class LineToPointAdapter extends Array {
    constructor(line) {
        super();
        console.log(`${LineToPointAdapter.count++}: Generating` +
        `point for line: ${line.toString()} (no caching)`);

        let left = Math.min(line.start.x, line.end.x);
        let right = Math.max(line.start.x, line.end.x);
        let top = Math.min(line.start.y, line.end.y);
        let bottom = Math.max(line.start.y, line.end.y);

        if(right - left === 0) {
            for(let y=top; y<=bottom; ++y) {
                this.push(new Point(left, y));
            }
        } else if(line.end.y -line.start.y === 0) {
            for(let x=left; x<=right;++x) {
                this.push(new Point(x, top));
            }
        }
    }
}
LineToPointAdapter.count = 0;

let vectorObjects = [
    new VectorRectangle(1, 1, 19, 29),
    new VectorRectangle(2, 2, 5, 6)
]

let drawPoints = function() {
    for(let vo of vectorObjects) {
        console.log(vo);
        for(let line of vo) {
            let adapter = new LineToPointAdapter(line);
            console.log("adapter: ", adapter);
            adapter.forEach(drawPoint);
        }
    }
}
drawPoints();