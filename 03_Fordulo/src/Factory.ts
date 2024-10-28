export default class Factory {
    private _coords: { x: number; y: number };
    private _size: number = 50;
    private _width: number = 2 * this._size;
    private _height: number = Math.sqrt(3) * this._size;

    private _productionType: string;
    private _range: number
    private _position: {q: number, r: number} | undefined;
    // private _factoryImage: HTMLImageElement = new Image();
    // private _factoryImageSrc: string;

    get x(): number {
        return this._coords.x;
    }

    set x(value: number) {
        this._coords.x = value;
    }

    get y(): number {
        return this._coords.y;
    }

    set y(value: number) {
        this._coords.y = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    // get factoryType(): string {
    //     return this._factoryType;
    // }

    get productionType() : string{
        return this._productionType;
    }
        
    get range():number{
        return this._range;
    }
        
    get position(): {q: number, r: number} | undefined{
        return this._position;
    }
        
    public setPosition(_position: {q: number, r: number}){
        this._position = _position;
    }

    // get factoryImage(): HTMLImageElement {
    //     return this._factoryImage;
    // }

    constructor(_productionType: string, _range: number) {
        this._coords = { x: 0, y: 0};
        this._productionType = _productionType;
        this._range = _range;
        // this._factoryImageSrc = `./assets/factory${this._factoryType}.png`;
        // this._factoryImage.src = this._factoryImageSrc;
    }
}