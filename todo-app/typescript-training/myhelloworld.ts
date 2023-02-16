console.log("Hello world");
console.log("Coding gurus! " + "Time for some fun!");

let found: boolean = true;

let firstName: string = "Stacy";
let lastName: string = "Read";

let greeting: string = `Hi ${firstName} ${lastName}`;

console.log(greeting);

for (let i = 0; i < 10; i++) {
    console.log(i);
}

let reviews: number[] = [1, 2, 4, 6, 8];
let total: number = 0;
for (let i = 0; i < reviews.length; i++) {
    total += reviews[i];
}

let average: number = total / reviews.length;

let sports: string[] = ["Golf", "Cricket", "Tennis"];
sports.push("Baseball");

for(let temp of sports) {
    if (temp === "Cricket") {
        console.log(temp + " <<< My favorite");
    } else {
        console.log(temp);
    }
}

export class Customer {
    // shorthand constructor with parameter properties
    constructor(private _firstName: string,
                private _lastName: string) {
        if (_firstName === "Stacy") {
            this._firstName = "Bob";
        }
    }


    // Traditional constructor and private properties
    // private _firstName: string;
    // private _lastName: string;
    // constructor(firstName: string, lastName: string) {
    //     this._firstName = firstName;
    //     this._lastName = lastName;
    // }

    // Accessors: Default access is public
    get firstName(): string {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;
    }

    // Traditional getter/setter methods
    // public getFirstName(): string {
    //     return this.firstName;
    // }
    //
    // public setFirstName(firstName: string): void {
    //     this.firstName = firstName;
    // }
}

let customer: Customer = new Customer("Stacy", "Read");
console.log(customer.firstName);

// Use accessors
customer.firstName = "Gigi";
console.log(customer.firstName);

// customer.firstName = "Stacy";
// customer.lastName = "Read";