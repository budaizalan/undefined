export class ProtoCell {
    _fruits;
    _position;
    get fruits() {
        return this._fruits;
    }
    get position() {
        return this._position;
    }
    set fruits(value) {
        this._fruits = -1;
    }
    constructor(fruits) {
        (this._fruits = fruits), (this._position = this.position);
    }
}
export default class Cell extends ProtoCell {
    _fruitType;
    _harvested = false;
    _ability;
    _abilityCollected = false;
    get position() {
        return this._position;
    }
    get fruits() {
        return this._fruits;
    }
    set fruits(value) {
        if (value < 0) {
            throw new Error("Fruits cannot be negative");
        }
        this._fruits = value;
    }
    get fruitType() {
        return this._fruitType;
    }
    set fruitType(value) {
        this._fruitType = value;
    }
    get harvested() {
        return this._harvested;
    }
    set harvested(value) {
        this._harvested = value;
    }
    get ability() {
        return this._ability;
    }
    set ability(value) {
        this._ability = value;
    }
    get abilityCollected() {
        return this._abilityCollected;
    }
    set abilityCollected(value) {
        this._abilityCollected = value;
    }
    constructor(x, y, fruits, fruitType, harvested, ability) {
        super(fruits);
        this._position = { x, y };
        this._fruits = fruits;
        this._fruitType = fruitType;
        this._harvested = harvested;
        this._ability = ability;
    }
}
