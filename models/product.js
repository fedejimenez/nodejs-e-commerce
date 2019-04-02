const products = [

];
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        products.push(this);
    }

    static fetchAll() { // call method from the classs, not from an object
        return products;
    }

}