export class ProtoCell {
    _fruits;
    get fruits() {
        return this._fruits;
    }
    set fruits(value) {
        this._fruits = -1;
    }
    constructor(fruits) {
        this._fruits = fruits;
    }
}
export default class Cell extends ProtoCell {
    _position;
    _fruitType;
    _special;
    get position() {
        return this._position;
    }
    get fruits() {
        return this._fruits;
    }
    set fruits(value) {
        if (value < 0) {
            throw new Error('Fruits cannot be negative');
        }
        this._fruits = value;
    }
    get fruitType() {
        return this._fruitType;
    }
    set fruitType(value) {
        this._fruitType = value;
    }
    get special() {
        return this._special;
    }
    set special(value) {
        this._special = value;
    }
    constructor(x, y, fruits, fruitType, special) {
        super(fruits);
        this._position = { x, y };
        this._fruits = fruits;
        this._fruitType = fruitType;
        this._special = special;
    }
}
