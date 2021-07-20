class Document {

}

class Machine {
    constructor() {
        if(this.constructor.name === 'Machine') {
            throw new Error('Machine is abstract!');
        }
    }

    print(doc) {}
    scan(doc) {}
    fax(doc) {}
}

class MultiFunctionPrinter extends Machine {
    print(doc) {

    }
    scan(doc) {

    }
    fax(doc) {

    }
}

class NotImplementedError extends Error {
    constructor(name) {
        let msg = `${name} is not implemented`;
        super(msg);
        if(Error.captureStackTrace)
            Error.captureStackTrace(this, NotImplementedError);
    }
}

class OldFashionedPrinter extends Machine {
    print(doc) {

    }
    scan(doc) {
        throw new NotImplementedError('OldFashionedPrinter.scan');
    }
    fax(doc) {
        
    }
}

//ISP = segregate (split up)

class Printer {
    constructor() {
        if(this.constructor.name === "Printer")
            throw new Error('Printer is abstract!');
    }
    print() {}
}

class Scanner {
    constructor() {
        if(this.constructor.name === "Scanner")
            throw new Error('Scanner is abstract!');
    }
    scan() {}
}

class Photocopier extends Printer, Scanner 

let printer = new OldFashionedPrinter();
printer.scan();