class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class PersonFactory {
    constructor(personFactory) {
        this.personFactory = personFactory;
        this.people = []
    }
    createPerson(name) {
        this.people.push(new Person(this.people.length, name));
        return {personFactory:this.personFactory, id: this.people.length-1, name: name};
    }
}

let pf = new PersonFactory(1);
console.log(pf.createPerson("dung"));