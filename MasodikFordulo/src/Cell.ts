export class ProtoCell{
    protected _fruits: number;

    get fruits() {
        return this._fruits;
    }

    set fruits(value: number) {
        this._fruits = -1;
    }

    constructor(fruits:number){
        this._fruits = fruits
    }
}

export default class Cell extends ProtoCell {
    private _position: { x: number, y: number };
    private _fruitType: string;
    private _special: null | string;

    get position() {
        return this._position;
    }

    get fruits() {
        return this._fruits;
    }

    set fruits(value: number) {
        if(value < 0) {
            throw new Error('Fruits cannot be negative');
        }
        this._fruits = value;
    }

    get fruitType() {
        return this._fruitType;
    }

    set fruitType(value: string) {
        this._fruitType = value;
    }

    get special() {
        return this._special;
    }

    set special(value: string | null) {
        this._special = value;
    }

    constructor(x: number, y: number, fruits: number, fruitType: string, special: null | string) {
        super(fruits)
        this._position = { x, y };
        this._fruits = fruits;
        this._fruitType = fruitType;
        this._special = special;
    }
}