/* export class Stock {
    public favorite: boolean = false;

/*
alternative

constructor(name, code, price, previousPrice){
    this.name = name;
    this.code = code;
    this.price = price;
    this.previousPrice = previousPrice
}

    constructor(public name: string,
                public code: string,
                public price: number,
                public previousPrice: number,
                public exchange: string) {

    }

    isPositiveChange(): boolean {
        return this.price >= this.previousPrice;
    }

} */


export interface Stock {
    name: string;
    code: string;
    price: number;
    previousPrice: number;
    exchange: string;
    favorite: boolean;

    // no constructor or any methods
    // but we lost isPositiveChange() method
}
