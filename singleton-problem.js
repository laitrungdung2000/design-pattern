const fs = require('fs');
const path = require('path');

/// low-level module
class MyDatabase {
    constructor() {
        const instance = this.constructor.instance;
        if(instance)
            return instance;
        this.constructor.instance = this;

        console.log('Initialing database');

        this.capitals = {};
        let lines = fs.readFileSync(
            path.join(__dirname, 'capitals.txt')
        ).toString().split("\n");
        for(let i=0; i< lines.length/2; ++i) {
            this.capitals[lines[2*i]] = parseInt(lines[2*i+1]);
        }
    }

    getPopulation(city) {
        return this.capitals[city];
    }
}

// high-level-module
class SingletonRecordFinder {
    totalPopulation(cities) {
        return cities.map(
            city => new MyDatabase().getPopulation(city)
        ).reduce((x, y) => y+x);
    }
}

class ConfigurableRecordFinder {
    constructor(database) {
        this.database = database;
    }
    totalPopulation(cities) {
        return cities.map(
            city => this.database.getPopulation(city)
        ).reduce((x, y) => y+x);
    }
}

class DummyDatabase {
    constructor() {
        this.capitals = {
            'alpha': 1,
            'beta': 2,
            'gramma': 3
        };
    }
    getPopulation(city) {
        return this.capitals[city];
    }
}

describe('singleton database', function() {
    it('is a singleton', function() {
        const db1 = new MyDatabase();
        const db2 = new MyDatabase();
        expect(db1).toBe(db2);
    });
    it('total population', function() {
        let rf = new SingletonRecordFinder();
        let cities = ['Seoul', 'Mexico City'];
        let tp = rf.totalPopulation(cities);

        expect(tp).toEqual(1750000+1730000);
    });
    it('caculates total population better', function() {
        let db = new DummyDatabase();
        let rf = new ConfigurableRecordFinder(db);
        expect(rf.totalPopulation(['alpha', 'gramma'])).toEqual(4);
    })
});