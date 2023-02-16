import {Customer} from "./myhelloworld";
import {Shape} from "./Shape";
import {Circle} from "./Circle";
import {Rectangle} from "./Rectangle";
import {CricketCoach} from "./CricketCoach";
import {GolfCoach} from "./GolfCoach";
import {Coach} from "./Coach";

let myCustomer: Customer = new Customer("Fry", "Read");

console.log(`${myCustomer.firstName} ${myCustomer.lastName}`);

// Now that Shape is abstract, can't be instantiated
// let shape: Shape = new Shape(3,4);
// console.log(shape.getInfo());

let circle: Circle = new Circle(4, 5, 20);
console.log(circle.getInfo());

let rectangle: Rectangle = new Rectangle(6.5, 7.5, 8.5, .95);
console.log(rectangle.getInfo());

let shapes: Shape[] = [circle, rectangle];

for(let obj of shapes) {
    console.log(obj.getInfo())
    console.log(obj.calculateArea());
}

let coaches: Coach[] = [new CricketCoach(), new GolfCoach()];

for(let obj of coaches) {
    console.log(obj.getDailyWorkout());
}