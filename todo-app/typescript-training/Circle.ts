import {Shape} from "./Shape";

export class Circle extends Shape {
    constructor(_x: number,
                _y: number,
                private _radius: number) {
        super(_x, _y);
    }

    calculateArea(): number {
        return Math.PI * (this._radius ** 2);
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
    }

    getInfo(): string {
        return super.getInfo() + `, radius=${this._radius}`;
    }
}
