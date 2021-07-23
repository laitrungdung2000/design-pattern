class Address {
    constructor(suite,streetAddress, city) {
        this.suite = suite;
        this.streetAddress = streetAddress;
        this.city = city;
    }

    // deepCopy() {
    //     return new Address(
    //         this.suite,
    //         this.streetAddress,
    //         this.city
    //     )
    // }

    toString() {
        return `Address:${this.suite}, ${this.streetAddress}, ${this.city}`;
    }
}
class Employee {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    // deepCopy() {
    //     return new Person(
    //         this.name, 
    //         this.address.deepCopy());
    // }

    toString() {
        return `${this.name} works at ${this.address}`;
    }

    // greeter() {
    //     console.log(`Hi, my name is ${this.name}, I live at Address: ${this.address}`)
    // }
}

class Serializer {
    constructor(types) {
        this.types = types;
    }

    markRecursive(object) {
        let idx = this.types.findIndex(t => {
            return t.name === object.constructor.name;
        });
        if(idx !== -1) {
            object['typeIndex'] = idx;
            for(let key in object) {
                if(object.hasOwnProperty(key) && object[key] != null) {
                    this.markRecursive(object[key]);
                }
            }
        }
    }

    reconstructRecursive(object) {
        if(object.hasOwnProperty('typeIndex')) {
            let type = this.types[object.typeIndex];
            let obj = new type();
            for(let key in object) {
                if(object.hasOwnProperty(key) && object[key] != null) {
                    obj[key] = this.reconstructRecursive(object[key]);
                }
                
            }
            delete obj.typeIndex;
            console.log(obj);
            return obj;
        }
        return object;
    }

    clone(object) {
        console.log(object);
        this.markRecursive(object);
        console.log(object)
        let copy = JSON.parse(JSON.stringify(object));
        console.log(copy);
        return this.reconstructRecursive(copy);
    }
}

class EmployeeFactory {
    static _newEmployee(proto, name, suite) {
        let copy = EmployeeFactory.serializer.clone(proto);
        copy.name = name;
        copy.address.suite = suite;
        return copy;
    }

    static newMainOfficeEmployee(name, suite) {
        return this._newEmployee(
            EmployeeFactory.main, name, suite
        );
    }

    static newAuxOfficeEmployee(name, suite) {
        return this._newEmployee(
            EmployeeFactory.aux, name, suite
        );
    }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address(null, '123 Drive', 'London'));
EmployeeFactory.aux = new Employee(null, new Address(null, '233 ABC', 'Oxford'));

let john = EmployeeFactory.newMainOfficeEmployee('John', 2221);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 2222);
console.log(john.toString());
console.log(jane.toString());
// let john = new Person('John', new Address('123 London road', 'London', 'UK'));
// let s = new Serializer([Person, Address]);
// let jane = s.clone(john);
// jane.name = 'Jane';
// jane.address.streetAddress = '222 Angel St';

// console.log(john.toString());
// console.log(jane.toString());

// jane.greeter();