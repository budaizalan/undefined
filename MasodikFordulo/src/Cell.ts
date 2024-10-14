export class ProtoCell {
  protected _fruits: number;
  protected _position: { x: number; y: number };

  get fruits() {
    return this._fruits;
  }

  get position() {
    return this._position;
  }

  set fruits(value: number) {
    this._fruits = -1;
  }

  constructor(fruits: number) {
    (this._fruits = fruits), (this._position = this.position);
  }
}

export default class Cell extends ProtoCell {
  private _fruitType: string;
  private _harvested: boolean = false;
  private _ability: null | string;

  get position() {
    return this._position;
  }

  get fruits() {
    return this._fruits;
  }

  set fruits(value: number) {
    if (value < 0) {
      throw new Error("Fruits cannot be negative");
    }
    this._fruits = value;
  }

  get fruitType() {
    return this._fruitType;
  }

  set fruitType(value: string) {
    this._fruitType = value;
  }

  get harvested() {
    return this._harvested;
  }

  set harvested(value: boolean) {
    this._harvested = value;
  }

  get ability() {
    return this._ability;
  }

  set ability(value: string | null) {
    this._ability = value;
  }

  constructor(
    x: number,
    y: number,
    fruits: number,
    fruitType: string,
    harvested: boolean,
    ability: null | string
  ) {
    super(fruits);
    this._position = { x, y };
    this._fruits = fruits;
    this._fruitType = fruitType;
    this._harvested = harvested;
    this._ability = ability;
  }
}
