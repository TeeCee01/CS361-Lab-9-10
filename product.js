// A Product Class 

export class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // returns the price with 10% tax added
  withTax() {
    return this.price + this.price * 0.16;
  }
}
