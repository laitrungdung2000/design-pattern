const { SIGABRT } = require("constants");

let Color = Object.freeze({
    green: 'green',
    blue: 'blue',
    red: 'red'
});

let Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large'
})


class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

// open for extension, closed for modification

class ProductFilter {
    filterByColor(products, color) {
        return products.filter(p=> p.color === color);
    }

    filterBySize(products, size) {
        return products.filter(p=> p.size === size);
    }

}

//specification

class SizeSpecification {
    constructor(size) {
        this.size = size;
    }

    isSatisfied(item) {
        return item.size === this.size;
    }
}

class ColorSpecification {
    constructor(color) {
        this.color = color;
    }

    isSatisfied(item) {
        return item.color === this.color;
    }
}

//And Specification

class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }
    isSatisfied(item) {
        return this.specs.every(spec => spec.isSatisfied(item));
    }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.blue, Size.medium);
let bike = new Product('Bike', Color.red, Size.large);

let products = [apple, tree, bike];

let pf = new ProductFilter();

for(p of pf.filterByColor(products, Color.green)) {
    console.log(`${p.name} is ${p.color}`);
}

class BetterFilter {
    filter(items, spec) {
        return items.filter(x => spec.isSatisfied(x));
    }
}

let bf = new BetterFilter();

for(p of bf.filter(products, new SizeSpecification(Size.large))) {
    console.log( `${p.name} is ${Size.large}`);
}

console.log("large and red product: ");

let spec = new AndSpecification(
    new ColorSpecification(Color.red),
    new SizeSpecification(Size.large)
);

for(let p of bf.filter(products, spec)) {
    console.log(`${p.name} is ${p.color}  and ${p.size}`);
}