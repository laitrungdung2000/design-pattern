const readline = require('readline');
let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



class HotDrink {
    consume() {}
}

class Tea extends HotDrink {
    consume() {
        console.log(`This tea is nice.`);
    }
}

class Coffee extends HotDrink {
    consume() {
        console.log(`This coffee is delicious.`);
    }
}

class HotDrinkFactory {
    prepare(amount) {}
}

class TeaFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount}ml`);
        return new Tea();
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Grind some bean, boil water, pour ${amount}ml`);
        return new Coffee();
    }
}
let AvaiableDrink = Object.freeze({
    coffee: CoffeeFactory,
    tea: TeaFactory
});
class HotDrinkMachine {
    constructor() {
        this.factories = {};
        for(let drink in AvaiableDrink) {
            this.factories[drink] = new AvaiableDrink[drink]();
        }
    }

    interact(consume) {
        r1.question('Please specify drink and amount ' + '(eg., tea 50): ', answer => {
            let parts = answer.split(' ');
            let name = parts[0];
            let amount = parseInt(parts[1]);
            let d = this.factories[name].prepare(amount);
            r1.close();
            consume(d);
        })
    }
    makeDrink(type) {
        switch(type) {
            case 'tea':
                return new TeaFactory().prepare(200);
            case 'coffee':
                return new CoffeeFactory().prepare(200);
            default:
                throw new Error('');
        }
    }
}

let machine = new HotDrinkMachine();

// r1.question('Which drink?\n', function(answer) {
//     let drink = machine.makeDrink(answer);
//     drink.consume();

//     r1.close();
// })
machine.interact(
    function(drink) {
        drink.consume();
    }
)