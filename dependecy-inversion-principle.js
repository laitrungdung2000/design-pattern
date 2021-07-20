let Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2
});

class Person {
    constructor(name) {
        this.name = name;
    }
}
// LOW-LEVEL MODULE
class RelationShipBrowser {
    constructor() {
        if(this.constructor.name === "RelationShipBrowser")
            throw new Error("RelationShipBrowser is abstract!");
    }

    findAllChidrenOf(name) {}
}

class Relationships extends RelationShipBrowser {
    constructor() {
        super();
        this.data = [];
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            relationship: Relationship.parent,
            to: child
        });
    }

    findAllChidrenOf(name) {
        return this.data.filter(r =>
            r.from.name === name &&
            r.relationship === Relationship.parent
        ).map(r => r.to)
    }
}

//HIGH-LEVEL MODULE
class ReSearch {
    // constructor(relationships) {
    //     // console.log(JSON.stringify(relationships));
    //     let relations = relationships.data;
    //     //find all chidren of John
    //     for(let rel of relations.filter(r => 
    //         r.from.name === 'John' &&
    //         r.relationship === Relationship.parent)) {
    //             console.log(`${rel.to.name} is a John's child`);
    //     }
    // }
    constructor(broswer) {
        for(let p of broswer.findAllChidrenOf('John')) {
            console.log(`${p.name} is a John's child`)
        }
    }
}

let parent = new Person('John');
let child1 = new Person('Adam');
let child2 = new Person('Chris');

let rls = new Relationships();

rls.addParentAndChild(parent, child1);
rls.addParentAndChild(parent, child2);

new ReSearch(rls);