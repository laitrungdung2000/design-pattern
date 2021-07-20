const fs = require('fs');

class Journal {
    constructor() {
        this.entries = {}
    }

    addEntry(text) {
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;

        return c;
    }

    removeEntry(index) {
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join('\n');
    }

    save(filename) {
        fs.writeFileSync(filename, this.toString());
    }

    load(filename) {

    }
}

class PersistenceManager {

    preprocess(j) {

    }

    saveToFile(journal, filename) {
        fs.writeFileSync(filename, journal.toString());
    }
}

Journal.count = 0;

let j = new Journal();

j.addEntry('It is a bug');
j.addEntry('ok');

let p = new PersistenceManager;
let filename = __dirname + "/test.txt";
console.log(filename)

p.saveToFile(j, filename);

console.log(j.toString())